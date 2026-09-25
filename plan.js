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
      <text x="${left - 8}" y="${y + 4.5}" fill="var(--text-400)" font-size="11.5" font-weight="700" text-anchor="end">${Math.round(val)}</text>
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
          <text x="${x + barWidth/2}" y="${y_bottom + 18}" fill="var(--text-300)" font-size="11" text-anchor="middle" font-weight="700">${d.label}</text>
          <text x="${x + barWidth/2}" y="${y_bottom - 5}" fill="var(--text-400)" font-size="12" font-weight="800" text-anchor="middle">0</text>
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
        
        <!-- Etiquetas de valor (más grandes) -->
        <text x="${x + barWidth/2}" y="${y_top - 8}" fill="var(--text-100)" font-size="13" font-weight="900" text-anchor="middle">${d.value}</text>
        <!-- Etiqueta de Categoría (eje X) -->
        <text x="${x + barWidth/2}" y="${y_bottom + 18}" fill="var(--text-300)" font-size="11" text-anchor="middle" font-weight="700">${d.label}</text>
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

  // Asegurar que todos los programas tengan modalidad inicializada
  programas = programas.map(p => {
    if (!p.modalidad) {
      if (p.semiCuentaResolucion === "SI" || (p.semiResolucionAprobacion && p.semiResolucionAprobacion !== "NO" && p.semiResolucionAprobacion !== "--")) {
        p.modalidad = "semipresencial";
      } else {
        p.modalidad = "presencial";
      }
    }
    return p;
  });

  // Helper para convertir fecha a formato del datepicker (YYYY-MM-DD)
  const formatForDatePicker = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("-") && dateStr.split("-").length === 3) {
      return dateStr;
    }
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    const parsedYear = parseInt(dateStr);
    if (!isNaN(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100) {
      return `${parsedYear}-01-01`;
    }
    return "";
  };

  let activeTab = "relacion"; // "relacion", "estadisticas" o "declaraciones"
  let searchQuery = "";
  let filterFacultad = "todos";
  let filterTipo = "todos";
  let filterEstado = "todos";
  let filterModalidad = "todos";
  let selectedLevelForChart = "Pregrado";
  
  let declaracionesData = [];
  let decSearchQuery = "";
  let decFilterFacultad = "todos";
  let decFilterAnio = "todos";
  let decActiveView = "tabla"; // "tabla" o "dashboard"
  
  // Paginación
  let currentPage = 1;
  const itemsPerPage = 15;

  const isEditable = userRole === "Administrador" || userRole === "Colaborador";

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
      <button class="tab-btn ${activeTab === 'declaraciones' ? 'active' : ''}" id="btn-tab-declaraciones">
        <i data-lucide="award"></i>
        <span>Seguimiento de declaraciones</span>
      </button>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Eventos de pestañas
    container.querySelector("#btn-tab-relacion").onclick = () => {
      activeTab = "relacion";
      container.querySelector("#cbc-relacion-view").style.display = "block";
      container.querySelector("#cbc-estadisticas-view").style.display = "none";
      container.querySelector("#cbc-declaraciones-view").style.display = "none";
      drawTabs();
      drawRelacion();
    };

    container.querySelector("#btn-tab-estadisticas").onclick = () => {
      activeTab = "estadisticas";
      container.querySelector("#cbc-relacion-view").style.display = "none";
      container.querySelector("#cbc-estadisticas-view").style.display = "block";
      container.querySelector("#cbc-declaraciones-view").style.display = "none";
      drawTabs();
      drawEstadisticas();
    };

    container.querySelector("#btn-tab-declaraciones").onclick = () => {
      activeTab = "declaraciones";
      container.querySelector("#cbc-relacion-view").style.display = "none";
      container.querySelector("#cbc-estadisticas-view").style.display = "none";
      container.querySelector("#cbc-declaraciones-view").style.display = "block";
      drawTabs();
      drawDeclaraciones();
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
      const matchModalidad = filterModalidad === "todos" || (p.modalidad || "").toLowerCase() === filterModalidad.toLowerCase();
      
      return matchSearch && matchFacultad && matchTipo && matchEstado && matchModalidad;
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

        let year = NaN;
        if (p.anoResolucion) {
          if (p.anoResolucion.includes("-")) {
            year = parseInt(p.anoResolucion.split("-")[0]);
          } else if (p.anoResolucion.includes("/")) {
            const parts = p.anoResolucion.split("/");
            if (parts.length === 3) year = parseInt(parts[2]);
          } else {
            year = parseInt(p.anoResolucion);
          }
        }

        let vigenciaHtml = "";
        if (isNaN(year)) {
          vigenciaHtml = `<span style="font-size: 0.62rem; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08); background-color: rgba(255,255,255,0.03); color: var(--text-300); font-weight: 700; text-transform: uppercase; line-height: 1;">Sin Fecha</span>`;
        } else {
          const diffYears = 2026 - year;
          let color = "";
          let bgColor = "";
          let borderColor = "";
          let badgeText = "";
          
          if (diffYears <= 2) {
            // Verde: menos de 3 años (0, 1 o 2 años)
            color = "#10b981";
            bgColor = "rgba(16, 185, 129, 0.1)";
            borderColor = "rgba(16, 185, 129, 0.25)";
            badgeText = "Vigente / Actualizado";
          } else if (diffYears === 3) {
            // Amarillo: 3 años exacto
            color = "#fbbf24";
            bgColor = "rgba(251, 191, 36, 0.1)";
            borderColor = "rgba(251, 191, 36, 0.25)";
            badgeText = "Vigente / Próx. Vencer";
          } else if (diffYears >= 4 && diffYears <= 6) {
            // Naranja: 4 a 6 años
            color = "#f97316";
            bgColor = "rgba(249, 115, 22, 0.1)";
            borderColor = "rgba(249, 115, 22, 0.25)";
            badgeText = "Desactualizado / En riesgo";
          } else {
            // Rojo: 7 a más años
            color = "#ef4444";
            bgColor = "rgba(239, 68, 68, 0.1)";
            borderColor = "rgba(239, 68, 68, 0.25)";
            badgeText = "Obsoleto / No vigente";
          }

          vigenciaHtml = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
              <span style="font-weight: 800; color: ${color}; font-size: 0.85rem;">${diffYears} años</span>
              <span style="font-size: 0.6rem; padding: 0.2rem 0.45rem; border-radius: 4px; border: 1px solid ${borderColor}; background-color: ${bgColor}; color: ${color}; font-weight: 700; text-transform: uppercase; line-height: 1.1; text-align: center; max-width: 140px; white-space: normal;">
                ${badgeText}
              </span>
            </div>
          `;
        }

        const obsHtml = (p.observaciones && p.observaciones.trim().length > 0) ? 
          `<span style="display: inline-flex; align-items: center; cursor: help; background-color: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); padding: 1px 4px; border-radius: 4px;" title="${p.observaciones.replaceAll('"', '&quot;')}">` +
            `<i data-lucide="bookmark" style="width: 12px; height: 12px; fill: #f43f5e; color: #f43f5e;"></i>` +
            `<span style="font-size: 0.65rem; color: #f43f5e; font-weight: 800; margin-left: 2px; text-transform: uppercase; letter-spacing: 0.3px;">Obs</span>` +
          `</span>` : '';

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
              <div style="display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span>${p.nombre}</span>
                ${obsHtml}
              </div>
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
              ${(() => {
                if (!p.anoResolucion) return "-";
                if (p.anoResolucion.includes("-")) {
                  const parts = p.anoResolucion.split("-");
                  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                return p.anoResolucion;
              })()}
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

    // Filtrar programas de acuerdo con la facultad seleccionada en estadísticas
    const statsProgs = filterFacultad === "todos" ? programas : programas.filter(p => p.facultad === filterFacultad);
    
    const totalProgs = statsProgs.length;
    const activos = statsProgs.filter(p => p.estado === "ACTIVO");
    const inactivos = statsProgs.filter(p => p.estado === "INACTIVO");

    const activosPregrado = activos.filter(p => p.tipo === "Pregrado");
    const activosMaestria = activos.filter(p => p.tipo === "Maestría");
    const activosDoctorado = activos.filter(p => p.tipo === "Doctorado");
    const activosSE = activos.filter(p => p.tipo === "Segunda Especialidad");

    const inactivosPregrado = inactivos.filter(p => p.tipo === "Pregrado");
    const inactivosMaestria = inactivos.filter(p => p.tipo === "Maestría");
    const inactivosDoctorado = inactivos.filter(p => p.tipo === "Doctorado");
    const inactivosSE = inactivos.filter(p => p.tipo === "Segunda Especialidad");

    // Helper para obtener el año de resolución de un programa
    const getProgramAge = (p) => {
      let year = NaN;
      if (p.anoResolucion) {
        if (p.anoResolucion.includes("-")) {
          year = parseInt(p.anoResolucion.split("-")[0]);
        } else if (p.anoResolucion.includes("/")) {
          const parts = p.anoResolucion.split("/");
          if (parts.length === 3) year = parseInt(parts[2]);
        } else {
          year = parseInt(p.anoResolucion);
        }
      }
      return year;
    };

    // Criterio de Actualización según SUNEDU (Declarado y en verde)
    const actualizados = statsProgs.filter(p => {
      return p.enviadoSunedu === "SI" || p.enviadoSunedu === "SÍ" || (p.enviadoSunedu && p.enviadoSunedu.length > 2 && p.enviadoSunedu !== "NO");
    });
    
    // Planes no actualizados: todos los que digan NO o vacíos
    const noActualizados = statsProgs.filter(p => {
      return !p.enviadoSunedu || p.enviadoSunedu === "NO";
    });

    const pctActualizados = totalProgs > 0 ? (actualizados.length / totalProgs) * 100 : 0;
    const pctNoActualizados = totalProgs > 0 ? (noActualizados.length / totalProgs) * 100 : 0;

    // Ratios por Modalidad
    const countPresencial = statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "presencial").length;
    const countSemipresencial = statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "semipresencial").length;
    const countDistancia = statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "a distancia / no presencial").length;

    // Matriz de actualización por Tipo de Programa (solo Activos)
    const levels = ["Pregrado", "Maestría", "Doctorado", "Segunda Especialidad"];
    const matrix = {};
    
    levels.forEach(level => {
      const levelActivos = activos.filter(p => p.tipo === level);
      
      const c_less3 = levelActivos.filter(p => {
        const age = 2026 - getProgramAge(p);
        return !isNaN(age) && age < 3;
      }).length;
      
      const c_equal3 = levelActivos.filter(p => {
        const age = 2026 - getProgramAge(p);
        return !isNaN(age) && age === 3;
      }).length;
      
      const c_4to6 = levelActivos.filter(p => {
        const age = 2026 - getProgramAge(p);
        return !isNaN(age) && age >= 4 && age <= 6;
      }).length;
      
      const c_more6 = levelActivos.filter(p => {
        const age = 2026 - getProgramAge(p);
        return isNaN(age) || age >= 7;
      }).length;
      
      matrix[level] = {
        less3: c_less3,
        equal3: c_equal3,
        range4to6: c_4to6,
        more6: c_more6,
        total: levelActivos.length
      };
    });

    // Gráficos 3D datos (más altos y legibles)
    const globalChartSvg = generate3DBarChartSVG([
      { label: "Actualizados", value: actualizados.length, color: "var(--color-cumple)" },
      { label: "No Actualizados", value: noActualizados.length, color: "var(--color-nocumple)" }
    ], 380, 220);

    const actInactChartSvg = generate3DBarChartSVG([
      { label: "Activos", value: activos.length, color: "var(--color-cumple)" },
      { label: "Inactivos", value: inactivos.length, color: "var(--color-nocumple)" }
    ], 380, 220);

    const modalityChartSvg = generate3DBarChartSVG([
      { label: "Presencial", value: countPresencial, color: "#3b82f6" },
      { label: "Semipresencial", value: countSemipresencial, color: "#8b5cf6" },
      { label: "A Distancia", value: countDistancia, color: "#06b6d4" }
    ], 380, 220);

    // NUEVO: Programas declarados por año (solo activos)
    const declaredYears = ["2021", "2022", "2023", "2024", "2025", "2026"];
    const declaredColors = ["#3b82f6", "#10b981", "#fbbf24", "#a78bfa", "#f43f5e", "#06b6d4"];
    const declaredYearCounts = {};
    declaredYears.forEach(yr => {
      declaredYearCounts[yr] = activos.filter(p => p.enviadoSunedu === yr).length;
    });

    const declaredYearChartSvg = generate3DBarChartSVG(
      declaredYears.map((yr, idx) => ({
        label: yr,
        value: declaredYearCounts[yr],
        color: declaredColors[idx % declaredColors.length]
      })),
      380,
      220
    );

    // Gráfico 3D para el tipo de programa seleccionado en el selector local
    const lvlData = matrix[selectedLevelForChart];
    const levelChartSvg = generate3DBarChartSVG([
      { label: "< 3 años", value: lvlData.less3, color: "#10b981" },
      { label: "3 años", value: lvlData.equal3, color: "#60a5fa" },
      { label: "4 a 6 años", value: lvlData.range4to6, color: "#f59e0b" },
      { label: "7 a + años", value: lvlData.more6, color: "#ef4444" }
    ], 520, 220);

    // Calcular totales de vigencias por columnas para programas activos
    let totalLess3 = 0;
    let totalEqual3 = 0;
    let totalRange4to6 = 0;
    let totalMore6 = 0;
    let totalActivos = 0;

    levels.forEach(level => {
      const data = matrix[level];
      totalLess3 += data.less3;
      totalEqual3 += data.equal3;
      totalRange4to6 += data.range4to6;
      totalMore6 += data.more6;
      totalActivos += data.total;
    });

    statsContainer.innerHTML = `
      <!-- Cabecera de Estadísticas con Selector de Facultad -->
      <div style="background: var(--bg-dark-900); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 12px; margin-top: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="bar-chart-3" style="color: var(--accent-light); width: 22px; height: 22px;"></i>
            <span>Resumen Estadístico y Tableros de Control</span>
          </h3>
          <p style="font-size: 0.8rem; color: var(--text-300); margin-top: 2px;">
            Ratios de actualización de planes, distribución por modalidad y estado de actividad académica.
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="font-size: 0.85rem; color: var(--text-200); font-weight: 600;">Facultad:</span>
          <select id="stats-faculty-select" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 200px; padding: 0.4rem 0.65rem; font-weight: 600; margin-right: 5px;">
            <option value="todos">Todas las Facultades</option>
            ${facultades.map(f => `<option value="${f}" ${filterFacultad === f ? 'selected' : ''}>${f}</option>`).join("")}
          </select>
          <button id="btn-export-word" class="btn btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; font-weight: 600;">
            <i data-lucide="file-text" style="width: 15px; height: 15px;"></i>
            <span>Exportar Reporte (Word)</span>
          </button>
        </div>
      </div>

      <!-- Cuadrícula Principal de Tarjetas de Estadísticas -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
        
        <!-- CARD 1: ACTUALIZACIÓN GLOBAL DE PLANES DE ESTUDIO -->
        <div class="card" id="card-actualizacion-global" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="check-circle-2" style="color: var(--color-cumple);"></i>
              <span>Actualización Global de Planes de Estudio</span>
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="color: var(--text-200); font-weight: 500;">Planes Actualizados (Declarado a SUNEDU)</span>
                  <span style="color: var(--color-cumple); font-weight: 700;">${actualizados.length} (${Math.round(pctActualizados * 100) / 100}%)</span>
                </div>
                <div class="progress-percentage-bar" style="height: 8px; background-color: var(--bg-dark-800); border-radius: 4px; overflow: hidden;">
                  <div class="progress-percentage-fill" style="width: ${pctActualizados}%; background-color: var(--color-cumple); height: 100%;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span style="color: var(--text-200); font-weight: 500;">Planes No Actualizados (No Declarado)</span>
                  <span style="color: var(--color-nocumple); font-weight: 700;">${noActualizados.length} (${Math.round(pctNoActualizados * 100) / 100}%)</span>
                </div>
                <div class="progress-percentage-bar" style="height: 8px; background-color: var(--bg-dark-800); border-radius: 4px; overflow: hidden;">
                  <div class="progress-percentage-fill" style="width: ${pctNoActualizados}%; background-color: var(--color-nocumple); height: 100%;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Gráfico 3D -->
          <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${globalChartSvg}
          </div>

          <!-- Lista Detallada de Programas -->
          <div id="detail-programs-list" style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 id="detail-list-title" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light); margin: 0;"></h4>
              <button id="btn-close-detail-list" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">Cerrar</button>
            </div>
            <div id="detail-list-content" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Se llena con JS -->
            </div>
          </div>
        </div>

        <!-- CARD 2: PROGRAMAS ACTIVOS VS INACTIVOS -->
        <div class="card" id="card-activos-inactivos" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="activity" style="color: var(--accent-light);"></i>
              <span>Programas Activos vs Inactivos</span>
            </h3>
            
            <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.75rem; margin: 0 0 1.25rem 0; width: 100%; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
              <thead>
                <tr style="background-color: rgba(255,255,255,0.02);">
                  <th style="padding: 0.45rem 0.6rem; text-align: left;">Nivel / Tipo</th>
                  <th class="text-center" style="color: var(--color-cumple); padding: 0.45rem 0.6rem;">Activos</th>
                  <th class="text-center" style="color: var(--color-nocumple); padding: 0.45rem 0.6rem;">Inactivos</th>
                  <th class="text-center" style="color: var(--text-100); padding: 0.45rem 0.6rem; font-weight: bold;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0.6rem;">Pregrado</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosPregrado.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-300);">${inactivosPregrado.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosPregrado.length + inactivosPregrado.length}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0.6rem;">Maestrías</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosMaestria.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-300);">${inactivosMaestria.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosMaestria.length + inactivosMaestria.length}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0.6rem;">Doctorados</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosDoctorado.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-300);">${inactivosDoctorado.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosDoctorado.length + inactivosDoctorado.length}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0.6rem;">Segunda Esp.</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosSE.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-300);">${inactivosSE.length}</td>
                  <td class="text-center" style="font-weight: 700; color: var(--text-100);">${activosSE.length + inactivosSE.length}</td>
                </tr>
                <tr style="background-color: rgba(255, 255, 255, 0.02); font-weight: bold; border-top: 1.5px solid var(--border-color);">
                  <td style="padding: 0.5rem 0.6rem;">Total</td>
                  <td class="text-center" style="font-weight: 800; color: var(--color-cumple);">${activos.length}</td>
                  <td class="text-center" style="font-weight: 800; color: var(--color-nocumple);">${inactivos.length}</td>
                  <td class="text-center" style="font-weight: 800; color: var(--text-100);">${activos.length + inactivos.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Gráfico 3D -->
          <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${actInactChartSvg}
          </div>

          <!-- Lista Detallada de Programas -->
          <div id="detail-programs-list" style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 id="detail-list-title" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light); margin: 0;"></h4>
              <button id="btn-close-detail-list" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">Cerrar</button>
            </div>
            <div id="detail-list-content" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Se llena con JS -->
            </div>
          </div>
        </div>

        <!-- CARD 3: PROGRAMAS POR MODALIDAD -->
        <div class="card" id="card-modalidades" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="layers" style="color: #a78bfa;"></i>
              <span>Distribución por Modalidad</span>
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem; margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
                <span style="color: var(--text-300);">Presencial:</span>
                <span class="badge-status info" style="font-weight: bold; background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: rgba(59, 130, 246, 0.2);">${countPresencial} programas</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
                <span style="color: var(--text-300);">Semipresencial:</span>
                <span class="badge-status info" style="font-weight: bold; background-color: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-color: rgba(139, 92, 246, 0.2);">${countSemipresencial} programas</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem;">
                <span style="color: var(--text-300);">A distancia / no presencial:</span>
                <span class="badge-status info" style="font-weight: bold; background-color: rgba(6, 182, 212, 0.1); color: #06b6d4; border-color: rgba(6, 182, 212, 0.2);">${countDistancia} programas</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid var(--border-color); padding-top: 0.5rem; font-weight: bold;">
                <span style="color: var(--text-100);">Total Programas:</span>
                <span class="badge-status cumple" style="font-weight: bold; background-color: rgba(16, 185, 129, 0.1); color: var(--color-cumple); border-color: rgba(16, 185, 129, 0.2);">${countPresencial + countSemipresencial + countDistancia} programas</span>
              </div>
            </div>
          </div>
          
          <!-- Gráfico 3D -->
          <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${modalityChartSvg}
          </div>

          <!-- Lista Detallada de Programas -->
          <div id="detail-programs-list" style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 id="detail-list-title" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light); margin: 0;"></h4>
              <button id="btn-close-detail-list" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">Cerrar</button>
            </div>
            <div id="detail-list-content" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Se llena con JS -->
            </div>
          </div>
        </div>

        <!-- CARD 6: PROGRAMAS DECLARADOS POR AÑO (SOLO ACTIVOS) -->
        <div class="card" id="card-declarados-ano" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="calendar-check" style="color: #fbbf24;"></i>
              <span>Declaraciones SUNEDU por Año (Activos)</span>
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.75rem; margin-bottom: 1.25rem; background-color: var(--bg-dark-900); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--border-color);">
              ${declaredYears.map(yr => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                  <span style="color: var(--text-300); font-weight: 500;">Año ${yr}</span>
                  <span style="font-weight: 700; color: #fbbf24;">${declaredYearCounts[yr]} prog.</span>
                </div>
              `).join("")}
            </div>
          </div>
          
          <!-- Gráfico 3D -->
          <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${declaredYearChartSvg}
          </div>

          <!-- Lista Detallada de Programas -->
          <div id="detail-programs-list" style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 id="detail-list-title" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light); margin: 0;"></h4>
              <button id="btn-close-detail-list" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">Cerrar</button>
            </div>
            <div id="detail-list-content" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Se llena con JS -->
            </div>
          </div>
        </div>

      </div>

      <!-- FILA 2: ACTUALIZACIÓN POR TIPO DE PROGRAMA (MATRIZ + DETALLE EN GRÁFICO 3D) -->
      <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap: 1.5rem;">
        
        <!-- CARD 4: MATRIZ DE ACTUALIZACIÓN DE PROGRAMAS ACTIVOS -->
        <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="calendar" style="color: var(--color-proceso);"></i>
              <span>Vigencia del Plan de Estudios por Tipo (Programas Activos)</span>
            </h3>
            
            <table class="summary-table" style="background-color: var(--bg-dark-900); font-size: 0.75rem; margin: 0; width: 100%; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
              <thead>
                <tr style="background-color: rgba(255,255,255,0.02);">
                  <th style="padding: 0.6rem; text-align: left;">Tipo / Nivel</th>
                  <th class="text-center" style="padding: 0.6rem; color: var(--color-cumple); font-weight: 600;">&lt; 3 años</th>
                  <th class="text-center" style="padding: 0.6rem; color: #60a5fa; font-weight: 600;">3 años</th>
                  <th class="text-center" style="padding: 0.6rem; color: var(--color-proceso); font-weight: 600;">4 a 6 años</th>
                  <th class="text-center" style="padding: 0.6rem; color: var(--color-nocumple); font-weight: 600;">7 a + años</th>
                  <th class="text-center" style="padding: 0.6rem; font-weight: bold; background-color: rgba(255,255,255,0.01);">Total Activos</th>
                </tr>
              </thead>
              <tbody>
                ${levels.map(level => {
                  const data = matrix[level];
                  return `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 0.6rem; font-weight: 600; color: var(--text-200);">${level}</td>
                      <td class="text-center" style="font-weight: 700; color: var(--color-cumple);">${data.less3}</td>
                      <td class="text-center" style="font-weight: 700; color: #60a5fa;">${data.equal3}</td>
                      <td class="text-center" style="font-weight: 700; color: var(--color-proceso);">${data.range4to6}</td>
                      <td class="text-center" style="font-weight: 700; color: var(--color-nocumple);">${data.more6}</td>
                      <td class="text-center" style="font-weight: 800; color: var(--text-100); background-color: rgba(255,255,255,0.01);">${data.total}</td>
                    </tr>
                  `;
                }).join("")}
                <tr style="background-color: rgba(255, 255, 255, 0.02); font-weight: bold; border-top: 1.5px solid var(--border-color);">
                  <td style="padding: 0.6rem; font-weight: 700;">Total</td>
                  <td class="text-center" style="font-weight: 800; color: var(--color-cumple);">${totalLess3}</td>
                  <td class="text-center" style="font-weight: 800; color: #60a5fa;">${totalEqual3}</td>
                  <td class="text-center" style="font-weight: 800; color: var(--color-proceso);">${totalRange4to6}</td>
                  <td class="text-center" style="font-weight: 800; color: var(--color-nocumple);">${totalMore6}</td>
                  <td class="text-center" style="font-weight: 900; color: var(--text-100); background-color: rgba(255,255,255,0.02);">${totalActivos}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="margin-top: 1rem; padding: 0.75rem; background-color: rgba(255,255,255,0.01); border-radius: 6px; border: 1px dashed var(--border-color); font-size: 0.75rem; color: var(--text-300); line-height: 1.4;">
            <strong style="color: var(--text-100);">Nota:</strong> La semaforización de la vigencia se calcula a partir del año de aprobación de la resolución en relación al año fiscal actual de la simulación (<strong style="color: var(--accent-light);">2026</strong>).
          </div>
        </div>

        <!-- CARD 5: DETALLE GRÁFICO 3D POR TIPO -->
        <div class="card" id="card-detalle-distribucion" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
              <h3 style="font-size: 1.025rem; display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="bar-chart-4" style="color: #60a5fa; width: 18px; height: 18px;"></i>
                <span>Detalle de Distribución de Planes</span>
              </h3>
              
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 0.75rem; color: var(--text-300);">Visualizar:</span>
                <select id="stats-level-chart-select" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.75rem; width: 140px; padding: 0.25rem 0.5rem; font-weight: 600;">
                  ${levels.map(l => `<option value="${l}" ${selectedLevelForChart === l ? 'selected' : ''}>${l}</option>`).join("")}
                </select>
              </div>
            </div>
            
            <p style="font-size: 0.75rem; color: var(--text-300); margin-bottom: 1rem; line-height: 1.3;">
              Visualización interactiva en 3D de las bandas de vigencia para programas académicos activos de <strong style="color: var(--accent-light);">${selectedLevelForChart}</strong>.
            </p>
          </div>

          <!-- Gráfico 3D -->
          <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
            ${levelChartSvg}
          </div>

          <!-- Lista Detallada de Programas -->
          <div id="detail-programs-list" style="margin-top: 1.25rem; border-top: 1px solid var(--border-color); padding-top: 1rem; display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 id="detail-list-title" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light); margin: 0;"></h4>
              <button id="btn-close-detail-list" class="btn btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.7rem; border-radius: 4px;">Cerrar</button>
            </div>
            <div id="detail-list-content" style="max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Se llena con JS -->
            </div>
          </div>
        </div>

      </div>
    `;

    // Vincular Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Vincular el tooltip flotante a los gráficos 3D
    attachTooltipEvents(statsContainer);

    // NUEVO: Vincular eventos de click a las barras de todas las tarjetas para listar programas
    const bindChartClickEvents = (cardEl, getProgramsFn) => {
      if (!cardEl) return;
      const listContainer = cardEl.querySelector("#detail-programs-list");
      const listTitle = cardEl.querySelector("#detail-list-title");
      const listContent = cardEl.querySelector("#detail-list-content");
      const closeBtn = cardEl.querySelector("#btn-close-detail-list");

      if (closeBtn) {
        closeBtn.onclick = () => {
          listContainer.style.display = "none";
        };
      }

      cardEl.querySelectorAll(".bar-3d-group").forEach(group => {
        group.addEventListener("click", () => {
          const label = group.getAttribute("data-label");
          const filteredProgs = getProgramsFn(label);

          listTitle.innerHTML = `Listado: <strong>${label}</strong> (Total: <strong>${filteredProgs.length}</strong>)`;
          
          if (filteredProgs.length === 0) {
            listContent.innerHTML = `<p style="font-size: 0.75rem; color: var(--text-400); text-align: center; padding: 1rem;">No hay programas en esta categoría.</p>`;
          } else {
            listContent.innerHTML = filteredProgs.map(p => {
              const age = 2026 - getProgramAge(p);
              const ageText = isNaN(age) ? "Sin fecha de resolución" : `Antigüedad: ${age} años`;
              const obsHtml = (p.observaciones && p.observaciones.trim().length > 0) ?
                `<span style="display: inline-flex; align-items: center; cursor: help; background-color: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); padding: 0.5px 3px; border-radius: 3px;" title="${p.observaciones.replaceAll('"', '&quot;')}">` +
                  `<i data-lucide="bookmark" style="width: 10px; height: 10px; fill: #f43f5e; color: #f43f5e;"></i>` +
                  `<span style="font-size: 0.58rem; color: #f43f5e; font-weight: 800; margin-left: 1px; text-transform: uppercase;">Obs</span>` +
                `</span>` : '';

              return `
                <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-dark-800); padding: 0.5rem 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.75rem;">
                  <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span style="font-weight: 700; color: var(--text-100); display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <span>${p.codigo} - ${p.nombre}</span>
                      ${obsHtml}
                    </span>
                    <span style="font-size: 0.65rem; color: var(--text-400);">${p.facultad} • Resol: ${p.resolucionUltimaActualizacion || 'Sin resolución'}</span>
                  </div>
                  <span class="badge-status info" style="font-size: 0.65rem; padding: 0.15rem 0.4rem; font-weight: 700;">${ageText}</span>
                </div>
              `;
            }).join("");
          }

          listContainer.style.display = "block";
          listContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
    };

    // Vincular Card 1: Actualización Global
    const cardGlobal = statsContainer.querySelector("#card-actualizacion-global");
    bindChartClickEvents(cardGlobal, (label) => {
      if (label === "Actualizados") {
        return statsProgs.filter(p => p.enviadoSunedu === "SI" || p.enviadoSunedu === "SÍ" || (p.enviadoSunedu && p.enviadoSunedu.length > 2 && p.enviadoSunedu !== "NO"));
      } else {
        return statsProgs.filter(p => !p.enviadoSunedu || p.enviadoSunedu === "NO");
      }
    });

    // Vincular Card 2: Activos vs Inactivos
    const cardActivos = statsContainer.querySelector("#card-activos-inactivos");
    bindChartClickEvents(cardActivos, (label) => {
      if (label === "Activos") {
        return statsProgs.filter(p => p.estado === "ACTIVO");
      } else {
        return statsProgs.filter(p => p.estado === "INACTIVO");
      }
    });

    // Vincular Card 3: Distribución por Modalidad
    const cardModalidad = statsContainer.querySelector("#card-modalidades");
    bindChartClickEvents(cardModalidad, (label) => {
      if (label === "Presencial") {
        return statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "presencial");
      } else if (label === "Semipresencial") {
        return statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "semipresencial");
      } else {
        return statsProgs.filter(p => (p.modalidad || "").toLowerCase() === "a distancia / no presencial");
      }
    });

    // Vincular Card 6: Declarados por Año (Planes Activos)
    const cardDeclaradosAno = statsContainer.querySelector("#card-declarados-ano");
    bindChartClickEvents(cardDeclaradosAno, (label) => {
      return activos.filter(p => p.enviadoSunedu === label);
    });

    // Vincular Card 5: Detalle por Nivel
    const cardDetalle = statsContainer.querySelector("#card-detalle-distribucion");
    bindChartClickEvents(cardDetalle, (label) => {
      const activeLvlProgs = statsProgs.filter(p => p.estado === "ACTIVO" && p.tipo === selectedLevelForChart);
      if (label === "< 3 años") {
        return activeLvlProgs.filter(p => {
          const age = 2026 - getProgramAge(p);
          return !isNaN(age) && age < 3;
        });
      } else if (label === "3 años") {
        return activeLvlProgs.filter(p => {
          const age = 2026 - getProgramAge(p);
          return !isNaN(age) && age === 3;
        });
      } else if (label === "4 a 6 años") {
        return activeLvlProgs.filter(p => {
          const age = 2026 - getProgramAge(p);
          return !isNaN(age) && age >= 4 && age <= 6;
        });
      } else {
        return activeLvlProgs.filter(p => {
          const age = 2026 - getProgramAge(p);
          return isNaN(age) || age >= 7;
        });
      }
    });

    // Evento del selector de facultad
    const statsSelect = statsContainer.querySelector("#stats-faculty-select");
    if (statsSelect) {
      statsSelect.onchange = (e) => {
        filterFacultad = e.target.value;
        // Sincronizar con el filtro de la pestaña relación si existe
        const relSelect = container.querySelector("#filter-facultad");
        if (relSelect) relSelect.value = filterFacultad;
        // Redibujar
        drawEstadisticas();
        drawEstadisticas();
      };
    }

    const btnExportWord = statsContainer.querySelector("#btn-export-word");
    if (btnExportWord) {
      btnExportWord.onclick = () => {
        exportarReporteWord();
      };
    }

    const generateCoverPageImage = (reportTitle, subTitle = "") => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = 'assets/caratula.jpg';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 724;
          canvas.height = 1024;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(60, 440, 620, 180);
          ctx.fillRect(60, 725, 120, 30);
          ctx.fillStyle = '#0b2545';
          ctx.font = "bold 26px Georgia, 'Times New Roman', serif";
          const fullTitleText = subTitle ? reportTitle + "\n" + subTitle : reportTitle;
          const lines = fullTitleText.split('\n');
          let currentY = 488;
          const x = 64;
          const maxWidth = 600;
          const lineHeight = 34;
          for (const lineText of lines) {
            const words = lineText.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
              let testLine = line + words[n] + ' ';
              let metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
              } else {
                line = testLine;
              }
            }
            ctx.fillText(line, x, currentY);
            currentY += lineHeight;
          }
          ctx.font = "bold 26px Georgia, 'Times New Roman', serif";
          ctx.fillStyle = '#0b2545';
          ctx.fillText(new Date().getFullYear().toString(), 64, 750);
          resolve(canvas.toDataURL('image/jpeg', 0.95));
        };
        img.onerror = () => {
          resolve('');
        };
      });
    };

    const exportarReporteWord = async () => {
      const facultadTitle = filterFacultad === "todos" ? "Todas las Facultades" : filterFacultad;
      const reportTitle = "REPORTE ESTADÍSTICO DE PLANES DE ESTUDIO";
      const currentYear = new Date().getFullYear();

      // Generar imagen de carátula
      const coverImg = await generateCoverPageImage(reportTitle, "FACULTAD: " + facultadTitle);

      // Construcción del contenido HTML del Word con diseño institucional y análisis detallados
      let docHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>Reporte Estadístico de Planes de Estudio - UPT</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page CoverPage {
            size: 210mm 297mm;
            margin: 0mm 0mm 0mm 0mm;
            mso-header-margin: 0mm;
            mso-footer-margin: 0mm;
            mso-header: none;
            mso-footer: none;
          }
          @page SectionRpt {
            size: 210mm 297mm;
            margin: 25mm 25mm 25mm 25mm;
            mso-header-margin: 15mm;
            mso-footer-margin: 15mm;
            mso-header: none;
            mso-footer: none;
          }
          div.Cover {
            page: CoverPage;
            margin: 0mm;
            padding: 0mm;
            width: 210mm;
            height: 297mm;
          }
          div.Report {
            page: SectionRpt;
          }
          body {
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            color: #2d3748;
            line-height: 1.6;
          }
          h1 {
            font-size: 20pt;
            color: #0b2545;
            text-align: center;
            margin-top: 50px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          h2 {
            font-size: 14pt;
            color: #134074;
            border-bottom: 2px solid #0078d4;
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
            font-weight: bold;
          }
          h3 {
            font-size: 12pt;
            color: #2d3748;
            margin-top: 20px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          p {
            margin-bottom: 12px;
            text-align: justify;
          }
          table.data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            margin-bottom: 20px;
          }
          table.data-table th {
            background-color: #134074;
            color: #ffffff;
            font-weight: bold;
            padding: 8px 10px;
            font-size: 10pt;
            border: 1px solid #cbd5e0;
            text-align: left;
          }
          table.data-table td {
            padding: 8px 10px;
            font-size: 9.5pt;
            border: 1px solid #cbd5e0;
          }
          table.data-table tr.total-row {
            font-weight: bold;
            background-color: #e6f2ff;
          }
          .analysis-box {
            background-color: #f8fafc;
            border-left: 4px solid #0078d4;
            padding: 12px 18px;
            margin-top: 15px;
            margin-bottom: 25px;
            font-style: italic;
          }
          .analysis-title {
            font-weight: bold;
            color: #0078d4;
            margin-bottom: 6px;
            font-size: 10.5pt;
            font-style: normal;
          }
          .page-break {
            page-break-before: always;
            clear: both;
          }
          .text-center {
            text-align: center;
          }
        </style>
      </head>
      <body>

        <!-- PÁGINA 1: PORTADA (Con la imagen generada, sin bordes, formato A4) -->
        ${coverImg ? `
        <div class="Cover">
          <table border="0" cellpadding="0" cellspacing="0" style="width: 210mm; height: 297mm; border-collapse: collapse; margin: 0; padding: 0;">
            <tr>
              <td style="text-align: center; vertical-align: top; padding: 0; margin: 0; width: 210mm; height: 297mm;">
                <img src="${coverImg}" style="width: 210mm; height: 297mm; display: block; margin: 0; padding: 0;" />
              </td>
            </tr>
          </table>
        </div>
        ` : ''}

        <div class="Report">
          <!-- PÁGINA 2: ACTUALIZACIÓN GLOBAL -->
          <h2>1. ACTUALIZACIÓN GLOBAL DE PLANES DE ESTUDIO (SUNEDU)</h2>
          <p>
            El primer indicador evalúa el cumplimiento regulatorio de los planes de estudio en función de su declaración e informe de actualización ante la Superintendencia Nacional de Educación Superior Universitaria (SUNEDU). Este registro binario diferencia a los programas que cuentan con el trámite correspondiente finalizado de aquellos pendientes de validación.
          </p>

          <table class="data-table">
            <thead>
              <tr>
                <th>Estado de Declaración a SUNEDU</th>
                <th style="text-align: center; width: 25%;">Cantidad de Planes</th>
                <th style="text-align: center; width: 25%;">Porcentaje (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Planes Actualizados (Enviado a SUNEDU)</td>
                <td class="text-center" style="font-weight: bold; color: #0078d4;">${actualizados.length}</td>
                <td class="text-center" style="font-weight: bold; color: #0078d4;">${Math.round(pctActualizados * 100) / 100}%</td>
              </tr>
              <tr>
                <td>Planes No Actualizados (Pendientes / No Declarados)</td>
                <td class="text-center" style="font-weight: bold; color: #134074;">${noActualizados.length}</td>
                <td class="text-center" style="font-weight: bold; color: #134074;">${Math.round(pctNoActualizados * 100) / 100}%</td>
              </tr>
              <tr class="total-row">
                <td>Total Evaluado</td>
                <td class="text-center">${totalProgs}</td>
                <td class="text-center">100.00%</td>
              </tr>
            </tbody>
          </table>

          <div class="analysis-box">
            <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL EN GESTIÓN EDUCATIVA (Estadístico Senior)</div>
            <p>
              Desde la perspectiva del análisis cuantitativo aplicado a la gestión educativa, la tasa de actualización global de los planes de estudio representa un indicador de calidad de tipo binario (cumplimiento regulatorio versus rezago) crítico para la acreditación y el licenciamiento continuo de la universidad. Al evaluar la facultad o conjunto de programas analizados (${facultadTitle}), con un total de ${totalProgs} planes de estudio, se observa que el ${Math.round(pctActualizados * 100) / 100}% se encuentra en estado actualizado ante SUNEDU (equivalente a ${actualizados.length} planes), mientras que el ${Math.round(pctNoActualizados * 100) / 100}% se mantiene pendiente de declaración o no actualizado (${noActualizados.length} planes). Estadísticamente, una concentración elevada de planes no actualizados incrementa significativamente la variabilidad en los estándares de aprendizaje impartidos y debilita la coherencia curricular de la institución. Para la gestión educativa, este desequilibrio porcentual introduce riesgos administrativos y académicos durante procesos de auditoría externa. Desde un enfoque predictivo, se aconseja priorizar la regularización curricular de los programas pendientes a fin de establecer un límite de confianza del 95% de actualización. De esta manera se homogeniza la calidad docente y se minimiza la desviación típica en el cumplimiento de los estándares de licenciamiento exigidos por las entidades supervisoras nacionales.
            </p>
          </div>

          <div class="page-break"></div>

          <!-- PÁGINA 3: ACTIVOS VS INACTIVOS -->
          <h2>2. ANÁLISIS DE ACTIVIDAD ACADÉMICA Y PORTAFOLIO DE PROGRAMAS</h2>
          <p>
            Este indicador muestra la relación entre los programas académicos que se encuentran en estado ACTIVO frente a aquellos catalogados como INACTIVOS en el portafolio curricular de la institución. La estratificación se realiza por niveles de enseñanza (Pregrado, Maestría, Doctorado y Segunda Especialidad).
          </p>

          <table class="data-table">
            <thead>
              <tr>
                <th>Nivel Académico / Tipo de Programa</th>
                <th style="text-align: center; width: 25%;">Programas Activos</th>
                <th style="text-align: center; width: 25%;">Programas Inactivos</th>
                <th style="text-align: center; width: 20%;">Total Nivel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pregrado</td>
                <td class="text-center" style="font-weight: bold;">${activosPregrado.length}</td>
                <td class="text-center" style="color: #4a5568;">${inactivosPregrado.length}</td>
                <td class="text-center">${activosPregrado.length + inactivosPregrado.length}</td>
              </tr>
              <tr>
                <td>Maestría</td>
                <td class="text-center" style="font-weight: bold;">${activosMaestria.length}</td>
                <td class="text-center" style="color: #4a5568;">${inactivosMaestria.length}</td>
                <td class="text-center">${activosMaestria.length + inactivosMaestria.length}</td>
              </tr>
              <tr>
                <td>Doctorado</td>
                <td class="text-center" style="font-weight: bold;">${activosDoctorado.length}</td>
                <td class="text-center" style="color: #4a5568;">${inactivosDoctorado.length}</td>
                <td class="text-center">${activosDoctorado.length + inactivosDoctorado.length}</td>
              </tr>
              <tr>
                <td>Segunda Especialidad</td>
                <td class="text-center" style="font-weight: bold;">${activosSE.length}</td>
                <td class="text-center" style="color: #4a5568;">${inactivosSE.length}</td>
                <td class="text-center">${activosSE.length + inactivosSE.length}</td>
              </tr>
              <tr class="total-row">
                <td>Total General</td>
                <td class="text-center" style="color: #0078d4;">${activos.length}</td>
                <td class="text-center" style="color: #134074;">${inactivos.length}</td>
                <td class="text-center">${activos.length + inactivos.length}</td>
              </tr>
            </tbody>
          </table>

          <div class="analysis-box">
            <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL EN GESTIÓN EDUCATIVA (Estadístico Senior)</div>
            <p>
              El análisis de la distribución de programas académicos en estado activo frente a inactivos, estratificado por niveles de enseñanza (Pregrado, Maestría, Doctorado y Segunda Especialidad), proporciona información diagnóstica esencial para la toma de decisiones estratégicas y la gestión óptima del portafolio curricular. Contamos con un total de ${activos.length} programas activos y ${inactivos.length} programas inactivos dentro del portafolio curricular evaluado. Desde la mirada de la modelación operativa en la gestión educativa, un volumen excesivo de programas inactivos representa recursos docentes e infraestructura subutilizados, incrementando los costos fijos indirectos por programa. Por otro lado, una saturación de programas activos sin una tasa de rotación anual planificada puede dispersar los esfuerzos de autoevaluación e internacionalización. Estadísticamente, se sugiere correlacionar la inactividad de programas con la demanda laboral regional para proyectar el ciclo de vida de los planes académicos. Esto permitirá estructurar un modelo de optimización que prediga con precisión probabilística la necesidad de cierre temporal o rediseño de las menciones académicas de posgrado y pregrado, asegurando la sostenibilidad y competitividad institucional basada en datos de demanda empíricos.
            </p>
          </div>

          <div class="page-break"></div>

          <!-- PÁGINA 4: DISTRIBUCIÓN POR MODALIDAD -->
          <h2>3. DISTRIBUCIÓN POR MODALIDAD DE ESTUDIO Y COBERTURA ACADÉMICA</h2>
          <p>
            La segregación de la oferta académica por modalidades permite evaluar el nivel de flexibilidad educativa y cobertura territorial de la universidad. Las modalidades analizadas corresponden a Presencial, Semipresencial y A Distancia.
          </p>

          <table class="data-table">
            <thead>
              <tr>
                <th>Modalidad de Enseñanza</th>
                <th style="text-align: center; width: 30%;">Número de Programas</th>
                <th style="text-align: center; width: 30%;">Distribución Porcentual (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Presencial</td>
                <td class="text-center">${countPresencial}</td>
                <td class="text-center">${totalProgs > 0 ? Math.round((countPresencial / totalProgs) * 10000) / 100 : 0}%</td>
              </tr>
              <tr>
                <td>Semipresencial</td>
                <td class="text-center">${countSemipresencial}</td>
                <td class="text-center">${totalProgs > 0 ? Math.round((countSemipresencial / totalProgs) * 10000) / 100 : 0}%</td>
              </tr>
              <tr>
                <td>A distancia / no presencial</td>
                <td class="text-center">${countDistancia}</td>
                <td class="text-center">${totalProgs > 0 ? Math.round((countDistancia / totalProgs) * 10000) / 100 : 0}%</td>
              </tr>
              <tr class="total-row">
                <td>Total Programas</td>
                <td class="text-center">${countPresencial + countSemipresencial + countDistancia}</td>
                <td class="text-center">100.00%</td>
              </tr>
            </tbody>
          </table>

          <div class="analysis-box">
            <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL EN GESTIÓN EDUCATIVA (Estadístico Senior)</div>
            <p>
              La segregación de los programas según su modalidad de enseñanza (Presencial: ${countPresencial}, Semipresencial: ${countSemipresencial}, y A Distancia: ${countDistancia}) conforma una variable categórica nominal fundamental para evaluar la cobertura y la adaptabilidad institucional en la gestión educativa contemporánea. Desde el punto de vista de la gestión en educación, esta distribución porcentual ilustra la diversificación de la oferta educativa de la universidad y su capacidad de resiliencia frente a cambios demográficos y tecnológicos. Un estadístico en gestión educativa debe analizar los índices de aprobación y deserción de estudiantes según cada modalidad de manera segmentada para construir curvas de retención estudiantil personalizadas. Aplicando pruebas estadísticas no paramétricas (como la prueba de chi-cuadrada de independencia) con un p-valor menor a 0.05, es viable contrastar si la modalidad influye significativamente en la tasa de deserción temprana. En última instancia, mantener una distribución equilibrada y controlada de modalidades de estudio mitiga el riesgo de concentración de matrícula y optimiza la distribución de recursos tecnológicos y físicos, permitiendo planificar ampliaciones de campus o inversiones en servidores virtuales de acuerdo con la proyección estadística del número de ingresantes.
            </p>
          </div>

          <div class="page-break"></div>

          <!-- PÁGINA 5: VIGENCIA Y ANTIGÜEDAD -->
          <h2>4. ANÁLISIS DE SUPERVIVENCIA Y VIGENCIA TEMPORAL DE PLANES DE ESTUDIO</h2>
          <p>
            Este indicador representa la vigencia temporal de los planes de estudio para los programas académicos que se encuentran en estado ACTIVO. La clasificación temporal evalúa la antigüedad en años desde la aprobación de su última resolución de actualización (referencia año fiscal de simulación: 2026).
          </p>

          <table class="data-table">
            <thead>
              <tr>
                <th>Nivel Académico</th>
                <th style="text-align: center; width: 18%; color: #0078d4;">&lt; 3 años</th>
                <th style="text-align: center; width: 18%; color: #2b6cb0;">3 años</th>
                <th style="text-align: center; width: 18%; color: #134074;">4 a 6 años</th>
                <th style="text-align: center; width: 18%; color: #4a5568;">7 a + años</th>
                <th style="text-align: center; width: 18%; font-weight: bold;">Total Activos</th>
              </tr>
            </thead>
            <tbody>
              ${levels.map(level => {
                const data = matrix[level];
                return `
                  <tr>
                    <td style="font-weight: bold;">${level}</td>
                    <td class="text-center">${data.less3}</td>
                    <td class="text-center">${data.equal3}</td>
                    <td class="text-center">${data.range4to6}</td>
                    <td class="text-center">${data.more6}</td>
                    <td class="text-center" style="font-weight: bold; background-color: #f8fafc;">${data.total}</td>
                  </tr>
                `;
              }).join("")}
              <tr class="total-row" style="background-color: #edf2f7;">
                <td>Total Acumulado</td>
                <td class="text-center" style="color: #0078d4;">${totalLess3}</td>
                <td class="text-center" style="color: #2b6cb0;">${totalEqual3}</td>
                <td class="text-center" style="color: #134074;">${totalRange4to6}</td>
                <td class="text-center" style="color: #4a5568;">${totalMore6}</td>
                <td class="text-center" style="background-color: #e2e8f0;">${totalActivos}</td>
              </tr>
            </tbody>
          </table>

          <div class="analysis-box">
            <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL EN GESTIÓN EDUCATIVA (Estadístico Senior)</div>
            <p>
              La vigencia temporal de los planes de estudio para los programas activos es un indicador cuantitativo continuo clave para evaluar la pertinencia curricular y la supervivencia de la oferta formativa institucional. Al discretizar la antigüedad en bandas temporales (menor a 3 años: ${totalLess3}, igual a 3 años: ${totalEqual3}, de 4 a 6 años: ${totalRange4to6}, y de 7 a más años: ${totalMore6}), se evidencia que el control estadístico de procesos (SPC) es indispensable para mitigar el riesgo de obsolescencia. Los planes que se sitúan en la categoría de 7 a más años representan desviaciones significativas respecto a la media de vigencia recomendada, lo que afecta directamente el cumplimiento de las Condiciones Básicas de Calidad (CBC) de la SUNEDU. Desde el enfoque estadístico de gestión educativa, el objetivo probabilístico es sostener la mediana de la antigüedad por debajo de los 3 años. Se aconseja programar intervenciones curriculares prioritarias sobre los programas de 4 a 6 años antes de que transicionen de forma natural hacia la banda de obsolescencia de 7 o más años, reduciendo la varianza del rendimiento académico interfacultades y garantizando un perfil de egresado alineado con las demandas sociolaborales del entorno actual.
            </p>
          </div>

          <br><br><br>
          <table style="width: 100%; margin-top: 50px; border: none;">
            <tr>
              <td style="text-align: center; border: none;">
                <hr style="border: 0; border-top: 1px solid #cbd5e0; width: 40%; margin: 0 auto 15px auto;">
                <span style="font-size: 10pt; font-weight: bold; color: #0b2545;">SISTEMA DE INFORMACIÓN Y MONITOREO DE LAS CONDICIONES BÁSICAS DE CALIDAD (SIM-CBC)</span><br>
                <span style="font-size: 8.5pt; color: #718096; font-weight: 500;">Evaluador Curricular y Licenciamiento CBC - UPT</span>
              </td>
            </tr>
          </table>
        </div>

      </body>
      </html>
      `;

      const blob = new Blob(['\ufeff' + docHTML], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Reporte_Estadistico_Planes_Estudio_${filterFacultad.replace(/\s+/g, '_')}_2026.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    // Evento del selector de nivel para el gráfico de vigencia detallado
    const levelChartSelect = statsContainer.querySelector("#stats-level-chart-select");
    if (levelChartSelect) {
      levelChartSelect.onchange = (e) => {
        selectedLevelForChart = e.target.value;
        drawEstadisticas();
      };
    }
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

              <!-- Filtro Modidad -->
              <select id="filter-modalidad" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 180px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
                <option value="todos">Todas las Modalidades</option>
                <option value="presencial" ${filterModalidad === 'presencial' ? 'selected' : ''}>presencial</option>
                <option value="semipresencial" ${filterModalidad === 'semipresencial' ? 'selected' : ''}>semipresencial</option>
                <option value="a distancia / no presencial" ${filterModalidad === 'a distancia / no presencial' ? 'selected' : ''}>a distancia / no presencial</option>
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

      <!-- VISTA 3: SEGUIMIENTO DE DECLARACIONES (Lectura, cargada dinámicamente) -->
      <div id="cbc-declaraciones-view" style="display: none;">
        <!-- Aquí se cargará la tabla de seguimiento de declaraciones -->
      </div>

      <!-- Portal del Modal -->
      <div id="cbc-modal-portal"></div>

    </div>
  `;

  const drawDeclaraciones = async () => {
    const decContainer = container.querySelector("#cbc-declaraciones-view");
    if (!decContainer) return;

    decContainer.innerHTML = `
      <div class="loader-container">
        <div class="loader"></div>
        <p>Cargando seguimiento de declaraciones...</p>
      </div>
    `;

    try {
      let res = await fetch("/api/declaraciones").catch(() => null);
      if (!res || !res.ok) {
        res = await fetch("./declaraciones_seed.json?v=" + Date.now()).catch(() => null);
      }
      if (res && res.ok) {
        const json = await res.json();
        if (Array.isArray(json)) {
          declaracionesData = json;
        } else if (json.status === "success" && Array.isArray(json.data)) {
          declaracionesData = json.data;
        } else if (json.data && Array.isArray(json.data)) {
          declaracionesData = json.data;
        }
      }
    } catch (e) {
      console.warn("Error cargando declaraciones del servidor:", e);
    }

    renderDeclaracionesTable();
  };

  const renderDeclaracionesTable = () => {
    const decContainer = container.querySelector("#cbc-declaraciones-view");
    if (!decContainer) return;

    const filtered = declaracionesData.filter(d => {
      const matchSearch = d.programa.toLowerCase().includes(decSearchQuery.toLowerCase()) || 
                          d.escenario.toLowerCase().includes(decSearchQuery.toLowerCase()) ||
                          d.cuo.toLowerCase().includes(decSearchQuery.toLowerCase());
      const matchFacultad = decFilterFacultad === "todos" || d.facultad === decFilterFacultad;
      const matchAnio = decFilterAnio === "todos" || String(d.anio) === String(decFilterAnio);
      return matchSearch && matchFacultad && matchAnio;
    });

    const decFacultades = ["FACEM", "FAING", "FAEDCOH", "FACSA", "FAU", "FADE", "ESPG"];
    const uniqueAños = [...new Set(declaracionesData.map(d => d.anio).filter(Boolean))].sort((a, b) => b - a);

    let contentHtml = "";

    if (decActiveView === "tabla") {
      contentHtml = `
        <div class="card" style="padding: 0; overflow: hidden; margin-bottom: 1.5rem; background-color: var(--bg-dark-900);">
          <div class="table-container">
            <table class="summary-table" style="margin-bottom: 0;">
              <thead>
                <tr>
                  <th style="width: 5%; text-align: left;">N°</th>
                  <th style="width: 10%; text-align: left;">Facultad</th>
                  <th style="width: 30%; text-align: left;">Carrera Profesional / Programa</th>
                  <th style="width: 25%; text-align: left;">Escenario de Declaración</th>
                  <th style="width: 20%; text-align: center;">Estado Actual Consolidado</th>
                  <th style="width: 6%; text-align: center;">Progreso</th>
                  <th style="width: 4%; text-align: center;">Detalle</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="7" style="text-align: center; color: var(--text-400); padding: 2rem;">No se encontraron registros.</td>
                  </tr>
                ` : filtered.map((d, idx) => {
                  let badgeClass = "inactivo";
                  const rawStatus = d.estado_consolidado || d.estadoConsolidado || d.estado || d.observaciones || "CONFORME";
                  const status = String(rawStatus).toLowerCase();
                  if (status.includes("conforme")) {
                    badgeClass = "cumple";
                  } else if (status.includes("observado")) {
                    badgeClass = "alerta";
                  } else if (status.includes("espera") || status.includes("firma") || status.includes("oficio")) {
                    badgeClass = "advertencia";
                  } else if (status.includes("enviada") || status.includes("cargo") || status.includes("envío")) {
                    badgeClass = "proceso";
                  }

                  const rawProg = d.progreso || d.progreso_pct || "100%";
                  const progValue = parseFloat(String(rawProg).replace('%', '')) || 0;
                  const displayStatus = d.estado_consolidado || d.estado || "CONFORME";
                  
                  return `
                    <tr>
                      <td>${d.num || d.nro || (idx + 1)}</td>
                      <td><strong>${d.facultad || 'UPT'}</strong></td>
                      <td>${d.programa || 'Programa General'}</td>
                      <td>${d.escenario || 'General'}</td>
                      <td style="text-align: center;">
                        <span class="badge-status ${badgeClass}" style="display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.6rem; border-radius: 4px;">
                          ${displayStatus}
                        </span>
                      </td>
                      <td>
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 70px;">
                          <span style="font-size: 0.75rem; font-weight: 700;">${rawProg}</span>
                          <div style="width: 100%; height: 6px; background-color: var(--bg-dark-800); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${progValue}%; height: 100%; background-color: ${progValue === 100 ? '#10B981' : '#3B82F6'}; border-radius: 3px;"></div>
                          </div>
                        </div>
                      </td>
                      <td style="text-align: center;">
                        <button class="btn btn-icon view-dec-detail-btn" data-index="${idx}" title="Ver Detalle" style="padding: 4px; background: transparent; border: none; cursor: pointer; color: var(--accent-light);">
                          <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      // Calcular estadísticas de declaraciones en tiempo real
      const totalDec = filtered.length;
      
      const conformesCount = filtered.filter(d => String(d.estado_consolidado || d.estado || '').toLowerCase().includes("conforme")).length;
      const pendientesCount = filtered.filter(d => String(d.estado_consolidado || d.estado || '').toLowerCase() === "pendiente").length;
      const enTramiteCount = totalDec - conformesCount - pendientesCount;

      // Agrupación por Estado Consolidado
      const statesMap = {};
      filtered.forEach(d => {
        const key = d.estado_consolidado || d.estado || 'Otros';
        statesMap[key] = (statesMap[key] || 0) + 1;
      });
      const sortedStates = Object.entries(statesMap).sort((a, b) => b[1] - a[1]);

      // Agrupación por Facultad
      const facsMap = {};
      filtered.forEach(d => {
        const key = d.facultad || 'UPT';
        facsMap[key] = (facsMap[key] || 0) + 1;
      });
      const sortedFacs = Object.entries(facsMap).sort((a, b) => b[1] - a[1]);

      // Agrupación por Escenario
      const escMap = {};
      filtered.forEach(d => {
        const key = d.escenario || 'General';
        escMap[key] = (escMap[key] || 0) + 1;
      });
      const sortedEscs = Object.entries(escMap).sort((a, b) => b[1] - a[1]);

      // Gráfico de barras 3D
      const chartData = [
        { label: "Conformes", value: conformesCount, color: "var(--color-cumple)" },
        { label: "En Trámite", value: enTramiteCount, color: "var(--accent)" },
        { label: "Pendientes", value: pendientesCount, color: "var(--text-500)" }
      ];
      const decChartSvg = generate3DBarChartSVG(chartData, 420, 240);

      contentHtml = `
        <!-- KPI Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; background-color: var(--bg-dark-900);">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Total Programas</span>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-100); margin-top: 0.25rem;">${totalDec}</div>
            </div>
            <div style="background-color: rgba(59,130,246,0.1); color: var(--accent-light); padding: 0.5rem; border-radius: 8px;">
              <i data-lucide="folder" style="width: 24px; height: 24px;"></i>
            </div>
          </div>
          <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; background-color: var(--bg-dark-900);">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Conformes</span>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-cumple); margin-top: 0.25rem;">${conformesCount}</div>
            </div>
            <div style="background-color: rgba(16,185,129,0.1); color: var(--color-cumple); padding: 0.5rem; border-radius: 8px;">
              <i data-lucide="check-circle" style="width: 24px; height: 24px;"></i>
            </div>
          </div>
          <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; background-color: var(--bg-dark-900);">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">En Trámite</span>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--accent-light); margin-top: 0.25rem;">${enTramiteCount}</div>
            </div>
            <div style="background-color: rgba(245,158,11,0.1); color: var(--accent-light); padding: 0.5rem; border-radius: 8px;">
              <i data-lucide="clock" style="width: 24px; height: 24px;"></i>
            </div>
          </div>
          <div class="card" style="padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; background-color: var(--bg-dark-900);">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Pendientes</span>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-300); margin-top: 0.25rem;">${pendientesCount}</div>
            </div>
            <div style="background-color: rgba(239,68,68,0.1); color: var(--text-400); padding: 0.5rem; border-radius: 8px;">
              <i data-lucide="alert-circle" style="width: 24px; height: 24px;"></i>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
          <!-- CARD 1: Gráfico Resumen -->
          <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
                <i data-lucide="bar-chart-2" style="color: var(--accent-light);"></i>
                <span>Estado de Declaraciones a SUNEDU</span>
              </h3>
            </div>
            <div style="background-color: var(--bg-dark-900); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: center; align-items: center; min-height: 200px;">
              ${decChartSvg}
            </div>
          </div>

          <!-- CARD 2: Detalle por Estado Consolidado -->
          <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900);">
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="list-checks" style="color: var(--accent-light);"></i>
              <span>Distribución por Estado Consolidado</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; max-height: 240px; overflow-y: auto; padding-right: 4px;">
              ${sortedStates.map(([state, count]) => {
                const percentage = totalDec > 0 ? Math.round((count / totalDec) * 100) : 0;
                let colorClass = "var(--text-400)";
                if (state.toLowerCase().includes("conforme")) colorClass = "var(--color-cumple)";
                else if (state.toLowerCase().includes("observado")) colorClass = "var(--color-nocumple)";
                else if (state.toLowerCase() !== "pendiente") colorClass = "var(--accent-light)";
                
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                      <span style="color: var(--text-200); font-weight: 500;">${state}</span>
                      <span style="color: ${colorClass}; font-weight: 700;">${count} (${percentage}%)</span>
                    </div>
                    <div style="height: 6px; background-color: var(--bg-dark-800); border-radius: 3px; overflow: hidden;">
                      <div style="width: ${percentage}%; background-color: ${colorClass}; height: 100%; border-radius: 3px;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
          <!-- CARD 3: Distribución por Facultad -->
          <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900);">
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="building-2" style="color: var(--accent-light);"></i>
              <span>Declaraciones por Facultad</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; max-height: 240px; overflow-y: auto; padding-right: 4px;">
              ${sortedFacs.map(([fac, count]) => {
                const percentage = totalDec > 0 ? Math.round((count / totalDec) * 100) : 0;
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                      <span style="color: var(--text-200); font-weight: 600;">${fac}</span>
                      <span style="color: var(--accent-light); font-weight: 700;">${count} (${percentage}%)</span>
                    </div>
                    <div style="height: 6px; background-color: var(--bg-dark-800); border-radius: 3px; overflow: hidden;">
                      <div style="width: ${percentage}%; background-color: var(--accent); height: 100%; border-radius: 3px;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- CARD 4: Distribución por Escenario -->
          <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900);">
            <h3 style="font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="split" style="color: var(--accent-light);"></i>
              <span>Distribución por Escenario</span>
            </h3>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; max-height: 240px; overflow-y: auto; padding-right: 4px;">
              ${sortedEscs.map(([esc, count]) => {
                const percentage = totalDec > 0 ? Math.round((count / totalDec) * 100) : 0;
                return `
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                      <span style="color: var(--text-200); font-weight: 500;">${esc}</span>
                      <span style="color: var(--accent-light); font-weight: 700;">${count} (${percentage}%)</span>
                    </div>
                    <div style="height: 6px; background-color: var(--bg-dark-800); border-radius: 3px; overflow: hidden;">
                      <div style="width: ${percentage}%; background-color: var(--accent-light); height: 100%; border-radius: 3px;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      `;
    }

    decContainer.innerHTML = `
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.25rem; background-color: var(--bg-dark-900);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; width: 100%;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex-grow: 1;">
            <div style="position: relative; width: 280px;">
              <input type="text" id="dec-search-input" class="input-control" placeholder="Buscar carrera, escenario o CUO..." style="padding-left: 2.25rem; background-color: var(--bg-dark-800); font-size: 0.8rem;" value="${decSearchQuery}">
              <i data-lucide="search" style="width: 14px; height: 14px; position: absolute; left: 10px; top: 12px; color: var(--text-400);"></i>
            </div>
            
            <select id="dec-filter-facultad" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 180px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
              <option value="todos">Todas las Facultades</option>
              ${decFacultades.map(f => `<option value="${f}" ${decFilterFacultad === f ? 'selected' : ''}>${f}</option>`).join("")}
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <!-- Filtro de Año -->
            <select id="dec-filter-anio" class="input-control" style="background-color: var(--bg-dark-800); font-size: 0.8rem; width: 140px; padding-top: 0.4rem; padding-bottom: 0.4rem;">
              <option value="todos">Todos los Años</option>
              ${uniqueAños.map(y => `<option value="${y}" ${String(decFilterAnio) === String(y) ? 'selected' : ''}>${y}</option>`).join("")}
            </select>

            <!-- Botones de vista: Tabla / Dashboard -->
            <div style="display: flex; gap: 0.25rem; background-color: var(--bg-dark-800); padding: 0.25rem; border-radius: 6px; border: 1px solid var(--border-color);">
              <button id="btn-dec-view-tabla" class="btn btn-secondary" style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; padding: 0.4rem 0.75rem; border-radius: 4px; ${decActiveView === 'tabla' ? 'background-color: var(--accent); color: white; border-color: var(--accent);' : 'background: transparent; border-color: transparent; color: var(--text-300);'}; transition: all 0.2s; cursor: pointer; border: none;">
                <i data-lucide="table" style="width: 14px; height: 14px;"></i>
                <span>Tabla</span>
              </button>
              <button id="btn-dec-view-dashboard" class="btn btn-secondary" style="display: flex; align-items: center; gap: 6px; font-size: 0.75rem; padding: 0.4rem 0.75rem; border-radius: 4px; ${decActiveView === 'dashboard' ? 'background-color: var(--accent); color: white; border-color: var(--accent);' : 'background: transparent; border-color: transparent; color: var(--text-300);'}; transition: all 0.2s; cursor: pointer; border: none;">
                <i data-lucide="bar-chart-3" style="width: 14px; height: 14px;"></i>
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="dec-content-wrapper" style="width: 100%;">
        ${contentHtml}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const searchInput = decContainer.querySelector("#dec-search-input");
    searchInput.oninput = (e) => {
      decSearchQuery = e.target.value;
      renderDeclaracionesTable();
    };

    decContainer.querySelector("#dec-filter-facultad").onchange = (e) => {
      decFilterFacultad = e.target.value;
      renderDeclaracionesTable();
    };

    decContainer.querySelector("#dec-filter-anio").onchange = (e) => {
      decFilterAnio = e.target.value;
      renderDeclaracionesTable();
    };

    decContainer.querySelector("#btn-dec-view-tabla").onclick = () => {
      decActiveView = "tabla";
      renderDeclaracionesTable();
    };

    decContainer.querySelector("#btn-dec-view-dashboard").onclick = () => {
      decActiveView = "dashboard";
      renderDeclaracionesTable();
    };

    decContainer.querySelectorAll(".view-dec-detail-btn").forEach(btn => {
      btn.onclick = () => {
        const itemIndex = parseInt(btn.getAttribute("data-index"));
        const item = filtered[itemIndex];
        showDeclarationDetailModal(item);
      };
    });
  };

  const showDeclarationDetailModal = (item) => {
    const portal = container.querySelector("#cbc-modal-portal");
    if (!portal) return;

    portal.innerHTML = `
      <div class="modal-overlay" id="dec-detail-modal" style="z-index: 1000;">
        <div class="modal-wrapper" style="max-width: 780px; width: 95%;">
          <div class="modal-header">
            <h3 class="modal-title">Detalle del Trámite de Declaración</h3>
            <button class="modal-close" id="dec-modal-close"><i data-lucide="x"></i></button>
          </div>
          
          <div class="modal-body" style="max-height: 75vh; overflow-y: auto; padding: 1.5rem;">
            
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.5rem;">
              <h4 style="font-size: 1.2rem; color: var(--accent-light); font-weight: 700;">${item.programa}</h4>
              <div style="font-size: 0.85rem; color: var(--text-300); margin-top: 6px; display: flex; gap: 15px; flex-wrap: wrap;">
                <span><strong>Año:</strong> ${item.anio || 'N/A'}</span>
                <span><strong>Facultad:</strong> ${item.facultad}</span>
                <span><strong>Escenario:</strong> ${item.escenario}</span>
                <span><strong>CUO:</strong> ${item.cuo || 'N/A'}</span>
              </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
              <div class="card" style="background-color: var(--bg-dark-800); padding: 1rem; border-left: 4px solid var(--accent-light); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 0.75rem; color: var(--text-400); font-weight: 700; text-transform: uppercase;">Estado Actual Consolidado</div>
                  <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-100); margin-top: 4px;">${item.estado_consolidado}</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-light);">${item.progreso}</div>
                  <div style="font-size: 0.7rem; color: var(--text-400);">Progreso Ponderado</div>
                </div>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              
              <!-- Fase 1: Revisión Plan de Estudios -->
              <div class="card" style="padding: 1rem; background-color: var(--bg-dark-800);">
                <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                  <i data-lucide="check-square" style="color: #10B981; width: 18px; height: 18px;"></i>
                  <span style="font-weight: 700; font-size: 0.9rem; color: #10B981;">Fase 1: Revisión de Plan de Estudios</span>
                </div>
                <div class="form-grid-3">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Estado de Revisión</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.est_revision || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Solicitud de Revisión</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_solicitud || 'N/A'} (${item.doc_solicitud || 'N/A'})</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Opinión del Plan</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_opinion || 'N/A'} (${item.doc_opinion || 'N/A'})</span>
                  </div>
                </div>
              </div>

              <!-- Fase 1.1: Levantamiento Observaciones (Plan) -->
              <div class="card" style="padding: 1rem; background-color: var(--bg-dark-800);">
                <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                  <i data-lucide="alert-circle" style="color: #F59E0B; width: 18px; height: 18px;"></i>
                  <span style="font-weight: 700; font-size: 0.9rem; color: #F59E0B;">Fase 1.1: Levantamiento de Observaciones (Plan Interno)</span>
                </div>
                <div class="form-grid-3">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Estado Levantamiento</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.est_levantamiento || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Fecha de Levantamiento</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_levantamiento || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Doc. Levantamiento</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.doc_levantamiento || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <!-- Fase 2: Requisitos y Firma del Rector -->
              <div class="card" style="padding: 1rem; background-color: var(--bg-dark-800);">
                <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                  <i data-lucide="edit-3" style="color: #3B82F6; width: 18px; height: 18px;"></i>
                  <span style="font-weight: 700; font-size: 0.9rem; color: #3B82F6;">Fase 2: Requisitos y Firma de Rector</span>
                </div>
                <div class="form-grid-3">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Estado Requisitos/Firma</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.est_requisitos || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Fecha Envío Requisitos</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_requisitos || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Fecha Firma Rector</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_firma || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <!-- Fase 3: Declaración y Trámite ante SUNEDU -->
              <div class="card" style="padding: 1rem; background-color: var(--bg-dark-800);">
                <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                  <i data-lucide="send" style="color: #8B5CF6; width: 18px; height: 18px;"></i>
                  <span style="font-weight: 700; font-size: 0.9rem; color: #8B5CF6;">Fase 3: Declaración y Trámite ante SUNEDU</span>
                </div>
                <div class="form-grid-3" style="margin-bottom: 0.75rem;">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Estado de Envío</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.est_envio || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Envío a SUNEDU</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_envio || 'N/A'} (${item.oficio_envio || 'N/A'})</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">CUO SUNEDU</label>
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-light);">${item.cuo || 'N/A'}</span>
                  </div>
                </div>
                <div class="form-grid-3">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Resultado SUNEDU</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.resultado_respuesta || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Fecha de Respuesta</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_respuesta || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Documento Respuesta</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.doc_respuesta || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <!-- Fase 3.1: Levantamiento Observaciones (SUNEDU) -->
              <div class="card" style="padding: 1rem; background-color: var(--bg-dark-800);">
                <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
                  <i data-lucide="shield-alert" style="color: #EF4444; width: 18px; height: 18px;"></i>
                  <span style="font-weight: 700; font-size: 0.9rem; color: #EF4444;">Fase 3.1: Levantamiento de Observaciones (SUNEDU)</span>
                </div>
                <div class="form-grid-3">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Estado de Subsanación</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.est_subsanacion || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Fecha de Subsanación</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.fecha_subsanacion || 'N/A'}</span>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-400); display: block;">Oficio de Subsanación</label>
                    <span style="font-size: 0.85rem; font-weight: 600;">${item.oficio_subsanacion || 'N/A'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
          
          <div class="modal-footer" style="padding: 1rem; border-top: 1px solid var(--border-color); text-align: right;">
            <button class="btn btn-secondary" id="dec-modal-close-btn" style="padding: 0.5rem 1.5rem;">Cerrar</button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => {
      portal.innerHTML = "";
    };
    portal.querySelector("#dec-modal-close").onclick = closeModal;
    portal.querySelector("#dec-modal-close-btn").onclick = closeModal;
  };

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

  container.querySelector("#filter-modalidad").onchange = (e) => {
    filterModalidad = e.target.value;
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
                  <label for="p-enviado">Actualización enviada a SUNEDU (Año)</label>
                  <input type="number" id="p-enviado" class="input-control" placeholder="Ej. 2024" min="2000" max="2100" value="${prog ? (parseInt(prog.enviadoSunedu) || '') : ''}">
                </div>
                <div class="form-group">
                  <label for="p-ano-resolucion">Fecha de actualización según resolución</label>
                  <input type="date" id="p-ano-resolucion" class="input-control" required value="${prog ? formatForDatePicker(prog.anoResolucion) : ''}">
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label for="p-modalidad">Modalidad</label>
                  <select id="p-modalidad" class="input-control" required>
                    <option value="presencial" ${prog && (prog.modalidad || '').toLowerCase() === 'presencial' ? 'selected' : ''}>presencial</option>
                    <option value="semipresencial" ${prog && (prog.modalidad || '').toLowerCase() === 'semipresencial' ? 'selected' : ''}>semipresencial</option>
                    <option value="a distancia / no presencial" ${prog && (prog.modalidad || '').toLowerCase() === 'a distancia / no presencial' ? 'selected' : ''}>a distancia / no presencial</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="p-resol-act">Resolución de Última Actualización</label>
                  <input type="text" id="p-resol-act" class="input-control" placeholder="RES Nº 285-2022-UPT-CU" value="${prog ? prog.resolucionUltimaActualizacion : ''}">
                </div>
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

              <div class="form-group">
                <label for="p-obs">Observaciones / Detalles</label>
                <textarea id="p-obs" class="input-control" rows="3" placeholder="Ej. Observaciones adicionales...">${prog ? (prog.observaciones || '') : ''}</textarea>
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

    if (!isEditable) {
      setTimeout(() => {
        const modalForm = portal.querySelector("#programa-editor-form");
        if (modalForm) {
          Array.from(modalForm.elements).forEach(el => {
            el.disabled = true;
          });
          if (closeBtn) closeBtn.disabled = false;
          if (cancelBtn) cancelBtn.disabled = false;
        }
      }, 0);
    }

    // No tabs required since form is unified in "Datos Generales" only

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
        enviadoSunedu: portal.querySelector("#p-enviado").value,
        anoResolucion: portal.querySelector("#p-ano-resolucion").value,
        modalidad: portal.querySelector("#p-modalidad").value,
        resolucionUltimaActualizacion: portal.querySelector("#p-resol-act").value,
        resolucionLink: portal.querySelector("#p-resol-link").value,
        observaciones: portal.querySelector("#p-obs").value
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

  // Registrar sincronización automática multi-navegador en tiempo real
  const handleDbSyncUpdate = async () => {
    console.log("[PLAN SYNC] Recibido evento de base de datos actualizada. Redibujando vistas...");
    programas = await db.getProgramas();
    if (activeTab === "relacion") {
      drawRelacion();
    } else {
      drawEstadisticas();
    }
  };
  
  window.addEventListener("sigeca_db_updated", handleDbSyncUpdate);
  
  if (window._cleanupPlanSync) {
    window.removeEventListener("sigeca_db_updated", window._cleanupPlanSync);
  }
  window._cleanupPlanSync = handleDbSyncUpdate;
}
