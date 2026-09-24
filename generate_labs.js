const fs = require('fs');
const labs = require('./data_labs.json');

const dataStr = JSON.stringify(labs);

const jsCode = `
// ==========================================================================
// MATRIZ DE TALLERES Y LABORATORIOS ESPECIALIZADOS (CBC III.7)
// ==========================================================================
const LABORATORIOS_DATA = ${dataStr};

let _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas' };

function drawLaboratoriosDashboard(container) {
  if (!container) return;

  const render = () => {
    const search = _labFilters.search.toLowerCase().trim();
    const tipo = _labFilters.tipo;
    const facultad = _labFilters.facultad;
    const carrera = _labFilters.carrera;

    const filtered = LABORATORIOS_DATA.filter(item => {
      if (tipo !== 'todos' && item.tipo !== tipo) return false;
      if (facultad !== 'todas' && item.facultad !== facultad) return false;
      if (carrera !== 'todas' && !item.carreras.includes(carrera)) return false;

      if (search) {
        const matchName = item.nombre.toLowerCase().includes(search);
        const matchCode = item.codigo.toLowerCase().includes(search);
        const matchUbi = item.ubicacion.toLowerCase().includes(search);
        const matchFac = item.facultad.toLowerCase().includes(search);
        const matchObs = (item.obs || '').toLowerCase().includes(search);
        const matchCarreras = item.carreras.some(c => c.toLowerCase().includes(search));
        if (!matchName && !matchCode && !matchUbi && !matchFac && !matchObs && !matchCarreras) return false;
      }
      return true;
    });

    const totalAmbientes = LABORATORIOS_DATA.length;
    const totalLabs = LABORATORIOS_DATA.filter(x => x.tipo === 'LABORATORIO').length;
    const totalTalleres = LABORATORIOS_DATA.filter(x => x.tipo === 'TALLER').length;

    const facCounts = { FAING: 0, FACSA: 0, FAU: 0, FACEM: 0, FAEDCOH: 0, FADE: 0 };
    LABORATORIOS_DATA.forEach(x => { if (facCounts[x.facultad] !== undefined) facCounts[x.facultad]++; });

    const carrerasList = [
      'INGENIERÍA DE SISTEMAS', 'INGENIERÍA CIVIL', 'INGENIERÍA AGROINDUSTRIAL', 'INGENIERÍA INDUSTRIAL',
      'INGENIERÍA ELECTRÓNICA', 'INGENIERÍA AMBIENTAL', 'INGENIERÍA COMERCIAL', 'CIENCIAS CONTABLES Y FINANCIERAS',
      'ADMINISTRACIÓN DE EMPRESAS', 'ADMINISTRACIÓN TURÍSTICO - HOTELERA', 'ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES',
      'ECONOMÍA', 'EDUCACIÓN INICIAL', 'EDUCACIÓN PRIMARIA', 'EDUCACIÓN FÍSICA Y DEPORTES', 'CIENCIAS DE LA COMUNICACIÓN',
      'PSICOLOGÍA', 'MEDICINA', 'ODONTOLOGÍA', 'TERAPIA Y REHABILITACIÓN', 'LABORATORIO CLÍNICO', 'DERECHO',
      'ARQUITECTURA', 'URBANISMO'
    ];

    container.innerHTML = \`
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
        
        <!-- Header Principal de la Subpestaña -->
        <div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.5rem;">🔬</span>
              <h2 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #38bdf8; letter-spacing: -0.01em;">
                Matriz de Talleres y Laboratorios Especializados (CBC III.7)
              </h2>
            </div>
            <p style="margin: 0.35rem 0 0 0; font-size: 0.88rem; color: var(--text-300);">
              Infraestructura física y equipamiento para la enseñanza e investigación universitaria - UPT
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700; font-size: 0.78rem; padding: 0.4rem 0.8rem; border-radius: 6px;">🟢 86 Ambientes Activos</span>
            <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-weight: 700; font-size: 0.78rem; padding: 0.4rem 0.8rem; border-radius: 6px;">🏛️ 6 Facultades</span>
            <span style="background: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3); font-weight: 700; font-size: 0.78rem; padding: 0.4rem 0.8rem; border-radius: 6px;">🎓 24 Carreras</span>
          </div>
        </div>

        <!-- Dashboard KPI Cards Grid (4 Tarjetas) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          
          <div class="cbc-kpi-card" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1.1rem; border-radius: 10px;">
            <div style="font-size: 0.75rem; color: var(--text-400); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Total de Ambientes</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0.2rem 0;">\${totalAmbientes}</div>
            <div style="font-size: 0.75rem; color: #34d399; font-weight: 600; display: flex; gap: 8px;">
              <span>🔬 \${totalLabs} Labs</span>
              <span>🎨 \${totalTalleres} Talleres</span>
            </div>
          </div>

          <div class="cbc-kpi-card" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1.1rem; border-radius: 10px;">
            <div style="font-size: 0.75rem; color: var(--text-400); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Mayor Infraestructura</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #38bdf8; margin: 0.2rem 0;">FAING</div>
            <div style="font-size: 0.75rem; color: var(--text-300);">40 Ambientes (46.5% del Total)</div>
          </div>

          <div class="cbc-kpi-card" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1.1rem; border-radius: 10px;">
            <div style="font-size: 0.75rem; color: var(--text-400); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Carrera con Más Ambientes</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: #a855f7; margin: 0.2rem 0;">ARQUITECTURA</div>
            <div style="font-size: 0.75rem; color: var(--text-300);">18 Talleres y Laboratorios</div>
          </div>

          <div class="cbc-kpi-card" style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 1.1rem; border-radius: 10px;">
            <div style="font-size: 0.75rem; color: var(--text-400); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Componente SUNEDU</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: #34d399; margin: 0.2rem 0;">CBC III.7</div>
            <div style="font-size: 0.75rem; color: var(--text-300);">Talleres y Laboratorios para la Enseñanza</div>
          </div>

        </div>

        <!-- Distribución por Facultad (Progress Bars Panel) -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1rem 1.25rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-200); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">Distribución de Ambientes por Facultad</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
            \${Object.keys(facCounts).map(fac => {
              const count = facCounts[fac];
              const pct = Math.round((count / totalAmbientes) * 100);
              return \`
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.06); padding: 0.6rem; border-radius: 6px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700;">
                    <span style="color: #38bdf8;">\${fac}</span>
                    <span style="color: #fff;">\${count} (\${pct}%)</span>
                  </div>
                  <div style="background: rgba(0,0,0,0.3); height: 6px; border-radius: 3px; margin-top: 4px; overflow: hidden;">
                    <div style="width: \${pct}%; height: 100%; background: #0284c7;"></div>
                  </div>
                </div>
              \`;
            }).join('')}
          </div>
        </div>

        <!-- Barra de Filtros Interactivos -->
        <div class="cbc-filter-bar" style="display: flex; flex-wrap: wrap; gap: 0.75rem; background: rgba(15, 23, 42, 0.9); padding: 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
          
          <div style="flex: 2; min-width: 220px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Búsqueda Rápida</span>
            <input type="text" id="lab-search-input" class="input-control" placeholder="Buscar por nombre, código SL, ubicación o aula..." value="\${_labFilters.search}" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
          </div>

          <div style="flex: 1; min-width: 130px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Tipo</span>
            <select id="lab-filter-tipo" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todos" \${_labFilters.tipo === 'todos' ? 'selected' : ''}>Todos los Tipos</option>
              <option value="LABORATORIO" \${_labFilters.tipo === 'LABORATORIO' ? 'selected' : ''}>LABORATORIO</option>
              <option value="TALLER" \${_labFilters.tipo === 'TALLER' ? 'selected' : ''}>TALLER</option>
              <option value="S/R" \${_labFilters.tipo === 'S/R' ? 'selected' : ''}>ESPECIAL / OTROS</option>
            </select>
          </div>

          <div style="flex: 1; min-width: 130px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Facultad</span>
            <select id="lab-filter-facultad" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" \${_labFilters.facultad === 'todas' ? 'selected' : ''}>Todas las Facultades</option>
              <option value="FAING" \${_labFilters.facultad === 'FAING' ? 'selected' : ''}>FAING</option>
              <option value="FACSA" \${_labFilters.facultad === 'FACSA' ? 'selected' : ''}>FACSA</option>
              <option value="FAU" \${_labFilters.facultad === 'FAU' ? 'selected' : ''}>FAU</option>
              <option value="FACEM" \${_labFilters.facultad === 'FACEM' ? 'selected' : ''}>FACEM</option>
              <option value="FAEDCOH" \${_labFilters.facultad === 'FAEDCOH' ? 'selected' : ''}>FAEDCOH</option>
              <option value="FADE" \${_labFilters.facultad === 'FADE' ? 'selected' : ''}>FADE</option>
            </select>
          </div>

          <div style="flex: 2; min-width: 220px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Carrera Profesional</span>
            <select id="lab-filter-carrera" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" \${_labFilters.carrera === 'todas' ? 'selected' : ''}>Todas las Carreras (\${carrerasList.length})</option>
              \${carrerasList.map(c => \`<option value="\${c}" \${_labFilters.carrera === c ? 'selected' : ''}>\${c}</option>\`).join('')}
            </select>
          </div>

          <div style="align-self: flex-end;">
            <button id="lab-btn-reset" class="btn btn-secondary" style="padding: 0.5rem 0.8rem; height: 35px; border-radius: 6px;" title="Limpiar Filtros">
              🔄 Reset
            </button>
          </div>

        </div>

        <!-- Resultados y Contador -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-300);">
          <span>Mostrando <strong>\${filtered.length}</strong> de <strong>\${totalAmbientes}</strong> ambientes académicos registrados</span>
        </div>

        <!-- Tabla Matriz General -->
        <div class="cbc-matrix-container" style="background: #0f172a; border: 1px solid #1e293b; border-radius: 10px; overflow: hidden;">
          <div class="cbc-table-scroll" style="max-height: 520px; overflow-y: auto;">
            <table class="cbc-matrix-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
              <thead>
                <tr style="background: #1e293b; color: #38bdf8; text-align: left;">
                  <th style="padding: 0.75rem; width: 45px; text-align: center;">N°</th>
                  <th style="padding: 0.75rem; width: 95px;">Código</th>
                  <th style="padding: 0.75rem; width: 220px;">Denominación del Ambiente</th>
                  <th style="padding: 0.75rem; width: 110px;">Tipo</th>
                  <th style="padding: 0.75rem;">Ubicación Física (Pabellón / Piso / Aula)</th>
                  <th style="padding: 0.75rem; width: 90px; text-align: center;">Facultad</th>
                  <th style="padding: 0.75rem;">Carreras que Utilizan el Ambiente</th>
                  <th style="padding: 0.75rem; width: 60px; text-align: center;">Total</th>
                  <th style="padding: 0.75rem; width: 120px;">Observación</th>
                </tr>
              </thead>
              <tbody>
                \${filtered.length === 0 ? \`
                  <tr>
                    <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-400);">
                      No se encontraron laboratorios o talleres que coincidan con los filtros seleccionados.
                    </td>
                  </tr>
                \` : filtered.map(item => {
                  const isLab = item.tipo === 'LABORATORIO';
                  const isTaller = item.tipo === 'TALLER';
                  const badgeBg = isLab ? 'rgba(16, 185, 129, 0.15)' : isTaller ? 'rgba(168, 85, 247, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                  const badgeColor = isLab ? '#34d399' : isTaller ? '#a855f7' : '#f59e0b';
                  const badgeBorder = isLab ? 'rgba(16, 185, 129, 0.3)' : isTaller ? 'rgba(168, 85, 247, 0.3)' : 'rgba(245, 158, 11, 0.3)';

                  return \`
                    <tr style="border-bottom: 1px solid #1e293b; transition: background 0.15s;" onmouseover="this.style.background='rgba(30, 41, 59, 0.5)'" onmouseout="this.style.background='transparent'">
                      <td style="padding: 0.6rem; text-align: center; font-weight: 700; color: var(--text-400);">\${item.id}</td>
                      <td style="padding: 0.6rem;">
                        <span style="background: rgba(56, 189, 248, 0.1); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 2px 6px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 0.78rem;">
                          \${item.codigo || '-'}
                        </span>
                      </td>
                      <td style="padding: 0.6rem; font-weight: 700; color: #f8fafc;">\${item.nombre}</td>
                      <td style="padding: 0.6rem;">
                        <span style="background: \${badgeBg}; color: \${badgeColor}; border: 1px solid \${badgeBorder}; padding: 2px 7px; border-radius: 4px; font-weight: 700; font-size: 0.73rem;">
                          \${item.tipo}
                        </span>
                      </td>
                      <td style="padding: 0.6rem; color: var(--text-300); font-size: 0.8rem;">\${item.ubicacion || '-'}</td>
                      <td style="padding: 0.6rem; text-align: center;">
                        <span style="background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">
                          \${item.facultad}
                        </span>
                      </td>
                      <td style="padding: 0.6rem;">
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                          \${item.carreras.map(c => \`
                            <span style="background: rgba(51, 65, 85, 0.6); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 3px; font-size: 0.72rem;">
                              \${c}
                            </span>
                          \`).join('')}
                        </div>
                      </td>
                      <td style="padding: 0.6rem; text-align: center; font-weight: 800; color: #38bdf8;">\${item.total}</td>
                      <td style="padding: 0.6rem; color: #f59e0b; font-size: 0.75rem;">\${item.obs || '-'}</td>
                    </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    \`;

    const searchInp = container.querySelector('#lab-search-input');
    const tipoSel = container.querySelector('#lab-filter-tipo');
    const facSel = container.querySelector('#lab-filter-facultad');
    const carSel = container.querySelector('#lab-filter-carrera');
    const btnReset = container.querySelector('#lab-btn-reset');

    if (searchInp) {
      searchInp.oninput = (e) => {
        _labFilters.search = e.target.value;
        render();
      };
    }
    if (tipoSel) {
      tipoSel.onchange = (e) => {
        _labFilters.tipo = e.target.value;
        render();
      };
    }
    if (facSel) {
      facSel.onchange = (e) => {
        _labFilters.facultad = e.target.value;
        render();
      };
    }
    if (carSel) {
      carSel.onchange = (e) => {
        _labFilters.carrera = e.target.value;
        render();
      };
    }
    if (btnReset) {
      btnReset.onclick = () => {
        _labFilters = { search: '', tipo: 'todos', facultad: 'todas', carrera: 'todas' };
        render();
      };
    }
  };

  render();
}
`;

fs.writeFileSync('C:/Users/GECA/.gemini/antigravity/scratch/sigeca/lab_dashboard_code.js', jsCode, 'utf8');
console.log('Script written!');
