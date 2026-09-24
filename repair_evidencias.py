import re

filepath = r'C:\Users\GECA\.gemini\antigravity\scratch\sigeca\pages\evidencias.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

target = content[content.find("const drawEstadisticas = () => {"):content.find("    if (rawList.length > 0 && rawList[0].rows !== undefined) {")]

replacement = '''const drawEstadisticas = () => {
    const statsContent = container.querySelector("#cbc-tab-estadisticas-content");
    if (!statsContent) return;

    const isEditable = userRole === "Administrador" || userRole === "Colaborador";

    // 1. Renderizar Barra de Navegación de Subpestañas
    statsContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
        <!-- Selector de Subpestañas -->
        <div class="stats-sub-tabs" style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; overflow-x: auto; width: 100%;">
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'alumnos' ? 'active' : ''}" data-subtab="alumnos" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'alumnos' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="graduation-cap" style="width: 16px; height: 16px;"></i>
            <span>Alumnos Regulares</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'docentes' ? 'active' : ''}" data-subtab="docentes" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'docentes' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="users" style="width: 16px; height: 16px;"></i>
            <span>Docentes Universidad</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'renacyt' ? 'active' : ''}" data-subtab="renacyt" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'renacyt' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="award" style="width: 16px; height: 16px;"></i>
            <span>Docentes Renacyt</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'postulantes' ? 'active' : ''}" data-subtab="postulantes" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'postulantes' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="user-plus" style="width: 16px; height: 16px;"></i>
            <span>Postulantes</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'ingresantes' ? 'active' : ''}" data-subtab="ingresantes" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'ingresantes' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="user-check" style="width: 16px; height: 16px;"></i>
            <span>Ingresantes</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'egresados' ? 'active' : ''}" data-subtab="egresados" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'egresados' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="graduation-cap" style="width: 16px; height: 16px;"></i>
            <span>Egresados</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'laboratorios' ? 'active' : ''}" data-subtab="laboratorios" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'laboratorios' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="flask-conical" style="width: 16px; height: 16px;"></i>
            <span>Laboratorios y Talleres</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn ${activeStatsSubTab === 'servicios' ? 'active' : ''}" data-subtab="servicios" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; ${activeStatsSubTab === 'servicios' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="concierge-bell" style="width: 16px; height: 16px;"></i>
            <span>Servicios Complementarios</span>
          </button>
        </div>

        <!-- Contenido de la Subpestaña Activa -->
        <div id="stats-sub-tab-content" style="display: flex; flex-direction: column; width: 100%; min-height: 40vh;"></div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    statsContent.querySelectorAll(".sub-tab-btn").forEach(btn => {
      btn.onclick = () => {
        activeStatsSubTab = btn.getAttribute("data-subtab");
        forceShowImporter = false;
        drawEstadisticas();
      };
    });

    const subTabContent = statsContent.querySelector("#stats-sub-tab-content");
    if (!subTabContent) return;

    if (activeStatsSubTab === "laboratorios") {
      drawLaboratoriosDashboard(subTabContent);
      return;
    }

    let importEntry = null;
    let hasData = false;

    let rawList = [];
    switch (activeStatsSubTab) {
      case "alumnos": rawList = normalizeAlumnosList(estadisticasInst.alumnos_regulares || []); break;
      case "docentes": rawList = estadisticasInst.docentes || []; break;
      case "renacyt": rawList = estadisticasInst.docentes_renacyt || []; break;
      case "postulantes": rawList = estadisticasInst.postulantes || []; break;
      case "ingresantes": rawList = estadisticasInst.ingresantes || []; break;
      case "egresados": rawList = estadisticasInst.egresados || []; break;
      case "servicios": rawList = estadisticasInst.servicios_complementarios || []; break;
    }

'''

new_content = content.replace(target, replacement)
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("repair_evidencias.py executed successfully!")
