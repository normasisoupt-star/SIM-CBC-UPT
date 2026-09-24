const fs = require('fs');

const evidPath = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/pages/evidencias.js';
const labCodePath = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/lab_dashboard_code.js';

let evidContent = fs.readFileSync(evidPath, 'utf8');
const labCode = fs.readFileSync(labCodePath, 'utf8');

// Restore the syntax error section first if broken
const brokenSection = `    statsContent.querySelectorAll(".sub-tab-btn").forEach(btn => {
      btn.onclick = () => {
        activeStatsSubTab = btn.getAttribute("data-subtab");
    switch (activeStatsSubTab) {`;

const fixedSection = `    statsContent.querySelectorAll(".sub-tab-btn").forEach(btn => {
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
    switch (activeStatsSubTab) {`;

if (evidContent.includes(brokenSection)) {
  evidContent = evidContent.replace(brokenSection, fixedSection);
}

// 1. Insert LABORATORIOS_DATA and drawLaboratoriosDashboard before const drawEstadisticas = () => {
if (!evidContent.includes('const LABORATORIOS_DATA =')) {
  evidContent = evidContent.replace(
    'const drawEstadisticas = () => {',
    `${labCode}\n\nconst drawEstadisticas = () => {`
  );
}

// 2. Add laboratorios subtab button before servicios complementarios
const targetBtn = `<button class="btn btn-secondary sub-tab-btn \${activeStatsSubTab === 'servicios' ? 'active' : ''}" data-subtab="servicios"`;
const labBtn = `<button class="btn btn-secondary sub-tab-btn \${activeStatsSubTab === 'laboratorios' ? 'active' : ''}" data-subtab="laboratorios" style="display: flex; align-items: center; gap: 8px; font-size: 1.08rem; padding: 0.5rem 1rem; border-radius: 8px; \${activeStatsSubTab === 'laboratorios' ? 'background: var(--accent); border-color: var(--accent); color: #fff;' : 'background: transparent; border-color: transparent; color: var(--text-300);'} transition: all 0.25s ease;">
            <i data-lucide="flask-conical" style="width: 16px; height: 16px;"></i>
            <span>Laboratorios y Talleres</span>
          </button>\n          `;

if (!evidContent.includes('data-subtab="laboratorios"')) {
  evidContent = evidContent.replace(targetBtn, labBtn + targetBtn);
}

fs.writeFileSync(evidPath, evidContent, 'utf8');
console.log('fix_evidencias.js script executed!');
