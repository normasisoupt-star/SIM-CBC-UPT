/* ==========================================================================
   SIGECA - PÁGINA MALLA CURRICULAR C1 (Gestor de Malla Curricular Rediseñado)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";
import { onedrive } from "../services/onedrive.js?v=20260623.5";


export async function renderMallaPage(container, userRole = "admin") {
  const [cursos, ciclos, creditSettings] = await Promise.all([
    db.getCursos(),
    db.getCiclos(),
    db.getCreditSettings()
  ]);

  let activeCicloId = "ciclo_01";
  let activePrimaryTab = "edicion"; // "edicion" o "resumen"
  let activeStudyTypeFilter = "Todos";
  
  const drawMallaGrid = () => {
    const filteredCursos = cursos.filter(c => c.cicloId === activeCicloId);
    const totalCreditosCiclo = filteredCursos.reduce((sum, c) => sum + c.creditos, 0);

    const mallaGridContainer = container.querySelector("#malla-grid-container");
    if (!mallaGridContainer) return;

    // Todos los usuarios pueden editar asignaturas en esta sesión temporal
    const isEditable = true;
    
    mallaGridContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <span style="font-size: 0.9rem; color: var(--text-300);">
          Mostrando <strong>${filteredCursos.length}</strong> cursos en este ciclo. Total créditos del ciclo: <strong>${Math.round(totalCreditosCiclo * 100) / 100}</strong>.
        </span>
        
        ${isEditable ? `
          <button class="btn btn-primary" id="btn-add-course">
            <i data-lucide="plus"></i>
            <span>Agregar Curso</span>
          </button>
        ` : ""}
      </div>

      <div class="malla-grid">
        ${filteredCursos.map(c => `
          <div class="card course-card">
            <div class="course-header">
              <span class="course-code" style="${c.tipoCurso === 'electivo' ? 'color: var(--text-400); font-style: italic;' : ''}">
                ${c.tipoCurso === 'electivo' ? 'No Asignado' : (c.codigo || 'SIN CÓDIGO')}
              </span>
              <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                <span class="badge-status cumple" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">${c.tipoCurso}</span>
                <span class="badge-status" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; background-color: rgba(96, 165, 250, 0.1); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.2);">${c.tipoEstudio || 'General'}</span>
                <span class="badge-status" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; background-color: rgba(167, 139, 250, 0.1); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.2);">${c.modalidad || 'Presencial'}</span>
              </div>
            </div>
            
            <h3 class="course-name">${c.nombre}</h3>
            
            <div class="course-details-row" style="grid-template-columns: repeat(5, 1fr); padding: 0.5rem 0;">
              <div class="course-detail-item">
                <span class="course-detail-label">Créditos</span>
                <span class="course-detail-val" style="color: var(--accent-light); font-weight: 700;">${c.creditos}</span>
              </div>
              <div class="course-detail-item">
                <span class="course-detail-label">HTP</span>
                <span class="course-detail-val">${c.horasTP || 0}h</span>
              </div>
              <div class="course-detail-item">
                <span class="course-detail-label">HTV</span>
                <span class="course-detail-val">${c.horasTV || 0}h</span>
              </div>
              <div class="course-detail-item">
                <span class="course-detail-label">HPP</span>
                <span class="course-detail-val">${c.horasPP || 0}h</span>
              </div>
              <div class="course-detail-item">
                <span class="course-detail-label">HPV</span>
                <span class="course-detail-val">${c.horasPV || 0}h</span>
              </div>
            </div>
            
            <div class="course-footer">
              <div style="display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--text-300);">
                <i data-lucide="book-open" style="width: 14px; height: 14px; color: var(--accent-light);"></i>
                <span>Asignatura C1</span>
              </div>
              
              ${isEditable ? `
                <div style="display: flex; gap: 0.25rem;">
                  <button class="btn btn-secondary btn-course-edit" data-id="${c.id}" style="padding: 0.35rem; border-radius: 4px;" title="Editar">
                    <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
                  </button>
                  <button class="btn btn-danger btn-course-delete" data-id="${c.id}" style="padding: 0.35rem; border-radius: 4px;" title="Eliminar">
                    <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
              ` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Capturar clics de edición y creación
    if (isEditable) {
      const btnAdd = container.querySelector("#btn-add-course");
      if (btnAdd) btnAdd.onclick = () => openCourseModal();

      const editButtons = mallaGridContainer.querySelectorAll(".btn-course-edit");
      editButtons.forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute("data-id");
          const cursoToEdit = cursos.find(c => c.id === id);
          openCourseModal(cursoToEdit);
        };
      });

      const deleteButtons = mallaGridContainer.querySelectorAll(".btn-course-delete");
      deleteButtons.forEach(btn => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          const cursoToDelete = cursos.find(c => c.id === id);
          if (confirm(`¿Está seguro de eliminar el curso "${cursoToDelete.nombre}"?`)) {
            await db.deleteCurso(id);
            // Recargar datos en memoria local de la página
            const updatedCursos = await db.getCursos();
            cursos.length = 0;
            cursos.push(...updatedCursos);
            drawMallaGrid();
          }
        };
      });
    }
  };

  const drawResumenCreditos = () => {
    const resumenContainer = container.querySelector("#malla-resumen-container");
    if (!resumenContainer) return;

    const multWeeks = creditSettings.valorTeoricas || 16;

    // Calcular Totales Generales de Cursos
    const totalCursos = cursos.length;
    const totalHTRaw = cursos.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
    const totalHPRaw = cursos.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
    
    // Horas semanales multiplicadas por el valor de las horas teoría por crédito (semanas del semestre)
    const totalHT = totalHTRaw * multWeeks;
    const totalHP = totalHPRaw * multWeeks;
    const totalHoras = totalHT + totalHP;

    const ratio = creditSettings.valorTeoricas / creditSettings.valorPracticas;
    const totalCreditosTeoria = totalHTRaw;
    const totalCreditosPractica = totalHPRaw * ratio;
    const totalCreditos = cursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    // Agrupar por Categorías
    const getGroupStats = (filterFn) => {
      const filtered = cursos.filter(filterFn);
      const htRaw = filtered.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
      const hpRaw = filtered.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
      
      const ht = htRaw * multWeeks;
      const hp = hpRaw * multWeeks;
      const totalH = ht + hp;
      
      const credT = htRaw;
      const credP = hpRaw * ratio;
      const credTotal = filtered.reduce((sum, c) => sum + (c.creditos || 0), 0);

      return {
        count: filtered.length,
        ht,
        hp,
        totalH,
        pctH: totalHoras > 0 ? (totalH / totalHoras) * 100 : 0,
        credT,
        credP,
        credTotal,
        pctCred: totalCreditos > 0 ? (credTotal / totalCreditos) * 100 : 0,
        cursos: filtered
      };
    };

    const categories = {
      total: {
        label: "TOTAL GENERAL",
        count: totalCursos,
        ht: totalHT,
        hp: totalHP,
        totalH: totalHoras,
        pctH: totalHoras > 0 ? 100 : 0,
        credT: totalCreditosTeoria,
        credP: totalCreditosPractica,
        credTotal: totalCreditos,
        pctCred: totalCreditos > 0 ? 100 : 0,
        cursos: cursos
      },
      estudioGeneral: getGroupStats(c => c.tipoEstudio === "General"),
      estudioEspecifico: getGroupStats(c => c.tipoEstudio === "Específico"),
      estudioEspecialidad: getGroupStats(c => c.tipoEstudio === "De especialidad"),
      modalidadPresencial: getGroupStats(c => (c.modalidad || "Presencial") === "Presencial"),
      modalidadVirtual: getGroupStats(c => c.modalidad === "Virtual"),
      tipoObligatorio: getGroupStats(c => c.tipoCurso === "obligatorio"),
      tipoElectivo: getGroupStats(c => c.tipoCurso === "electivo")
    };

    const renderTable = () => {
      const getProgressMarkup = (pct) => {
        const rounded = Math.round(pct);
        return `
          <div class="progress-percentage-container">
            <div class="progress-percentage-bar">
              <div class="progress-percentage-fill" style="width: ${rounded}%"></div>
            </div>
            <span class="progress-percentage-text">${rounded}%</span>
          </div>
        `;
      };

      const formatVal = (num) => Math.round(num * 100) / 100;

      resumenContainer.innerHTML = `
        <div class="summary-table-container">
          <table class="summary-table" style="margin-bottom: 0;">
            <thead>
              <tr>
                <th rowspan="2" colspan="2" style="width: 25%;">Distribución Académica</th>
                <th rowspan="2" style="width: 10%;">N° Cursos</th>
                <th colspan="4" style="width: 32%;">N° Horas Lectivas (Semestrales)</th>
                <th colspan="4" style="width: 33%;">N° Créditos Académicos</th>
              </tr>
              <tr>
                <th>Teoría</th>
                <th>Práctica</th>
                <th>Total</th>
                <th>% del Total</th>
                <th>Teoría</th>
                <th>Práctica</th>
                <th>Total</th>
                <th>% del Total</th>
              </tr>
            </thead>
            <tbody>
              <!-- TOTAL GENERAL -->
              <tr class="total-row">
                <td colspan="2">TOTAL GENERAL (Malla C1)</td>
                <td class="text-center">${categories.total.count}</td>
                <td class="text-right">${formatVal(categories.total.ht)}</td>
                <td class="text-right">${formatVal(categories.total.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.total.totalH)}</td>
                <td class="text-center highlight-cell">-</td>
                <td class="text-right">${formatVal(categories.total.credT)}</td>
                <td class="text-right">${formatVal(categories.total.credP)}</td>
                <td class="text-right highlight-cell" style="color: var(--accent-light);">${formatVal(categories.total.credTotal)}</td>
                <td class="text-center highlight-cell">-</td>
              </tr>
              <tr class="group-header">
                <td colspan="11">Tipo de Estudios</td>
              </tr>
              <tr class="summary-row" data-group-key="estudioGeneral">
                <td style="width: 2%; border-right: none;"></td>
                <td style="border-left: none;">Estudios generales</td>
                <td class="text-center">${categories.estudioGeneral.count}</td>
                <td class="text-right">${formatVal(categories.estudioGeneral.ht)}</td>
                <td class="text-right">${formatVal(categories.estudioGeneral.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioGeneral.totalH)}</td>
                <td>${getProgressMarkup(categories.estudioGeneral.pctH)}</td>
                <td class="text-right">${formatVal(categories.estudioGeneral.credT)}</td>
                <td class="text-right">${formatVal(categories.estudioGeneral.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioGeneral.credTotal)}</td>
                <td>${getProgressMarkup(categories.estudioGeneral.pctCred)}</td>
              </tr>
              <tr class="summary-row" data-group-key="estudioEspecifico">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Estudios específicos</td>
                <td class="text-center">${categories.estudioEspecifico.count}</td>
                <td class="text-right">${formatVal(categories.estudioEspecifico.ht)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecifico.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioEspecifico.totalH)}</td>
                <td>${getProgressMarkup(categories.estudioEspecifico.pctH)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecifico.credT)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecifico.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioEspecifico.credTotal)}</td>
                <td>${getProgressMarkup(categories.estudioEspecifico.pctCred)}</td>
              </tr>
              <tr class="summary-row" data-group-key="estudioEspecialidad">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Estudios de especialidad</td>
                <td class="text-center">${categories.estudioEspecialidad.count}</td>
                <td class="text-right">${formatVal(categories.estudioEspecialidad.ht)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecialidad.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioEspecialidad.totalH)}</td>
                <td>${getProgressMarkup(categories.estudioEspecialidad.pctH)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecialidad.credT)}</td>
                <td class="text-right">${formatVal(categories.estudioEspecialidad.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.estudioEspecialidad.credTotal)}</td>
                <td>${getProgressMarkup(categories.estudioEspecialidad.pctCred)}</td>
              </tr>
              <tr class="group-header">
                <td colspan="11">Modalidad</td>
              </tr>
              <tr class="summary-row" data-group-key="modalidadPresencial">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Presencial</td>
                <td class="text-center"></td>
                <td class="text-right">${formatVal(categories.modalidadPresencial.ht)}</td>
                <td class="text-right">${formatVal(categories.modalidadPresencial.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.modalidadPresencial.totalH)}</td>
                <td>${getProgressMarkup(categories.modalidadPresencial.pctH)}</td>
                <td class="text-right">${formatVal(categories.modalidadPresencial.credT)}</td>
                <td class="text-right">${formatVal(categories.modalidadPresencial.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.modalidadPresencial.credTotal)}</td>
                <td>${getProgressMarkup(categories.modalidadPresencial.pctCred)}</td>
              </tr>
              <tr class="summary-row" data-group-key="modalidadVirtual">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Virtual</td>
                <td class="text-center"></td>
                <td class="text-right">${formatVal(categories.modalidadVirtual.ht)}</td>
                <td class="text-right">${formatVal(categories.modalidadVirtual.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.modalidadVirtual.totalH)}</td>
                <td>${getProgressMarkup(categories.modalidadVirtual.pctH)}</td>
                <td class="text-right">${formatVal(categories.modalidadVirtual.credT)}</td>
                <td class="text-right">${formatVal(categories.modalidadVirtual.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.modalidadVirtual.credTotal)}</td>
                <td>${getProgressMarkup(categories.modalidadVirtual.pctCred)}</td>
              </tr>
              <tr class="group-header">
                <td colspan="11">Tipo de Curso</td>
              </tr>
              <tr class="summary-row" data-group-key="tipoObligatorio">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Obligatorios</td>
                <td class="text-center">${categories.tipoObligatorio.count}</td>
                <td class="text-right">${formatVal(categories.tipoObligatorio.ht)}</td>
                <td class="text-right">${formatVal(categories.tipoObligatorio.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.tipoObligatorio.totalH)}</td>
                <td>${getProgressMarkup(categories.tipoObligatorio.pctH)}</td>
                <td class="text-right">${formatVal(categories.tipoObligatorio.credT)}</td>
                <td class="text-right">${formatVal(categories.tipoObligatorio.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.tipoObligatorio.credTotal)}</td>
                <td>${getProgressMarkup(categories.tipoObligatorio.pctCred)}</td>
              </tr>
              <tr class="summary-row" data-group-key="tipoElectivo">
                <td style="border-right: none;"></td>
                <td style="border-left: none;">Electivos</td>
                <td class="text-center">${categories.tipoElectivo.count}</td>
                <td class="text-right">${formatVal(categories.tipoElectivo.ht)}</td>
                <td class="text-right">${formatVal(categories.tipoElectivo.hp)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.tipoElectivo.totalH)}</td>
                <td>${getProgressMarkup(categories.tipoElectivo.pctH)}</td>
                <td class="text-right">${formatVal(categories.tipoElectivo.credT)}</td>
                <td class="text-right">${formatVal(categories.tipoElectivo.credP)}</td>
                <td class="text-right highlight-cell">${formatVal(categories.tipoElectivo.credTotal)}</td>
                <td>${getProgressMarkup(categories.tipoElectivo.pctCred)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    };

    renderTable();
  };

  const drawAsignaturasPorEstudio = () => {
    const containerEstudios = container.querySelector("#malla-resumen-estudios-container");
    if (!containerEstudios) return;

    // Ordenar asignaturas por tipo de estudio (General, Específico, De especialidad)
    const sortedCursos = [...cursos].sort((a, b) => {
      const order = { "General": 1, "Específico": 2, "De especialidad": 3 };
      const oA = order[a.tipoEstudio || "General"] || 99;
      const oB = order[b.tipoEstudio || "General"] || 99;
      if (oA !== oB) return oA - oB;
      return (a.codigo || "").localeCompare(b.codigo || "") || a.nombre.localeCompare(b.nombre);
    });

    const filteredCursos = activeStudyTypeFilter === "Todos"
      ? sortedCursos
      : sortedCursos.filter(c => (c.tipoEstudio || "General") === activeStudyTypeFilter);

    const sumTotal = filteredCursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    containerEstudios.innerHTML = `
      <div style="margin-top: 2.5rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px;">
            <i data-lucide="book-open" style="color: var(--accent-light); width: 22px; height: 22px;"></i>
            <span>Asignaturas por Tipo de Estudio</span>
          </h2>
          <p style="font-size: 0.8rem; color: var(--text-300); margin-top: 4px; margin-bottom: 0;">
            Seleccione una categoría para filtrar las asignaturas en la tabla y descargar su reporte.
          </p>
        </div>
        
        <div>
          <button class="btn btn-primary" id="btn-export-study-type-word" style="background-color: #0078d4; padding: 0.5rem 1rem; font-size: 0.85rem; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
            <span>Descargar Cuadro en Word</span>
          </button>
        </div>
      </div>

      <!-- Filtros por tipo de estudio -->
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <button class="btn ${activeStudyTypeFilter === 'Todos' ? 'btn-primary' : 'btn-secondary'}" data-filter="Todos" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
          Todos los Cursos (${cursos.length})
        </button>
        <button class="btn ${activeStudyTypeFilter === 'General' ? 'btn-primary' : 'btn-secondary'}" data-filter="General" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
          Estudios Generales (${cursos.filter(c => (c.tipoEstudio || 'General') === 'General').length})
        </button>
        <button class="btn ${activeStudyTypeFilter === 'Específico' ? 'btn-primary' : 'btn-secondary'}" data-filter="Específico" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
          Estudios Específicos (${cursos.filter(c => c.tipoEstudio === 'Específico').length})
        </button>
        <button class="btn ${activeStudyTypeFilter === 'De especialidad' ? 'btn-primary' : 'btn-secondary'}" data-filter="De especialidad" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
          Estudios de Especialidad (${cursos.filter(c => c.tipoEstudio === 'De especialidad').length})
        </button>
      </div>

      <div class="card" style="margin-bottom: 1.5rem; padding: 1.5rem; background-color: var(--bg-dark-900);">
        ${filteredCursos.length === 0 ? `
          <p style="color: var(--text-400); font-style: italic; font-size: 0.85rem; padding: 0.5rem 0;">No hay asignaturas registradas en esta categoría.</p>
        ` : `
          <div style="overflow-x: auto;">
            <table class="summary-table" style="background-color: var(--bg-dark-700); margin-bottom: 0;">
              <thead>
                <tr>
                  <th style="width: 15%; text-align: left;">Código</th>
                  <th style="width: 40%; text-align: left;">Nombre de la Asignatura</th>
                  <th style="width: 20%; text-align: center;">Tipo de Estudio</th>
                  <th style="width: 15%; text-align: center;">Carácter</th>
                  <th style="width: 10%; text-align: right;">Créditos</th>
                </tr>
              </thead>
              <tbody>
                ${filteredCursos.map(c => `
                  <tr>
                    <td style="font-family: monospace; font-size: 0.8rem; font-weight: 600;">
                      ${c.tipoCurso === 'electivo' ? 'Electivo' : (c.codigo || 'SIN CÓDIGO')}
                    </td>
                    <td style="font-weight: 500; color: var(--text-100);">${c.nombre}</td>
                    <td class="text-center" style="font-size: 0.85rem; color: var(--text-200);">
                      ${c.tipoEstudio || 'General'}
                    </td>
                    <td class="text-center">
                      <span class="badge-status ${c.tipoCurso === 'obligatorio' ? 'cumple' : 'en-proceso'}" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">
                        ${c.tipoCurso === 'obligatorio' ? 'Obligatorio' : 'Electivo'}
                      </span>
                    </td>
                    <td class="text-right" style="font-weight: 700; color: var(--text-100);">${c.creditos}</td>
                  </tr>
                `).join("")}
                <tr class="total-row" style="background-color: var(--bg-dark-900); font-weight: 700; border-top: 2px solid var(--border-color);">
                  <td colspan="4" style="text-align: right; color: var(--text-200);">TOTAL CRÉDITOS:</td>
                  <td class="text-right" style="color: var(--accent-light); font-size: 0.95rem; font-weight: 800;">${Math.round(sumTotal * 100) / 100}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Escuchar eventos de clic de los botones de filtro
    containerEstudios.querySelectorAll("[data-filter]").forEach(btn => {
      btn.onclick = () => {
        activeStudyTypeFilter = btn.getAttribute("data-filter");
        drawAsignaturasPorEstudio();
      };
    });

    // Escuchar evento de descarga en Word específica
    const btnExportStudyType = containerEstudios.querySelector("#btn-export-study-type-word");
    if (btnExportStudyType) {
      btnExportStudyType.onclick = exportFilteredReportToWord;
    }
  };

  const getCoverPageHtml = (reportTitle) => {
    const currentYear = new Date().getFullYear();
    return `
      <!-- PORTADA DE LA CARATULA -->
      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; margin-bottom: 20px;">
        <!-- Fila de Encabezado: Logo y Barra Dorada -->
        <tr>
          <td style="width: 15%; height: 160px;">&nbsp;</td>
          <td style="width: 70%; text-align: center; vertical-align: middle;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/UnivPrivadaTacnalogo.jpg" width="100" height="130" style="display: block; margin: 0 auto 10px auto;" />
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; color: #1b365d; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">
              UNIVERSIDAD PRIVADA DE TACNA
            </div>
          </td>
          <td style="width: 15%; text-align: right; vertical-align: top; padding-top: 10px;">
            <table align="right" border="0" cellpadding="0" cellspacing="0" style="width: 22px; background-color: #bfa15f; height: 140px;">
              <tr><td>&nbsp;</td></tr>
            </table>
          </td>
        </tr>
        
        <!-- Fila Espaciadora -->
        <tr>
          <td colspan="3" style="height: 120px; font-size: 1px; line-height: 1px;">&nbsp;</td>
        </tr>
        
        <!-- Fila de Título del Reporte -->
        <tr>
          <td style="width: 15%;">&nbsp;</td>
          <td colspan="2" style="text-align: left; vertical-align: middle;">
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 24pt; font-weight: bold; color: #2c3e50; line-height: 1.25; text-transform: uppercase;">
              ${reportTitle}
            </div>
          </td>
        </tr>
        
        <!-- Fila Espaciadora -->
        <tr>
          <td colspan="3" style="height: 140px; font-size: 1px; line-height: 1px;">&nbsp;</td>
        </tr>
        
        <!-- Fila de Metadatos: Oficina y Año -->
        <tr>
          <td style="width: 15%;">&nbsp;</td>
          <td colspan="2" style="text-align: left; vertical-align: middle;">
            <div style="font-family: Arial, sans-serif; font-size: 10pt; color: #666666; letter-spacing: 1.5px; text-transform: uppercase; font-weight: bold;">
              OFICINA DE
            </div>
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16.5pt; font-weight: bold; color: #2c3e50; margin-top: 6px; margin-bottom: 6px;">
              GESTIÓN DE LA <span style="background-color: #bfa15f; padding: 2px 6px; color: #2c3e50;">CALIDAD</span>
            </div>
            <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16.5pt; font-weight: bold; color: #2c3e50;">
              ${currentYear}
            </div>
          </td>
        </tr>
        
        <!-- Fila Espaciadora -->
        <tr>
          <td colspan="3" style="height: 100px; font-size: 1px; line-height: 1px;">&nbsp;</td>
        </tr>
      </table>
      
      <!-- Fila de Pie de Página (Azul Marino) -->
      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #0b2545; color: #ffffff; font-family: Arial, sans-serif; font-size: 9pt;">
        <tr>
          <td style="padding: 12px 20px; text-align: left; width: 50%;">
            Teléfono: 051-427212 (443)
          </td>
          <td style="padding: 12px 20px; text-align: right; width: 50%;">
            Correo: uptautoevaluacion@gmail.com
          </td>
        </tr>
      </table>
      
      <!-- Salto de Página -->
      <br clear="all" style="page-break-before: always; mso-break-type: section-break;" />
    `;
  };

  const generateCoverPageImage = (reportTitle) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = 'assets/caratula.jpg';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 724;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Clear "TÍTULO" area
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(60, 440, 620, 180);
        
        // Clear "AÑO" area
        ctx.fillRect(60, 725, 120, 30);
        
        // Draw new Title
        ctx.fillStyle = '#0b2545';
        ctx.font = "bold 28px Georgia, 'Times New Roman', serif";
        
        // Wrap Title text helper
        const words = reportTitle.split(' ');
        let line = '';
        let currentY = 488;
        const x = 64;
        const maxWidth = 600;
        const lineHeight = 36;
        
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
        
        // Draw current Year
        const currentYear = new Date().getFullYear().toString();
        ctx.font = "bold 26px Georgia, 'Times New Roman', serif";
        ctx.fillStyle = '#0b2545';
        ctx.fillText(currentYear, 64, 750);
        
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
      img.onerror = () => {
        resolve('');
      };
    });
  };

  const exportReportToWord = async () => {
    const ratio = creditSettings.valorTeoricas / creditSettings.valorPracticas;
    const formatVal = (num) => Math.round(num * 100) / 100;
    const formatPct = (num) => Math.round(num) + "%";

    // 1. Preparar datos para Cuadro Resumen
    const totalCursos = cursos.length;
    const totalHTRaw = cursos.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
    const totalHPRaw = cursos.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
    const multWeeks = creditSettings.valorTeoricas || 16;
    const totalHT = totalHTRaw * multWeeks;
    const totalHP = totalHPRaw * multWeeks;
    const totalHoras = totalHT + totalHP;
    const totalCreditos = cursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    const getStats = (filterFn) => {
      const filtered = cursos.filter(filterFn);
      const htRaw = filtered.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
      const hpRaw = filtered.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
      const ht = htRaw * multWeeks;
      const hp = hpRaw * multWeeks;
      const totalH = ht + hp;
      const credTotal = filtered.reduce((sum, c) => sum + (c.creditos || 0), 0);
      return {
        count: filtered.length,
        ht,
        hp,
        totalH,
        pctH: totalHoras > 0 ? (totalH / totalHoras) * 100 : 0,
        credT: htRaw,
        credP: hpRaw * ratio,
        credTotal,
        pctCred: totalCreditos > 0 ? (credTotal / totalCreditos) * 100 : 0
      };
    };

    const cat = {
      total: { count: totalCursos, ht: totalHT, hp: totalHP, totalH: totalHoras, pctH: 100, credT: totalHTRaw, credP: totalHPRaw * ratio, credTotal: totalCreditos, pctCred: 100 },
      g: getStats(c => c.tipoEstudio === "General"),
      es: getStats(c => c.tipoEstudio === "Específico"),
      sp: getStats(c => c.tipoEstudio === "De especialidad"),
      pr: getStats(c => (c.modalidad || "Presencial") === "Presencial"),
      vi: getStats(c => c.modalidad === "Virtual"),
      ob: getStats(c => c.tipoCurso === "obligatorio"),
      el: getStats(c => c.tipoCurso === "electivo")
    };

    const sumTotal = cursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    // Ordenar asignaturas por tipo de estudio
    const sortedCursos = [...cursos].sort((a, b) => {
      const order = { "General": 1, "Específico": 2, "De especialidad": 3 };
      const oA = order[a.tipoEstudio || "General"] || 99;
      const oB = order[b.tipoEstudio || "General"] || 99;
      if (oA !== oB) return oA - oB;
      return (a.codigo || "").localeCompare(b.codigo || "") || a.nombre.localeCompare(b.nombre);
    });

    const coverImg = await generateCoverPageImage("REPORTE OFICIAL DE MALLA CURRICULAR C1");

    let wordHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
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
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #333333; line-height: 1.4; }
          h1 { color: #0b2545; font-size: 18pt; text-align: center; margin-bottom: 5px; }
          .subtitle { text-align: center; color: #555555; font-size: 11pt; margin-bottom: 25px; }
          h2 { color: #134074; font-size: 14pt; border-bottom: 2px solid #0078d4; padding-bottom: 4px; margin-top: 30px; }
          h3 { color: #0078d4; font-size: 11pt; margin-top: 15px; margin-bottom: 5px; }
          table { border-collapse: collapse; width: 100%; margin: 15px 0; font-size: 9pt; }
          th, td { border: 1px solid #999999; padding: 6px 8px; }
          th { background-color: #f2f2f2; font-weight: bold; color: #134074; font-size: 8.5pt; text-align: center; }
          .text-right { text-align: right          .total-row { background-color: #e6f2ff; font-weight: bold; }
          .group-title { background-color: #f5f5f5; font-weight: bold; color: #0078d4; text-transform: uppercase; font-size: 8.5pt; }
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
        </style>
      </head>
      <body>${coverImg ? `<div class="Cover"><table border="0" cellpadding="0" cellspacing="0" style="width: 210mm; height: 297mm; border-collapse: collapse; margin: 0; padding: 0;"><tr><td style="text-align: center; vertical-align: top; padding: 0; margin: 0; width: 210mm; height: 297mm;"><img src="${coverImg}" style="width: 210mm; height: 297mm; display: block; margin: 0; padding: 0;" /></td></tr></table></div>` : `<div class="Cover">${getCoverPageHtml("REPORTE OFICIAL DE MALLA CURRICULAR C1")}</div>`}<div class="Report">
          <h1>SISTEMA DE INFORMACIÓN Y MONITOREO DE LAS CONDICIONES BÁSICAS DE CALIDAD (SIM-CBC)</h1>
        <div class="subtitle">Reporte Oficial de Malla Curricular C1 - Ingeniería de Sistemas</div>
        
        <table style="width: 50%; margin: 10px 0; font-size: 9.5pt;">
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold; width: 40%;">Modalidad de Carrera:</td>
            <td>${creditSettings.modalidadCarrera || "Presencial"}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Horas Teoría/Crédito:</td>
            <td>${creditSettings.valorTeoricas}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Horas Práctica/Crédito:</td>
            <td>${creditSettings.valorPracticas}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Fecha de Reporte:</td>
            <td>${new Date().toLocaleDateString('es-PE')}</td>
          </tr>
        </table>

        <h2>1. CUADRO RESUMEN DE CRÉDITOS Y HORAS LECTIVAS</h2>
        <table>
          <thead>
            <tr>
              <th rowspan="2" colspan="2" style="width: 25%;">Distribución Académica</th>
              <th rowspan="2" style="width: 10%;">N° Cursos</th>
              <th colspan="4" style="width: 32%;">N° Horas Lectivas (Semestrales)</th>
              <th colspan="4" style="width: 33%;">N° Créditos Académicos</th>
            </tr>
            <tr>
              <th>Teoría</th>
              <th>Práctica</th>
              <th>Total</th>
              <th>% del Total</th>
              <th>Teoría</th>
              <th>Práctica</th>
              <th>Total</th>
              <th>% del Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="total-row">
              <td colspan="2">TOTAL GENERAL (Malla C1)</td>
              <td class="text-center">${cat.total.count}</td>
              <td class="text-right">${formatVal(cat.total.ht)}</td>
              <td class="text-right">${formatVal(cat.total.hp)}</td>
              <td class="text-right">${formatVal(cat.total.totalH)}</td>
              <td class="text-center">-</td>
              <td class="text-right">${formatVal(cat.total.credT)}</td>
              <td class="text-right">${formatVal(cat.total.credP)}</td>
              <td class="text-right">${formatVal(cat.total.credTotal)}</td>
              <td class="text-center">-</td>
            </tr>
            <tr class="group-title"><td colspan="11">Tipo de Estudios</td></tr>
            <tr>
              <td style="width: 2%; border-right: none;"></td>
              <td style="border-left: none;">Estudios generales</td>
              <td class="text-center">${cat.g.count}</td>
              <td class="text-right">${formatVal(cat.g.ht)}</td>
              <td class="text-right">${formatVal(cat.g.hp)}</td>
              <td class="text-right">${formatVal(cat.g.totalH)}</td>
              <td class="text-center">${formatPct(cat.g.pctH)}</td>
              <td class="text-right">${formatVal(cat.g.credT)}</td>
              <td class="text-right">${formatVal(cat.g.credP)}</td>
              <td class="text-right">${formatVal(cat.g.credTotal)}</td>
              <td class="text-center">${formatPct(cat.g.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Estudios específicos</td>
              <td class="text-center">${cat.es.count}</td>
              <td class="text-right">${formatVal(cat.es.ht)}</td>
              <td class="text-right">${formatVal(cat.es.hp)}</td>
              <td class="text-right">${formatVal(cat.es.totalH)}</td>
              <td class="text-center">${formatPct(cat.es.pctH)}</td>
              <td class="text-right">${formatVal(cat.es.credT)}</td>
              <td class="text-right">${formatVal(cat.es.credP)}</td>
              <td class="text-right">${formatVal(cat.es.credTotal)}</td>
              <td class="text-center">${formatPct(cat.es.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Estudios de especialidad</td>
              <td class="text-center">${cat.sp.count}</td>
              <td class="text-right">${formatVal(cat.sp.ht)}</td>
              <td class="text-right">${formatVal(cat.sp.hp)}</td>
              <td class="text-right">${formatVal(cat.sp.totalH)}</td>
              <td class="text-center">${formatPct(cat.sp.pctH)}</td>
              <td class="text-right">${formatVal(cat.sp.credT)}</td>
              <td class="text-right">${formatVal(cat.sp.credP)}</td>
              <td class="text-right">${formatVal(cat.sp.credTotal)}</td>
              <td class="text-center">${formatPct(cat.sp.pctCred)}</td>
            </tr>
            <tr class="group-title"><td colspan="11">Modalidad</td></tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Presencial</td>
              <td class="text-center"></td>
              <td class="text-right">${formatVal(cat.pr.ht)}</td>
              <td class="text-right">${formatVal(cat.pr.hp)}</td>
              <td class="text-right">${formatVal(cat.pr.totalH)}</td>
              <td class="text-center">${formatPct(cat.pr.pctH)}</td>
              <td class="text-right">${formatVal(cat.pr.credT)}</td>
              <td class="text-right">${formatVal(cat.pr.credP)}</td>
              <td class="text-right">${formatVal(cat.pr.credTotal)}</td>
              <td class="text-center">${formatPct(cat.pr.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Virtual</td>
              <td class="text-center"></td>
              <td class="text-right">${formatVal(cat.vi.ht)}</td>
              <td class="text-right">${formatVal(cat.vi.hp)}</td>
              <td class="text-right">${formatVal(cat.vi.totalH)}</td>
              <td class="text-center">${formatPct(cat.vi.pctH)}</td>
              <td class="text-right">${formatVal(cat.vi.credT)}</td>
              <td class="text-right">${formatVal(cat.vi.credP)}</td>
              <td class="text-right">${formatVal(cat.vi.credTotal)}</td>
              <td class="text-center">${formatPct(cat.vi.pctCred)}</td>
            </tr>
            <tr class="group-title"><td colspan="11">Tipo de Curso</td></tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Obligatorios</td>
              <td class="text-center">${cat.ob.count}</td>
              <td class="text-right">${formatVal(cat.ob.ht)}</td>
              <td class="text-right">${formatVal(cat.ob.hp)}</td>
              <td class="text-right">${formatVal(cat.ob.totalH)}</td>
              <td class="text-center">${formatPct(cat.ob.pctH)}</td>
              <td class="text-right">${formatVal(cat.ob.credT)}</td>
              <td class="text-right">${formatVal(cat.ob.credP)}</td>
              <td class="text-right">${formatVal(cat.ob.credTotal)}</td>
              <td class="text-center">${formatPct(cat.ob.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Electivos</td>
              <td class="text-center">${cat.el.count}</td>
              <td class="text-right">${formatVal(cat.el.ht)}</td>
              <td class="text-right">${formatVal(cat.el.hp)}</td>
              <td class="text-right">${formatVal(cat.el.totalH)}</td>
              <td class="text-center">${formatPct(cat.el.pctH)}</td>
              <td class="text-right">${formatVal(cat.el.credT)}</td>
              <td class="text-right">${formatVal(cat.el.credP)}</td>
              <td class="text-right">${formatVal(cat.el.credTotal)}</td>
              <td class="text-center">${formatPct(cat.el.pctCred)}</td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL (Estadístico Senior)</div>
          <p>
            Desde la perspectiva del análisis cuantitativo y la optimización de recursos educativos en el marco del licenciamiento y las condiciones básicas de calidad (CBC), la distribución del volumen de créditos y horas lectivas acumuladas representa una métrica fundamental para evaluar la eficiencia operativa de la malla curricular C1 de Ingeniería de Sistemas. Al analizar la proporción de horas teóricas frente a las prácticas, se observa que la concentración curricular responde a un modelo de formación estructurado. Estadísticamente, la relación entre horas teóricas (con un peso semestral de ${formatVal(cat.total.ht)} horas) y horas prácticas (${formatVal(cat.total.hp)} horas) determina la varianza en la carga académica del estudiante. En la teoría de diseño de planes curriculares, un coeficiente de correlación desbalanceado entre horas de teoría y práctica podría sesgar el perfil de egreso y sobrecargar las horas presenciales de tutoría. Al evaluar la dispersión de estos datos, a través del análisis de varianza (ANOVA) interdepartamental, se recomienda mantener la homogeneidad del creditaje y la proporcionalidad de las horas asignadas, asegurando que la desviación estándar de la dedicación horaria por crédito no supere los límites tolerables establecidos por la SUNEDU y estándares de calidad como la norma ISO 21001. En conclusión, la métrica global de ${formatVal(cat.total.credTotal)} créditos para los ${cat.total.count} cursos analizados muestra una distribución que minimiza el riesgo de deserción por sobrecarga y maximiza la eficiencia de las horas lectivas impartidas.
          </p>
        </div>

        <h2>2. RELACIÓN DE ASIGNATURAS POR TIPO DE ESTUDIO</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 15%; text-align: left;">Código</th>
              <th style="width: 40%; text-align: left;">Nombre de la Asignatura</th>
              <th style="width: 20%; text-align: center;">Tipo de Estudio</th>
              <th style="width: 15%; text-align: center;">Carácter</th>
              <th style="width: 10%; text-align: right;">Créditos</th>
            </tr>
          </thead>
          <tbody>
            ${sortedCursos.length === 0 ? `
              <tr><td colspan="5" style="text-align: center; font-style: italic;">No hay asignaturas registradas.</td></tr>
            ` : sortedCursos.map(c => `
              <tr>
                <td style="font-family: monospace;">${c.tipoCurso === 'electivo' ? 'Electivo' : (c.codigo || 'SIN CÓDIGO')}</td>
                <td>${c.nombre}</td>
                <td class="text-center">${c.tipoEstudio || 'General'}</td>
                <td class="text-center">${c.tipoCurso === 'obligatorio' ? 'Obligatorio' : 'Electivo'}</td>
                <td class="text-right">${c.creditos}</td>
              </tr>
            `).join("")}
            <tr class="total-row">
              <td colspan="4" style="text-align: right; font-weight: bold;">TOTAL CRÉDITOS:</td>
              <td class="text-right" style="font-weight: bold; color: #0078d4;">${formatVal(sumTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL (Estadístico Senior)</div>
          <p>
            El análisis de la distribución de asignaturas según el tipo de estudio (Estudios Generales, Estudios Específicos y Estudios de Especialidad) permite modelar la trayectoria académica a través de pruebas paramétricas de comparación de proporciones y análisis multivariado. La clasificación categórica de las asignaturas en la malla curricular C1 muestra cómo el plan equilibra las competencias fundamentales con la formación técnica especializada. Estadísticamente, el análisis del rango y el peso porcentual de créditos para cada grupo curricular revela la estructura pedagógica del programa. Un desbalance en el volumen de créditos de formación general frente a la especialidad podría alterar significativamente los perfiles de egreso, sesgando el rendimiento académico global del estudiante. Con una sumatoria total de créditos acumulados de ${formatVal(sumTotal)}, es indispensable aplicar modelos de regresión lineal para evaluar la correlación entre la aprobación de asignaturas de carácter obligatorio y el tiempo de permanencia estudiantil en el programa. Desde una perspectiva estadística, la concentración de asignaturas obligatorias versus electivas determina la flexibilidad del plan, y se aconseja monitorear la tasa de aprobación histórica para detectar cuellos de botella mediante pruebas de hipótesis chi-cuadrada de independencia. De este modo, se garantiza un flujo óptimo de estudiantes y el cumplimiento sostenido de las Condiciones Básicas de Calidad (CBC).
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

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Reporte_Malla_Curricular_C1.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportFilteredReportToWord = async () => {
    const ratio = creditSettings.valorTeoricas / creditSettings.valorPracticas;
    const formatVal = (num) => Math.round(num * 100) / 100;
    const formatPct = (num) => Math.round(num) + "%";

    // 1. Preparar datos para Cuadro Resumen
    const totalCursos = cursos.length;
    const totalHTRaw = cursos.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
    const totalHPRaw = cursos.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
    const multWeeks = creditSettings.valorTeoricas || 16;
    const totalHT = totalHTRaw * multWeeks;
    const totalHP = totalHPRaw * multWeeks;
    const totalHoras = totalHT + totalHP;
    const totalCreditos = cursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    const getStats = (filterFn) => {
      const filtered = cursos.filter(filterFn);
      const htRaw = filtered.reduce((sum, c) => sum + (c.horasTP || 0) + (c.horasTV || 0), 0);
      const hpRaw = filtered.reduce((sum, c) => sum + (c.horasPP || 0) + (c.horasPV || 0), 0);
      const ht = htRaw * multWeeks;
      const hp = hpRaw * multWeeks;
      const totalH = ht + hp;
      const credTotal = filtered.reduce((sum, c) => sum + (c.creditos || 0), 0);
      return {
        count: filtered.length,
        ht,
        hp,
        totalH,
        pctH: totalHoras > 0 ? (totalH / totalHoras) * 100 : 0,
        credT: htRaw,
        credP: hpRaw * ratio,
        credTotal,
        pctCred: totalCreditos > 0 ? (credTotal / totalCreditos) * 100 : 0
      };
    };

    const cat = {
      total: { count: totalCursos, ht: totalHT, hp: totalHP, totalH: totalHoras, pctH: 100, credT: totalHTRaw, credP: totalHPRaw * ratio, credTotal: totalCreditos, pctCred: 100 },
      g: getStats(c => c.tipoEstudio === "General"),
      es: getStats(c => c.tipoEstudio === "Específico"),
      sp: getStats(c => c.tipoEstudio === "De especialidad"),
      pr: getStats(c => (c.modalidad || "Presencial") === "Presencial"),
      vi: getStats(c => c.modalidad === "Virtual"),
      ob: getStats(c => c.tipoCurso === "obligatorio"),
      el: getStats(c => c.tipoCurso === "electivo")
    };

    // Ordenar asignaturas por tipo de estudio
    const sortedCursos = [...cursos].sort((a, b) => {
      const order = { "General": 1, "Específico": 2, "De especialidad": 3 };
      const oA = order[a.tipoEstudio || "General"] || 99;
      const oB = order[b.tipoEstudio || "General"] || 99;
      if (oA !== oB) return oA - oB;
      return (a.codigo || "").localeCompare(b.codigo || "") || a.nombre.localeCompare(b.nombre);
    });

    const filteredCursos = activeStudyTypeFilter === "Todos"
      ? sortedCursos
      : sortedCursos.filter(c => (c.tipoEstudio || "General") === activeStudyTypeFilter);

    const sumTotal = filteredCursos.reduce((sum, c) => sum + (c.creditos || 0), 0);

    const filterTitle = activeStudyTypeFilter === "Todos"
      ? "TODOS LOS CURSOS"
      : activeStudyTypeFilter === "General"
        ? "ESTUDIOS GENERALES"
        : activeStudyTypeFilter === "Específico"
          ? "ESTUDIOS ESPECÍFICOS"
          : "ESTUDIOS DE ESPECIALIDAD";

    const coverImg = await generateCoverPageImage("REPORTE DE ASIGNATURAS POR TIPO DE ESTUDIO - " + filterTitle);

    let wordHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
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
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #333333; line-height: 1.4; }
          h1 { color: #0b2545; font-size: 18pt; text-align: center; margin-bottom: 5px; }
          .subtitle { text-align: center; color: #555555; font-size: 11pt; margin-bottom: 25px; }
          h2 { color: #134074; font-size: 14pt; border-bottom: 2px solid #0078d4; padding-bottom: 4px; margin-top: 30px; }
          h3 { color: #0078d4; font-size: 11pt; margin-top: 15px; margin-bottom: 5px; }
          table { border-collapse: collapse; width: 100%; margin: 15px 0; font-size: 9pt; }
          th, td { border: 1px solid #999999; padding: 6px 8px; }
          th { background-color: #f2f2f2; font-weight: bold; color: #134074; font-size: 8.5pt; text-align: center; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
          .total-row { background-color: #e6f2ff; font-weight: bold; }
          .group-title { background-color: #f5f5f5; font-weight: bold; color: #0078d4; text-transform: uppercase; font-size: 8.5pt; }
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
        </style>
      </head>
      <body>${coverImg ? `<div class="Cover"><table border="0" cellpadding="0" cellspacing="0" style="width: 210mm; height: 297mm; border-collapse: collapse; margin: 0; padding: 0;"><tr><td style="text-align: center; vertical-align: top; padding: 0; margin: 0; width: 210mm; height: 297mm;"><img src="${coverImg}" style="width: 210mm; height: 297mm; display: block; margin: 0; padding: 0;" /></td></tr></table></div>` : `<div class="Cover">${getCoverPageHtml("REPORTE DE ASIGNATURAS POR TIPO DE ESTUDIO - " + filterTitle)}</div>`}<div class="Report">
          <h1>SISTEMA DE INFORMACIÓN Y MONITOREO DE LAS CONDICIONES BÁSICAS DE CALIDAD (SIM-CBC)</h1>
        <div class="subtitle">Reporte Oficial de Malla Curricular C1 - Ingeniería de Sistemas</div>
        
        <table style="width: 50%; margin: 10px 0; font-size: 9.5pt;">
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold; width: 40%;">Modalidad de Carrera:</td>
            <td>${creditSettings.modalidadCarrera || "Presencial"}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Horas Teoría/Crédito:</td>
            <td>${creditSettings.valorTeoricas}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Horas Práctica/Crédito:</td>
            <td>${creditSettings.valorPracticas}</td>
          </tr>
          <tr>
            <td style="background-color: #f2f2f2; font-weight: bold;">Fecha de Reporte:</td>
            <td>${new Date().toLocaleDateString('es-PE')}</td>
          </tr>
        </table>

        <h2>1. CUADRO RESUMEN DE CRÉDITOS Y HORAS LECTIVAS</h2>
        <table>
          <thead>
            <tr>
              <th rowspan="2" colspan="2" style="width: 25%;">Distribución Académica</th>
              <th rowspan="2" style="width: 10%;">N° Cursos</th>
              <th colspan="4" style="width: 32%;">N° Horas Lectivas (Semestrales)</th>
              <th colspan="4" style="width: 33%;">N° Créditos Académicos</th>
            </tr>
            <tr>
              <th>Teoría</th>
              <th>Práctica</th>
              <th>Total</th>
              <th>% del Total</th>
              <th>Teoría</th>
              <th>Práctica</th>
              <th>Total</th>
              <th>% del Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="total-row">
              <td colspan="2">TOTAL GENERAL (Malla C1)</td>
              <td class="text-center">${cat.total.count}</td>
              <td class="text-right">${formatVal(cat.total.ht)}</td>
              <td class="text-right">${formatVal(cat.total.hp)}</td>
              <td class="text-right">${formatVal(cat.total.totalH)}</td>
              <td class="text-center">-</td>
              <td class="text-right">${formatVal(cat.total.credT)}</td>
              <td class="text-right">${formatVal(cat.total.credP)}</td>
              <td class="text-right">${formatVal(cat.total.credTotal)}</td>
              <td class="text-center">-</td>
            </tr>
            <tr class="group-title"><td colspan="11">Tipo de Estudios</td></tr>
            <tr>
              <td style="width: 2%; border-right: none;"></td>
              <td style="border-left: none;">Estudios generales</td>
              <td class="text-center">${cat.g.count}</td>
              <td class="text-right">${formatVal(cat.g.ht)}</td>
              <td class="text-right">${formatVal(cat.g.hp)}</td>
              <td class="text-right">${formatVal(cat.g.totalH)}</td>
              <td class="text-center">${formatPct(cat.g.pctH)}</td>
              <td class="text-right">${formatVal(cat.g.credT)}</td>
              <td class="text-right">${formatVal(cat.g.credP)}</td>
              <td class="text-right">${formatVal(cat.g.credTotal)}</td>
              <td class="text-center">${formatPct(cat.g.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Estudios específicos</td>
              <td class="text-center">${cat.es.count}</td>
              <td class="text-right">${formatVal(cat.es.ht)}</td>
              <td class="text-right">${formatVal(cat.es.hp)}</td>
              <td class="text-right">${formatVal(cat.es.totalH)}</td>
              <td class="text-center">${formatPct(cat.es.pctH)}</td>
              <td class="text-right">${formatVal(cat.es.credT)}</td>
              <td class="text-right">${formatVal(cat.es.credP)}</td>
              <td class="text-right">${formatVal(cat.es.credTotal)}</td>
              <td class="text-center">${formatPct(cat.es.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Estudios de especialidad</td>
              <td class="text-center">${cat.sp.count}</td>
              <td class="text-right">${formatVal(cat.sp.ht)}</td>
              <td class="text-right">${formatVal(cat.sp.hp)}</td>
              <td class="text-right">${formatVal(cat.sp.totalH)}</td>
              <td class="text-center">${formatPct(cat.sp.pctH)}</td>
              <td class="text-right">${formatVal(cat.sp.credT)}</td>
              <td class="text-right">${formatVal(cat.sp.credP)}</td>
              <td class="text-right">${formatVal(cat.sp.credTotal)}</td>
              <td class="text-center">${formatPct(cat.sp.pctCred)}</td>
            </tr>
            <tr class="group-title"><td colspan="11">Modalidad</td></tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Presencial</td>
              <td class="text-center"></td>
              <td class="text-right">${formatVal(cat.pr.ht)}</td>
              <td class="text-right">${formatVal(cat.pr.hp)}</td>
              <td class="text-right">${formatVal(cat.pr.totalH)}</td>
              <td class="text-center">${formatPct(cat.pr.pctH)}</td>
              <td class="text-right">${formatVal(cat.pr.credT)}</td>
              <td class="text-right">${formatVal(cat.pr.credP)}</td>
              <td class="text-right">${formatVal(cat.pr.credTotal)}</td>
              <td class="text-center">${formatPct(cat.pr.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Virtual</td>
              <td class="text-center"></td>
              <td class="text-right">${formatVal(cat.vi.ht)}</td>
              <td class="text-right">${formatVal(cat.vi.hp)}</td>
              <td class="text-right">${formatVal(cat.vi.totalH)}</td>
              <td class="text-center">${formatPct(cat.vi.pctH)}</td>
              <td class="text-right">${formatVal(cat.vi.credT)}</td>
              <td class="text-right">${formatVal(cat.vi.credP)}</td>
              <td class="text-right">${formatVal(cat.vi.credTotal)}</td>
              <td class="text-center">${formatPct(cat.vi.pctCred)}</td>
            </tr>
            <tr class="group-title"><td colspan="11">Tipo de Curso</td></tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Obligatorios</td>
              <td class="text-center">${cat.ob.count}</td>
              <td class="text-right">${formatVal(cat.ob.ht)}</td>
              <td class="text-right">${formatVal(cat.ob.hp)}</td>
              <td class="text-right">${formatVal(cat.ob.totalH)}</td>
              <td class="text-center">${formatPct(cat.ob.pctH)}</td>
              <td class="text-right">${formatVal(cat.ob.credT)}</td>
              <td class="text-right">${formatVal(cat.ob.credP)}</td>
              <td class="text-right">${formatVal(cat.ob.credTotal)}</td>
              <td class="text-center">${formatPct(cat.ob.pctCred)}</td>
            </tr>
            <tr>
              <td style="border-right: none;"></td>
              <td style="border-left: none;">Electivos</td>
              <td class="text-center">${cat.el.count}</td>
              <td class="text-right">${formatVal(cat.el.ht)}</td>
              <td class="text-right">${formatVal(cat.el.hp)}</td>
              <td class="text-right">${formatVal(cat.el.totalH)}</td>
              <td class="text-center">${formatPct(cat.el.pctH)}</td>
              <td class="text-right">${formatVal(cat.el.credT)}</td>
              <td class="text-right">${formatVal(cat.el.credP)}</td>
              <td class="text-right">${formatVal(cat.el.credTotal)}</td>
              <td class="text-center">${formatPct(cat.el.pctCred)}</td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL (Estadístico Senior)</div>
          <p>
            El análisis cuantitativo de la distribución del creditaje y horas lectivas semestrales es un pilar crítico para el aseguramiento de la calidad y el diseño curricular dinámico en la UPT. Al estratificar las horas de teoría y práctica bajo los parámetros de valoración vigentes (${creditSettings.valorTeoricas} horas/teoría y ${creditSettings.valorPracticas} horas/práctica por crédito), se puede evaluar con rigor el impacto en la carga docente y estudiantil. La proporción del total de horas lectivas semestrales (${formatVal(cat.total.totalH)} horas totales en la malla C1) constituye una variable continua cuyo comportamiento probabilístico y variabilidad interna deben ser analizados. Empleando herramientas de control estadístico de procesos (SPC), podemos identificar variaciones en la distribución del tiempo lectivo real frente al planificado. La presencia de una desviación típica elevada en las horas prácticas de los cursos podría generar inconsistencias en los resultados de aprendizaje. Por tanto, es recomendable calcular la covarianza entre la carga de horas prácticas y el rendimiento académico final para calibrar la eficacia pedagógica del portafolio curricular. Este análisis predictivo facilita la toma de decisiones basada en datos empíricos, optimizando la asignación horaria conforme a las exigencias del licenciamiento institucional y la autoevaluación permanente.
          </p>
        </div>

        <h2>2. ASIGNATURAS POR TIPO DE ESTUDIO: ${filterTitle}</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 15%; text-align: left;">Código</th>
              <th style="width: 40%; text-align: left;">Nombre de la Asignatura</th>
              <th style="width: 20%; text-align: center;">Tipo de Estudio</th>
              <th style="width: 15%; text-align: center;">Carácter</th>
              <th style="width: 10%; text-align: right;">Créditos</th>
            </tr>
          </thead>
          <tbody>
            ${filteredCursos.length === 0 ? `
              <tr><td colspan="5" style="text-align: center; font-style: italic;">No hay asignaturas registradas en esta categoría.</td></tr>
            ` : filteredCursos.map(c => `
              <tr>
                <td style="font-family: monospace;">${c.tipoCurso === 'electivo' ? 'Electivo' : (c.codigo || 'SIN CÓDIGO')}</td>
                <td>${c.nombre}</td>
                <td class="text-center">${c.tipoEstudio || 'General'}</td>
                <td class="text-center">${c.tipoCurso === 'obligatorio' ? 'Obligatorio' : 'Electivo'}</td>
                <td class="text-right">${c.creditos}</td>
              </tr>
            `).join("")}
            <tr class="total-row">
              <td colspan="4" style="text-align: right; font-weight: bold;">TOTAL CRÉDITOS:</td>
              <td class="text-right" style="font-weight: bold; color: #0078d4;">${formatVal(sumTotal)}</td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <div class="analysis-title">ANÁLISIS ESTADÍSTICO PROFESIONAL (Estadístico Senior)</div>
          <p>
            La evaluación analítica de la relación de asignaturas filtradas por tipo de estudio bajo la categoría de ${filterTitle} ofrece información diagnóstica clave para el rediseño y actualización curricular de la carrera. Con una muestra filtrada de ${filteredCursos.length} asignaturas que representan un acumulado total de ${formatVal(sumTotal)} créditos académicos, se puede realizar una prueba de bondad de ajuste para evaluar si la distribución observada coincide con el perfil ideal teórico del egresado de Ingeniería de Sistemas. Estadísticamente, la segmentación curricular por carácter (obligatorio u electivo) influye directamente en las tasas de deserción y avance académico. La aplicación de modelos de supervivencia estudiantil (como el estimador de Kaplan-Meier) revela que los cuellos de botella suelen correlacionarse con asignaturas de alta densidad crediticia y baja tasa de aprobación en los primeros ciclos. Por ende, desde la perspectiva del control de calidad académica, se sugiere implementar estrategias de nivelación o tutoría dirigida sobre las asignaturas identificadas con mayor desviación en sus tasas de rendimiento, garantizando de este modo que la transición hacia estudios de especialidad sea fluida, homogénea y cumpla plenamente con los estándares de acreditación nacional.
          </p>
        </div>
        
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

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_Malla_${activeStudyTypeFilter.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Dibujar estructura básica de la página (Con las dos pestañas principales)
  container.innerHTML = `
    <div class="page-content">
      
      <!-- Encabezado de la página -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <p style="color: var(--text-300); font-size: 0.9rem; margin-top: 2px;">
            Malla curricular C1 e informe estructurado de horas y créditos. Los créditos son calculados de forma automática y de sólo lectura.
          </p>
        </div>
        <button class="btn btn-secondary" id="btn-malla-reset" style="padding: 0.5rem 1rem; border-color: rgba(245, 158, 11, 0.3); color: var(--color-proceso);">
          <i data-lucide="refresh-cw" style="width: 14px; height: 14px; color: var(--color-proceso);"></i>
          <span>Comenzar de nuevo / Nuevo registro</span>
        </button>
      </div>

      <!-- Banner de Advertencia de Privacidad -->
      <div class="card" style="border-left: 4px solid var(--color-proceso); padding: 1rem; margin-bottom: 1.5rem; display: flex; gap: 12px; align-items: flex-start; background-color: var(--color-proceso-bg);">
        <i data-lucide="shield-alert" style="color: var(--color-proceso); flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px;"></i>
        <div style="font-size: 0.85rem; color: var(--text-200); line-height: 1.5;">
          <strong style="color: var(--text-100);">Recomendación:</strong> La información no se almacena y se elimina al momento de cerrar sesión o darle clic a <strong>"Comenzar de nuevo / Nuevo registro"</strong> para que todos puedan utilizar la edición de asignaturas.
        </div>
      </div>

      <!-- Pestañas Principales (Navegación Nivel Superior) -->
      <div class="malla-main-tabs">
        <button class="malla-main-tab-btn active" id="tab-primary-edicion">
          <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
          <span>Edición de Asignaturas</span>
        </button>
        <button class="malla-main-tab-btn" id="tab-primary-resumen">
          <i data-lucide="bar-chart-2" style="width: 16px; height: 16px;"></i>
          <span>Resumen de Créditos y Horas</span>
        </button>
      </div>

      <!-- SECCIÓN 1: EDICIÓN DE ASIGNATURAS -->
      <div id="section-malla-edicion" style="display: block; animation: fadeIn var(--transition-fast);">
        
        <!-- Configuración Global de Créditos (Fórmula Excel) -->
        <div class="card" style="padding: 1.25rem; background-color: var(--bg-dark-900); margin-bottom: 1.5rem;">
          <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="calculator" style="color: var(--accent-light); width: 18px; height: 18px;"></i>
            <span>Parámetros de Cálculo de Créditos</span>
          </h3>
          <p style="font-size: 0.75rem; color: var(--text-300); margin-bottom: 1.25rem;">
            Fórmula Institucional: <code>Créditos = (HTP + HTV) + (HPP + HPV) * (Horas_Teoria / Horas_Practica)</code>. Multiplicador de semanas = Valor de Horas de Teoría (16).
          </p>
          
          <div style="display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap;">
            <div class="form-group" style="margin-bottom: 0; min-width: 180px;">
              <label style="font-size: 0.7rem; font-weight: 600;">Horas de Teoría por Crédito (Weeks)</label>
              <input type="number" id="settings-valor-teoricas" class="input-control" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;" value="${creditSettings.valorTeoricas}">
            </div>
            <div class="form-group" style="margin-bottom: 0; min-width: 180px;">
              <label style="font-size: 0.7rem; font-weight: 600;">Horas de Práctica por Crédito</label>
              <input type="number" id="settings-valor-practicas" class="input-control" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;" value="${creditSettings.valorPracticas}">
            </div>
            <div class="form-group" style="margin-bottom: 0; min-width: 180px;">
              <label style="font-size: 0.7rem; font-weight: 600;">Modalidad de la Carrera</label>
              <select id="settings-modalidad-carrera" class="input-control" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;">
                <option value="Presencial" ${creditSettings.modalidadCarrera === 'Presencial' ? 'selected' : ''}>Presencial</option>
                <option value="Semipresencial" ${creditSettings.modalidadCarrera === 'Semipresencial' ? 'selected' : ''}>Semipresencial</option>
                <option value="A distancia" ${creditSettings.modalidadCarrera === 'A distancia' ? 'selected' : ''}>A distancia</option>
              </select>
            </div>
            <button class="btn btn-secondary" id="btn-save-credit-settings" style="padding: 0.45rem 1rem; font-size: 0.8rem; background-color: var(--bg-dark-700);">
              <i data-lucide="save" style="width: 14px; height: 14px;"></i>
              <span>Guardar y Recalcular</span>
            </button>
          </div>
        </div>

        <!-- Pestañas de Ciclos (13 Ciclos) -->
        <div class="malla-cycles-tab">
          ${ciclos.map(ciclo => `
            <button class="tab-btn ${ciclo.id === activeCicloId ? 'active' : ''}" data-ciclo-id="${ciclo.id}">
              ${ciclo.nombre}
            </button>
          `).join("")}
        </div>

        <!-- Contenedor dinámico de cursos -->
        <div id="malla-grid-container"></div>
      </div>

      <!-- SECCIÓN 2: RESUMEN DE CRÉDITOS -->
      <div id="section-malla-resumen" style="display: none; animation: fadeIn var(--transition-fast); margin-bottom: 2rem;">
        <div style="display: flex; justify-content: flex-end; margin-bottom: 1.5rem;">
          <button class="btn btn-primary" id="btn-export-word" style="background-color: #0078d4; padding: 0.5rem 1rem;">
            <i data-lucide="file-text" style="width: 16px; height: 16px; margin-right: 6px;"></i>
            <span>Descargar Reporte en Word</span>
          </button>
        </div>
        <div id="malla-resumen-container"></div>
        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0;">
        <div id="malla-resumen-estudios-container"></div>
      </div>
      
      <!-- Contenedor del Modal del Formulario de Cursos -->
      <div id="course-modal-portal"></div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Elementos de secciones y tabs principales
  const tabPrimaryEdicion = container.querySelector("#tab-primary-edicion");
  const tabPrimaryResumen = container.querySelector("#tab-primary-resumen");
  const sectionMallaEdicion = container.querySelector("#section-malla-edicion");
  const sectionMallaResumen = container.querySelector("#section-malla-resumen");

  tabPrimaryEdicion.onclick = () => {
    tabPrimaryEdicion.classList.add("active");
    tabPrimaryResumen.classList.remove("active");
    sectionMallaEdicion.style.display = "block";
    sectionMallaResumen.style.display = "none";
    activePrimaryTab = "edicion";
    drawMallaGrid();
  };

  tabPrimaryResumen.onclick = () => {
    tabPrimaryResumen.classList.add("active");
    tabPrimaryEdicion.classList.remove("active");
    sectionMallaEdicion.style.display = "none";
    sectionMallaResumen.style.display = "block";
    activePrimaryTab = "resumen";
    drawResumenCreditos();
    drawAsignaturasPorEstudio();

    // Configurar exportación a Word
    const btnExport = container.querySelector("#btn-export-word");
    if (btnExport) {
      btnExport.onclick = exportReportToWord;
    }
  };

  // Escuchar Pestañas de Ciclos
  const tabButtons = container.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.onclick = () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCicloId = btn.getAttribute("data-ciclo-id");
      drawMallaGrid();
    };
  });

  // Guardar Parámetros de Crédito
  const btnSaveSettings = container.querySelector("#btn-save-credit-settings");
  if (btnSaveSettings) {
    btnSaveSettings.onclick = async () => {
      btnSaveSettings.innerHTML = `<i data-lucide="refresh-cw" class="spin"></i> Recalculando...`;
      if (window.lucide) window.lucide.createIcons();

      const valorTeoricas = parseFloat(container.querySelector("#settings-valor-teoricas").value) || 16;
      const valorPracticas = parseFloat(container.querySelector("#settings-valor-practicas").value) || 32;
      const modalidadCarrera = container.querySelector("#settings-modalidad-carrera").value;

      creditSettings.valorTeoricas = valorTeoricas;
      creditSettings.valorPracticas = valorPracticas;
      creditSettings.modalidadCarrera = modalidadCarrera;
      await db.saveCreditSettings(creditSettings);

      // Recalcular créditos de todos los cursos en la base de datos
      const todosCursos = await db.getCursos();
      for (let c of todosCursos) {
        const tp = c.horasTP || 0;
        const tv = c.horasTV || 0;
        const pp = c.horasPP || 0;
        const pv = c.horasPV || 0;
        
        let cred = (tp + tv) + (pp + pv) * (valorTeoricas / valorPracticas);
        c.creditos = Math.round(cred * 100) / 100;
        await db.saveCurso(c);
      }

      // Recargar variables locales
      const updatedCursos = await db.getCursos();
      cursos.length = 0;
      cursos.push(...updatedCursos);

      alert("Los parámetros han sido guardados. Todos los creditajes de la malla curricular C1 se han recalculado de acuerdo con la fórmula establecida en el Excel.");
      btnSaveSettings.innerHTML = `<i data-lucide="save" style="width: 14px; height: 14px;"></i> <span>Guardar y Recalcular</span>`;
      if (window.lucide) window.lucide.createIcons();
      
      // Redibujar la vista activa
      if (activePrimaryTab === "edicion") {
        drawMallaGrid();
      } else {
        drawResumenCreditos();
      }
    };
  }

  // Registrar evento de reinicio de malla
  const btnReset = container.querySelector("#btn-malla-reset");
  if (btnReset) {
    btnReset.onclick = async () => {
      if (confirm("¿Está seguro de vaciar la Malla Curricular C1? Se perderán todos los cursos agregados y cambios actuales.")) {
        localStorage.setItem("sigeca_cursos", JSON.stringify([]));
        localStorage.removeItem("sigeca_credit_settings");
        alert("La Malla Curricular se ha vaciado y está lista para trabajar.");
        // recargar página
        await renderMallaPage(container, userRole);
      }
    };
  }

  // Render inicial del grid
  drawMallaGrid();

  // Función para abrir el formulario de cursos (Nuevo / Editar)
  const openCourseModal = (curso = null) => {
    const portal = container.querySelector("#course-modal-portal");
    if (!portal) return;

    portal.innerHTML = `
      <div class="modal-overlay" id="course-form-modal">
        <div class="modal-wrapper" style="max-width: 550px;">
          <div class="modal-header">
            <h3 class="modal-title">${curso ? 'Editar Asignatura' : 'Agregar Asignatura'}</h3>
            <button class="modal-close" id="form-modal-close"><i data-lucide="x"></i></button>
          </div>
          
          <form id="course-editor-form">
            <div class="modal-body">
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="c-tipo">Tipo Asignatura</label>
                  <select id="c-tipo" class="input-control" required>
                    <option value="obligatorio" ${curso && curso.tipoCurso === 'obligatorio' ? 'selected' : ''}>Obligatorio</option>
                    <option value="electivo" ${curso && curso.tipoCurso === 'electivo' ? 'selected' : ''}>Electivo</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="c-tipo-estudio">Tipo de Estudio</label>
                  <select id="c-tipo-estudio" class="input-control" required>
                    <option value="General" ${curso && curso.tipoEstudio === 'General' ? 'selected' : ''}>General</option>
                    <option value="Específico" ${curso && curso.tipoEstudio === 'Específico' ? 'selected' : ''}>Específico</option>
                    <option value="De especialidad" ${curso && curso.tipoEstudio === 'De especialidad' ? 'selected' : ''}>De especialidad</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="display: none;">
                <label for="c-codigo">Código Curso</label>
                <input type="text" id="c-codigo" class="input-control" placeholder="SIS-101" value="${curso ? (curso.codigo || '') : ''}">
              </div>

              <div class="form-group">
                <label for="c-nombre">Nombre de la Asignatura</label>
                <input type="text" id="c-nombre" class="input-control" placeholder="Algoritmos y Estructuras" required value="${curso ? curso.nombre : ''}">
              </div>

              <!-- Distribución de Horas Teóricas (TP y TV) -->
              <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-300); margin-top: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">Horas Teóricas (Semanales)</h4>
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="c-horas-tp">Teóricas Presenciales (Horas TP)</label>
                  <input type="number" id="c-horas-tp" class="input-control" min="0" max="20" required value="${curso ? (curso.horasTP || 0) : '2'}">
                </div>
                <div class="form-group">
                  <label for="c-horas-tv">Teóricas Virtuales (Horas TV)</label>
                  <input type="number" id="c-horas-tv" class="input-control" min="0" max="20" required value="${curso ? (curso.horasTV || 0) : '0'}">
                </div>
              </div>

              <!-- Distribución de Horas Prácticas (PP y PV) -->
              <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-300); margin-top: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.25rem;">Horas Prácticas (Semanales)</h4>
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="c-horas-pp">Prácticas Presenciales (Horas PP)</label>
                  <input type="number" id="c-horas-pp" class="input-control" min="0" max="20" required value="${curso ? (curso.horasPP || 0) : '4'}">
                </div>
                <div class="form-group">
                  <label for="c-horas-pv">Prácticas Virtuales (Horas PV)</label>
                  <input type="number" id="c-horas-pv" class="input-control" min="0" max="20" required value="${curso ? (curso.horasPV || 0) : '0'}">
                </div>
              </div>

              <!-- Créditos Calculados por la Fórmula (Solo Lectura) -->
              <div class="form-group" style="margin-top: 0.75rem;">
                <label for="c-creditos">Créditos de la Asignatura (Calculados por Fórmula Excel)</label>
                <div style="position: relative; display: flex; align-items: center;">
                  <input type="text" id="c-creditos" class="input-control" style="width: 100%; font-weight: 700; color: var(--accent-light); background-color: var(--bg-dark-900);" readonly value="${curso ? curso.creditos : '4'}">
                  <i data-lucide="lock" style="width: 16px; height: 16px; position: absolute; right: 12px; color: var(--text-400);"></i>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="form-modal-cancel">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const formModal = portal.querySelector("#course-form-modal");
    const closeBtn = portal.querySelector("#form-modal-close");
    const cancelBtn = portal.querySelector("#form-modal-cancel");
    const cForm = portal.querySelector("#course-editor-form");
    
    const tipoCursoSelect = portal.querySelector("#c-tipo");
    const tipoEstudioSelect = portal.querySelector("#c-tipo-estudio");
    const codigoInput = portal.querySelector("#c-codigo");

    const htpInput = portal.querySelector("#c-horas-tp");
    const htvInput = portal.querySelector("#c-horas-tv");
    const hppInput = portal.querySelector("#c-horas-pp");
    const hpvInput = portal.querySelector("#c-horas-pv");
    const creditosInput = portal.querySelector("#c-creditos");

    // Lógica para hallar el creditaje en tiempo real según la fórmula del Excel
    const calculateCredits = () => {
      const htp = parseFloat(htpInput.value) || 0;
      const htv = parseFloat(htvInput.value) || 0;
      const hpp = parseFloat(hppInput.value) || 0;
      const hpv = parseFloat(hpvInput.value) || 0;

      // Fórmula: (HTP + HTV) + (HPP + HPV) * (creditSettings.valorTeoricas / creditSettings.valorPracticas)
      let cred = (htp + htv) + (hpp + hpv) * (creditSettings.valorTeoricas / creditSettings.valorPracticas);
      cred = Math.round(cred * 100) / 100;
      creditosInput.value = cred;
    };

    // Escuchar inputs de horas para actualizar el crédito
    [htpInput, htvInput, hppInput, hpvInput].forEach(input => {
      input.oninput = calculateCredits;
    });

    // Lógica de reglas de negocio para Electivos
    const applyBusinessRules = () => {
      if (tipoCursoSelect.value === "electivo") {
        tipoEstudioSelect.value = "De especialidad";
        tipoEstudioSelect.disabled = true;
        codigoInput.value = "";
        codigoInput.disabled = true;
        codigoInput.required = false;
        codigoInput.placeholder = "No asignado (Electivo)";
      } else {
        tipoEstudioSelect.disabled = false;
        codigoInput.disabled = false;
        codigoInput.required = false;
        codigoInput.placeholder = "SIS-101";
      }
      calculateCredits();
    };

    tipoCursoSelect.onchange = applyBusinessRules;
    applyBusinessRules(); // Ejecutar inicialización

    const closeModal = () => {
      portal.innerHTML = "";
    };

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    cForm.onsubmit = async (e) => {
      e.preventDefault();
      
      const tipoCursoValue = tipoCursoSelect.value;
      const htp = parseInt(htpInput.value) || 0;
      const htv = parseInt(htvInput.value) || 0;
      const hpp = parseInt(hppInput.value) || 0;
      const hpv = parseInt(hpvInput.value) || 0;

      // Calcular crédito final
      let cred = (htp + htv) + (hpp + hpv) * (creditSettings.valorTeoricas / creditSettings.valorPracticas);
      cred = Math.round(cred * 100) / 100;

      // Auto-generar el código del curso si no es un electivo
      let autoCodigo = "";
      if (tipoCursoValue !== "electivo") {
        if (curso && curso.codigo) {
          autoCodigo = curso.codigo;
        } else {
          // Obtener el número de ciclo actual (ej. ciclo_03 -> 3)
          const cicloNumStr = activeCicloId ? activeCicloId.split("_")[1] : "1";
          const cicloNum = parseInt(cicloNumStr, 10) || 1;

          // Buscar el prefijo más común en los cursos existentes (ej: SIS, MAT)
          let prefix = "SIS";
          if (cursos && cursos.length > 0) {
            const prefixes = cursos
              .map(c => c.codigo && c.codigo.split("-")[0])
              .filter(p => p && p.length === 3);
            if (prefixes.length > 0) {
              const counts = {};
              let maxCount = 0;
              for (const p of prefixes) {
                counts[p] = (counts[p] || 0) + 1;
                if (counts[p] > maxCount) {
                  maxCount = counts[p];
                  prefix = p;
                }
              }
            }
          }

          // Encontrar el correlativo para este ciclo
          const pattern = new RegExp(`^${prefix}-${cicloNum}\\d{2}$`);
          const existingNums = cursos
            .filter(c => c.codigo && pattern.test(c.codigo))
            .map(c => {
              const parts = c.codigo.split("-")[1];
              return parseInt(parts.substring(1), 10);
            })
            .filter(n => !isNaN(n));

          let nextNum = 1;
          if (existingNums.length > 0) {
            nextNum = Math.max(...existingNums) + 1;
          }

          const numFormatted = String(nextNum).padStart(2, "0");
          autoCodigo = `${prefix}-${cicloNum}${numFormatted}`;
        }
      }

      const cursoData = {
        nombre: portal.querySelector("#c-nombre").value,
        tipoCurso: tipoCursoValue,
        tipoEstudio: tipoCursoValue === "electivo" ? "De especialidad" : tipoEstudioSelect.value,
        codigo: autoCodigo,
        modalidad: (htv + hpv > 0) ? "Virtual" : "Presencial",
        horasTP: htp,
        horasTV: htv,
        horasPP: hpp,
        horasPV: hpv,
        creditos: cred,
        cicloId: activeCicloId
      };

      if (curso) {
        cursoData.id = curso.id;
      }

      await db.saveCurso(cursoData);
      
      // Recargar cursos en memoria
      const updatedCursos = await db.getCursos();
      cursos.length = 0;
      cursos.push(...updatedCursos);
      
      closeModal();
      
      // Refrescar la vista activa
      if (activePrimaryTab === "edicion") {
        drawMallaGrid();
      } else {
        drawResumenCreditos();
      }
    };
  };
}
