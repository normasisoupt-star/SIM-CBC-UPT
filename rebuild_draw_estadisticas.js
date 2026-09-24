const fs = require('fs');

const evidPath = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/pages/evidencias.js';
let content = fs.readFileSync(evidPath, 'utf8');

const targetStr = `        <!-- Contenido de la Subpestaña Activa -->
        <div id="stats-sub-tab-content" style="display: flex; flex-direction: column; width: 100%; min-height: 40vh;"></div>
      case "ingresantes": rawList = estadisticasInst.ingresantes || []; break;`;

const replacementStr = `        <!-- Contenido de la Subpestaña Activa -->
        <div id="stats-sub-tab-content" style="display: flex; flex-direction: column; width: 100%; min-height: 40vh;"></div>
      </div>
    \`;

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
      case "ingresantes": rawList = estadisticasInst.ingresantes || []; break;`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(evidPath, content, 'utf8');
  console.log('rebuild_draw_estadisticas applied successfully!');
} else {
  console.log('Target string not found in evidencias.js');
}
