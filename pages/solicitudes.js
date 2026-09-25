/* ==========================================================================
   SIGECA - PÁGINA DE SOLICITUDES DE ACCESO A ÁREAS (Solo Profesional Estándar)
   ========================================================================== */

import { db } from "../services/db.js?v=20260623.5";

export async function renderSolicitudesPage(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="content-header" style="margin-bottom: 2rem;">
      <div>
        <h1 class="page-title" style="font-size: 1.75rem; font-weight: 800; color: var(--text-100);">Solicitar Acceso a Áreas</h1>
        <p class="page-subtitle" style="font-size: 0.875rem; color: var(--text-300);">Consulte sus permisos y solicite acceso de solo lectura a otras áreas académicas de la institución.</p>
      </div>
    </div>

    <div id="solicitudes-loader" class="loader-container" style="height: 150px;">
      <div class="loader"></div>
    </div>

    <div id="solicitudes-content" style="display: none; display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="card">
        <h2 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="shield" style="color: var(--accent-light);"></i>
          <span>Estado de Acceso Académico</span>
        </h2>
        
        <p style="font-size: 0.9rem; color: var(--text-300); margin-bottom: 1.5rem; line-height: 1.5;">
          Como Profesional de Área, usted tiene acceso de lectura únicamente a las áreas académicas autorizadas por el Administrador. 
          Si requiere consultar información de otras áreas, puede solicitar la habilitación correspondiente a continuación.
        </p>

        <div style="display: flex; flex-direction: column; gap: 1rem;" id="areas-list-container"></div>
      </div>
    </div>
  `;

  // Renderizar íconos de Lucide iniciales
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const areasList = ["Licenciamiento"];

  async function loadSolicitudesData() {
    const loader = document.getElementById("solicitudes-loader");
    const content = document.getElementById("solicitudes-content");
    if (loader) loader.style.display = "flex";
    if (content) content.style.display = "none";

    try {
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (!currentUser) return;

      // Volver a consultar de base de datos para estar sincronizado
      const users = await db.getUsers();
      const dbUser = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      
      if (!dbUser) return;

      // Actualizar sesión local por si cambió en segundo plano
      currentUser.areas = dbUser.areas;
      currentUser.solicitudes = dbUser.solicitudes || [];
      localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));

      const containerList = document.getElementById("areas-list-container");
      containerList.innerHTML = areasList.map(area => {
        const hasAccess = dbUser.areas && dbUser.areas.includes(area);
        const hasPendingRequest = dbUser.solicitudes && dbUser.solicitudes.includes(area);

        let statusText = "";
        let statusBadgeClass = "";
        let actionButton = "";
        let iconName = "lock";

        if (hasAccess) {
          statusText = "Acceso Habilitado";
          statusBadgeClass = "cumple";
          iconName = "unlock";
          actionButton = `
            <span style="font-size: 0.85rem; color: var(--color-cumple); font-weight: 600; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
              <span>Tiene visualización activa</span>
            </span>
          `;
        } else if (hasPendingRequest) {
          statusText = "Solicitud Pendiente";
          statusBadgeClass = "proceso";
          iconName = "clock";
          actionButton = `
            <span style="font-size: 0.85rem; color: var(--color-proceso); font-weight: 600; display: flex; align-items: center; gap: 4px;">
              <i data-lucide="help-circle" style="width: 16px; height: 16px;"></i>
              <span>En espera de aprobación</span>
            </span>
          `;
        } else {
          statusText = "Sin Acceso";
          statusBadgeClass = "nocumple";
          iconName = "lock";
          actionButton = `
            <button class="btn btn-primary btn-solicitar" data-area="${area}" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
              <i data-lucide="key" style="width: 14px; height: 14px;"></i>
              <span>Solicitar Acceso</span>
            </button>
          `;
        }

        return `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-dark-900); transition: all var(--transition-fast);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background-color: var(--bg-dark-700); border: 1px solid var(--border-color); color: ${hasAccess ? "var(--color-cumple)" : (hasPendingRequest ? "var(--color-proceso)" : "var(--color-nocumple)")};">
                <i data-lucide="${iconName}"></i>
              </div>
              <div>
                <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">${area}</h3>
                <span class="badge-status ${statusBadgeClass}" style="margin-top: 4px; padding: 0.15rem 0.5rem; font-size: 0.65rem;">${statusText}</span>
              </div>
            </div>
            <div>
              ${actionButton}
            </div>
          </div>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Configurar eventos
      containerList.querySelectorAll(".btn-solicitar").forEach(btn => {
        btn.onclick = async () => {
          const area = btn.getAttribute("data-area");
          try {
            await db.requestAreaAccess(currentUser.email, area);
            alert(`Solicitud enviada con éxito para el área "${area}".`);
            await loadSolicitudesData();
          } catch (e) {
            alert(e.message);
          }
        };
      });

      if (loader) loader.style.display = "none";
      if (content) content.style.display = "flex";

    } catch (e) {
      console.error(e);
      alert("Error al cargar estado de accesos.");
    }
  }

  await loadSolicitudesData();
}
