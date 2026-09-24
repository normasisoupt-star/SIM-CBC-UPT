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
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
