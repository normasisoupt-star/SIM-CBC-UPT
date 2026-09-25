/* ==========================================================================
   SIGECA - TABLERO DE CONTROL DE INDICADORES DE GESTIÓN (ISO 21001:2025)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";

export async function renderIso21001Page(container, userRole = "admin") {
  // Cargar indicadores de gestión
  let indicators = await db.getTableroIndicadores();

  // Si por alguna razón está vacío, intentar recargar
  if (!indicators || indicators.length === 0) {
    container.innerHTML = `
      <div class="page-content" style="display: flex; justify-content: center; align-items: center; min-height: 50vh;">
        <div style="text-align: center; color: var(--text-300);">
          <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--accent); margin-bottom: 1rem;"></i>
          <p>No se encontraron indicadores de gestión. Por favor, reinicie la base de datos.</p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Obtener rol normalizado para permisos de edición
  const roleNorm = String(userRole || "").toLowerCase().trim();
  const canEdit = roleNorm === "admin" || roleNorm === "administrador" || roleNorm === "colaborador" || roleNorm === "editor" || roleNorm === "director de escuela";

  // Indicador seleccionado
  let activeId = localStorage.getItem("sigeca_active_tablero_indicator") || indicators[0].id;
  let activeIndicator = indicators.find(i => i.id === activeId) || indicators[0];

  // Renderizar maquetación principal (SPA Grid)
  const drawPage = () => {
    // Filtrar datos válidos del histórico para la gráfica
    const validData = (activeIndicator.datos || []).filter(d => d.resultado !== null);
    
    // Obtener último periodo con resultado
    const lastResultPeriod = validData.length > 0 ? validData[validData.length - 1] : null;
    
    // Determinar si cumple la meta
    let meetsMeta = false;
    let formattedResult = "S/D";
    let statusClass = "nocumple";
    let statusText = "Sin Registro";

    if (lastResultPeriod) {
      const resVal = lastResultPeriod.resultado;
      meetsMeta = activeIndicator.id === "ind_15_pe_01" 
        ? resVal <= activeIndicator.meta 
        : resVal >= activeIndicator.meta;

      formattedResult = activeIndicator.tipo === "division"
        ? (resVal * 100).toFixed(2) + "%"
        : resVal.toFixed(2);
        
      statusClass = meetsMeta ? "cumple" : "nocumple";
      statusText = meetsMeta ? "Cumple Meta" : "No Cumple";
    }

    // Formatear meta
    const formattedMeta = activeIndicator.tipo === "division"
      ? (activeIndicator.meta * 100).toFixed(1) + "%"
      : activeIndicator.meta.toFixed(1);

    container.innerHTML = `
      <div class="page-content" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 2px;">
              Seguimiento cuantitativo de metas institucionales, tasas de deserción, aprobación y calidad educativa.
            </p>
          </div>
          <div class="db-status-badge" style="background-color: rgba(167, 139, 250, 0.1); border-color: rgba(167, 139, 250, 0.2); color: #a78bfa;">
            <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i>
            <span>Módulo de Calidad ISO 21001:2025</span>
          </div>
        </div>

        <!-- Layout Grid -->
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; align-items: start; flex-wrap: wrap;">
          
          <!-- Panel Izquierdo: Lista de Indicadores -->
          <div class="card" style="padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; max-height: 80vh; overflow-y: auto; background-color: rgba(15,23,42,0.45);">
            <h3 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-350); font-weight: 700; margin-bottom: 0.5rem; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              Lista de Indicadores (${indicators.length})
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${indicators.map(ind => {
                const isActive = ind.id === activeIndicator.id;
                const isSelectedStyle = isActive 
                  ? "background: linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(139,92,246,0.15) 100%); border-color: #a78bfa; box-shadow: 0 4px 12px rgba(139,92,246,0.1);" 
                  : "background: rgba(255,255,255,0.01); border-color: var(--border-color);";
                return `
                  <div class="indicator-item-card" data-id="${ind.id}" style="padding: 0.85rem 1rem; border: 1px solid; border-radius: 8px; cursor: pointer; transition: all 0.2s; ${isSelectedStyle}">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                      <span style="font-size: 0.7rem; font-weight: 800; color: #a78bfa; font-family: monospace;">${ind.codigo}</span>
                      <span style="font-size: 0.65rem; color: var(--text-400); font-weight: 600; text-transform: uppercase;">${ind.frecuencia}</span>
                    </div>
                    <h4 style="font-size: 0.82rem; font-weight: 600; color: ${isActive ? 'var(--text-100)' : 'var(--text-200)'}; line-height: 1.3;">
                      ${ind.nombre}
                    </h4>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Panel Derecho: Tablero del Indicador Activo -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- Ficha Técnica del Indicador -->
            <div class="card" style="position: relative; overflow: hidden; background: linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.5) 100%); border: 1px solid rgba(255,255,255,0.06);">
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #a78bfa; background-color: rgba(167, 139, 250, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace;">
                      ${activeIndicator.codigo}
                    </span>
                    <span style="font-size: 0.72rem; color: var(--text-350); font-weight: 600;">
                      Área: ${activeIndicator.responsable}
                    </span>
                  </div>
                  <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-100); line-height: 1.25;">
                    ${activeIndicator.nombre}
                  </h2>
                </div>

                <!-- Estado del Último Periodo -->
                <div style="text-align: right; min-width: 140px; display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
                  <span class="badge-status ${statusClass}" style="font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 6px; letter-spacing: 0.25px;">
                    ${statusText.toUpperCase()}
                  </span>
                  <span style="font-size: 0.68rem; color: var(--text-400);">Último: <strong>${lastResultPeriod ? lastResultPeriod.periodo : "S/D"}</strong></span>
                </div>
              </div>

              <!-- Metadatos Grid -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; font-size: 0.8rem; line-height: 1.45;">
                <div>
                  <span style="color: var(--text-400); font-weight: 700; font-size: 0.72rem; text-transform: uppercase;">Objetivo</span>
                  <p style="color: var(--text-200); margin-top: 0.2rem;">${activeIndicator.objetivo}</p>
                </div>
                <div>
                  <span style="color: var(--text-400); font-weight: 700; font-size: 0.72rem; text-transform: uppercase;">Fórmula</span>
                  <p style="color: var(--text-200); margin-top: 0.2rem; font-family: sans-serif; font-style: italic;">${activeIndicator.formula}</p>
                </div>
                <div>
                  <span style="color: var(--text-400); font-weight: 700; font-size: 0.72rem; text-transform: uppercase;">Fuente de Datos</span>
                  <p style="color: var(--text-200); margin-top: 0.2rem;">${activeIndicator.fuente}</p>
                </div>
              </div>
            </div>

            <!-- Gráfica de Tendencia y Tarjetas de Resumen -->
            <div style="display: grid; grid-template-columns: 1fr 280px; gap: 1.5rem; flex-wrap: wrap; align-items: stretch;">
              
              <!-- Gráfica SVG -->
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; background-color: rgba(15,23,42,0.35);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h3 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-300); font-weight: 700;">Gráfico de Tendencia Histórica</h3>
                  <span style="font-size: 0.72rem; color: var(--text-400);">Meta: <strong style="color: var(--accent-light);">${formattedMeta}</strong></span>
                </div>
                
                <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; min-height: 180px;">
                  ${renderTrendChart(activeIndicator, validData)}
                </div>
              </div>

              <!-- Tarjetas de Métricas -->
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="card" style="padding: 1.25rem; text-align: center; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(135deg, rgba(167,139,250,0.06) 0%, rgba(139,92,246,0.04) 100%);">
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-350); font-weight: 700; letter-spacing: 0.5px;">Meta de Gestión</span>
                  <div style="font-size: 2.25rem; font-weight: 800; color: #a78bfa; margin-top: 0.25rem;">${formattedMeta}</div>
                  <span style="font-size: 0.68rem; color: var(--text-400); margin-top: 0.25rem;">Frecuencia: ${activeIndicator.frecuencia}</span>
                </div>

                <div class="card" style="padding: 1.25rem; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-350); font-weight: 700; letter-spacing: 0.5px;">Último Valor</span>
                  <div style="font-size: 2.25rem; font-weight: 800; color: ${meetsMeta ? 'var(--color-cumple)' : 'var(--color-nocumple)'}; margin-top: 0.25rem;">
                    ${formattedResult}
                  </div>
                  <span style="font-size: 0.68rem; color: var(--text-400); margin-top: 0.25rem;">Periodo: ${lastResultPeriod ? lastResultPeriod.periodo : "N/A"}</span>
                </div>
              </div>

            </div>

            <!-- Tabla de Histórico y Control de Edición -->
            <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <div>
                  <h3 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-300); font-weight: 700;">Historial de Registros</h3>
                  <p style="font-size: 0.75rem; color: var(--text-400);">Valores semestrales/anuales correspondientes a las evaluaciones de calidad.</p>
                </div>
                ${canEdit ? `
                  <div class="db-status-badge" style="background-color: rgba(16,185,129,0.06); border-color: rgba(16,185,129,0.2); color: var(--color-cumple); font-size: 0.68rem; padding: 0.2rem 0.5rem; font-weight: 600;">
                    <i data-lucide="check-lock" style="width: 12px; height: 12px;"></i>
                    <span>Modo Edición Habilitado</span>
                  </div>
                ` : `
                  <div class="db-status-badge" style="background-color: rgba(255,255,255,0.03); border-color: var(--border-color); color: var(--text-400); font-size: 0.68rem; padding: 0.2rem 0.5rem;">
                    <i data-lucide="lock" style="width: 12px; height: 12px;"></i>
                    <span>Solo Lectura</span>
                  </div>
                `}
              </div>

              <!-- Histórico Table -->
              <div style="overflow-x: auto; width: 100%; border: 1px solid var(--border-color); border-radius: 8px;">
                <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.8rem; width: 100%; border-collapse: collapse; text-align: left;">
                  <thead>
                    <tr style="border-bottom: 1px solid var(--border-color); background-color: rgba(255,255,255,0.02);">
                      <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700; width: 15%;">Periodo</th>
                      ${activeIndicator.tipo === "division" ? `
                        <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700;">Numerador</th>
                        <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700;">Denominador</th>
                      ` : `
                        <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700;">Valor Registrado</th>
                      `}
                      <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700; width: 18%;">Resultado</th>
                      <th style="padding: 0.75rem; color: var(--text-300); font-weight: 700; width: 18%;">Estado</th>
                      ${canEdit ? `<th style="padding: 0.75rem; color: var(--text-300); font-weight: 700; text-align: center; width: 12%;">Acción</th>` : ""}
                    </tr>
                  </thead>
                  <tbody>
                    ${(activeIndicator.datos || []).map((row, idx) => {
                      const isNull = row.resultado === null || row.resultado === undefined;
                      
                      let resStyleVal = "S/D";
                      let meetsRow = false;
                      let badgeClass = "proceso";
                      let badgeText = "Sin datos";

                      if (!isNull) {
                        resStyleVal = activeIndicator.tipo === "division"
                          ? (row.resultado * 100).toFixed(2) + "%"
                          : row.resultado.toFixed(2);
                          
                        meetsRow = activeIndicator.id === "ind_15_pe_01"
                          ? row.resultado <= activeIndicator.meta
                          : row.resultado >= activeIndicator.meta;
                          
                        badgeClass = meetsRow ? "cumple" : "nocumple";
                        badgeText = meetsRow ? "Cumple" : "No Cumple";
                      }

                      return `
                        <tr style="border-bottom: 1px solid var(--border-color); transition: background-color 0.15s;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.015)'" onmouseout="this.style.backgroundColor='transparent'">
                          <td style="padding: 0.75rem; font-weight: 600; font-family: monospace;">${row.periodo}</td>
                          ${activeIndicator.tipo === "division" ? `
                            <td style="padding: 0.75rem; color: var(--text-200);">${isNull ? "-" : row.numerador}</td>
                            <td style="padding: 0.75rem; color: var(--text-200);">${isNull ? "-" : row.denominador}</td>
                          ` : `
                            <td style="padding: 0.75rem; color: var(--text-200);">${isNull ? "-" : row.valor}</td>
                          `}
                          <td style="padding: 0.75rem; font-weight: 700; color: ${isNull ? 'var(--text-400)' : (meetsRow ? 'var(--color-cumple)' : 'var(--color-nocumple)')};">
                            ${resStyleVal}
                          </td>
                          <td style="padding: 0.75rem;">
                            <span class="badge-status ${badgeClass}" style="font-size: 0.65rem; padding: 0.15rem 0.5rem; border-radius: 4px;">
                              ${badgeText}
                            </span>
                          </td>
                          ${canEdit ? `
                            <td style="padding: 0.75rem; text-align: center;">
                              <button class="btn btn-secondary btn-edit-period-data" data-index="${idx}" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">
                                <i data-lucide="edit-3" style="width: 12px; height: 12px; margin-right: 2px;"></i>
                                Editar
                              </button>
                            </td>
                          ` : ""}
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;

    // Activar iconos de Lucide
    if (window.lucide) window.lucide.createIcons();

    // Registrar manejadores de clic para seleccionar indicadores de gestión
    const itemCards = container.querySelectorAll(".indicator-item-card");
    itemCards.forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute("data-id");
        localStorage.setItem("sigeca_active_tablero_indicator", id);
        activeId = id;
        activeIndicator = indicators.find(i => i.id === id);
        drawPage();
      };
    });

    // Registrar manejadores para editar celdas históricas del periodo
    const editBtns = container.querySelectorAll(".btn-edit-period-data");
    editBtns.forEach(btn => {
      btn.onclick = () => {
        const rowIdx = parseInt(btn.getAttribute("data-index"), 10);
        openEditPeriodModal(rowIdx);
      };
    });
  };

  // Función para renderizar el gráfico SVG de tendencia
  const renderTrendChart = (indicator, validData) => {
    if (!validData || validData.length === 0) {
      return `<span style="color: var(--text-400); font-size: 0.8rem;">Sin datos históricos ingresados</span>`;
    }

    const width = 500;
    const height = 180;
    const paddingLeft = 45;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Obtener valores de X e Y
    const results = validData.map(d => d.resultado);
    const metaVal = indicator.meta;
    
    let maxVal = Math.max(...results, metaVal);
    let minVal = 0; // Base cero para mejor lectura

    if (maxVal === 0) maxVal = 1.0;
    
    // Dar un 15% de margen superior
    maxVal = maxVal * 1.15;

    // Generar coordenadas de puntos del gráfico
    const points = validData.map((d, index) => {
      const divisor = validData.length > 1 ? validData.length - 1 : 1;
      const x = paddingLeft + (validData.length > 1 ? (index / divisor) * chartWidth : chartWidth / 2);
      const y = paddingTop + chartHeight - ((d.resultado - minVal) / (maxVal - minVal)) * chartHeight;
      
      const lblVal = indicator.tipo === "division" 
        ? (d.resultado * 100).toFixed(1) + "%" 
        : d.resultado.toFixed(2);

      return { x, y, label: d.periodo, valText: lblVal };
    });

    // Línea de la Meta (Horizontal line)
    const yMeta = paddingTop + chartHeight - ((metaVal - minVal) / (maxVal - minVal)) * chartHeight;
    const metaDashedLine = `
      <line x1="${paddingLeft}" y1="${yMeta}" x2="${width - paddingRight}" y2="${yMeta}" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,4" />
      <text x="${width - paddingRight}" y="${yMeta - 6}" fill="#a78bfa" font-size="8" font-weight="700" text-anchor="end">META (${indicator.tipo === "division" ? (metaVal * 100) + "%" : metaVal})</text>
    `;

    // Path de tendencia
    const pathD = validData.length > 1 
      ? points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ") 
      : "";
      
    const areaD = validData.length > 1 
      ? `${pathD} L ${points[points.length-1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z` 
      : "";

    // Eje X marcas
    const xTicks = points.map(p => `
      <text x="${p.x}" y="${paddingTop + chartHeight + 16}" fill="var(--text-400)" font-size="8" font-weight="600" text-anchor="middle" font-family="monospace">${p.label}</text>
      <circle cx="${p.x}" cy="${paddingTop + chartHeight}" r="2.5" fill="rgba(255,255,255,0.1)" />
    `).join("");

    // Eje Y marcas
    const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map(fraction => {
      const val = minVal + fraction * (maxVal - minVal);
      const y = paddingTop + chartHeight - fraction * chartHeight;
      const formattedLabel = indicator.tipo === "division"
        ? (val * 100).toFixed(0) + "%"
        : val.toFixed(1);
      return `
        <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="rgba(255,255,255,0.03)" />
        <text x="${paddingLeft - 8}" y="${y + 3}" fill="var(--text-400)" font-size="8" font-weight="600" text-anchor="end">${formattedLabel}</text>
      `;
    }).join("");

    return `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
        <defs>
          <linearGradient id="tableroGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Eje Y y Eje X base -->
        <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${paddingTop + chartHeight}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
        <line x1="${paddingLeft}" y1="${paddingTop + chartHeight}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight}" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

        <!-- Ticks y Gridlines -->
        ${yTicks}
        ${xTicks}

        <!-- Línea de Meta -->
        ${metaDashedLine}

        <!-- Gráfico de Área Degradada -->
        ${validData.length > 1 ? `<path d="${areaD}" fill="url(#tableroGradient)" />` : ""}

        <!-- Línea del Gráfico (Trend Line) -->
        ${validData.length > 1 ? `<path d="${pathD}" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />` : ""}

        <!-- Puntos y Etiquetas Flotantes -->
        ${points.map((p, idx) => {
          // Determinar color de punto según cumplimiento individual
          const dVal = validData[idx].resultado;
          const complies = indicator.id === "ind_15_pe_01" ? dVal <= metaVal : dVal >= metaVal;
          const circleColor = complies ? "var(--color-cumple)" : "var(--color-nocumple)";
          
          return `
            <g class="chart-point-group" style="cursor: pointer;">
              <circle cx="${p.x}" cy="${p.y}" r="4" fill="${circleColor}" stroke="#0f172a" stroke-width="1.5" />
              <text x="${p.x}" y="${p.y - 10}" fill="var(--text-100)" font-size="8" font-weight="700" text-anchor="middle" style="background-color: var(--bg-dark-950); padding: 2px;">
                ${p.valText}
              </text>
            </g>
          `;
        }).join("")}

      </svg>
    `;
  };

  // Función para abrir el modal de edición de datos de periodo
  const openEditPeriodModal = (rowIdx) => {
    const portal = document.querySelector("#portal-root") || document.createElement("div");
    if (!portal.id) {
      portal.id = "portal-root";
      document.body.appendChild(portal);
    }

    const rowData = activeIndicator.datos[rowIdx];
    
    // Generar inputs específicos para división o valor único
    let fieldsHtml = "";
    if (activeIndicator.tipo === "division") {
      fieldsHtml = `
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div class="form-group">
            <label for="m-numerador" style="font-size: 0.8rem; font-weight: 700; color: var(--text-200); margin-bottom: 0.25rem; display: block;">
              Numerador (Ej. Docentes Capacitados, Alumnos Desertores)
            </label>
            <input type="number" id="m-numerador" class="input-control" style="width: 100%;" min="0" placeholder="Ingrese el numerador" value="${rowData.numerador !== null ? rowData.numerador : ''}" required>
          </div>
          <div class="form-group">
            <label for="m-denominador" style="font-size: 0.8rem; font-weight: 700; color: var(--text-200); margin-bottom: 0.25rem; display: block;">
              Denominador (Total General de Docentes o Alumnos del Periodo)
            </label>
            <input type="number" id="m-denominador" class="input-control" style="width: 100%;" min="1" placeholder="Ingrese el denominador" value="${rowData.denominador !== null ? rowData.denominador : ''}" required>
          </div>
        </div>
      `;
    } else {
      fieldsHtml = `
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div class="form-group">
            <label for="m-valor" style="font-size: 0.8rem; font-weight: 700; color: var(--text-200); margin-bottom: 0.25rem; display: block;">
              Valor del Indicador (Puntaje o Escala)
            </label>
            <input type="number" step="0.01" id="m-valor" class="input-control" style="width: 100%;" placeholder="Ingrese el valor obtenido" value="${rowData.valor !== null ? rowData.valor : ''}" required>
          </div>
        </div>
      `;
    }

    portal.innerHTML = `
      <div class="modal-backdrop" id="modal-indicator-edit-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
        <div class="modal-container" style="background-color: var(--bg-dark-900); border: 1px solid var(--border-color); border-radius: var(--radius-lg); width: 100%; max-width: 480px; box-shadow: var(--shadow-2xl); display: flex; flex-direction: column; overflow: hidden; animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
          
          <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-100);">Editar Periodo - ${rowData.periodo}</h3>
              <p style="font-size: 0.72rem; color: var(--text-400); margin-top: 2px;">${activeIndicator.codigo} - ${activeIndicator.nombre}</p>
            </div>
            <button class="modal-close-btn" id="m-btn-close" style="background: none; border: none; color: var(--text-400); cursor: pointer;">
              <i data-lucide="x" style="width: 18px; height: 18px;"></i>
            </button>
          </div>

          <form id="indicator-period-form" style="margin: 0; display: flex; flex-direction: column; height: 100%;">
            <div class="modal-body" style="padding: 1.5rem; flex-grow: 1;">
              <div style="background-color: rgba(255,255,255,0.015); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem 1rem; font-size: 0.75rem; color: var(--text-300);">
                <strong>Objetivo de Medición:</strong><br>${activeIndicator.objetivo}
              </div>
              
              ${fieldsHtml}
            </div>

            <div class="modal-footer" style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 0.75rem; background-color: rgba(255,255,255,0.01);">
              <button type="button" class="btn btn-secondary" id="m-btn-cancel" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-radius: 6px;">Cancelar</button>
              <button type="submit" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.8rem; border-radius: 6px;">Guardar Cambios</button>
            </div>
          </form>

        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => {
      portal.innerHTML = "";
    };

    document.getElementById("m-btn-close").onclick = closeModal;
    document.getElementById("m-btn-cancel").onclick = closeModal;

    const form = document.getElementById("indicator-period-form");
    form.onsubmit = async (e) => {
      e.preventDefault();

      if (activeIndicator.tipo === "division") {
        const num = parseFloat(document.getElementById("m-numerador").value);
        const den = parseFloat(document.getElementById("m-denominador").value);
        
        if (den === 0) {
          alert("El denominador no puede ser cero.");
          return;
        }

        rowData.numerador = num;
        rowData.denominador = den;
        rowData.resultado = Math.round((num / den) * 10000) / 10000; // Guardar base decimal redondeada
      } else {
        const val = parseFloat(document.getElementById("m-valor").value);
        rowData.valor = val;
        rowData.resultado = val;
      }

      // Guardar el indicador actualizado en el servicio de base de datos
      await db.saveTableroIndicador(activeIndicator);
      
      // Recargar lista y redibujar
      indicators = await db.getTableroIndicadores();
      activeIndicator = indicators.find(i => i.id === activeId);
      
      closeModal();
      drawPage();
    };
  };

  // Dibujar la página en el contenedor por primera vez
  drawPage();
}
