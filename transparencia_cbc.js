/* ==========================================================================
   SIGECA - PÁGINA DE TRANSPARENCIA CBC VIII (Condiciones Básicas de Calidad)
   ========================================================================== */
import { db } from "../services/db.js?v=20260720.1";

export async function renderTransparenciaCbcPage(container, userRole = "admin") {
  // Mostrar un indicador de carga mientras cargamos los datos
  container.innerHTML = `
    <div class="page-content" style="display: flex; justify-content: center; align-items: center; min-height: 50vh;">
      <div class="loader-container">
        <div class="loader" style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.05); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 1rem;">Cargando datos de Transparencia CBC VIII...</p>
      </div>
    </div>
  `;

  // Cargar datos desde la base de datos local
  const cbcDataObj = await db.getTransparenciaCbc();
  const corteData = cbcDataObj.corte || [];
  const historialData = cbcDataObj.historial || [];

  // Permisos: Solo Administrador y Colaboradores pueden agregar/editar enlaces al informe
  const roleNorm = String(userRole || "").toLowerCase().trim();
  const canLinkInforme = roleNorm === "admin" || roleNorm === "administrador" || roleNorm === "colaborador" || roleNorm === "editor";

  // 1. Procesar Ítems y agrupar por Indicador
  const items = [];
  let currentIndicator = "";
  let currentCE = "";

  // Buscar dinámicamente la fila de encabezados
  let headerIdx = -1;
  for (let idx = 0; idx < corteData.length; idx++) {
    const r = corteData[idx];
    if (r && r.length > 3 && r[0] && String(r[0]).toUpperCase().includes("CBC")) {
      headerIdx = idx;
      break;
    }
  }

  const startIdx = headerIdx !== -1 ? headerIdx + 1 : 4;

  for (let i = startIdx; i < corteData.length; i++) {
    const row = corteData[i];
    if (!row || row.length < 4) continue;

    const rawInd = row[0] ? String(row[0]).trim() : "";
    if (rawInd !== "" && rawInd.toUpperCase().startsWith("INDICADOR")) {
      currentIndicator = rawInd;
    }

    const ceName = row[1] ? String(row[1]).trim() : "";
    if (ceName !== "") {
      currentCE = ceName;
    }

    const mvName = row[2] ? String(row[2]).trim() : "";

    // Ignorar filas de totales y leyenda
    if (mvName.toUpperCase() === "TOTAL" || ceName.toUpperCase() === "TOTAL" || rawInd.toUpperCase() === "TOTAL" || rawInd.toUpperCase().includes("LEYENDA") || ceName.toUpperCase().includes("LEYENDA")) {
      continue;
    }

    const itemName = mvName !== "" ? mvName : (ceName !== "" ? ceName : currentIndicator);
    const maxPts = parseFloat(row[3]);
    const semester = row[4] ? String(row[4]).trim() : "";
    const estado = row[5] ? String(row[5]).trim() : "";
    const obtainedPts = parseFloat(row[6]);

    if (!isNaN(maxPts) && maxPts > 0 && itemName !== "") {
      items.push({
        indicador: currentIndicator || "Otros Indicadores",
        criterio: currentCE || "",
        name: itemName,
        maxPoints: maxPts,
        obtainedPoints: isNaN(obtainedPts) ? 0 : obtainedPts,
        semester: semester,
        estado: estado,
        cumple: estado ? (estado.toLowerCase() === "vigente" || estado.toLowerCase() === "actualizado") : (!isNaN(obtainedPts) && obtainedPts === maxPts && maxPts > 0)
      });
    }
  }

  // Agrupar ítems por indicador
  const indicatorsMap = {};
  items.forEach(item => {
    if (!indicatorsMap[item.indicador]) {
      indicatorsMap[item.indicador] = {
        name: item.indicador,
        criterio: item.criterio,
        items: [],
        maxPoints: 0,
        obtainedPoints: 0
      };
    }
    indicatorsMap[item.indicador].items.push(item);
    indicatorsMap[item.indicador].maxPoints += item.maxPoints;
    indicatorsMap[item.indicador].obtainedPoints += item.obtainedPoints;
  });

  const listIndicators = Object.values(indicatorsMap);

  // Calcular totales globales exactamente a partir del Excel
  let totalMax = 100.0;
  let totalObtained = 0.0;
  let compliancePct = 0.0;

  // Intentar buscar la fila de totales en la hoja de Excel de forma segura
  const totalRow = corteData.find(row => 
    row && 
    row.length >= 8 && 
    (
      String(row[0] || "").toUpperCase().trim() === "TOTAL" ||
      String(row[1] || "").toUpperCase().trim() === "TOTAL" ||
      String(row[2] || "").toUpperCase().trim() === "TOTAL"
    )
  );

  if (totalRow) {
    const rawObtained = parseFloat(totalRow[7]);
    if (!isNaN(rawObtained)) totalObtained = rawObtained;

    const rawPct = parseFloat(totalRow[8]);
    if (!isNaN(rawPct)) {
      compliancePct = rawPct <= 1.0 ? Math.round(rawPct * 10000) / 100 : Math.round(rawPct * 100) / 100;
    }
  } else {
    // Fallback: Sumar ítems
    listIndicators.forEach(ind => {
      totalObtained += ind.obtainedPoints;
    });
    compliancePct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 10000) / 100 : 0;
  }

  // Estado de alerta (con semáforo de colores personalizado)
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
  let corteDateLabel = "17/07/2026";
  if (corteData[0] && corteData[0].length >= 6) {
    const rawSem = corteData[0][2] ? corteData[0][2].toString().replace(".0", "") : "";
    if (rawSem) {
      currentSemester = rawSem.replace(/1$/, "-I").replace(/2$/, "-II");
    }
    const rawDate = corteData[0][5] ? corteData[0][5].toString().split(" ")[0] : "";
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

        const rawPct = parseFloat(hRow[15]);
        if (isNaN(rawPct)) continue;

        const hSem = hRow[1] ? hRow[1].toString().replace(".0", "").replace(/1$/, "-I").replace(/2$/, "-II") : "";

        let hDate = "21/07/2026";
        const rawHDate = hRow[0] ? hRow[0].toString().split(" ")[0] : "";
        if (rawHDate) {
          const parts = rawHDate.split("-");
          hDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : rawHDate;
        }

        // Detectar enlace al informe PDF en columnas adicionales (Col 17 en adelante), propiedades o diccionario de informes
        let informeLink = "";
        for (let colIdx = 16; colIdx < hRow.length; colIdx++) {
          const valStr = String(hRow[colIdx] || "").trim();
          if (valStr.startsWith("http://") || valStr.startsWith("https://")) {
            informeLink = valStr;
            break;
          }
        }
        if (!informeLink && hRow.informe) informeLink = String(hRow.informe).trim();
        if (!informeLink && hRow.link) informeLink = String(hRow.link).trim();

        const informesDict = cbcDataObj.informes || {};
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
            <i data-lucide="award" style="color: var(--accent-light); width: 24px; height: 24px;"></i>
            <span>Portal de Transparencia CBC VIII</span>
          </h3>
          <p style="color: var(--text-300); font-size: 0.85rem; margin-top: 4px; margin-bottom: 0;">
            Monitoreo y nivel de cumplimiento de las Condiciones Básicas de Calidad (CBC VIII) del portal web.
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

      <!-- Sección Intermedia: Gráfico de Tendencias e Historial en la Base de Datos -->
      <div style="display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 1.25rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        
        <!-- Tarjeta del Gráfico -->
        <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; min-height: 250px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-100); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="trending-up" style="color: var(--accent); width: 18px; height: 18px;"></i>
              <span>Historial de Evaluaciones y Tendencias</span>
            </h4>
            <p style="color: var(--text-350); font-size: 0.75rem; margin-bottom: 1.25rem;">
              Evolución del porcentaje de cumplimiento general registrado en los cortes de supervisión.
            </p>
          </div>
          
          <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center;">
            ${renderHistoryTrendChart(historySeries)}
          </div>
        </div>

        <!-- Tarjeta de la Tabla Histórica -->
        <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 250px;">
          <div>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-100); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="history" style="color: var(--accent); width: 18px; height: 18px;"></i>
              <span>Registros Guardados en Historial</span>
            </h4>
            <p style="color: var(--text-350); font-size: 0.75rem; margin-bottom: 1.25rem;">
              Histórico de auditoría del portal de transparencia institucional de la Universidad.
            </p>
          </div>

          <div style="flex-grow: 1; overflow-y: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-400); font-weight: 700; text-transform: uppercase; font-size: 0.7rem;">
                  <th style="padding: 0.5rem 0.25rem;">Semestre</th>
                  <th style="padding: 0.5rem 0.25rem; text-align: center;">Fecha de Corte</th>
                  <th style="padding: 0.5rem 0.25rem; text-align: right;">Avance</th>
                  <th style="padding: 0.5rem 0.25rem; text-align: center;">Estado</th>
                  <th style="padding: 0.5rem 0.25rem; text-align: center;">Informe</th>
                </tr>
              </thead>
              <tbody>
                ${historySeries.map(item => {
                  let badgeClass = "nocumple";
                  if (item.pct === 100) {
                    badgeClass = "cumple";
                  } else if (item.pct >= 90) {
                    badgeClass = "cumple";
                  } else if (item.pct >= 70) {
                    badgeClass = "proceso";
                  }

                  let badgeLabel = "DEFICIENTE";
                  let badgeStyle = "";
                  if (item.pct === 100) {
                    badgeLabel = "PERFECTO";
                    badgeStyle = "background-color: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3);";
                  } else if (item.pct >= 90) {
                    badgeLabel = "ÓPTIMO";
                    badgeStyle = "background-color: rgba(20,184,166,0.15); color: #14b8a6; border: 1px solid rgba(20,184,166,0.3);";
                  } else if (item.pct >= 70) {
                    badgeLabel = "PROCESO";
                    badgeStyle = "background-color: rgba(234,179,8,0.15); color: #eab308; border: 1px solid rgba(234,179,8,0.3);";
                  }

                  const hasInforme = item.informe && (item.informe.startsWith("http://") || item.informe.startsWith("https://"));

                  return `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.02);">
                      <td style="padding: 0.6rem 0.25rem; font-weight: 700; color: var(--text-200);">${item.semestre}</td>
                      <td style="padding: 0.6rem 0.25rem; text-align: center; color: var(--text-350); font-weight: 600;">${item.fecha}</td>
                      <td style="padding: 0.6rem 0.25rem; text-align: right; font-weight: 800; color: var(--accent-light);">${item.pct.toFixed(2)}%</td>
                      <td style="padding: 0.6rem 0.25rem; text-align: center;">
                        <span class="badge-status ${badgeClass}" style="font-size: 0.62rem; padding: 0.1rem 0.4rem; font-weight: 700; ${badgeStyle}">${badgeLabel}</span>
                      </td>
                      <td style="padding: 0.6rem 0.25rem; text-align: center;">
                        ${hasInforme ? `
                          <div style="display: inline-flex; align-items: center; gap: 4px;">
                            <a href="${item.informe}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" title="Ver Informe PDF" style="padding: 0.2rem 0.55rem; font-size: 0.72rem; border-radius: 6px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                              <i data-lucide="file-text" style="width: 13px; height: 13px;"></i> Informe
                            </a>
                            ${canLinkInforme ? `
                              <button type="button" class="btn btn-sm btn-edit-informe-pdf" data-row="${item.rowIndex}" title="Editar enlace del informe PDF" style="padding: 0.2rem 0.4rem; font-size: 0.7rem; border-radius: 4px; background: rgba(255,255,255,0.04); color: var(--text-350); border: 1px solid var(--border-color); cursor: pointer;">
                                <i data-lucide="edit-2" style="width: 11px; height: 11px;"></i>
                              </button>
                            ` : ''}
                          </div>
                        ` : (canLinkInforme ? `
                          <button type="button" class="btn btn-sm btn-edit-informe-pdf" data-row="${item.rowIndex}" title="Agregar enlace al informe PDF" style="padding: 0.22rem 0.6rem; font-size: 0.72rem; border-radius: 6px; background: rgba(59,130,246,0.1); color: var(--accent-light); border: 1px dashed var(--accent); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; transition: all 0.2s;">
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

      <!-- Sección Inferior: Lista de Acordeón de Indicadores de CBC VIII -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-100); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="check-square" style="color: var(--accent); width: 18px; height: 18px;"></i>
          <span>Cumplimiento por Indicador de CBC VIII</span>
        </h4>
        <p style="color: var(--text-350); font-size: 0.75rem; margin-bottom: 1.5rem;">
          Haga clic en cualquier indicador para desplegar los medios de verificación y evidencias específicas de cumplimiento correspondientes.
        </p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${listIndicators.map((inc, index) => {
            const incPct = inc.maxPoints > 0 ? Math.round((inc.obtainedPoints / inc.maxPoints) * 1000) / 10 : 0;
            const incPctText = incPct % 1 === 0 ? incPct.toFixed(0) : incPct.toFixed(1);
            
            // Decidir color del indicador
            let progressColor = "var(--color-nocumple)";
            if (incPct === 100) {
              progressColor = "var(--color-cumple)";
            } else if (incPct >= 90) {
              progressColor = "#14b8a6";
            } else if (incPct >= 70) {
              progressColor = "var(--color-proceso)";
            }

            return `
              <!-- Acordeón para ${inc.name} -->
              <div class="accordion-item" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background-color: var(--bg-dark-800);">
                
                <!-- Cabecera del Acordeón -->
                <div class="accordion-header" data-target="cbc-collapse-${index}" style="padding: 1rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: background-color 0.2s;">
                  
                  <div style="display: flex; flex-direction: column; gap: 0.5rem; flex-grow: 1; padding-right: 1.5rem;">
                    <!-- Título -->
                    <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-100); margin: 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px;">
                      <span class="badge-status" style="background-color: var(--bg-dark-900); color: var(--accent-light); font-size: 0.65rem; padding: 0.15rem 0.4rem; font-weight: 800; border-radius: 4px; border: 1px solid var(--border-color); flex-shrink: 0; margin-top: 1px;">
                        ${inc.name}
                      </span>
                      <span>${inc.criterio || "Detalle del Indicador"}</span>
                    </h5>
                    
                    <!-- Barra de progreso e información rápida -->
                    <div style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 500px;">
                      <div style="flex-grow: 1; height: 6px; background-color: var(--bg-dark-900); border-radius: 3px; overflow: hidden; border: 1px solid rgba(255,255,255,0.02);">
                        <div style="width: ${incPct}%; background-color: ${progressColor}; height: 100%; border-radius: 3px; transition: width 0.3s ease;"></div>
                      </div>
                      <span style="font-size: 0.8rem; font-weight: 700; color: ${progressColor}; min-width: 45px; text-align: right;">${incPctText}%</span>
                    </div>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
                    <i data-lucide="chevron-down" class="chevron-icon" id="chevron-cbc-collapse-${index}" style="color: var(--text-300); transition: transform 0.2s;"></i>
                  </div>
                </div>

                <!-- Detalle del Acordeón -->
                <div id="cbc-collapse-${index}" style="display: none; border-top: 1px solid var(--border-color); background-color: rgba(0,0,0,0.15); padding: 1.25rem;">
                  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    
                    <!-- Cabecera de sub-tabla -->
                    <div style="display: grid; grid-template-columns: 2.5fr 1.2fr 100px 100px; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">
                      <div>Medio de Verificación (MV)</div>
                      <div style="text-align: center;">Última Actualización</div>
                      <div style="text-align: right;">Puntaje (Obt/Max)</div>
                      <div style="text-align: center;">Estado</div>
                    </div>

                    <!-- Listado de ítems dentro del indicador -->
                    ${inc.items.map(item => {
                      const itemText = item.estado || (item.cumple ? "Vigente" : "Vencido");
                      let itemClass = "nocumple";
                      if (item.estado) {
                        const estLower = item.estado.toLowerCase();
                        if (estLower === "vigente" || estLower === "actualizado") {
                          itemClass = "cumple";
                        } else if (estLower === "por actualizar" || estLower === "en proceso" || estLower === "actualizar") {
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

  // Registrar eventos para edición/creación de enlaces a informes PDF
  const editBtns = container.querySelectorAll(".btn-edit-informe-pdf");
  editBtns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rIdx = parseInt(btn.getAttribute("data-row"), 10);
      const inputUrl = prompt("Ingrese la URL del Informe en PDF para este registro del Historial:");
      if (inputUrl !== null && inputUrl.trim() !== "") {
        let cleanUrl = inputUrl.trim();
        // Auto-completar https://
        if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
          cleanUrl = "https://" + cleanUrl;
        }
        if (!cbcDataObj.historial) cbcDataObj.historial = [];
        if (!cbcDataObj.historial[rIdx]) cbcDataObj.historial[rIdx] = [];
        
        while (cbcDataObj.historial[rIdx].length < 17) {
          cbcDataObj.historial[rIdx].push(null);
        }
        cbcDataObj.historial[rIdx][16] = cleanUrl;

        // Guardar también en diccionario persistente por semestre y fecha
        if (!cbcDataObj.informes) cbcDataObj.informes = {};
        const hRow = cbcDataObj.historial[rIdx];
        if (hRow) {
          if (hRow[0]) cbcDataObj.informes[String(hRow[0])] = cleanUrl;
          if (hRow[1]) cbcDataObj.informes[String(hRow[1])] = cleanUrl;
          if (hRow[2]) cbcDataObj.informes[String(hRow[2])] = cleanUrl;
        }

        await db.saveTransparenciaCbc(cbcDataObj);
        renderTransparenciaCbcPage(container, userRole);
      }
    });
  });

  // Registrar sincronización automática multi-navegador en tiempo real
  const handleDbSyncUpdate = async () => {
    console.log("[TRANSPARENCIA CBC SYNC] Recibido evento de base de datos actualizada. Redibujando...");
    renderTransparenciaCbcPage(container, userRole);
  };
  window.addEventListener("sigeca_db_updated", handleDbSyncUpdate);

  if (window._cleanupTransparenciaCbcSync) {
    window.removeEventListener("sigeca_db_updated", window._cleanupTransparenciaCbcSync);
  }
  window._cleanupTransparenciaCbcSync = handleDbSyncUpdate;
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
  let minPct = 80;
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
      ${series.length > 1 ? `<path d="${areaD}" fill="url(#trendGradient)" />` : ""}

      <!-- Línea del Gráfico (Trend Line) -->
      ${series.length > 1 ? `<path d="${pathD}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />` : ""}

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
