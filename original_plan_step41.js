/* ==========================================================================
   SIGECA - PÁGINA PLAN DE ESTUDIOS (Estructura y Gestión)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";
import { onedrive } from "../services/onedrive.js?v=20260623.5";

export async function renderPlanPage(container, userRole = "admin") {
  let planInfo = await db.getPlanInfo();
  
  const isEditable = userRole === "admin" || userRole === "editor";

  const drawPage = () => {
    container.innerHTML = `
      <div class="page-content">
        
        <!-- Encabezado -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 2px;">
              Gestión del Plan de Estudios oficial del programa académico. Vinculado a Microsoft Word en OneDrive.
            </p>
          </div>
          
          <div style="display: flex; gap: 0.75rem;">
            <a href="${planInfo.documentoWordUrl}" target="_blank" class="btn btn-secondary" style="background-color: #0b0f19;">
              <i data-lucide="external-link" style="color: #0078d4;"></i>
              <span>Editar en Word Online</span>
            </a>
            
            ${isEditable ? `
              <button class="btn btn-primary" id="btn-save-plan">
                <i data-lucide="save"></i>
                <span>Guardar Cambios</span>
              </button>
            ` : ""}
          </div>
        </div>

        <!-- Layout de Columnas -->
        <div class="plan-layout">
          
          <!-- Columna Izquierda: Información Estructurada -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- Resumen y Perfil de Egreso -->
            <div class="card">
              <h3 class="plan-section-title">Información General</h3>
              <div class="form-grid-2" style="margin-bottom: 1.25rem;">
                <div class="form-group">
                  <label>Código del Plan</label>
                  <input type="text" id="p-codigo" class="input-control" value="${planInfo.codigo}" ${!isEditable ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                  <label>Nombre del Plan</label>
                  <input type="text" id="p-nombre" class="input-control" value="${planInfo.nombre}" ${!isEditable ? 'readonly' : ''}>
                </div>
              </div>

              <h3 class="plan-section-title">Perfil del Graduado (Egreso)</h3>
              <div class="form-group">
                <textarea id="p-perfil" class="input-control" rows="6" style="resize: vertical; line-height: 1.6; font-size: 0.925rem;" ${!isEditable ? 'readonly' : ''}>${planInfo.perfilEgreso}</textarea>
              </div>
            </div>

            <!-- Objetivos Educacionales -->
            <div class="card">
              <h3 class="plan-section-title">Objetivos Educacionales del Programa</h3>
              <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 1rem;">
                Logros profesionales que se espera que los graduados alcancen durante los primeros años después de la graduación (Exigido por SUNEDU CBC y SINEACE).
              </p>
              
              <div class="plan-objectives-list">
                <div class="plan-objective-item">
                  <div class="plan-objective-num">1</div>
                  <div class="plan-objective-text">
                    <strong>Competencia Técnica:</strong> Diseñar, implementar y evaluar sistemas de software escalables en la nube que cumplan con estándares internacionales de ciberseguridad e interoperabilidad.
                  </div>
                </div>
                <div class="plan-objective-item">
                  <div class="plan-objective-num">2</div>
                  <div class="plan-objective-text">
                    <strong>Liderazgo y Gestión:</strong> Dirigir equipos de desarrollo de software multidisciplinarios, adoptando metodologías ágiles y alineando los objetivos tecnológicos con la estrategia de la organización.
                  </div>
                </div>
                <div class="plan-objective-item">
                  <div class="plan-objective-num">3</div>
                  <div class="plan-objective-text">
                    <strong>Aprendizaje Continuo:</strong> Mantenerse a la vanguardia de la innovación tecnológica, persiguiendo certificaciones profesionales o estudios de posgrado en ciencia de datos, arquitectura cloud o inteligencia artificial.
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Columna Derecha: Widgets & OneDrive Status -->
          <div class="plan-sidebar-widgets">
            
            <!-- Widget de OneDrive Oficial -->
            <div class="card" style="padding: 1.25rem;">
              <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px;">
                <i data-lucide="cloud" style="color: #0078d4;"></i>
                <span>Documento OneDrive</span>
              </h3>
              <p style="font-size: 0.75rem; color: var(--text-300); margin-bottom: 1rem;">
                El documento base del Plan de Estudios está alojado en OneDrive de forma centralizada.
              </p>
              
              <div class="onedrive-file-card">
                <i data-lucide="file-signature" class="onedrive-file-icon" style="width: 28px; height: 28px;"></i>
                <div class="onedrive-file-info">
                  <span class="onedrive-file-name" title="Plan_Estudios_Sistemas_2026.docx">Plan_Estudios_Sistemas_2026.docx</span>
                  <span class="onedrive-file-meta">Modificado: 15/06/2026</span>
                </div>
              </div>
              
              ${isEditable ? `
                <button class="btn btn-secondary" id="btn-relink-plan-onedrive" style="width: 100%; margin-top: 1rem; font-size: 0.8rem; padding: 0.5rem;">
                  <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
                  <span>Cambiar Archivo Word</span>
                </button>
              ` : ""}
            </div>

            <!-- Historial de Versiones -->
            <div class="card" style="padding: 1.25rem;">
              <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.75rem;">Historial de Versiones</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.8rem;">
                <div style="border-left: 2px solid var(--accent); padding-left: 0.5rem;">
                  <strong style="color: var(--text-100);">Versión 2026 (Activa)</strong>
                  <p style="color: var(--text-400); font-size: 0.75rem;">Aprobada por R.D. 124-2026</p>
                </div>
                <div style="border-left: 2px solid var(--bg-dark-600); padding-left: 0.5rem;">
                  <strong style="color: var(--text-300);">Versión 2022 (Histórica)</strong>
                  <p style="color: var(--text-400); font-size: 0.75rem;">Vigente hasta Dic 2025</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Guardar cambios
    if (isEditable) {
      const btnSave = container.querySelector("#btn-save-plan");
      if (btnSave) {
        btnSave.onclick = async () => {
          btnSave.innerHTML = `<i data-lucide="refresh-cw" class="spin"></i> Guardando...`;
          if (window.lucide) window.lucide.createIcons();

          const updatedInfo = {
            codigo: container.querySelector("#p-codigo").value,
            nombre: container.querySelector("#p-nombre").value,
            perfilEgreso: container.querySelector("#p-perfil").value
          };

          await db.savePlanInfo(updatedInfo);
          planInfo = await db.getPlanInfo();
          
          alert("Los metadatos del Plan de Estudios se han guardado exitosamente en Cloud Firestore.");
          drawPage();
        };
      }

      const btnRelink = container.querySelector("#btn-relink-plan-onedrive");
      if (btnRelink) {
        btnRelink.onclick = async () => {
          const file = await onedrive.openFilePicker({
            title: "Seleccionar Documento del Plan de Estudios Word",
            filterType: "word"
          });
          if (file) {
            await db.savePlanInfo({
              documentoWordUrl: file.url,
              documentoWordId: file.id
            });
            planInfo = await db.getPlanInfo();
            alert(`Plan de Estudios vinculado exitosamente a:\n${file.nombre}`);
            drawPage();
          }
        };
      }
    }
  };

  drawPage();
}
