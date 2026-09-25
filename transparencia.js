/* ==========================================================================
   SIGECA - PÁGINA DE TRANSPARENCIA (art. 11 Ley Universitaria 30220)
   ========================================================================== */
import { db } from "../services/db.js?v=20260720.1";

export async function renderTransparenciaPage(container, userRole = "admin") {
  // Mostrar un indicador de carga mientras cargamos los datos
  container.innerHTML = `
    <div class="page-content" style="display: flex; justify-content: center; align-items: center; min-height: 50vh;">
      <div class="loader-container">
        <div class="loader" style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.05); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 1rem;">Cargando datos de transparencia...</p>
      </div>
    </div>
  `;

  // Cargar datos desde la base de datos local
  const transparenciaData = await db.getTransparencia();
  const corteData = transparenciaData.corte || [];
  const historialData = transparenciaData.historial || [];

  // Permisos: Solo Administrador y Colaboradores pueden agregar/editar enlaces al informe
  const roleNorm = String(userRole || "").toLowerCase().trim();
  const canLinkInforme = roleNorm === "admin" || roleNorm === "administrador" || roleNorm === "colaborador" || roleNorm === "editor";

  // Detectar dinámicamente la fila de cabecera y el índice de la columna de Estado
  let headerRowIdx = -1;
  for (let r = 0; r < corteData.length; r++) {
    const row = corteData[r] || [];
    const hasItemCol = row.some(cell => cell && (String(cell).toLowerCase().includes("item") || String(cell).toLowerCase().includes("itém") || String(cell).toLowerCase().includes("it\u00e9m")));
    const hasArtCol = row.some(cell => cell && String(cell).toLowerCase().includes("art"));
    if (hasItemCol && hasArtCol) {
      headerRowIdx = r;
      break;
    }
  }
  if (headerRowIdx === -1) {
    headerRowIdx = 3; // valor de respaldo
  }

  const headerRow = corteData[headerRowIdx] || [];
  let estadoColIdx = -1;
  for (let c = 0; c < headerRow.length; c++) {
    if (headerRow[c] && headerRow[c].toString().toLowerCase().includes("estado")) {
      estadoColIdx = c;
      break;
    }
  }

  const hasEstadoCol = (estadoColIdx !== -1);
  const semesterIdx = 7;
  const obtainedIdx = hasEstadoCol ? 9 : 8;
  const secObtainedIdx = hasEstadoCol ? 10 : 9;
  const secPercentIdx = hasEstadoCol ? 11 : 10;

  // 1. Procesar Ítems y agrupar por inciso
  const items = [];
  let currentInciso = "";

  for (let i = headerRowIdx + 1; i < corteData.length; i++) {
    const row = corteData[i];
    if (!row || row.length < 9) continue;

    // Si tiene un valor en el inciso (columna 1), lo actualizamos
    if (row[1] && String(row[1]).trim() !== "") {
      currentInciso = String(row[1]).trim();
    }

    const itemName = row[2] ? String(row[2]).trim() : "";
    const subClassification = row[3] ? String(row[3]).trim() : "";
    const subItemName = row[4] ? String(row[4]).trim() : "";

    // Evitar añadir filas de totales o consideraciones
    const nameUpper = itemName.toUpperCase();
    if (nameUpper.includes("CONSIDERACIONES") || nameUpper.includes("ITEMS") || nameUpper.includes("TOTAL")) {
      continue;
    }

    // El nombre real del ítem a mostrar
    let displayName = itemName;
    if (subClassification || subItemName) {
      displayName = `${itemName} - ${subClassification} (${subItemName})`.replace(/^ - /, "").trim();
    }

    const maxPtsStr = row[5] ? String(row[5]).trim() : "";
    const maxPts = parseFloat(maxPtsStr);

    const obtainedPtsStr = row[obtainedIdx] ? String(row[obtainedIdx]).trim() : "";
    const obtainedPts = parseFloat(obtainedPtsStr);

    const semester = row[semesterIdx] ? String(row[semesterIdx]).trim() : "";
    
    // Obtener estado si existe en la fila
    const itemEstado = hasEstadoCol && row[estadoColIdx] ? String(row[estadoColIdx]).trim() : "";

    // Si maxPts es un número válido y tiene un nombre, es un ítem evaluado
    if (!isNaN(maxPts) && (itemName !== "" || subItemName !== "")) {
      items.push({
        inciso: currentInciso || "Otros Requisitos",
        name: displayName || subItemName || itemName,
        maxPoints: maxPts,
        obtainedPoints: isNaN(obtainedPts) ? 0 : obtainedPts,
        semester: semester,
        estado: itemEstado,
        // Deducir cumple basándose en el estado o en el puntaje
        cumple: itemEstado ? (itemEstado.toLowerCase() === "vigente" || itemEstado.toLowerCase() === "actualizado") : (!isNaN(obtainedPts) && obtainedPts === maxPts && maxPts > 0)
      });
    }
  }

  // Agrupar ítems por inciso
  const incisosMap = {};
  items.forEach(item => {
    if (!incisosMap[item.inciso]) {
      incisosMap[item.inciso] = {
        name: item.inciso,
        items: [],
        maxPoints: 0,
        obtainedPoints: 0
      };
    }
    incisosMap[item.inciso].items.push(item);
    incisosMap[item.inciso].maxPoints += item.maxPoints;
    incisosMap[item.inciso].obtainedPoints += item.obtainedPoints;
  });

  const listIncisos = Object.values(incisosMap);

  // Calcular totales globales exactamente a partir del Excel
  let totalMax = 89.648;
  let totalObtained = 86.61376;
  let compliancePct = 95.82;

  // Intentar buscar la fila de totales en la hoja de Excel
  const totalRow = corteData.find(row => 
    row && 
    row.length >= 11 && 
    (
      (row[2] && (String(row[2]).trim().toUpperCase() === "TOTAL" || String(row[2]).trim().toUpperCase() === "TOTAL GENERAL")) ||
      (row[1] === "" && row[2] === "" && row[5] !== "" && !isNaN(parseFloat(row[5])) && row[6] !== "" && parseFloat(row[5]) === parseFloat(row[6]) && row[secObtainedIdx] !== "" && !isNaN(parseFloat(row[secObtainedIdx])))
    )
  );

  if (totalRow) {
    totalMax = parseFloat(totalRow[5]);
    totalObtained = parseFloat(totalRow[secObtainedIdx]);
    compliancePct = Math.round(parseFloat(totalRow[secPercentIdx]) * 100) / 100;
  } else {
    // Si no se encuentra, calcular la media de los porcentajes de los incisos
    let sumPcts = 0;
    listIncisos.forEach(inc => {
      const incPct = inc.maxPoints > 0 ? (inc.obtainedPoints / inc.maxPoints) * 100 : 0;
      sumPcts += incPct;
    });
    compliancePct = listIncisos.length > 0 ? Math.round((sumPcts / listIncisos.length) * 100) / 100 : 0;
    
    totalMax = 0;
    totalObtained = 0;
    listIncisos.forEach(inc => {
      totalMax += inc.maxPoints;
      totalObtained += inc.obtainedPoints;
    });
  }

  // Estado de alerta
  let alertStatus = "SIN DATOS";
  let alertStatusClass = "nocumple";
  let alertBadgeStyle = "";
  let alertIconBg = "rgba(16,185,129,0.05)";
  let alertIconColor = "var(--color-cumple)";

  if (compliancePct === 100) {
    alertStatus = "PERFECTO";
    alertStatusClass = "cumple";
    alertBadgeStyle = "background-color: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3);";
    alertIconBg = "rgba(34,197,94,0.08)";
    alertIconColor = "#22c55e";
  } else if (compliancePct >= 90) {
    alertStatus = "ÓPTIMO";
    alertStatusClass = "cumple";
    alertBadgeStyle = "background-color: rgba(20,184,166,0.15); color: #14b8a6; border: 1px solid rgba(20,184,166,0.3);";
    alertIconBg = "rgba(20,184,166,0.08)";
    alertIconColor = "#14b8a6";
  } else if (compliancePct >= 70) {
    alertStatus = "EN PROCESO";
    alertStatusClass = "proceso";
    alertBadgeStyle = "background-color: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3);";
    alertIconBg = "rgba(234,179,8,0.08)";
    alertIconColor = "#eab308";
  } else if (compliancePct > 0) {
    alertStatus = "DEFICIENTE";
    alertStatusClass = "nocumple";
  }

  // Buscar fecha de corte y semestre dinámicamente de la primera fila del reporte (fila 0 de corteData)
  let currentSemester = "2026-I";
  let corteDateLabel = "18/07/2026";
  if (corteData[0] && corteData[0].length >= 5) {
    const rawSem = corteData[0][2] ? corteData[0][2].toString().replace(".0", "") : "";
    if (rawSem) {
      currentSemester = rawSem.replace(/1$/, "-I").replace(/2$/, "-II");
    }
    const rawDate = corteData[0][4] ? corteData[0][4].toString().split(" ")[0] : "";
    if (rawDate) {
      const parts = rawDate.split("-");
      if (parts.length === 3) {
        corteDateLabel = `${parts[2]}/${parts[1]}/${parts[0]}`;
      } else {
        corteDateLabel = rawDate;
      }
    }
  }

  // Procesar Historial exclusivamente a partir de la pestaña HISTORIAL
  const historySeries = [];
  if (historialData && historialData.length > 1) {
    for (let h = 1; h < historialData.length; h++) {
      const hRow = historialData[h];
      if (hRow && hRow.length >= 15) {
        const firstColStr = String(hRow[0] || "").toLowerCase().trim();
        const secondColStr = String(hRow[1] || "").toLowerCase().trim();

        // Descartar filas de encabezados de la tabla Excel
        if (firstColStr.includes("fecha") || firstColStr.includes("corte") || secondColStr.includes("semestre") || secondColStr.includes("etiqueta")) {
          continue;
        }

        const rawPct = parseFloat(hRow[14]);
        if (isNaN(rawPct)) continue;

        // Formatear semestre quitando decimales y mapeando sufijos
        const hSem = hRow[1] ? hRow[1].toString().replace(".0", "").replace(/1$/, "-I").replace(/2$/, "-II") : "";
        
        // Obtener fecha limpia
        let hDate = "18/07/2026";
        const rawHDate = hRow[0] ? hRow[0].toString().split(" ")[0] : "";
        if (rawHDate) {
          const parts = rawHDate.split("-");
          hDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : rawHDate;
        }

        // Detectar enlace al informe PDF en columnas adicionales (Col 16 en adelante), propiedades o diccionario de informes
        let informeLink = "";
        for (let colIdx = 15; colIdx < hRow.length; colIdx++) {
          const valStr = String(hRow[colIdx] || "").trim();
          if (valStr.startsWith("http://") || valStr.startsWith("https://")) {
            informeLink = valStr;
            break;
          }
        }
        if (!informeLink && hRow.informe) informeLink = String(hRow.informe).trim();
        if (!informeLink && hRow.link) informeLink = String(hRow.link).trim();

        const informesDict = transparenciaData.informes || {};
        if (!informeLink && informesDict[hSem]) informeLink = String(informesDict[hSem]).trim();
        if (!informeLink && informesDict[hDate]) informeLink = String(informesDict[hDate]).trim();
        if (!informeLink && hRow[0] && informesDict[String(hRow[0])]) informeLink = String(informesDict[String(hRow[0])]).trim();
        if (!informeLink && hRow[1] && informesDict[String(hRow[1])]) informeLink = String(informesDict[String(hRow[1])]).trim();

        historySeries.push({
          semestre: hSem,
          fecha: hRow[2] && hRow[2].includes("/") ? hRow[2].split(" ")[0] : hDate,
          pct: rawPct <= 1.0 ? rawPct * 100 : rawPct,
          informe: informeLink,
          rowIndex: h
        });
      }
    }
  }

  // Si el historial estuviese vacío, agregar el corte actual de forma segura
  if (historySeries.length === 0) {
    historySeries.push({
      semestre: currentSemester,
      fecha: corteDateLabel,
      pct: compliancePct,
      informe: "",
      rowIndex: 1
    });
  }

  // Renderizar la estructura del Dashboard
  container.innerHTML = `
    <div class="page-content">
      
      <!-- Fila superior de título y estado -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px; margin: 0;">
            <i data-lucide="eye" style="color: var(--accent-light); width: 24px; height: 24px;"></i>
            <span>Portal de Transparencia (art. 11)</span>
          </h3>
          <p style="color: var(--text-300); font-size: 0.85rem; margin-top: 4px; margin-bottom: 0;">
            Monitoreo y nivel de cumplimiento de las obligaciones de información de la Ley Universitaria N° 30220.
          </p>
        </div>
        <div class="db-status-badge" style="background-color: var(--bg-dark-900); border-color: var(--border-color); color: var(--text-200); padding: 0.4rem 0.75rem;">
          <i data-lucide="calendar" style="width: 14px; height: 14px; color: var(--accent-light);"></i>
          <span>Corte Evaluado: <strong>${corteDateLabel}</strong> (Semestre ${currentSemester})</span>
        </div>
      </div>

      <!-- Cuadrícula de Tarjetas de Indicadores Principales (KPIs) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
        
        <!-- KPI 1: Avance Global -->
        <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin: 0;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">Avance General</span>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--accent-light); margin-top: 0.25rem;">${compliancePct}%</div>
            <p style="font-size: 0.75rem; color: var(--text-300); margin-top: 4px; margin-bottom: 0;">Puntaje: ${totalObtained.toFixed(3)} / ${totalMax.toFixed(3)} pts</p>
          </div>
          <div style="background-color: rgba(59,130,246,0.05); color: var(--accent); padding: 0.75rem; border-radius: 12px; border: 1px solid rgba(59,130,246,0.1);">
            <i data-lucide="award" style="width: 28px; height: 28px;"></i>
          </div>
        </div>

        <!-- KPI 2: Estado de Alerta -->
        <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin: 0;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">Estado de Alerta</span>
            <div style="margin-top: 0.4rem;">
              <span class="badge-status ${alertStatusClass}" style="font-size: 0.85rem; padding: 0.35rem 0.75rem; font-weight: 700; ${alertBadgeStyle}">${alertStatus}</span>
            </div>
            <p style="font-size: 0.7rem; color: var(--text-300); margin-top: 6px; margin-bottom: 0; line-height: 1.3;">Cumple estándares SUNEDU</p>
            
            <!-- Leyenda del Semáforo -->
            <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px; font-size: 0.72rem; font-weight: 700; color: var(--text-300);">
              <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: #22c55e; flex-shrink: 0;"></span>100% Perfecto</div>
              <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: #14b8a6; flex-shrink: 0;"></span>&ge;90% Óptimo</div>
              <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: #eab308; flex-shrink: 0;"></span>&ge;70% En Proceso</div>
              <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--color-nocumple); flex-shrink: 0;"></span>&lt;70% Deficiente</div>
            </div>
          </div>
          <div style="background-color: ${alertIconBg}; color: ${alertIconColor}; padding: 0.75rem; border-radius: 12px; border: 1px solid rgba(16,185,129,0.1); flex-shrink: 0;">
            <i data-lucide="shield-alert" style="width: 28px; height: 28px;"></i>
          </div>
        </div>

        <!-- KPI 3: Total Ítems Evaluados -->
        <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin: 0;">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">Ítems Evaluados</span>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-100); margin-top: 0.25rem;">${items.length}</div>
            <p style="font-size: 0.75rem; color: var(--text-300); margin-top: 4px; margin-bottom: 0;">
              Vigentes: <strong style="color: var(--color-cumple);">${items.filter(i => i.cumple).length}</strong> | 
              No Vigentes: <strong style="color: var(--color-nocumple);">${items.filter(i => !i.cumple).length}</strong>
            </p>
          </div>
          <div style="background-color: rgba(139,92,246,0.05); color: #8b5cf6; padding: 0.75rem; border-radius: 12px; border: 1px solid rgba(139,92,246,0.1);">
            <i data-lucide="list-checks" style="width: 28px; height: 28px;"></i>
          </div>
        </div>

      </div>

      <!-- Fila de Gráficos y Tendencias -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
        
        <!-- Tarjeta de Gráfico de Tendencia Histórica -->
        <div class="card" style="padding: 1.5rem; margin: 0; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="trending-up" style="color: var(--accent-light);"></i>
              <span>Historial de Evaluaciones y Tendencias</span>
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-300); margin-bottom: 1.5rem;">
              Evolución del porcentaje de cumplimiento general registrado en los cortes de supervisión.
            </p>
          </div>
          
          <!-- Contenedor del Gráfico SVG -->
          <div style="background-color: var(--bg-dark-900); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${renderHistoryTrendChart(historySeries)}
          </div>
        </div>

        <!-- Tarjeta de Tabla Histórica -->
        <div class="card" style="padding: 1.5rem; margin: 0; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="history" style="color: var(--accent-light);"></i>
              <span>Registros Guardados en Historial</span>
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-300); margin-bottom: 1rem;">
              Histórico de auditoría del portal de transparencia institucional de la Universidad.
            </p>
          </div>

          <div style="overflow-x: auto; flex-grow: 1;">
            <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.8rem; width: 100%; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color); border-collapse: collapse;">
              <thead>
                <tr style="background-color: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border-color);">
                  <th style="padding: 0.65rem; text-align: left; color: var(--text-200);">Semestre</th>
                  <th style="padding: 0.65rem; text-align: center; color: var(--text-200);">Fecha de Corte</th>
                  <th style="padding: 0.65rem; text-align: right; color: var(--text-200);">Avance</th>
                  <th style="padding: 0.65rem; text-align: center; color: var(--text-200);">Estado</th>
                  <th style="padding: 0.65rem; text-align: center; color: var(--text-200);">Informe</th>
                </tr>
              </thead>
              <tbody>
                ${historySeries.slice().reverse().map(h => {
                  const hPct = h.pct;
                  const hStatusClass = hPct >= 90 ? "cumple" : hPct >= 70 ? "proceso" : "nocumple";
                  const hStatusText = hPct >= 90 ? "Óptimo" : hPct >= 70 ? "Proceso" : "Deficiente";
                  const hasInforme = h.informe && (h.informe.startsWith("http://") || h.informe.startsWith("https://"));

                  return `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                      <td style="padding: 0.65rem; font-weight: 600; color: var(--text-100);">${h.semestre}</td>
                      <td style="padding: 0.65rem; text-align: center; color: var(--text-300);">${h.fecha}</td>
                      <td style="padding: 0.65rem; text-align: right; font-weight: 700; color: var(--accent-light);">${h.pct.toFixed(2)}%</td>
                      <td style="padding: 0.65rem; text-align: center;">
                        <span class="badge-status ${hStatusClass}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${hStatusText}</span>
                      </td>
                      <td style="padding: 0.65rem; text-align: center;">
                        ${hasInforme ? `
                          <div style="display: inline-flex; align-items: center; gap: 4px;">
                            <a href="${h.informe}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" title="Ver Informe PDF" style="padding: 0.2rem 0.55rem; font-size: 0.72rem; border-radius: 6px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                              <i data-lucide="file-text" style="width: 13px; height: 13px;"></i> Informe
                            </a>
                            ${canLinkInforme ? `
                              <button class="btn btn-sm btn-edit-informe-art11" data-row="${h.rowIndex}" title="Editar enlace del informe PDF" style="padding: 0.2rem 0.4rem; font-size: 0.7rem; border-radius: 4px; background: rgba(255,255,255,0.04); color: var(--text-350); border: 1px solid var(--border-color); cursor: pointer;">
                                <i data-lucide="edit-2" style="width: 11px; height: 11px;"></i>
                              </button>
                            ` : ''}
                          </div>
                        ` : (canLinkInforme ? `
                          <button class="btn btn-sm btn-edit-informe-art11" data-row="${h.rowIndex}" title="Agregar enlace al informe PDF" style="padding: 0.22rem 0.6rem; font-size: 0.72rem; border-radius: 6px; background: rgba(59,130,246,0.1); color: var(--accent-light); border: 1px dashed var(--accent); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; transition: all 0.2s;">
                            <i data-lucide="link" style="width: 12px; height: 12px;"></i> + Enlazar Informe
                          </button>
                        ` : `
                          <span style="color: var(--text-400); font-size: 0.75rem;">--</span>
                        `)}
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Sección de Desglose por Incisos y Checklist Detallado -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="check-square" style="color: var(--accent-light);"></i>
          <span>Cumplimiento por Inciso del Artículo 11</span>
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 1.5rem;">
          Haga clic en cualquier inciso para desplegar los documentos y evidencias específicas de cumplimiento correspondientes.
        </p>

        <!-- Lista de Acordeones -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${listIncisos.map((inc, index) => {
            const incPct = inc.maxPoints > 0 ? (inc.obtainedPoints / inc.maxPoints) * 100 : 0;
            const incPctText = incPct.toFixed(1);
            const isFull = incPct >= 100;
            const progressColor = isFull ? "var(--color-cumple)" : incPct >= 70 ? "var(--color-proceso)" : "var(--color-nocumple)";
            
            // Título corto o abreviado del inciso
            const rawTitle = inc.name;
            const titleMatch = rawTitle.match(/^(11\.\d+|Penúltimo parrafo)\.?\s*(.*)/i);
            const numLabel = titleMatch ? titleMatch[1] : `Inciso ${index + 1}`;
            const descLabel = titleMatch ? titleMatch[2] : rawTitle;

            return `
              <div style="border: 1px solid var(--border-color); border-radius: 8px; background-color: rgba(255,255,255,0.01); overflow: hidden;">
                <!-- Encabezado de Acordeón -->
                <div class="accordion-header" data-target="inc-collapse-${index}" style="padding: 1.1rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; transition: background-color 0.2s;">
                  <div style="flex-grow: 1; margin-right: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; background-color: var(--bg-dark-900); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--accent-light); border: 1px solid var(--border-color);">${numLabel}</span>
                      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin: 0; line-height: 1.4;">${descLabel}</h4>
                    </div>
                    
                    <!-- Barra de Progreso del Inciso -->
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 0.6rem;">
                      <div style="flex-grow: 1; height: 6px; background-color: var(--bg-dark-900); border-radius: 3px; overflow: hidden; border: 1px solid rgba(255,255,255,0.02);">
                        <div style="width: ${incPct}%; background-color: ${progressColor}; height: 100%; border-radius: 3px; transition: width 0.3s ease;"></div>
                      </div>
                      <span style="font-size: 0.8rem; font-weight: 700; color: ${progressColor}; min-width: 45px; text-align: right;">${incPctText}%</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
                    <i data-lucide="chevron-down" class="chevron-icon" id="chevron-inc-collapse-${index}" style="color: var(--text-300); transition: transform 0.2s;"></i>
                  </div>
                </div>

                <!-- Detalle del Acordeón -->
                <div id="inc-collapse-${index}" style="display: none; border-top: 1px solid var(--border-color); background-color: rgba(0,0,0,0.15); padding: 1.25rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    
                    <!-- Cabecera de sub-tabla -->
                    <div style="display: grid; grid-template-columns: 2.5fr 1.2fr 100px 100px; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">
                      <div>Requisito de Transparencia (Item)</div>
                      <div style="text-align: center;">Última Actualización</div>
                      <div style="text-align: right;">Puntaje (Obt/Max)</div>
                      <div style="text-align: center;">Estado</div>
                    </div>

                    <!-- Listado de ítems dentro del inciso -->
                    ${inc.items.map(item => {
                      const itemText = item.estado || (item.cumple ? "Vigente" : "Vencido");
                      let itemClass = "nocumple";
                      if (item.estado) {
                        const estLower = item.estado.toLowerCase();
                        if (estLower === "vigente" || estLower === "actualizado") {
                          itemClass = "cumple";
                        } else if (estLower === "por actualizar" || estLower === "en proceso") {
                          itemClass = "proceso";
                        } else {
                          itemClass = "nocumple";
                        }
                      } else {
                        itemClass = item.cumple ? "cumple" : "nocumple";
                      }
                      
                      const itemSemester = item.semester ? item.semester.replace(".0", "").replace(/1$/, "-I").replace(/2$/, "-II") : "No registrado";
                      
                      return `
                        <div style="display: grid; grid-template-columns: 2.5fr 1.2fr 100px 100px; gap: 1rem; align-items: center; font-size: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 0.5rem; padding-top: 0.25rem;">
                          <div style="color: var(--text-200); line-height: 1.4;">${item.name}</div>
                          <div style="text-align: center; color: var(--text-300); font-weight: 600;">${itemSemester}</div>
                          <div style="text-align: right; font-weight: 700; color: var(--text-100);">${item.obtainedPoints.toFixed(3)} <span style="color: var(--text-400); font-weight: 400; font-size: 0.75rem;">/ ${item.maxPoints.toFixed(3)}</span></div>
                          <div style="text-align: center;">
                            <span class="badge-status ${itemClass}" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; font-weight: 700;">${itemText}</span>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

    </div>
  `;

  // Inicializar íconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Registrar eventos para los acordeones
  const headers = container.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const targetId = header.getAttribute("data-target");
      const targetCollapse = container.querySelector(`#${targetId}`);
      const chevron = container.querySelector(`#chevron-${targetId}`);
      
      if (targetCollapse) {
        const isHidden = targetCollapse.style.display === "none";
        if (isHidden) {
          targetCollapse.style.display = "block";
          if (chevron) chevron.style.transform = "rotate(180deg)";
          header.style.backgroundColor = "rgba(255,255,255,0.03)";
        } else {
          targetCollapse.style.display = "none";
          if (chevron) chevron.style.transform = "rotate(0deg)";
          header.style.backgroundColor = "transparent";
        }
      }
    });
  });

  // Registrar eventos para edición/creación de enlaces a informes PDF en Art. 11
  const editBtns = container.querySelectorAll(".btn-edit-informe-art11");
  editBtns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const rIdx = parseInt(btn.getAttribute("data-row"), 10);
      const inputUrl = prompt("Ingrese la URL del Informe en PDF para este registro del Historial (Art. 11):");
      if (inputUrl !== null && inputUrl.trim() !== "") {
        let cleanUrl = inputUrl.trim();
        if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
          cleanUrl = "https://" + cleanUrl;
        }
        if (!transparenciaData.historial) transparenciaData.historial = [];
        if (!transparenciaData.historial[rIdx]) transparenciaData.historial[rIdx] = [];
        
        while (transparenciaData.historial[rIdx].length < 16) {
          transparenciaData.historial[rIdx].push(null);
        }
        transparenciaData.historial[rIdx][15] = cleanUrl;

        // Guardar también en diccionario persistente por semestre y fecha
        if (!transparenciaData.informes) transparenciaData.informes = {};
        const hRow = transparenciaData.historial[rIdx];
        if (hRow) {
          if (hRow[0]) transparenciaData.informes[String(hRow[0])] = cleanUrl;
          if (hRow[1]) transparenciaData.informes[String(hRow[1])] = cleanUrl;
          if (hRow[2]) transparenciaData.informes[String(hRow[2])] = cleanUrl;
        }

        await db.saveTransparencia(transparenciaData);
        renderTransparenciaPage(container, userRole);
      }
    });
  });

  // Registrar sincronización automática multi-navegador en tiempo real
  const handleDbSyncUpdate = async () => {
    console.log("[TRANSPARENCIA SYNC] Recibido evento de base de datos actualizada. Redibujando...");
    renderTransparenciaPage(container, userRole);
  };
  window.addEventListener("sigeca_db_updated", handleDbSyncUpdate);

  if (window._cleanupTransparenciaSync) {
    window.removeEventListener("sigeca_db_updated", window._cleanupTransparenciaSync);
  }
  window._cleanupTransparenciaSync = handleDbSyncUpdate;
}

// Función auxiliar para renderizar el gráfico SVG de tendencia histórica
function renderHistoryTrendChart(series) {
  if (!series || series.length === 0) return `<span style="color: var(--text-400);">Sin datos</span>`;

  const width = 450;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Encontrar valores mínimos y máximos de cumplimiento para escalar
  let minPct = 80; // Forzamos base en 80% para ver la diferencia de crecimiento
  let maxPct = 100;

  // Puntos del gráfico
  const points = series.map((data, index) => {
    const divisor = series.length > 1 ? series.length - 1 : 1;
    const x = paddingLeft + (series.length > 1 ? (index / divisor) * chartWidth : chartWidth / 2);
    const y = paddingTop + chartHeight - ((data.pct - minPct) / (maxPct - minPct)) * chartHeight;
    return { x, y, val: data.pct, label: data.semestre };
  });

  // Generar cadena del path SVG
  const pathD = series.length > 1 ? points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ") : "";
  const areaD = series.length > 1 ? `${pathD} L ${points[points.length-1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z` : "";

  return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
      <!-- Definiciones de Gradiente -->
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Líneas de Guía de Eje Y (80%, 90%, 100%) -->
      ${[80, 90, 100].map(val => {
        const y = paddingTop + chartHeight - ((val - minPct) / (maxPct - minPct)) * chartHeight;
        return `
          <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="rgba(255,255,255,0.04)" stroke-dasharray="3,3" />
          <text x="${paddingLeft - 8}" y="${y + 4}" fill="var(--text-400)" font-size="9" font-weight="600" text-anchor="end">${val}%</text>
        `;
      }).join("")}

      <!-- Gráfico de Área Degradada -->
      <path d="${areaD}" fill="url(#trendGradient)" />

      <!-- Línea del Gráfico (Trend Line) -->
      <path d="${pathD}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Puntos y Etiquetas -->
      ${points.map((p, idx) => {
        return `
          <!-- Punto de Datos -->
          <circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--bg-dark-900)" stroke="var(--accent-light)" stroke-width="2.5" />
          
          <!-- Valor porcentual encima del punto -->
          <text x="${p.x}" y="${p.y - 10}" fill="var(--text-100)" font-size="9.5" font-weight="700" text-anchor="middle">${p.val.toFixed(2)}%</text>
          
          <!-- Eje X (Etiqueta de Semestre) -->
          <text x="${p.x}" y="${paddingTop + chartHeight + 20}" fill="var(--text-300)" font-size="10" font-weight="700" text-anchor="middle">${p.label}</text>
        `;
      }).join("")}

      <!-- Eje X Base -->
      <line x1="${paddingLeft}" y1="${paddingTop + chartHeight}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    </svg>
  `;
}
