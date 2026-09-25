/* ==========================================================================
   SIGECA - PÁGINA DE ISO 9001:2015 (Sistemas de Gestión de la Calidad)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";

export async function renderIso9001Page(container, userRole = "admin") {
  const [indicadores, evidencias] = await Promise.all([
    db.getIndicadores(),
    db.getEvidencias()
  ]);

  const listIndicadores = indicadores || [];
  const isoIndicadores = listIndicadores.filter(i => i && i.tipo === "ISO 9001");
  const promIso = isoIndicadores.length > 0
    ? Math.round(isoIndicadores.reduce((acc, i) => acc + (i.porcentajeAvance || 0), 0) / isoIndicadores.length)
    : 0;

  container.innerHTML = `
    <div class="page-content">
      
      <!-- Fila superior -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 2px;">
            Auditoría interna y externa de la norma internacional ISO 9001:2015 para el aseguramiento de la calidad académica.
          </p>
        </div>
        <div class="db-status-badge" style="background-color: var(--color-proceso-bg); border-color: rgba(245,158,11,0.2); color: var(--color-proceso);">
          <i data-lucide="info" style="width: 14px; height: 14px;"></i>
          <span>Próxima Auditoría Interna: Agosto 2026</span>
        </div>
      </div>

      <!-- Resumen ISO 9001 -->
      <div class="card" style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; background: linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%);">
        <div style="flex-grow: 1;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.5rem;">Aseguramiento de Calidad - ISO 9001:2015</h2>
          <p style="font-size: 0.85rem; color: var(--text-300); max-width: 600px; margin-bottom: 1.25rem;">
            Este módulo rastrea la conformidad en los procesos educativos, la gestión de riesgos académicos, y la medición de la satisfacción del egresado.
          </p>
          <div style="width: 100%; height: 8px; background-color: var(--bg-dark-900); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
            <div style="width: ${promIso}%; height: 100%; background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%); border-radius: 4px;"></div>
          </div>
        </div>
        <div style="text-align: center; background-color: var(--bg-dark-900); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); min-width: 120px;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Progreso</span>
          <div style="font-size: 2.5rem; font-weight: 800; color: #a78bfa;">${promIso}%</div>
        </div>
      </div>

      <!-- Listado de Estándares ISO 9001 -->
      <div class="card">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem;">Requisitos de Calidad ISO 9001</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${isoIndicadores.map(ind => {
            const statusClass = ind.estado === "cumple" ? "cumple" : ind.estado === "en_proceso" ? "proceso" : "nocumple";
            const statusText = ind.estado === "cumple" ? "Cumple" : ind.estado === "en_proceso" ? "En Proceso" : "No Cumple";
            
            // Buscar evidencias asociadas
            const evs = evidencias.filter(e => e.indicadorId === ind.id);

            return `
              <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
                <div style="flex-grow: 1; min-width: 280px;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.75rem; font-weight: 800; color: #a78bfa;">${ind.codigo}</span>
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">${ind.nombre}</h4>
                  </div>
                  <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">${ind.descripcion}</p>
                  
                  <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                    <span>Responsable: <strong>${ind.responsable}</strong></span>
                    <span>Evidencias subidas: <strong>${evs.length}</strong></span>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                  <span class="badge-status ${statusClass}">${statusText}</span>
                  <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">${ind.porcentajeAvance}% avance</div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Sección de ayuda/futuro -->
      <div class="card" style="border-left: 4px solid #7c3aed; padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; background-color: rgba(124,58,237,0.03);">
        <i data-lucide="help-circle" style="color: #a78bfa; flex-shrink: 0; width: 24px; height: 24px;"></i>
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.25rem;">Etapa de Implementación ISO 9001</h4>
          <p style="font-size: 0.85rem; color: var(--text-300); line-height: 1.5;">
            Los procesos de mapeo de riesgos, caracterización de procesos y matrices AMFE académicas para ISO 9001 se configurarán en la siguiente etapa del sistema. Puede enlazar evidencias en formato PDF desde el módulo de evidencias general.
          </p>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
