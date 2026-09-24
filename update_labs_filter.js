import fs from 'fs';

const file = 'C:/Users/GECA/.gemini/antigravity/scratch/sigeca/pages/evidencias.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Update _labFilters initial state
content = content.replace(
  "let _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas' };",
  "let _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas', uso: 'todos' };"
);

// 2. Update render() destructured vars and filter logic
const oldFilterCode = `    const search = _labFilters.search.toLowerCase().trim();
    const tipo = _labFilters.tipo;
    const facultad = _labFilters.facultad;
    const carrera = _labFilters.carrera;

    const filtered = LABORATORIOS_DATA.filter(item => {
      if (tipo !== 'todos' && item.tipo !== tipo) return false;
      if (facultad !== 'todas' && item.facultad !== facultad) return false;
      if (carrera !== 'todas' && !item.carreras.includes(carrera)) return false;`;

const newFilterCode = `    const search = _labFilters.search.toLowerCase().trim();
    const tipo = _labFilters.tipo;
    const facultad = _labFilters.facultad;
    const carrera = _labFilters.carrera;
    const uso = _labFilters.uso;

    const filtered = LABORATORIOS_DATA.filter(item => {
      if (tipo !== 'todos' && item.tipo !== tipo) return false;
      if (facultad !== 'todas' && item.facultad !== facultad) return false;
      if (carrera !== 'todas' && !item.carreras.includes(carrera)) return false;

      if (uso !== 'todos') {
        if (uso === 'compartido') {
          if (item.total < 2) return false;
        } else {
          const targetCount = parseInt(uso, 10);
          if (item.total !== targetCount) return false;
        }
      }`;

content = content.replace(oldFilterCode, newFilterCode);

// 3. Add Uso por Carreras select input to HTML template
const oldSelectCode = `          <div style="flex: 2; min-width: 220px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Carrera Profesional</span>
            <select id="lab-filter-carrera" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" \${_labFilters.carrera === 'todas' ? 'selected' : ''}>Todas las Carreras (\${carrerasList.length})</option>
              \${carrerasList.map(c => \`<option value="\${c}" \${_labFilters.carrera === c ? 'selected' : ''}>\${c}</option>\`).join('')}
            </select>
          </div>`;

const newSelectCode = `          <div style="flex: 1.5; min-width: 180px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Carrera Profesional</span>
            <select id="lab-filter-carrera" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" \${_labFilters.carrera === 'todas' ? 'selected' : ''}>Todas las Carreras (\${carrerasList.length})</option>
              \${carrerasList.map(c => \`<option value="\${c}" \${_labFilters.carrera === c ? 'selected' : ''}>\${c}</option>\`).join('')}
            </select>
          </div>

          <div style="flex: 1.5; min-width: 180px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Uso por Carreras</span>
            <select id="lab-filter-uso" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todos" \${_labFilters.uso === 'todos' ? 'selected' : ''}>Todas las Cantidades de Uso</option>
              <option value="6" \${_labFilters.uso === '6' ? 'selected' : ''}>Utilizado por 6 Carreras (3)</option>
              <option value="5" \${_labFilters.uso === '5' ? 'selected' : ''}>Utilizado por 5 Carreras (1)</option>
              <option value="4" \${_labFilters.uso === '4' ? 'selected' : ''}>Utilizado por 4 Carreras (5)</option>
              <option value="3" \${_labFilters.uso === '3' ? 'selected' : ''}>Utilizado por 3 Carreras (0)</option>
              <option value="2" \${_labFilters.uso === '2' ? 'selected' : ''}>Utilizado por 2 Carreras (14)</option>
              <option value="1" \${_labFilters.uso === '1' ? 'selected' : ''}>Uso Exclusivo (1 Carrera - 63)</option>
              <option value="compartido" \${_labFilters.uso === 'compartido' ? 'selected' : ''}>Compartidos (>= 2 Carreras - 23)</option>
            </select>
          </div>`;

content = content.replace(oldSelectCode, newSelectCode);

// 4. Update event listeners in JS
const oldEventCode = `    const carSel = container.querySelector('#lab-filter-carrera');
    const btnReset = container.querySelector('#lab-btn-reset');`;

const newEventCode = `    const carSel = container.querySelector('#lab-filter-carrera');
    const usoSel = container.querySelector('#lab-filter-uso');
    const btnReset = container.querySelector('#lab-btn-reset');`;

content = content.replace(oldEventCode, newEventCode);

const oldResetCode = `    if (btnReset) {
      btnReset.onclick = () => {
        _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas' };
        render();
      };
    }`;

const newResetCode = `    if (usoSel) {
      usoSel.onchange = (e) => {
        _labFilters.uso = e.target.value;
        render();
      };
    }
    if (btnReset) {
      btnReset.onclick = () => {
        _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas', uso: 'todos' };
        render();
      };
    }`;

content = content.replace(oldResetCode, newResetCode);

fs.writeFileSync(file, content, 'utf8');
console.log('add_usage_filter.js applied!');
