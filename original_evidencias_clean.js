/* ==========================================================================
   SIGECA - PÁGINA DE EVIDENCIAS (Repositorio y Gestión)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";
import { onedrive } from "../services/onedrive.js?v=20260623.5";

export async function renderEvidenciasPage(container, userRole = "admin") {
  const [evidencias, indicadores] = await Promise.all([
    db.getEvidencias(),
    db.getIndicadores()
  ]);

  let activeFilter = "todos";

  const drawEvidenciasTable = () => {
    const tableBody = container.querySelector("#evidencias-table-body");
    if (!tableBody) return;

    const filtered = activeFilter === "todos"
      ? evidencias
      : evidencias.filter(e => e.indicadorId === activeFilter);

    const isEditable = userRole === "admin" || userRole === "editor";

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-400); padding: 3rem 1rem;">
            <i data-lucide="folder-archive" style="width: 40px; height: 40px; margin-bottom: 0.5rem; color: var(--text-400);"></i>
            <p>No se encontraron evidencias asociadas a este indicador.</p>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    tableBody.innerHTML = filtered.map(e => {
      const ind = indicadores.find(i => i.id === e.indicadorId);
      const indCode = ind ? ind.codigo : "N/A";
      
      let iconColor = "#0078d4";
      let icon = "file-text";
      if (e.formato === "pdf") { iconColor = "#ea4335"; icon = "file-check"; }
      if (e.formato === "word") { iconColor = "#0078d4"; icon = "file-signature"; }
      if (e.formato === "excel") { iconColor = "#107c41"; icon = "file-spreadsheet"; }

      const dateObj = new Date(e.fechaSubida);
      const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i data-lucide="${icon}" style="color: ${iconColor}; width: 22px; height: 22px; flex-shrink: 0;"></i>
              <div style="display: flex; flex-direction: column;">
                <span style="font-weight: 600; color: var(--text-100);">${e.nombre}</span>
                <span style="font-size: 0.75rem; color: var(--text-300);">${e.descripcion}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="indicator-link-badge" title="${ind ? ind.nombre : ''}">${indCode}</span>
          </td>
          <td style="font-size: 0.8rem; color: var(--text-300); font-weight: 500;">
            ${e.tamano}
          </td>
          <td style="font-size: 0.8rem; color: var(--text-300);">
            ${e.subidoPor}
          </td>
          <td style="font-size: 0.8rem; color: var(--text-300);">
            ${formattedDate}
          </td>
          <td>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <a href="${e.onedriveUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.35rem 0.5rem; font-size: 0.75rem;" title="Abrir en OneDrive">
                <i data-lucide="external-link" style="width: 14px; height: 14px; color: #0078d4;"></i>
              </a>
              ${isEditable ? `
                <button class="btn btn-danger btn-delete-evidence" data-id="${e.id}" style="padding: 0.35rem 0.5rem; font-size: 0.75rem;" title="Eliminar Evidencia">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                </button>
              ` : ""}
            </div>
          </td>
        </tr>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();

    // Eliminar evidencias
    if (isEditable) {
      const deleteButtons = tableBody.querySelectorAll(".btn-delete-evidence");
      deleteButtons.forEach(btn => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          const evi = evidencias.find(e => e.id === id);
          if (confirm(`¿Está seguro de eliminar la evidencia "${evi.nombre}"? Esto recalculará el avance del indicador en el semáforo.`)) {
            await db.deleteEvidencia(id);
            // Recargar datos
            const updated = await db.getEvidencias();
            evidencias.length = 0;
            evidencias.push(...updated);
            drawEvidenciasTable();
          }
        };
      });
    }
  };

  // Dibujar UI base
  const isEditable = userRole === "admin" || userRole === "editor";
  container.innerHTML = `
    <div class="page-content">
      
      <!-- Fila Superior Acciones y Filtros -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-300);">Filtrar por Indicador:</span>
          <select id="select-filter-indicator" class="input-control" style="font-size: 0.8rem; padding: 0.4rem 2rem 0.4rem 0.75rem; background-color: var(--bg-dark-900);">
            <option value="todos">Todos los indicadores</option>
            ${indicadores.map(i => `<option value="${i.id}">${i.codigo} - ${i.nombre.substring(0, 35)}...</option>`).join("")}
          </select>
        </div>
        
        ${isEditable ? `
          <button class="btn btn-success" id="btn-add-evidence">
            <i data-lucide="upload-cloud"></i>
            <span>Vincular Evidencia</span>
          </button>
        ` : ""}
      </div>

      <!-- Tabla de Evidencias -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <div class="table-container">
          <table class="evidencias-table">
            <thead>
              <tr>
                <th style="width: 40%;">Archivo / Descripción</th>
                <th style="width: 15%;">Indicador</th>
                <th style="width: 10%;">Tamaño</th>
                <th style="width: 15%;">Registrado Por</th>
                <th style="width: 12%;">Fecha Subida</th>
                <th style="width: 8%;">Acciones</th>
              </tr>
            </thead>
            <tbody id="evidencias-table-body">
              <!-- Carga dinámica por JS -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal Portal -->
      <div id="evidence-modal-portal"></div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Escuchar Filtro
  const filterSelect = container.querySelector("#select-filter-indicator");
  filterSelect.onchange = (e) => {
    activeFilter = e.target.value;
    drawEvidenciasTable();
  };

  // Render inicial de tabla
  drawEvidenciasTable();

  // Botón Agregar Evidencia
  if (isEditable) {
    const btnAdd = container.querySelector("#btn-add-evidence");
    btnAdd.onclick = () => {
      const portal = container.querySelector("#evidence-modal-portal");
      portal.innerHTML = `
        <div class="modal-overlay" id="evidence-form-modal">
          <div class="modal-wrapper" style="max-width: 500px;">
            <div class="modal-header">
              <h3 class="modal-title">Subir y Vincular Evidencia</h3>
              <button class="modal-close" id="evidence-form-close"><i data-lucide="x"></i></button>
            </div>
            
            <form id="evidence-editor-form">
              <div class="modal-body">
                <div class="form-group">
                  <label for="e-nombre">Nombre de la Evidencia</label>
                  <input type="text" id="e-nombre" class="input-control" placeholder="Ej. Sílabos Firmados de Ciclo I" required>
                </div>
                
                <div class="form-group">
                  <label for="e-descripcion">Descripción Corta</label>
                  <input type="text" id="e-descripcion" class="input-control" placeholder="Ej. Evidencia de cumplimiento del estándar..." required>
                </div>

                <div class="form-group">
                  <label for="e-indicador">Asociar a Indicador de Calidad</label>
                  <select id="e-indicador" class="input-control" required>
                    <option value="" disabled selected>Seleccione un indicador...</option>
                    ${indicadores.map(i => `<option value="${i.id}">${i.codigo} - ${i.nombre}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group" style="margin-top: 0.5rem;">
                  <label>Seleccionar Archivo de OneDrive Institucional</label>
                  
                  <div class="onedrive-selector-panel" id="evidence-picker-trigger">
                    <i data-lucide="cloud" class="onedrive-picker-icon" style="width: 42px; height: 42px;"></i>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-200);">Conectar con Microsoft OneDrive</span>
                      <span style="font-size: 0.7rem; color: var(--text-400);">Haga clic para abrir el selector de archivos oficial</span>
                    </div>
                  </div>
                  
                  <div id="selected-file-display" style="display: none; margin-top: 0.75rem;">
                    <div class="onedrive-file-card">
                      <i data-lucide="file-check" class="onedrive-file-icon" style="width: 24px; height: 24px; color: var(--color-cumple);"></i>
                      <div class="onedrive-file-info">
                        <span class="onedrive-file-name" id="picked-file-name">archivo.pdf</span>
                        <span class="onedrive-file-meta" id="picked-file-meta">3.2 MB</span>
                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="e-onedrive-url" required>
                  <input type="hidden" id="e-onedrive-id" required>
                  <input type="hidden" id="e-formato" required>
                  <input type="hidden" id="e-tamano" required>
                </div>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="evidence-form-cancel">Cancelar</button>
                <button type="submit" class="btn btn-primary" id="evidence-submit-btn" disabled>Registrar Evidencia</button>
              </div>
            </form>
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();

      const modal = portal.querySelector("#evidence-form-modal");
      const closeBtn = portal.querySelector("#evidence-form-close");
      const cancelBtn = portal.querySelector("#evidence-form-cancel");
      const eForm = portal.querySelector("#evidence-editor-form");
      const pickerTrigger = portal.querySelector("#evidence-picker-trigger");
      const fileDisplay = portal.querySelector("#selected-file-display");
      const submitBtn = portal.querySelector("#evidence-submit-btn");

      const closeModal = () => {
        portal.innerHTML = "";
      };

      closeBtn.onclick = closeModal;
      cancelBtn.onclick = closeModal;

      pickerTrigger.onclick = async () => {
        const file = await onedrive.openFilePicker({
          title: "Vincular Evidencia Digital"
        });

        if (file) {
          portal.querySelector("#e-onedrive-url").value = file.url;
          portal.querySelector("#e-onedrive-id").value = file.id;
          portal.querySelector("#e-formato").value = file.tipo;
          portal.querySelector("#e-tamano").value = file.tamano;

          portal.querySelector("#picked-file-name").innerText = file.nombre;
          portal.querySelector("#picked-file-meta").innerText = `OneDrive • ${file.tamano}`;
          
          pickerTrigger.style.display = "none";
          fileDisplay.style.display = "block";
          submitBtn.removeAttribute("disabled");
          
          if (window.lucide) window.lucide.createIcons();
        }
      };

      eForm.onsubmit = async (e) => {
        e.preventDefault();

        // Determinar quién lo sube según el rol activo de simulación
        const userSession = JSON.parse(localStorage.getItem("sigeca_current_user"));
        const username = userSession ? userSession.nombre : "Administrador";

        const evidenciaData = {
          nombre: portal.querySelector("#e-nombre").value,
          descripcion: portal.querySelector("#e-descripcion").value,
          indicadorId: portal.querySelector("#e-indicador").value,
          onedriveUrl: portal.querySelector("#e-onedrive-url").value,
          onedriveFileId: portal.querySelector("#e-onedrive-id").value,
          tamano: portal.querySelector("#e-tamano").value,
          formato: portal.querySelector("#e-formato").value,
          subidoPor: username
        };

        await db.saveEvidencia(evidenciaData);
        
        // Recargar datos locales
        const updated = await db.getEvidencias();
        evidencias.length = 0;
        evidencias.push(...updated);

        closeModal();
        drawEvidenciasTable();
        alert("Evidencia vinculada correctamente. El semáforo de calidad se ha actualizado.");
      };
    };
  }
}
