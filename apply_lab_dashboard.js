const fs = require('fs');

const evidPath = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/pages/evidencias.js';
const labCodePath = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/lab_dashboard_code.js';

let evidContent = fs.readFileSync(evidPath, 'utf8');
const labCode = fs.readFileSync(labCodePath, 'utf8');

// 1. Insert labCode right before const drawEstadisticas = () => {
if (!evidContent.includes('const LABORATORIOS_DATA =')) {
  evidContent = evidContent.replace(
    'const drawEstadisticas = () => {',
    `${labCode}\n\nconst drawEstadisticas = () => {`
  );
}

// 2. Add laboratorios subtab button before servicios complementarios
const oldSubtabBtn = `          <button class="btn btn-secondary sub-tab-btn \${activeStatsSubTab === 'servicios' ? 'active' : ''}" data-subtab="servicios"`;
const newSubtabBtn = `          <button class="btn btn-secondary sub-tab-btn \${activeStatsSubTab === 'laboratorios' ? 'active' : ''}" data-subtab="laboratorios" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; \${activeStatsSubTab === 'laboratorios' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="flask-conical" style="width: 16px; height: 16px;"></i>
            <span>Laboratorios y Talleres</span>
          </button>
          <button class="btn btn-secondary sub-tab-btn \${activeStatsSubTab === 'servicios' ? 'active' : ''}" data-subtab="servicios"`;

if (!evidContent.includes('data-subtab="laboratorios"')) {
  evidContent = evidContent.replace(oldSubtabBtn, newSubtabBtn);
}

// 3. Update isCustomDashboard array and switch logic
evidContent = evidContent.replace(
  '["alumnos", "docentes", "renacyt", "postulantes", "ingresantes", "egresados"].includes(activeStatsSubTab)',
  '["alumnos", "docentes", "renacyt", "postulantes", "ingresantes", "egresados", "laboratorios"].includes(activeStatsSubTab)'
);

evidContent = evidContent.replace(
  'else if (activeStatsSubTab === "egresados") drawEgresadosDashboard(subTabContent);',
  'else if (activeStatsSubTab === "egresados") drawEgresadosDashboard(subTabContent);\n        else if (activeStatsSubTab === "laboratorios") drawLaboratoriosDashboard(subTabContent);'
);

evidContent = evidContent.replace(
  'else if (activeStatsSubTab === "egresados") {\n        drawEgresadosDashboard(subTabContent);\n      }',
  'else if (activeStatsSubTab === "egresados") {\n        drawEgresadosDashboard(subTabContent);\n      } else if (activeStatsSubTab === "laboratorios") {\n        drawLaboratoriosDashboard(subTabContent);\n      }'
);

fs.writeFileSync(evidPath, evidContent, 'utf8');
console.log('evidencias.js successfully updated with Laboratorios y Talleres dashboard!');
