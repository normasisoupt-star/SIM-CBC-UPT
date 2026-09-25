/* ==========================================================================
   SIGECA - PÁGINA PLAN DE ESTUDIOS (Excel Programas y Estadísticas)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";

// Helper para generar gráfico de barras 3D interactivo en SVG
function generate3DBarChartSVG(data, width = 420, height = 240) {
  const top = 30;
  const right = 20;
  const bottom = 40;
  const left = 40;
  const dx = 10; // Proyección 3D en X
  const dy = 8;  // Proyección 3D en Y
  
  const drawWidth = width - left - right - dx;
  const drawHeight = height - top - bottom - dy;
  
  const values = data.map(d => d.value);
  const maxVal = Math.max(...values, 1);
  const niceMax = Math.ceil(maxVal / 5) * 5 || 5;
  
  let gridHtml = "";
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const val = (niceMax / ticks) * i;
    const y = height - bottom - (val / niceMax) * drawHeight;
    gridHtml += `
      <line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3,3" />
      <text x="${left - 8}" y="${y + 4}" fill="var(--text-400)" font-size="10" font-weight="600" text-anchor="end">${Math.round(val)}</text>
    `;
  }
  
  const barCount = data.length;
  const barSpacing = 20;
  const totalSpacing = barSpacing * (barCount - 1);
  const barWidth = Math.max((drawWidth - totalSpacing) / barCount, 15);
  
  let barsHtml = "";
  data.forEach((d, idx) => {
    const x = left + idx * (barWidth + barSpacing);
    const y_bottom = height - bottom;
    
    if (d.value === 0) {
      // Dibujar base 3D de valor 0
      barsHtml += `
        <g class="bar-3d-group" data-label="${d.label}" data-value="${d.value}">
          <!-- Mini diamante plano en la base -->
          <polygon points="${x},${y_bottom} ${x + dx},${y_bottom - dy} ${x + barWidth + dx},${y_bottom - dy} ${x + barWidth},${y_bottom}" fill="var(--bg-dark-600)" opacity="0.5" />
          <text x="${x + barWidth/2}" y="${y_bottom + 16}" fill="var(--text-300)" font-size="10" text-anchor="middle" font-weight="600">${d.label}</text>
          <text x="${x + barWidth/2}" y="${y_bottom - 4}" fill="var(--text-400)" font-size="9" text-anchor="middle">0</text>
        </g>
      `;
      return;
    }
    
    const h = (d.value / niceMax) * drawHeight;
    const y_top = y_bottom - h;
    const color = d.color || "var(--accent)";
    
    barsHtml += `
      <g class="bar-3d-group" data-label="${d.label}" data-value="${d.value}">
        <!-- Cara Superior (Top) -->
        <polygon points="${x},${y_top} ${x + dx},${y_top - dy} ${x + barWidth + dx},${y_top - dy} ${x + barWidth},${y_top}" fill="${color}" opacity="0.9" />
        <polygon points="${x},${y_top} ${x + dx},${y_top - dy} ${x + barWidth + dx},${y_top - dy} ${x + barWidth},${y_top}" fill="rgba(255, 255, 255, 0.25)" />
        
        <!-- Cara Lateral Derecha (Right) -->
        <polygon points="${x + barWidth},${y_top} ${x + barWidth + dx},${y_top - dy} ${x + barWidth + dx},${y_bottom - dy} ${x + barWidth},${y_bottom}" fill="${color}" opacity="0.9" />
        <polygon points="${x + barWidth},${y_top} ${x + barWidth + dx},${y_top - dy} ${x + barWidth + dx},${y_bottom - dy} ${x + barWidth},${y_bottom}" fill="rgba(0, 0, 0, 0.25)" />
        
        <!-- Cara Frontal (Front) -->
        <polygon points="${x},${y_top} ${x + barWidth},${y_top} ${x + barWidth},${y_bottom} ${x},${y_bottom}" fill="${color}" opacity="0.95" />
        
        <!-- Etiquetas de valor -->
        <text x="${x + barWidth/2}" y="${y_top - 8}" fill="var(--text-100)" font-size="10" font-weight="700" text-anchor="middle">${d.value}</text>
        <!-- Etiqueta de Categoría (eje X) -->
        <text x="${x + barWidth/2}" y="${y_bottom + 16}" fill="var(--text-300)" font-size="10" text-anchor="middle" font-weight="600">${d.label}</text>
      </g>
    `;
  });
  
  return `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; overflow: visible;">
      <style>
        .bar-3d-group {
          cursor: pointer;
          outline: none;
          transition: transform var(--transition-fast), filter var(--transition-fast);
        }
        .bar-3d-group:hover {
          filter: brightness(1.15) drop-shadow(0 6px 12px rgba(0,0,0,0.45));
          transform: translateY(-4px);
        }
      </style>
      
      <!-- Línea base del eje X -->
      <line x1="${left}" y1="${height - bottom}" x2="${width - right + dx}" y2="${height - bottom}" stroke="var(--bg-dark-600)" stroke-width="2" />
      
      <!-- Grilla e Y-Axis labels -->
      ${gridHtml}
      
      <!-- Columnas 3D y etiquetas X -->
      ${barsHtml}
    </svg>
  `;
}

// Helper para vincular eventos de tooltip premium a los gráficos 3D
function attachTooltipEvents(containerEl) {
  let tooltip = document.querySelector("#s-chart-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "s-chart-tooltip";
    tooltip.style.position = "fixed";
    tooltip.style.display = "none";
    tooltip.style.backgroundColor = "rgba(11, 15, 25, 0.95)";
    tooltip.style.border = "1px solid var(--accent-light)";
    tooltip.style.padding = "8px 12px";
    tooltip.style.borderRadius = "8px";
    tooltip.style.color = "var(--text-100)";
    tooltip.style.fontSize = "0.75rem";
    tooltip.style.boxShadow = "var(--shadow-lg)";
    tooltip.style.pointerEvents = "none";
    tooltip.style.zIndex = "9999";
    tooltip.style.backdropFilter = "blur(8px)";
    tooltip.style.transition = "opacity 0.15s ease";
    document.body.appendChild(tooltip);
  }

  containerEl.querySelectorAll(".bar-3d-group").forEach(group => {
    group.onmouseenter = () => {
      tooltip.style.opacity = "1";
    };
    
    group.onmousemove = (e) => {
      const label = group.getAttribute("data-label");
      const val = group.getAttribute("data-value");
      tooltip.innerHTML = `
        <div style="font-weight: 700; color: var(--accent-light); margin-bottom: 2px;">${label}</div>
        <div style="display: flex; justify-content: space-between; gap: 12px;">
          <span style="color: var(--text-300);">Programas:</span>
          <span style="font-weight: 800; color: var(--text-100);">${val}</span>
        </div>
      `;
      tooltip.style.display = "block";
      tooltip.style.left = (e.clientX + 14) + "px";
      tooltip.style.top = (e.clientY - 35) + "px";
    };

    group.onmouseleave = () => {
      tooltip.style.display = "none";
    };
  });
}

export async function renderPlanPage(container, userRole = "admin") {
  // Cargar programas iniciales
  let programas = await db.getProgramas();

  let activeTab = "relacion"; // "relacion" o "estadisticas"
  let searchQuery = "";
  let filterFacultad = "todos";
  let filterTipo = "todos";
  let filterEstado = "todos";
  
  // Paginación
  let currentPage = 1;
  const itemsPerPage = 15;

  const isEditable = userRole === "admin" || userRole === "editor";

  // Facultades únicas para el selector de filtro
  const facultades = [...new Set(programas.map(p => p.facultad).filter(Boolean))];

  const drawTabs = () => {
    const tabContainer = container.querySelector("#cbc-tabs-container");
    if (!tabContainer) return;

    tabContainer.innerHTML = `
      <button class="tab-btn ${activeTab === 'relacion' ? 'active' : ''}" id="btn-tab-relacion">
        <i data-lucide="list"></i>
        <span>Relación de Programas</span>
      </button>
      <button class="tab-btn ${activeTab === 'estadisticas' ? 'active' : ''}" id="btn-tab-estadisticas" style="position: relative;">
        <i data-lucide="bar-chart-3"></i>
        <span>Estadísticas y Resumen</span>
        <span class="badge-status cumple" style="font-size: 0.65rem; padding: 0.1rem 0.35rem; margin-left: 6px;">En Vivo</span>
      </button>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Eventos de pestañas
    container.querySelector("#btn-tab-relacion").onclick = () => {
      activeTab = "relacion";
      container.querySelector("#cbc-relacion-view").style.display = "block";
      container.querySelector("#cbc-estadisticas-view").style.display = "none";
      drawTabs();
      drawRelacion();
    };

    container.querySelector("#btn-tab-estadisticas").onclick = () => {
      activeTab = "estadisticas";
      container.querySelector("#cbc-relacion-view").style.display = "none";
      container.querySelector("#cbc-estadisticas-view").style.display = "block";
      drawTabs();
      drawEstadisticas();
    };
  };

  const drawRelacion = () => {
    const tableBody = container.querySelector("#programas-table-body");
    const paginator = container.querySelector("#programas-paginator");
    if (!tableBody || !paginator) return;

    // Aplicar filtros y búsqueda
    const filtered = programas.filter(p => {
      const matchSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.codigo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFacultad = filterFacultad === "todos" || p.facultad === filterFacultad;
      const matchTipo = filterTipo === "todos" || p.tipo === filterTipo;
      const matchEstado = filterEstado === "todos" || p.estado === filterEstado;
      
      return matchSearch && matchFacultad && matchTipo && matchEstado;
    });

    // Calcular páginas
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageItems = filtered.slice(startIdx, endIdx);

    // Actualizar contador de resultados
    container.querySelector("#results-counter").innerHTML = `
      Mostrando <strong>${startIdx + 1} - ${Math.min(endIdx, totalItems)}</strong> de <strong>${totalItems}</strong> programas.
    `;

    // Renderizar cuerpo de la tabla
    if (pageItems.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; color: var(--text-400); padding: 4rem 1rem;">
            <i data-lucide="search-code" style="width: 40px; height: 40px; margin-bottom: 0.5rem; color: var(--text-400);"></i>
            <p>No se encontraron programas con los filtros seleccionados.</p>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = pageItems.map((p, index) => {
        const estadoClass = p.estado === "ACTIVO" ? "cumple" : "nocumple";
        
        let enviadoClass = "en-proceso";
        if (p.enviadoSunedu === "SI" || p.enviadoSunedu === "SÍ" || (p.enviadoSunedu && p.enviadoSunedu.length > 2 && p.enviadoSunedu !== "NO")) {
          enviadoClass = "cumple";
        } else if (p.enviadoSunedu === "NO") {
          enviadoClass = "nocumple";
        }
        const enviadoText = p.enviadoSunedu || "NO";

        const year = parseInt(p.anoResolucion);
        let vigenciaHtml = "";
        if (isNaN(year)) {
          vigenciaHtml = `<span class="badge-status info" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">Sin Fecha</span>`;
        } else {
          const diffYears = 2026 - year;
          if (diffYears >= 0 && diffYears <= 3) {
            vigenciaHtml = `
              <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                <span style="font-weight: 700; color: var(--color-cumple); font-size: 0.8rem;">${diffYears} años</span>
                <span class="badge-status cumple" style="font-size: 0.6rem; padding: 0.1rem 0.35rem; line-height: 1;">Vigente / Actualizado</span>
              </div>
            `;
          } else if (diffYears >= 4 && diffYears <= 6) {
            vigenciaHtml = `
              <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                <span style="font-weight: 700; color: var(--color-proceso); font-size: 0.8rem;">${diffYears} años</span>
                <span class="badge-status en-proceso" style="font-size: 0.6rem; padding: 0.1rem 0.35rem; line-height: 1;">Desactualizado / En riesgo</span>
              </div>
            `;
          } else {
            vigenciaHtml = `
              <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                <span style="font-weight: 700; color: var(--color-nocumple); font-size: 0.8rem;">${diffYears} años</span>
                <span class="badge-status nocumple" style="font-size: 0.6rem; padding: 0.1rem 0.35rem; line-height: 1;">obsoleto / no vigente</span>
              </div>
            `;
          }
        }

        const resolucionText = p.resolucionUltimaActualizacion || "Sin resolución";
        const linkUrl = p.resolucionLink || "https://institucion-my.sharepoint.com/:b:/g/personal/resolucion_aprobacion_pdf";
        let resolucionHtml = "";
        
        if (p.resolucionUltimaActualizacion && p.resolucionUltimaActualizacion !== "--" && p.resolucionUltimaActualizacion !== "-") {
          resolucionHtml = `
            <a href="${linkUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px; color: var(--accent-light); font-weight: 600; font-size: 0.75rem;" title="Ver resolución">
              <i data-lucide="file-text" style="width: 12px; height: 12px;"></i>
              <span style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${resolucionText}</span>
            </a>
          `;
        } else {
          resolucionHtml = `<span style="font-size: 0.75rem; color: var(--text-400);">${resolucionText}</span>`;
        }

        return `
          <tr>
            <td style="font-family: monospace; font-size: 0.8rem; font-weight: 700; color: var(--text-100);">${p.codigo}</td>
            <td style="font-weight: 600; color: var(--text-100); max-width: 250px; line-height: 1.4; white-space: normal; word-break: break-word;">
              ${p.nombre}
            </td>
            <td style="font-size: 0.8rem; color: var(--text-300);">${p.facultad}</td>
            <td style="font-size: 0.8rem; color: var(--text-300);">${p.tipo}</td>
            <td class="text-center">
              <span class="badge-status ${estadoClass}" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">${p.estado}</span>
            </td>
            <td class="text-center">
              <span class="badge-status ${enviadoClass}" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">${enviadoText}</span>
            </td>
            <td class="text-center" style="font-weight: 600; font-size: 0.8rem;">
              ${p.anoResolucion || '-'}
            </td>
            <td class="text-center">
              ${vigenciaHtml}
            </td>
            <td class="text-center">
              ${resolucionHtml}
            </td>
            <td class="text-center">
              <div style="display: flex; gap: 0.25rem; justify-content: center;">
                <button class="btn btn-secondary btn-edit-prog" data-id="${p.id}" style="padding: 0.35rem; border-radius: 4px;" title="Editar Detalles">
                  <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
                </button>
                ${isEditable ? `
                  <button class="btn btn-danger btn-delete-prog" data-id="${p.id}" style="padding: 0.35rem; border-radius: 4px;" title="Eliminar Programa">
                    <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
                  </button>
                ` : ""}
              </div>
            </td>
          </tr>
        `;
      }).join("");
    }

    // Renderizar paginador
    let paginatorHtml = `
      <button class="btn btn-secondary" id="btn-page-prev" ${currentPage === 1 ? 'disabled' : ''} style="padding: 0.4rem 0.6rem;">
        <i data-lucide="chevron-left" style="width: 14px; height: 14px;"></i>
      </button>
    `;

    // Mostrar números de página simplificados
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let pNum = startPage; pNum <= endPage; pNum++) {
      paginatorHtml += `
        <button class="btn ${currentPage === pNum ? 'btn-primary' : 'btn-secondary'}" data-page-num="${pNum}" style="padding: 0.4rem 0.75rem; font-size: 0.8rem;">
          ${pNum}
        </button>
      `;
    }

    paginatorHtml += `
      <button class="btn btn-secondary" id="btn-page-next" ${currentPage === totalPages ? 'disabled' : ''} style="padding: 0.4rem 0.6rem;">
        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
      </button>
    `;

    paginator.innerHTML = paginatorHtml;

    if (window.lucide) window.lucide.createIcons();

    // Eventos del paginador
    const prevBtn = paginator.querySelector("#btn-page-prev");
    if (prevBtn) prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        drawRelacion();
      }
    };

    const nextBtn = paginator.querySelector("#btn-page-next");
    if (nextBtn) nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        drawRelacion();
      }
    };

    paginator.querySelectorAll("[data-page-num]").forEach(btn => {
      btn.onclick = () => {
        currentPage = parseInt(btn.getAttribute("data-page-num"));
        drawRelacion();
      };
    });

    // Eventos de editar y eliminar filas
    tableBody.querySelectorAll(".btn-edit-prog").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const prog = programas.find(p => p.id === id);
        openProgramaModal(prog);
      };
    });

    tableBody.querySelectorAll(".btn-delete-prog").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute("data-id");
        const prog = programas.find(p => p.id === id);
        if (confirm(`¿Está seguro de eliminar el programa "${prog.nombre}" del Plan de Estudios?`)) {
          await db.deletePrograma(id);
          // Recargar programas en memoria
          programas = await db.getProgramas();
          drawRelacion();
        }
      };
    });
  };

  const drawEstadisticas = () => {
    const statsContainer = container.querySelector("#cbc-estadisticas-view");
    if (!statsContainer) return;

    // Ratios Generales
    const totalProgs = programas.length;
    const activos = programas.filter(p => p.estado === "ACTIVO");
    const inactivos = programas.filter(p => p.estado === "INACTIVO");

    const activosPregrado = activos.filter(p => p.tipo === "Pregrado");
    const activosMaestria = activos.filter(p => p.tipo === "Maestría");
    const activosDoctorado = activos.filter(p => p.tipo === "Doctorado");
    const activosSE = activos.filter(p => p.tipo === "Segunda Especialidad");

    const inactivosPregrado = inactivos.filter(p => p.tipo === "Pregrado");
    const inactivosMaestria = inactivos.filter(p => p.tipo === "Maestría");
    const inactivosDoctorado = inactivos.filter(p => p.tipo === "Doctorado");
    const inactivosSE = inactivos.filter(p => p.tipo === "Segunda Especialidad");

    // Planes Actualizados
    const actualizados = programas.filter(p => p.actualizoPlan === "SI");
    const noActualizados = programas.filter(p => p.actualizoPlan === "NO");

    const pctActualizados = totalProgs > 0 ? (actualizados.length / totalProgs) * 100 : 0;
    const pctNoActualizados = totalProgs > 0 ? (noActualizados.length / totalProgs) * 100 : 0;

    // Desglose de planes actualizados por Tipo de Programa (Activos)
    const actPregradoActualizado = activosPregrado.filter(p => p.actualizoPlan === "SI");
    const actPregradoNoActualizado = activosPregrado.filter(p => p.actualizoPlan === "NO");

    const actSEActualizado = activosSE.filter(p => p.actualizoPlan === "SI");
    const actSENoActualizado = activosSE.filter(p => p.actualizoPlan === "NO");

    const posgradoActivos = [...activosMaestria, ...activosDoctorado];
    const posgradoActivosActualizado = posgradoActivos.filter(p => p.actualizoPlan === "SI");
    const posgradoActivosNoActualizado = posgradoActivos.filter(p => p.actualizoPlan === "NO");

    // Ratios C1 & Rediseño (sobre actualizados)
    const progsRedeseno = actualizados.filter(p => p.resolucionRedeseno === "SI");
    const progsC1 = actualizados.filter(p => p.formatoC1 === "SI");
    const progs20Virtual = actualizados.filter(p => p.presencialVirtual20 === "SI" || p.presencialVirtual20 === "SÍ");

    // Vigencia de planes basada en año de resolución (2026 - añoResolucion)
    const getVigenciaBands = (minAge, maxAge) => {
      return activos.filter(p => {
        const year = parseInt(p.anoResolucion);
        if (isNaN(year)) return false;
        const age = 2026 - year;
        if (maxAge !== null) {
          return age >= minAge && age <= maxAge;
        } else {
          return age > minAge;
        }
      }).length;
    };

    const vig0a3 = getVigenciaBands(0, 3);
    const vig4a6 = getVigenciaBands(4, 6);
    const vigMas6 = getVigenciaBands(6, null);

    statsContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
        
        <!-- CARD 1: SEMÁFORO DE ACTUALIZACIÓN DE PLANES -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.05rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="check-circle-2" style="color: var(--color-cumple);"></i>
            <span>Actualización Global de Planes de Estudio</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Ratios -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                <span style="color: var(--text-200); font-weight: 500;">Planes de Estudio Actualizados</span>
                <span style="color: var(--color-cumple); font-weight: 700;">${actualizados.length} (${Math.round(pctActualizados * 100) / 100}%)</span>
              </div>
              <div class="progress-percentage-bar" style="height: 10px; background-color: var(--bg-dark-900);">
                <div class="progress-percentage-fill" style="width: ${pctActualizados}%; background-color: var(--color-cumple);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                <span style="color: var(--text-200); font-weight: 500;">Planes No Actualizados (Pendientes)</span>
                <span style="color: var(--color-nocumple); font-weight: 700;">${noActualizados.length} (${Math.round(pctNoActualizados * 100) / 100}%)</span>
              </div>
              <div class="progress-percentage-bar" style="height: 10px; background-color: var(--bg-dark-900);">
                <div class="progress-percentage-fill" style="width: ${pctNoActualizados}%; background-color: var(--color-nocumple);"></div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
              <span>Total Programas Evaluados:</span>
              <span style="color: var(--accent-light);">${totalProgs}</span>
            </div>
          </div>
        </div>

        <!-- CARD 2: PROGRAMAS POR CONDICIÓN DE ACTIVIDAD -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.05rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="activity" style="color: var(--accent-light);"></i>
            <span>Programas Activos vs Inactivos</span>
          </h3>
          <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.8rem; margin: 0;">
            <thead>
              <tr>
                <th>Tipo de Nivel</th>
                <th class="text-center" style="color: var(--color-cumple);">Activos (${activos.length})</th>
                <th class="text-center" style="color: var(--color-nocumple);">Inactivos (${inactivos.length})</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pregrado</td>
                <td class="text-center" style="font-weight: 700;">${activosPregrado.length}</td>
                <td class="text-center" style="font-weight: 700;">${inactivosPregrado.length}</td>
              </tr>
              <tr>
                <td>Maestrías</td>
                <td class="text-center" style="font-weight: 700;">${activosMaestria.length}</td>
                <td class="text-center" style="font-weight: 700;">${inactivosMaestria.length}</td>
              </tr>
              <tr>
                <td>Doctorados</td>
                <td class="text-center" style="font-weight: 700;">${activosDoctorado.length}</td>
                <td class="text-center" style="font-weight: 700;">${inactivosDoctorado.length}</td>
              </tr>
              <tr>
                <td>Segunda Especialidad</td>
                <td class="text-center" style="font-weight: 700;">${activosSE.length}</td>
                <td class="text-center" style="font-weight: 700;">${inactivosSE.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CARD 3: PLANES DE PROGRAMAS ACTIVOS POR NIVEL -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.05rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="layers" style="color: #a78bfa;"></i>
            <span>Planes de Estudio de Programas Activos</span>
          </h3>
          <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.75rem; margin: 0;">
            <thead>
              <tr>
                <th>Nivel del Programa</th>
                <th class="text-center">Actualizado</th>
                <th class="text-center">Pendiente</th>
                <th class="text-center">% Avance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pregrado Activos</td>
                <td class="text-center" style="color: var(--color-cumple); font-weight: bold;">${actPregradoActualizado.length}</td>
                <td class="text-center" style="color: var(--color-nocumple); font-weight: bold;">${actPregradoNoActualizado.length}</td>
                <td class="text-right" style="font-weight: bold;">${activosPregrado.length > 0 ? Math.round((actPregradoActualizado.length / activosPregrado.length) * 100) : 0}%</td>
              </tr>
              <tr>
                <td>Segunda Especialidad Activa</td>
                <td class="text-center" style="color: var(--color-cumple); font-weight: bold;">${actSEActualizado.length}</td>
                <td class="text-center" style="color: var(--color-nocumple); font-weight: bold;">${actSENoActualizado.length}</td>
                <td class="text-right" style="font-weight: bold;">${activosSE.length > 0 ? Math.round((actSEActualizado.length / activosSE.length) * 100) : 0}%</td>
              </tr>
              <tr>
                <td>Posgrado Activos (M/D)</td>
                <td class="text-center" style="color: var(--color-cumple); font-weight: bold;">${posgradoActivosActualizado.length}</td>
                <td class="text-center" style="color: var(--color-nocumple); font-weight: bold;">${posgradoActivosNoActualizado.length}</td>
                <td class="text-right" style="font-weight: bold;">${posgradoActivos.length > 0 ? Math.round((posgradoActivosActualizado.length / posgradoActivos.length) * 100) : 0}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- CARD 4: REQUISITOS DE DISEÑO CURRICULAR Y FORMATOS -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.05rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="file-check-2" style="color: #60a5fa;"></i>
            <span>Estándares y Formatos (Planes Actualizados)</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>La Resolución Cuenta con Rediseño Curricular:</span>
              <span class="badge-status cumple" style="font-weight: bold;">SI: ${progsRedeseno.length} de ${actualizados.length}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Programas que cumplen con el Formato C1:</span>
              <span class="badge-status cumple" style="font-weight: bold;">SI: ${progsC1.length} de ${actualizados.length}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
              <span>Programas Presenciales con 20% Virtualidad:</span>
              <span class="badge-status" style="background-color: rgba(96, 165, 250, 0.1); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.2); font-weight: bold;">SI: ${progs20Virtual.length}</span>
            </div>
          </div>
        </div>

        <!-- CARD 5: VIGENCIA DEL PLAN DE ESTUDIOS -->
        <div class="card" style="padding: 1.5rem;">
          <h3 style="font-size: 1.05rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
            <i data-lucide="calendar" style="color: var(--color-proceso);"></i>
            <span>Vigencia del Plan de Estudios (Programas Activos)</span>
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Vigente / Actualizado (0 a 3 años):</span>
              <span class="badge-status cumple" style="font-weight: 700;">${vig0a3} programas</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Desactualizado / En riesgo (4 a 6 años):</span>
              <span class="badge-status en-proceso" style="font-weight: 700;">${vig4a6} programas</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Obsoleto / No vigente (Más de 6 años):</span>
              <span class="badge-status nocumple" style="font-weight: 700;">${vigMas6} programas</span>
            </div>
          </div>
        </div>

      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  };

  // Crear HTML Base con las dos pestañas internas
  container.innerHTML = `
    <div class="page-content">
      
      <!-- Fila de Encabezado Principal y Pestañas -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 10px;">
            <i data-lucide="award" style="color: var(--accent-light); width: 28px; height: 28px;"></i>
            <span>Plan de Estudios (CBC)</span>
          </h2>
          <p style="font-size: 0.85rem; color: var(--text-300); margin-top: 4px;">
            Control de planes de estudio vigentes, resoluciones, rediseño curricular y semáforo de cumplimiento académico de la UPT.
          </p>
        </div>
        
        <div class="tab-container" id="cbc-tabs-container" style="border: none; margin: 0; background: var(--bg-dark-900); padding: 4px; border-radius: 8px;">
          <!-- Pestañas internas dibujadas por JS -->
        </div>
      </div>

      <!-- VISTA 1: RELACIÓN DE PROGRAMAS (Editable, Buscable, Filtrable) -->
      <div id="cbc-relacion-view" style="display: block;">
        <div class="card" style="padding: 1.25rem; margin-bottom: 1.25rem; background-color: var(--bg-dark-900);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            
            <!-- Buscador y Filtros -->
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex-grow: 1;">
              
              <div style="position: relative; width: 250px;">
                <input type="text" id="cbc-search-input" class="input-control" placeholder="Buscar programa o código..." style="padding-left: 2.25rem; background-color: var(--bg-dark-800); font-size: 0.8rem;" value="${searchQuery}">
                <i data-lucide="search" style="width: 14px; height: 14px; position: absolute; left: 10px; top: 12px; color: var(--text-400);"></i>
              </div>

              <!-- Filtro Facultad -->
              <select id="filter-facultad" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 160px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
                <option value="todos">Todas las Facultades</option>
                ${facultades.map(f => `<option value="${f}" ${filterFacultad === f ? 'selected' : ''}>${f}</option>`).join("")}
              </select>

              <!-- Filtro Tipo -->
              <select id="filter-tipo" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 160px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
                <option value="todos">Todos los Niveles</option>
                <option value="Pregrado" ${filterTipo === 'Pregrado' ? 'selected' : ''}>Pregrado</option>
                <option value="Maestría" ${filterTipo === 'Maestría' ? 'selected' : ''}>Maestría</option>
                <option value="Doctorado" ${filterTipo === 'Doctorado' ? 'selected' : ''}>Doctorado</option>
                <option value="Segunda Especialidad" ${filterTipo === 'Segunda Especialidad' ? 'selected' : ''}>Segunda Especialidad</option>
              </select>

              <!-- Filtro Estado -->
              <select id="filter-estado" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 130px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
                <option value="todos">Todos los Estados</option>
                <option value="ACTIVO" ${filterEstado === 'ACTIVO' ? 'selected' : ''}>ACTIVO</option>
                <option value="INACTIVO" ${filterEstado === 'INACTIVO' ? 'selected' : ''}>INACTIVO</option>
              </select>

            </div>

            <!-- Acción Agregar -->
            ${isEditable ? `
              <button class="btn btn-primary" id="btn-add-programa" style="padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
                <i data-lucide="plus"></i>
                <span>Nuevo Programa</span>
              </button>
            ` : ""}

          </div>
        </div>

        <!-- Tabla -->
        <div class="card" style="padding: 0; overflow: hidden; margin-bottom: 1.5rem;">
          <div class="table-container">
            <table class="summary-table" style="margin-bottom: 0;">
              <thead>
                <tr>
                  <th style="width: 6%; text-align: left;">Código</th>
                  <th style="width: 22%; text-align: left;">Programa Académico</th>
                  <th style="width: 10%; text-align: left;">Facultad</th>
                  <th style="width: 10%; text-align: left;">Tipo / Nivel</th>
                  <th style="width: 8%; text-align: center;">Estado</th>
                  <th style="width: 10%; text-align: center;">Actualización enviada a SUNEDU</th>
                  <th style="width: 10%; text-align: center;">Fecha de actualización según resolución</th>
                  <th style="width: 12%; text-align: center;">Vigencia del plan de estudios</th>
                  <th style="width: 12%; text-align: center;">Resolución</th>
                  <th style="width: 8%; text-align: center;">Acciones</th>
                </tr>
              </thead>
              <tbody id="programas-table-body">
                <!-- Carga dinámica -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Fila de Paginador y Contador -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
          <span id="results-counter" style="font-size: 0.85rem; color: var(--text-300);"></span>
          <div class="paginator" id="programas-paginator" style="display: flex; gap: 4px; align-items: center;">
            <!-- Paginador dinámico -->
          </div>
        </div>

      </div>

      <!-- VISTA 2: ESTADÍSTICAS Y RESUMEN (Lectura, calculada reactivamente) -->
      <div id="cbc-estadisticas-view" style="display: none;">
        <!-- Card grid dibujado dinámicamente -->
      </div>

      <!-- Portal del Modal -->
      <div id="cbc-modal-portal"></div>

    </div>
  `;

  // Dibujar componentes iniciales
  drawTabs();
  drawRelacion();

  // Escuchar inputs y filtros
  const searchInput = container.querySelector("#cbc-search-input");
  searchInput.oninput = (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    drawRelacion();
  };

  container.querySelector("#filter-facultad").onchange = (e) => {
    filterFacultad = e.target.value;
    currentPage = 1;
    drawRelacion();
  };

  container.querySelector("#filter-tipo").onchange = (e) => {
    filterTipo = e.target.value;
    currentPage = 1;
    drawRelacion();
  };

  container.querySelector("#filter-estado").onchange = (e) => {
    filterEstado = e.target.value;
    currentPage = 1;
    drawRelacion();
  };

  // Botón Agregar Programa
  if (isEditable) {
    container.querySelector("#btn-add-programa").onclick = () => openProgramaModal();
  }

  // Función para abrir el modal para Crear / Editar Programa
  const openProgramaModal = (prog = null) => {
    const portal = container.querySelector("#cbc-modal-portal");
    if (!portal) return;

    portal.innerHTML = `
      <div class="modal-overlay" id="programa-form-modal">
        <div class="modal-wrapper" style="max-width: 680px; width: 95%;">
          <div class="modal-header">
            <h3 class="modal-title">${prog ? 'Editar Programa Académico' : 'Agregar Nuevo Programa'}</h3>
            <button class="modal-close" id="prog-modal-close"><i data-lucide="x"></i></button>
          </div>
          
          <form id="programa-editor-form">
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto; padding-right: 8px;">
              
              <!-- Tabs internas del Formulario -->
              <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                <button type="button" class="btn btn-primary" id="form-tab-general" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">Datos Generales</button>
                <button type="button" class="btn btn-secondary" id="form-tab-presencial" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">Modalidad Presencial (CBC)</button>
                <button type="button" class="btn btn-secondary" id="form-tab-semipresencial" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">Semipresencial / A Distancia</button>
              </div>

              <!-- SUB-VIEW 1: GENERAL -->
              <div id="subview-general" style="display: block;">
                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-codigo">Código de Programa</label>
                    <input type="text" id="p-codigo" class="input-control" placeholder="Ej. P1, SE01" required value="${prog ? prog.codigo : ''}">
                  </div>
                  <div class="form-group">
                    <label for="p-facultad">Facultad</label>
                    <select id="p-facultad" class="input-control" required>
                      <option value="FAEDCOH" ${prog && prog.facultad === 'FAEDCOH' ? 'selected' : ''}>FAEDCOH</option>
                      <option value="FAING" ${prog && prog.facultad === 'FAING' ? 'selected' : ''}>FAING</option>
                      <option value="FADE" ${prog && prog.facultad === 'FADE' ? 'selected' : ''}>FADE</option>
                      <option value="FACSA" ${prog && prog.facultad === 'FACSA' ? 'selected' : ''}>FACSA</option>
                      <option value="FAU" ${prog && prog.facultad === 'FAU' ? 'selected' : ''}>FAU</option>
                      <option value="FACEM" ${prog && prog.facultad === 'FACEM' ? 'selected' : ''}>FACEM</option>
                      <option value="Post Grado" ${prog && prog.facultad === 'Post Grado' ? 'selected' : ''}>Post Grado</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="p-nombre">Nombre del Programa Académico</label>
                  <input type="text" id="p-nombre" class="input-control" placeholder="Ej. Ingeniería de Sistemas" required value="${prog ? prog.nombre : ''}">
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-tipo">Tipo / Nivel</label>
                    <select id="p-tipo" class="input-control" required>
                      <option value="Pregrado" ${prog && prog.tipo === 'Pregrado' ? 'selected' : ''}>Pregrado</option>
                      <option value="Maestría" ${prog && prog.tipo === 'Maestría' ? 'selected' : ''}>Maestría</option>
                      <option value="Doctorado" ${prog && prog.tipo === 'Doctorado' ? 'selected' : ''}>Doctorado</option>
                      <option value="Segunda Especialidad" ${prog && prog.tipo === 'Segunda Especialidad' ? 'selected' : ''}>Segunda Especialidad</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-estado">Estado del Programa</label>
                    <select id="p-estado" class="input-control" required>
                      <option value="ACTIVO" ${prog && prog.estado === 'ACTIVO' ? 'selected' : ''}>ACTIVO</option>
                      <option value="INACTIVO" ${prog && prog.estado === 'INACTIVO' ? 'selected' : ''}>INACTIVO</option>
                    </select>
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-actualizo">¿Actualizó Plan de Estudios?</label>
                    <select id="p-actualizo" class="input-control">
                      <option value="SI" ${prog && prog.actualizoPlan === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.actualizoPlan === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-enviado">Enviado a Sunedu para actualización</label>
                    <input type="text" id="p-enviado" class="input-control" placeholder="SI / NO / Año" value="${prog ? prog.enviadoSunedu : ''}">
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-ano-resolucion">Fecha de actualización según resolución (Año)</label>
                    <input type="text" id="p-ano-resolucion" class="input-control" placeholder="Ej. 2022" value="${prog ? prog.anoResolucion : ''}">
                  </div>
                  <div class="form-group">
                    <label for="p-vigencia">Vigencia del Plan de Estudios (Años - Referencial)</label>
                    <input type="number" id="p-vigencia" class="input-control" min="0" max="20" placeholder="Ej. 4" value="${prog ? prog.vigencia : ''}">
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-resol-act">Resolución de Última Actualización</label>
                    <input type="text" id="p-resol-act" class="input-control" placeholder="RES Nº 285-2022-UPT-CU" value="${prog ? prog.resolucionUltimaActualizacion : ''}">
                  </div>
                  <div class="form-group">
                    <label for="p-resol-link">Enlace de la Resolución (OneDrive o Web)</label>
                    <div style="display: flex; gap: 4px;">
                      <input type="url" id="p-resol-link" class="input-control" placeholder="https://..." value="${prog ? (prog.resolucionLink || '') : ''}" style="flex-grow: 1;">
                      <button type="button" class="btn btn-secondary" id="btn-pick-resol-onedrive" style="padding: 0.45rem 0.65rem;" title="Vincular desde OneDrive">
                        <i data-lucide="cloud" style="width: 14px; height: 14px; color: #0078d4;"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUB-VIEW 2: PRESENCIAL (CBC) -->
              <div id="subview-presencial" style="display: none;">

                <div class="form-group">
                  <label for="p-resol-adec">Resolución de Adecuación Trabajo de Investigación</label>
                  <input type="text" id="p-resol-adec" class="input-control" placeholder="RES. N°227-2024-UPT-CU" value="${prog ? prog.resolucionAdecuacion : ''}">
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-rediseno">¿La Resolución cuenta con Rediseño?</label>
                    <select id="p-rediseno" class="input-control">
                      <option value="SI" ${prog && prog.resolucionRedeseno === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.resolucionRedeseno === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-cuenta-plan">¿Cuenta con Plan de Estudios?</label>
                    <select id="p-cuenta-plan" class="input-control">
                      <option value="SI" ${prog && prog.cuentaPlanEstudios === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.cuentaPlanEstudios === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-malla">¿Malla Curricular cargada?</label>
                    <select id="p-malla" class="input-control">
                      <option value="SI" ${prog && prog.mallaCurricular === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.mallaCurricular === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-formato-c1">¿Cumple con Formato C1?</label>
                    <select id="p-formato-c1" class="input-control">
                      <option value="SI" ${prog && prog.formatoC1 === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.formatoC1 === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-tabla-equiv">¿Cuenta con Tabla de Equivalencias?</label>
                    <select id="p-tabla-equiv" class="input-control">
                      <option value="SI" ${prog && prog.tablaEquivalencias === 'SI' ? 'selected' : ''}>SI</option>
                      <option value="NO" ${prog && prog.tablaEquivalencias === 'NO' ? 'selected' : ''}>NO</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-virtual20">¿Modalidad Presencial con 20% Virtual?</label>
                    <select id="p-virtual20" class="input-control">
                      <option value="NO" ${prog && (prog.presencialVirtual20 === 'NO' || !prog.presencialVirtual20) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && (prog.presencialVirtual20 === 'SI' || prog.presencialVirtual20 === 'SÍ') ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="p-obs">Observaciones / Detalles</label>
                  <textarea id="p-obs" class="input-control" rows="2" placeholder="Ej. Fe de erratas resuelta...">${prog ? prog.observaciones : ''}</textarea>
                </div>
              </div>

              <!-- SUB-VIEW 3: SEMIPRESENCIAL -->
              <div id="subview-semipresencial" style="display: none;">
                <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-light); margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">Semipresencialidad / A Distancia</h4>
                
                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-semi-cuenta">¿Cuenta con Resolución?</label>
                    <select id="p-semi-cuenta" class="input-control">
                      <option value="NO" ${prog && (prog.semiCuentaResolucion === 'NO' || !prog.semiCuentaResolucion) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && prog.semiCuentaResolucion === 'SI' ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-semi-enviado">Año Enviado a Sunedu</label>
                    <input type="text" id="p-semi-enviado" class="input-control" placeholder="Ej. 2024" value="${prog ? prog.semiAnoEnviado : ''}">
                  </div>
                </div>

                <div class="form-group">
                  <label for="p-semi-resol">Resolución de Aprobación Semipresencial</label>
                  <input type="text" id="p-semi-resol" class="input-control" placeholder="RES. 042-2024-UPT-CU" value="${prog ? prog.semiResolucionAprobacion : ''}">
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-semi-ano">Año de Resolución</label>
                    <input type="text" id="p-semi-ano" class="input-control" placeholder="Ej. 2024" value="${prog ? prog.semiAnoResolucion : ''}">
                  </div>
                  <div class="form-group">
                    <label for="p-semi-vigencia">Vigencia (Años)</label>
                    <input type="number" id="p-semi-vigencia" class="input-control" min="0" max="20" placeholder="Ej. 2" value="${prog ? prog.semiVigencia : ''}">
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-semi-rediseno">¿Resolución cuenta con Rediseño?</label>
                    <select id="p-semi-rediseno" class="input-control">
                      <option value="NO" ${prog && (prog.semiLaResolucionRedeseno === 'NO' || !prog.semiLaResolucionRedeseno) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && prog.semiLaResolucionRedeseno === 'SI' ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-semi-plan">¿Cuenta con Plan de Estudios?</label>
                    <select id="p-semi-plan" class="input-control">
                      <option value="NO" ${prog && (prog.semiCuentaPlan === 'NO' || !prog.semiCuentaPlan) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && prog.semiCuentaPlan === 'SI' ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                </div>

                <div class="form-grid-2">
                  <div class="form-group">
                    <label for="p-semi-malla">¿Malla Curricular cargada?</label>
                    <select id="p-semi-malla" class="input-control">
                      <option value="NO" ${prog && (prog.semiMalla === 'NO' || !prog.semiMalla) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && prog.semiMalla === 'SI' ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="p-semi-c1">¿Cumple con Formato C1?</label>
                    <select id="p-semi-c1" class="input-control">
                      <option value="NO" ${prog && (prog.semiFormatoC1 === 'NO' || !prog.semiFormatoC1) ? 'selected' : ''}>NO</option>
                      <option value="SI" ${prog && prog.semiFormatoC1 === 'SI' ? 'selected' : ''}>SI</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="prog-modal-cancel">Cancelar</button>
              ${isEditable ? `
                <button type="submit" class="btn btn-primary">Guardar Programa</button>
              ` : ""}
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const formModal = portal.querySelector("#programa-form-modal");
    const closeBtn = portal.querySelector("#prog-modal-close");
    const cancelBtn = portal.querySelector("#prog-modal-cancel");
    const pForm = portal.querySelector("#programa-editor-form");

    const tabGen = portal.querySelector("#form-tab-general");
    const tabPres = portal.querySelector("#form-tab-presencial");
    const tabSemi = portal.querySelector("#form-tab-semipresencial");

    const subviewGen = portal.querySelector("#subview-general");
    const subviewPres = portal.querySelector("#subview-presencial");
    const subviewSemi = portal.querySelector("#subview-semipresencial");

    const setActiveFormTab = (view) => {
      [tabGen, tabPres, tabSemi].forEach(btn => btn.className = "btn btn-secondary");
      [subviewGen, subviewPres, subviewSemi].forEach(el => el.style.display = "none");

      if (view === "general") {
        tabGen.className = "btn btn-primary";
        subviewGen.style.display = "block";
      } else if (view === "presencial") {
        tabPres.className = "btn btn-primary";
        subviewPres.style.display = "block";
      } else {
        tabSemi.className = "btn btn-primary";
        subviewSemi.style.display = "block";
      }
    };

    tabGen.onclick = () => setActiveFormTab("general");
    tabPres.onclick = () => setActiveFormTab("presencial");
    tabSemi.onclick = () => setActiveFormTab("semipresencial");

    const closeModal = () => {
      portal.innerHTML = "";
    };

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    const btnPickResol = portal.querySelector("#btn-pick-resol-onedrive");
    if (btnPickResol) {
      btnPickResol.onclick = async () => {
        const file = await onedrive.openFilePicker({
          title: "Vincular Documento de Resolución",
          filterType: "any"
        });
        if (file) {
          portal.querySelector("#p-resol-link").value = file.url;
          if (!portal.querySelector("#p-resol-act").value) {
            portal.querySelector("#p-resol-act").value = file.nombre.replace(/\.[^/.]+$/, "");
          }
        }
      };
    }

    pForm.onsubmit = async (e) => {
      e.preventDefault();

      const pData = {
        facultad: portal.querySelector("#p-facultad").value,
        codigo: portal.querySelector("#p-codigo").value,
        nombre: portal.querySelector("#p-nombre").value,
        tipo: portal.querySelector("#p-tipo").value,
        estado: portal.querySelector("#p-estado").value,
        actualizoPlan: portal.querySelector("#p-actualizo").value,
        enviadoSunedu: portal.querySelector("#p-enviado").value,
        anoResolucion: portal.querySelector("#p-ano-resolucion").value,
        vigencia: portal.querySelector("#p-vigencia").value,
        
        resolucionUltimaActualizacion: portal.querySelector("#p-resol-act").value,
        resolucionLink: portal.querySelector("#p-resol-link").value,
        resolucionAdecuacion: portal.querySelector("#p-resol-adec").value,
        resolucionRedeseno: portal.querySelector("#p-rediseno").value,
        cuentaPlanEstudios: portal.querySelector("#p-cuenta-plan").value,
        mallaCurricular: portal.querySelector("#p-malla").value,
        formatoC1: portal.querySelector("#p-formato-c1").value,
        tablaEquivalencias: portal.querySelector("#p-tabla-equiv").value,
        presencialVirtual20: portal.querySelector("#p-virtual20").value,
        observaciones: portal.querySelector("#p-obs").value,
        
        // Semipresencial
        semiCuentaResolucion: portal.querySelector("#p-semi-cuenta").value,
        semiResolucionAprobacion: portal.querySelector("#p-semi-resol").value,
        semiAnoEnviado: portal.querySelector("#p-semi-enviado").value,
        semiAnoResolucion: portal.querySelector("#p-semi-ano").value,
        semiVigencia: portal.querySelector("#p-semi-vigencia").value,
        semiLaResolucionRedeseno: portal.querySelector("#p-semi-rediseno").value,
        semiCuentaPlan: portal.querySelector("#p-semi-plan").value,
        semiMalla: portal.querySelector("#p-semi-malla").value,
        semiFormatoC1: portal.querySelector("#p-semi-c1").value
      };

      if (prog) {
        pData.id = prog.id;
      }

      await db.savePrograma(pData);
      
      // Recargar programas
      programas = await db.getProgramas();
      closeModal();
      
      if (activeTab === "relacion") {
        drawRelacion();
      } else {
        drawEstadisticas();
      }
    };
  };
}
