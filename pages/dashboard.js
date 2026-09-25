/* ==========================================================================
   SIGECA - PÁGINA DE DASHBOARD (Panel de Control Principal Interactivo)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";

const CONDICIONES = {
  "CBC I": {
    titulo: "Existencia de Objetivos Académicos, Grados y Títulos a Otorgar y Planes de Estudio"
  },
  "CBC II": {
    titulo: "Oferta Educativa a Crearse Compatible con los Fines Propuestos en los Instrumentos de Planeamiento"
  },
  "CBC III": {
    titulo: "INFRAESTRUCTURA Y EQUIPAMIENTO ADECUADO AL CUMPLIMIENTO DE SUS FUNCIONES (AULAS, BIBLIOTECAS, LABORATORIOS, ENTRE OTROS)"
  },
  "CBC IV": {
    titulo: "Líneas de Investigación a ser Desarrolladas"
  },
  "CBC V": {
    titulo: "Disponibilidad de Personal Docente Calificado"
  },
  "CBC VI": {
    titulo: "Servicios Educacionales Complementarios Básicos"
  },
  "CBC VII": {
    titulo: "Mecanismos de Mediación e Inserción Laboral"
  },
  "CBC VIII": {
    titulo: "Transparencia de Universidades"
  }
};

const MV_MAPPING = {
  "mv_lic_1": { cond: "CBC I" },
  "mv_lic_2": { cond: "CBC I" },
  "mv_lic_3": { cond: "CBC I" },
  "mv_lic_4": { cond: "CBC I" },
  "mv_lic_5": { cond: "CBC I" },
  "mv_lic_6": { cond: "CBC I" },
  "mv_lic_7": { cond: "CBC I" },
  "mv_lic_8": { cond: "CBC I" },
  "mv_lic_9": { cond: "CBC I" },
  "mv_lic_10": { cond: "CBC II" },
  "mv_lic_11": { cond: "CBC II" },
  "mv_lic_12": { cond: "CBC II" },
  "mv_lic_13": { cond: "CBC II" },
  "mv_lic_14": { cond: "CBC II" },
  "mv_lic_15": { cond: "CBC II" },
  "mv_lic_16": { cond: "CBC II" },
  "mv_lic_17": { cond: "CBC III" },
  "mv_lic_18": { cond: "CBC III" },
  "mv_lic_19": { cond: "CBC III" },
  "mv_lic_20": { cond: "CBC III" },
  "mv_lic_21": { cond: "CBC III" },
  "mv_lic_22": { cond: "CBC III" },
  "mv_lic_23": { cond: "CBC III" },
  "mv_lic_24": { cond: "CBC III" },
  "mv_lic_25": { cond: "CBC III" },
  "mv_lic_26": { cond: "CBC III" },
  "mv_lic_27": { cond: "CBC III" },
  "mv_lic_28": { cond: "CBC III" },
  "mv_lic_29": { cond: "CBC III" },
  "mv_lic_30": { cond: "CBC III" },
  "mv_lic_31": { cond: "CBC III" },
  "mv_lic_32": { cond: "CBC III" },
  "mv_lic_33": { cond: "CBC III" },
  "mv_lic_34": { cond: "CBC III" },
  "mv_lic_35": { cond: "CBC IV" },
  "mv_lic_36": { cond: "CBC IV" },
  "mv_lic_37": { cond: "CBC IV" },
  "mv_lic_38": { cond: "CBC IV" },
  "mv_lic_39": { cond: "CBC IV" },
  "mv_lic_40": { cond: "CBC IV" },
  "mv_lic_41": { cond: "CBC IV" },
  "mv_lic_42": { cond: "CBC IV" },
  "mv_lic_43": { cond: "CBC V" },
  "mv_lic_44": { cond: "CBC V" },
  "mv_lic_45": { cond: "CBC V" },
  "mv_lic_46": { cond: "CBC V" },
  "mv_lic_47": { cond: "CBC VI" },
  "mv_lic_48": { cond: "CBC VI" },
  "mv_lic_49": { cond: "CBC VI" },
  "mv_lic_50": { cond: "CBC VI" },
  "mv_lic_51": { cond: "CBC VI" },
  "mv_lic_52": { cond: "CBC VI" },
  "mv_lic_53": { cond: "CBC VI" },
  "mv_lic_54": { cond: "CBC VI" },
  "mv_lic_55": { cond: "CBC VI" },
  "mv_lic_56": { cond: "CBC VI" },
  "mv_lic_57": { cond: "CBC VI" },
  "mv_lic_58": { cond: "CBC VI" },
  "mv_lic_59": { cond: "CBC VI" },
  "mv_lic_60": { cond: "CBC VI" },
  "mv_lic_61": { cond: "CBC VI" },
  "mv_lic_62": { cond: "CBC VI" },
  "mv_lic_63": { cond: "CBC VII" },
  "mv_lic_64": { cond: "CBC VII" },
  "mv_lic_65": { cond: "CBC VII" },
  "mv_lic_66": { cond: "CBC VII" },
  "mv_lic_67": { cond: "CBC VII" },
  "mv_lic_68": { cond: "CBC VII" },
  "mv_lic_69": { cond: "CBC VII" },
  "mv_lic_70": { cond: "CBC VII" },
  "mv_lic_71": { cond: "CBC VIII" }
};

export async function renderDashboardPage(container) {
  // Cargar datos en tiempo real
  const [medios, evidencias, stats, indicadores] = await Promise.all([
    db.getMediosVerificacion(),
    db.getEvidencias(),
    db.getEstadisticasInstitucionales(),
    db.getIndicadores()
  ]);

  // Obtener lista única de semestres de forma dinámica
  const semestersSet = new Set(["2025-II", "2025-I", "2024-II", "2024-I"]);
  (stats.docentes || []).forEach(d => { if (d.semestre) semestersSet.add(d.semestre); });
  (stats.postulantes || []).forEach(p => { if (p.semestre) semestersSet.add(p.semestre); });
  (stats.ingresantes || []).forEach(i => { if (i.semestre) semestersSet.add(i.semestre); });
  (evidencias || []).forEach(e => { if (e.semestre) semestersSet.add(e.semestre); });

  const semestres = Array.from(semestersSet).sort((a, b) => {
    const parseSem = (s) => {
      const parts = s.split("-");
      const year = parseInt(parts[0], 10) || 0;
      const term = parts[1] === "II" ? 2 : parts[1] === "I" ? 1 : (parts[1] === "EXT" ? 0.5 : 0);
      return year * 10 + term;
    };
    return parseSem(b) - parseSem(a);
  });

  const defaultSem = semestres[0] || "2026-I";
  window._dashboardSemester = window._dashboardSemester || defaultSem;
  const selectedSem = window._dashboardSemester;


  // Estado del botón/área seleccionado en el menú superior
  window._activeAreaTab = window._activeAreaTab || "licenciamiento";
  const activeTab = window._activeAreaTab;

  // ----------------------------------------------------
  // CALCULOS Y MÉTRICAS
  // ----------------------------------------------------

  // Helper de Estado de Cumplimiento Ponderado (Cumple=100%, Parcial=50%, No cumple=0%)
  const getMvStatusInfo = (mvId, sem) => {
    const evi = evidencias.find(e => e.medioId === mvId && e.semestre === sem);
    if (!evi) return { code: "nocumple", weight: 0.0 };
    if (evi.noAplica === true) return { code: "no_aplica", weight: 1.0 };
    const stNorm = String(evi.estado || "").toLowerCase().trim();
    if (stNorm === "parcial" || stNorm.includes("parcial") || stNorm.includes("pendiente")) return { code: "parcial", weight: 0.5 };
    if (stNorm === "nocumple" || stNorm.includes("no cumple")) return { code: "nocumple", weight: 0.0 };
    return { code: "cumple", weight: 1.0 };
  };

  // 1. Licenciamiento (Promedio de CBC en base a MVs cumplidos)
  let totalCbcMvs = 0;
  let scoreSumCbcMvs = 0;
  let compliantCbcMvs = 0;
  Object.keys(CONDICIONES).forEach(key => {
    const condMvs = medios.filter(m => {
      const mapping = MV_MAPPING[m.id];
      return mapping && mapping.cond === key;
    });
    totalCbcMvs += condMvs.length;
    condMvs.forEach(mv => {
      const info = getMvStatusInfo(mv.id, selectedSem);
      scoreSumCbcMvs += info.weight;
      if (info.code === "cumple" || info.code === "no_aplica") {
        compliantCbcMvs++;
      }
    });
  });
  const licProgress = totalCbcMvs > 0 ? Math.round((scoreSumCbcMvs / totalCbcMvs) * 100) : 0;
  const formattedScoreSum = scoreSumCbcMvs % 1 === 0 ? scoreSumCbcMvs : scoreSumCbcMvs.toFixed(1);

  // 2. Otras 3 áreas (Acreditación, ISO 9001, ISO 21001 de los Indicadores)
  const calculateAreaStats = (areaName) => {
    const listIndicadores = indicadores || [];
    const filtered = listIndicadores.filter(i => i && i.tipo === areaName);
    const total = filtered.length;
    const cumplidos = filtered.filter(i => i && i.estado === "cumple").length;
    const promedioAvance = total > 0
      ? Math.round(filtered.reduce((acc, i) => acc + (i.porcentajeAvance || 0), 0) / total)
      : 0;
    return { total, cumplidos, promedioAvance };
  };

  const acrStats = calculateAreaStats("Acreditación");
  const iso9Stats = calculateAreaStats("ISO 9001");
  const iso21Stats = calculateAreaStats("ISO 21001");

  // Helper para corregir codificación corrupta en nombres de programas
  const cleanText = (txt) => {
    if (!txt) return "";
    const map = {
      "Administraci\uFFFDn Tur\uFFFDstico-Hotelera": "Administración Turístico-Hotelera",
      "Administracin Turstico-Hotelera": "Administración Turístico-Hotelera",
      "Administraci\uFFFDn de Negocios Internacionales": "Administración de Negocios Internacionales",
      "Administracin de Negocios Internacionales": "Administración de Negocios Internacionales",
      "Adminsitraci\uFFFDn": "Administración",
      "Adminsitracin": "Administración",
      "Ciencias Contables y Financieras": "Ciencias Contables y Financieras",
      "Ciencias de la Comunicaci\uFFFDn": "Ciencias de la Comunicación",
      "Ciencias de la Comunicacin": "Ciencias de la Comunicación",
      "Derecho": "Derecho",
      "Econom\uFFFDa": "Economía",
      "Economa": "Economía",
      "Educaci\uFFFDn F\uFFFDsica y Deportes": "Educación Física y Deportes",
      "Educacin Fsica y Deportes": "Educación Física y Deportes",
      "Educaci\uFFFDn Inicial": "Educación Inicial",
      "Educacin Inicial": "Educación Inicial",
      "Educaci\uFFFDn Primaria": "Educación Primaria",
      "Educacin Primaria": "Educación Primaria",
      "Educaci\uFFFDn T\uFFFDcnica": "Educación Técnica",
      "Educacin Tcnica": "Educación Técnica",
      "Ingenier\uFFFDa Agroindustrial": "Ingeniería Agroindustrial",
      "Ingeniera Agroindustrial": "Ingeniería Agroindustrial",
      "Ingenier\uFFFDa Ambiental": "Ingeniería Ambiental",
      "Ingeniera Ambiental": "Ingeniería Ambiental",
      "Ingenier\uFFFDa Civil": "Ingeniería Civil",
      "Ingeniera Civil": "Ingeniería Civil",
      "Ingenier\uFFFDa Comercial": "Ingeniería Comercial",
      "Ingeniera Comercial": "Ingeniería Comercial",
      "Ingenier\uFFFDa Electr\uFFFDnica": "Ingeniería Electrónica",
      "Ingeniera Electrnica": "Ingeniería Electrónica",
      "Ingenier\uFFFDa Industrial": "Ingeniería Industrial",
      "Ingeniera Industrial": "Ingeniería Industrial",
      "Ingenier\uFFFDa de Sistemas": "Ingeniería de Sistemas",
      "Ingeniera de Sistemas": "Ingeniería de Sistemas",
      "Ingenier\uFFFDa de la Producci\uFFFDn y Administraci\uFFFDn": "Ingeniería de la Producción y Administración",
      "Ingeniera de la Produccin y Administracin": "Ingeniería de la Producción y Administración",
      "Laboratorio Cl\uFFFDnico y Anatom\uFFFDa Patol\uFFFDgica": "Laboratorio Clínico y Anatomía Patológica",
      "Laboratorio Clnico y Anatoma Patolgica": "Laboratorio Clínico y Anatomía Patológica",
      "Medicina Humana": "Medicina Humana",
      "Odontolog\uFFFDa": "Odontología",
      "Odontologa": "Odontología",
      "Psicolog\uFFFDa": "Psicología",
      "Psicologa": "Psicología",
      "Terapia F\uFFFDsica y Rehabilitaci\uFFFDn": "Terapia Física y Rehabilitación",
      "Terapia Fsica y Rehabilitacin": "Terapia Física y Rehabilitación"
    };
    const trimmed = txt.trim();
    if (map[trimmed]) return map[trimmed];
    return trimmed
      .replace(/Administraci[o\uFFFD]n/gi, "Administración")
      .replace(/Adminsitraci[o\uFFFD]n/gi, "Administración")
      .replace(/Ingenier[i\uFFFD]a/gi, "Ingeniería")
      .replace(/Odontolog[i\uFFFD]a/gi, "Odontología")
      .replace(/Psicolog[i\uFFFD]a/gi, "Psicología")
      .replace(/Econom[i\uFFFD]a/gi, "Economía")
      .replace(/Educaci[o\uFFFD]n/gi, "Educación")
      .replace(/F[i\uFFFD]sica/gi, "Física")
      .replace(/T[e\uFFFD]cnica/gi, "Técnica")
      .replace(/Cl[i\uFFFD]nico/gi, "Clínico")
      .replace(/Patol[o\uFFFD]gica/gi, "Patológica")
      .replace(/Rehabilitaci[o\uFFFD]n/gi, "Rehabilitación")
      .replace(/Comunicaci[o\uFFFD]n/gi, "Comunicación")
      .replace(/Producci[o\uFFFD]n/gi, "Producción");
  };

  // Helper para renderizar barras comparativas de dos elementos
  const renderBarRow = (label1, val1, pct1, label2, val2, pct2, color1 = "#3b82f6", color2 = "#10b981") => {
    return `
      <div style="margin-bottom: 1.15rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.35rem; font-weight: 600;">
          <span style="color: var(--text-200);">${label1}: <strong style="color: ${color1};">${val1} (${pct1}%)</strong></span>
          <span style="color: var(--text-200);">${label2}: <strong style="color: ${color2};">${val2} (${pct2}%)</strong></span>
        </div>
        <div style="width: 100%; height: 8px; background-color: var(--bg-dark-700); border-radius: 4px; display: flex; overflow: hidden; border: 1px solid rgba(255,255,255,0.03);">
          <div style="width: ${pct1}%; height: 100%; background-color: ${color1}; transition: width 0.4s; border-radius: 4px 0 0 4px;"></div>
          <div style="width: ${pct2}%; height: 100%; background-color: ${color2}; transition: width 0.4s; border-radius: 0 4px 4px 0;"></div>
        </div>
      </div>
    `;
  };

  // Helper para renderizar barras comparativas de tres elementos
  const renderMultiBarRow = (items) => {
    return `
      <div style="margin-bottom: 1.15rem;">
        <div style="display: flex; gap: 0.5rem; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.35rem; font-weight: 600; flex-wrap: wrap;">
          ${items.map(item => `
            <span style="color: var(--text-200);">${item.label}: <strong style="color: ${item.color};">${item.val} (${item.pct}%)</strong></span>
          `).join("")}
        </div>
        <div style="width: 100%; height: 8px; background-color: var(--bg-dark-700); border-radius: 4px; display: flex; overflow: hidden; border: 1px solid rgba(255,255,255,0.03);">
          ${items.map((item, idx) => {
            const radLeft = idx === 0 ? "4px" : "0px";
            const radRight = idx === items.length - 1 ? "4px" : "0px";
            return `<div style="width: ${item.pct}%; height: 100%; background-color: ${item.color}; transition: width 0.4s; border-radius: ${radLeft} ${radRight} ${radRight} ${radLeft};"></div>`;
          }).join("")}
        </div>
      </div>
    `;
  };

  // Pintar estructura principal con las 4 tarjetas superiores
  container.innerHTML = `
    <div class="page-content">
      
      <!-- Cabecera de Página & Filtro Semestral -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.5rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--text-100); display: flex; align-items: center; gap: 10px;">
            <i data-lucide="layout-dashboard" style="color: var(--accent-light); width: 26px; height: 26px;"></i>
            <span>Resumen General de la Calidad</span>
          </h1>
          <p style="font-size: 0.85rem; color: var(--text-300); margin-top: 4px; margin-bottom: 0;">
            Selecciona un área del sistema para ver el resumen detallado de sus indicadores.
          </p>
        </div>
        
        <div style="display: flex; align-items: center; gap: 10px; background-color: var(--bg-dark-900); padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--border-color);">
          <i data-lucide="calendar" style="width: 16px; height: 16px; color: var(--accent-light);"></i>
          <label for="dashboard-semester-select" style="font-size: 0.8rem; font-weight: 700; color: var(--text-200);">Filtro Semestre:</label>
          <select id="dashboard-semester-select" class="input-control" style="padding: 0.25rem 1.75rem 0.25rem 0.5rem; font-size: 0.8rem; font-weight: 800; width: 110px; background-color: var(--bg-dark-700); height: auto; border-color: rgba(255,255,255,0.08);">
            ${semestres.map(sem => `<option value="${sem}" ${sem === selectedSem ? 'selected' : ''}>${sem}</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- KPIs Grid: Las 4 Áreas del Sistema (Interactivas) -->
      <div class="dashboard-grid-kpi" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        
        <!-- Tarjeta Principal: Licenciamiento (CBC) -->
        <div class="card kpi-card active" id="kpi-licenciamiento" style="border: 1px solid #10b981; transition: border-color 0.2s;">
          <div class="kpi-details">
            <h3>Licenciamiento (Condiciones Básicas de Calidad - CBC)</h3>
            <div class="kpi-value">${licProgress}%</div>
            <div class="kpi-progress" style="color: var(--color-cumple);">
              <i data-lucide="award"></i>
              <span>${formattedScoreSum} de ${totalCbcMvs} Medios de Verificación (MVs)</span>
            </div>
          </div>
          <div class="kpi-icon-container green">
            <i data-lucide="award"></i>
          </div>
        </div>
      </div>

      <!-- SECCIÓN DE DETALLE ABAJO (CAMBIA DINÁMICAMENTE) -->
      <div id="dashboard-detail-section">
        <!-- Contenido inyectado dinámicamente -->
      </div>

    </div>
  `;

  // Renderizar la vista de detalle correspondiente
  const detailContainer = container.querySelector("#dashboard-detail-section");

  if (activeTab === "licenciamiento") {
    // Aspecto B: Docentes (definición)
    const listDocentes = stats.docentes || [];
    let semDocentes = listDocentes.find(d => d.semestre === selectedSem);
    if (!semDocentes && listDocentes.length > 0) {
      semDocentes = listDocentes[listDocentes.length - 1];
    }

    // Aspecto C: Admisión (definición)
    const listPostulantes = stats.postulantes || [];
    const listIngresantes = stats.ingresantes || [];

    let semPost = listPostulantes.find(p => p.semestre === selectedSem);
    let semIng = listIngresantes.find(i => i.semestre === selectedSem);

    if (!semPost && listPostulantes.length > 0) semPost = listPostulantes[listPostulantes.length - 1];
    if (!semIng && listIngresantes.length > 0) semIng = listIngresantes[listIngresantes.length - 1];

    let displaySemesterAdmis = selectedSem;
    let admissionData = [];
    let totalPost = 0;
    let totalIng = 0;

    if (semPost && semIng) {
      displaySemesterAdmis = semPost.semestre;
      const postRows = semPost.rows || [];
      const ingRows = semIng.rows || [];

      const postMap = {};
      postRows.forEach(r => {
        const cleanName = cleanText(r.Programa);
        postMap[cleanName] = (postMap[cleanName] || 0) + (r.Cantidad || 0);
      });

      const ingMap = {};
      ingRows.forEach(r => {
        const cleanName = cleanText(r.Programa);
        ingMap[cleanName] = (ingMap[cleanName] || 0) + (r.Cantidad || 0);
      });

      const allPrograms = Array.from(new Set([...Object.keys(postMap), ...Object.keys(ingMap)]));
      admissionData = allPrograms
        .map(prog => {
          const pCount = postMap[prog] || 0;
          const iCount = ingMap[prog] || 0;
          return { programa: prog, postulantes: pCount, ingresantes: iCount };
        })
        .filter(d => d.programa !== "Educación Técnica" && d.programa !== "Ingeniería de la Producción y Administración");

      admissionData.sort((a, b) => b.postulantes - a.postulantes);

      totalPost = admissionData.reduce((sum, d) => sum + d.postulantes, 0);
      totalIng = admissionData.reduce((sum, d) => sum + d.ingresantes, 0);
    }

    // Aspecto D: Evolución Histórica de Investigadores RENACYT (UPT) (definición)
    const listRenacyt = stats.docentes_renacyt || [];
    let evolRows = [];
    if (listRenacyt.length > 0) {
      const rows = listRenacyt[0].rows || [];
      evolRows = rows.filter(r => r.tipo === "evolucion_upt");
    }

    // Fallback estático de 18 semestres si no hay datos en la BD
    if (evolRows.length === 0) {
      evolRows = [
        { Semestre: "2017-I", Total: 1 },
        { Semestre: "2017-II", Total: 1 },
        { Semestre: "2018-I", Total: 1 },
        { Semestre: "2018-II", Total: 1 },
        { Semestre: "2019-I", Total: 3 },
        { Semestre: "2019-II", Total: 3 },
        { Semestre: "2020-I", Total: 5 },
        { Semestre: "2020-II", Total: 5 },
        { Semestre: "2021-I", Total: 7 },
        { Semestre: "2021-II", Total: 7 },
        { Semestre: "2022-I", Total: 9 },
        { Semestre: "2022-II", Total: 10 },
        { Semestre: "2023-I", Total: 12 },
        { Semestre: "2023-II", Total: 19 },
        { Semestre: "2024-I", Total: 25 },
        { Semestre: "2024-II", Total: 24 },
        { Semestre: "2025-I", Total: 27 },
        { Semestre: "2025-II", Total: 35 }
      ];
    } else {
      // Ordenar cronológicamente
      evolRows.sort((a, b) => {
        const parseSem = (s) => {
          const parts = s.Semestre.split("-");
          const year = parseInt(parts[0], 10) || 0;
          const term = parts[1] === "II" ? 2 : 1;
          return year * 10 + term;
        };
        return parseSem(a) - parseSem(b);
      });
    }

    const latestEvol = evolRows[evolRows.length - 1] || { Semestre: "2025-II", Total: 35 };

    // Calcular puntos de la curva SVG en base al dataset oficial de evolución (más grande)
    const maxVal = 40;
    const points = evolRows.map((d, index) => {
      const x = 35 + (index / (evolRows.length - 1)) * 320;
      const yCoord = 25 + 195 - (d.Total / maxVal) * 195;
      return { x, y: yCoord, ...d };
    });
    const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`;

    // ----------------------------------------------------
    // DETALLE DE LICENCIAMIENTO (Los 3 aspectos requeridos)
    // ----------------------------------------------------

    // Aspecto A: Avance de las 8 CBCs
    const drawCbcProgressHtml = () => {
      return Object.keys(CONDICIONES).map(key => {
        const cond = CONDICIONES[key];
        const condMvs = medios.filter(m => {
          const mapping = MV_MAPPING[m.id];
          return mapping && mapping.cond === key;
        });

        const totalMvs = condMvs.length;
        let scoreSum = 0;
        let compliantCount = 0;
        let partialCount = 0;
        let nonCompliantCount = 0;

        condMvs.forEach(mv => {
          const info = getMvStatusInfo(mv.id, selectedSem);
          scoreSum += info.weight;
          if (info.code === "cumple" || info.code === "no_aplica") compliantCount++;
          else if (info.code === "parcial") partialCount++;
          else nonCompliantCount++;
        });

        const percentage = totalMvs > 0 ? Math.round((scoreSum / totalMvs) * 100) : 0;
        const colorClass = percentage >= 90 ? "var(--color-cumple)" : percentage >= 70 ? "#f59e0b" : "var(--color-nocumple)";
        const barBg = percentage >= 90 ? "linear-gradient(90deg, #10b981, #34d399)" : percentage >= 70 ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "linear-gradient(90deg, #ef4444, #f87171)";
        const formattedScore = scoreSum % 1 === 0 ? scoreSum : scoreSum.toFixed(1);

        return `
          <div class="cbc-kpi-card" style="padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-dark-900); display: flex; flex-direction: column; justify-content: space-between; min-height: 145px; transition: transform 0.2s, border-color 0.2s;">
            <div class="cbc-kpi-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="cbc-kpi-code" style="font-weight: 800; font-size: 0.95rem; color: var(--text-100);">${key}</span>
              <span class="cbc-kpi-ratio" style="font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 4px; background-color: var(--bg-dark-700); color: var(--text-300);" title="Cumple: ${compliantCount} | Parcial (Pendiente): ${partialCount} | No cumple: ${nonCompliantCount}">
                ${formattedScore}/${totalMvs} MVs
              </span>
            </div>
            <div class="cbc-kpi-title" style="font-size: 0.8rem; font-weight: 500; color: var(--text-200); line-height: 1.4; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.8em;" title="${cond.titulo}">${cond.titulo}</div>
            <div class="cbc-kpi-progress-wrapper" style="margin-top: auto;">
              <div class="cbc-kpi-progress-label" style="display: flex; justify-content: space-between; font-size: 0.7rem; margin-bottom: 0.25rem;">
                <span style="color: var(--text-400); font-weight: 500;">Progreso</span>
                <span style="color: ${colorClass}; font-weight: 700;">${percentage}%</span>
              </div>
              <div class="cbc-kpi-bar-bg" style="width: 100%; height: 6px; background-color: var(--bg-dark-700); border-radius: 3px; overflow: hidden;">
                <div class="cbc-kpi-bar-fill" style="width: ${percentage}%; height: 100%; background: ${barBg}; border-radius: 3px; transition: width 0.4s ease-out;"></div>
              </div>
            </div>
          </div>
        `;
      }).join("");
    };

    // Aspecto B: Docentes
    let totalDocentes = 0;
    let tcCount = 0;
    let tpCount = 0;
    let doctorCount = 0;
    let maestroCount = 0;
    let bachillerCount = 0;
    let mascCount = 0;
    let femCount = 0;
    let nombradoCount = 0;
    let contratadoCount = 0;
    let displaySemesterDoc = selectedSem;

    if (semDocentes) {
      displaySemesterDoc = semDocentes.semestre;
      const rows = semDocentes.rows || [];
      rows.forEach(r => {
        if (r.tipo === 'resumen_jornada') {
          if (r.Dedicacion === 'Tiempo Completo') tcCount = r.Cantidad;
          if (r.Dedicacion === 'Tiempo Parcial') tpCount = r.Cantidad;
        }
        if (r.tipo === 'resumen_grado') {
          if (r.Grado === 'Doctor') doctorCount = r.Cantidad;
          if (r.Grado === 'Maestro') maestroCount = r.Cantidad;
          if (r.Grado === 'Bachiller') bachillerCount = r.Cantidad;
        }
        if (r.tipo === 'resumen_genero') {
          if (r.Genero === 'Masculino') mascCount = r.Cantidad;
          if (r.Genero === 'Femenino') femCount = r.Cantidad;
        }
        if (r.tipo === 'resumen_condicion') {
          if (r.Condicion === 'Nombrado') nombradoCount = r.Cantidad;
          if (r.Condicion === 'Contratado') contratadoCount = r.Cantidad;
        }
      });
      totalDocentes = tcCount + tpCount;
    }

    const tcPct = totalDocentes > 0 ? Math.round((tcCount / totalDocentes) * 100) : 0;
    const tpPct = totalDocentes > 0 ? Math.round((tpCount / totalDocentes) * 100) : 0;
    const docPct = totalDocentes > 0 ? Math.round((doctorCount / totalDocentes) * 100) : 0;
    const mstrPct = totalDocentes > 0 ? Math.round((maestroCount / totalDocentes) * 100) : 0;
    const bachPct = totalDocentes > 0 ? Math.round((bachillerCount / totalDocentes) * 100) : 0;
    const mascPct = totalDocentes > 0 ? Math.round((mascCount / totalDocentes) * 100) : 0;
    const femPct = totalDocentes > 0 ? Math.round((femCount / totalDocentes) * 100) : 0;
    const nomPct = totalDocentes > 0 ? Math.round((nombradoCount / totalDocentes) * 100) : 0;
    const contPct = totalDocentes > 0 ? Math.round((contratadoCount / totalDocentes) * 100) : 0;

    // Inyectar HTML
    detailContainer.innerHTML = `
      <!-- ASPECTO 1: SEGUIMIENTO DE CBCs -->
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="award" style="color: #10b981; width: 20px; height: 20px;"></i>
          <span>Avance de Seguimiento de las CBC (Semestre ${selectedSem})</span>
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
          ${drawCbcProgressHtml()}
        </div>
      </div>

      <!-- SEGUNDO BLOQUE: ASPECTO 2, 3 Y 4 EN UN GRID DE 3 COLUMNAS -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; margin-bottom: 2rem; align-items: start;">
        
        <!-- ASPECTO 2: ESTADÍSTICA DE PERSONAL DOCENTE -->
        <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; min-height: 520px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px; margin: 0;">
                <i data-lucide="users" style="color: #60a5fa; width: 18px; height: 18px;"></i>
                <span>Estadística de Personal Docente</span>
              </h3>
              <div style="font-size: 0.72rem; color: var(--text-400); font-weight: 600; margin-top: 4px;">Docentes en formato C9 al ${displaySemesterDoc}</div>
            </div>
            <span style="font-size: 0.75rem; font-weight: 700; color: #60a5fa; background-color: rgba(96, 165, 250, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid rgba(96, 165, 250, 0.2); align-self: flex-start;">
              Semestre ${displaySemesterDoc}
            </span>
          </div>

          ${totalDocentes === 0 ? `
            <p style="color: var(--text-400); font-style: italic; font-size: 0.85rem; padding: 1.5rem 0; text-align: center;">No hay estadísticas docentes registradas para este semestre.</p>
          ` : `
            <div style="background-color: var(--bg-dark-700); padding: 1rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
              <div>
                <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-300); display: block; text-transform: uppercase; letter-spacing: 0.5px;">Total Docentes Activos</span>
                <span style="font-size: 2.2rem; font-weight: 800; color: var(--text-100); margin-top: 4px; display: inline-block;">${totalDocentes}</span>
              </div>
              <i data-lucide="shield-check" style="width: 44px; height: 44px; color: rgba(96, 165, 250, 0.2); stroke-width: 1.5;"></i>
            </div>

            <!-- Distribuciones Académicas -->
            ${renderBarRow("Tiempo Completo", tcCount, tcPct, "Tiempo Parcial", tpCount, tpPct, "#3b82f6", "#10b981")}
            
            ${renderMultiBarRow([
              { label: "Doctor", val: doctorCount, pct: docPct, color: "#a78bfa" },
              { label: "Maestro", val: maestroCount, pct: mstrPct, color: "#60a5fa" },
              { label: "Bachiller", val: bachillerCount, pct: bachPct, color: "#fb7185" }
            ])}

            ${renderBarRow("Varones", mascCount, mascPct, "Damas", femCount, femPct, "#60a5fa", "#f472b6")}

            ${renderBarRow("Nombrado", nombradoCount, nomPct, "Contratado", contratadoCount, contPct, "#fbbf24", "#34d399")}
          `}
        </div>

        <!-- ASPECTO 3: CUADRO RESUMEN DE ADMISIÓN (SIN % ADMISIÓN) -->
        <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; min-height: 520px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px; margin: 0;">
              <i data-lucide="trending-up" style="color: #f59e0b; width: 18px; height: 18px;"></i>
              <span>Postulantes e Ingresantes</span>
            </h3>
            <span style="font-size: 0.75rem; font-weight: 700; color: #f59e0b; background-color: rgba(245, 158, 11, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.2);">
              Semestre ${displaySemesterAdmis}
            </span>
          </div>

          ${admissionData.length === 0 ? `
            <p style="color: var(--text-400); font-style: italic; font-size: 0.85rem; padding: 1.5rem 0; text-align: center;">No hay estadísticas de admisión registradas para este semestre.</p>
          ` : `
            <div style="overflow-x: auto; max-height: 382px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 6px;">
              <table class="summary-table" style="background-color: var(--bg-dark-700); margin-bottom: 0; font-size: 0.82rem; border-collapse: separate; border-spacing: 0;">
                <thead style="position: sticky; top: 0; z-index: 10; background-color: var(--bg-dark-900); box-shadow: 0 1px 0 rgba(255,255,255,0.06);">
                  <tr>
                    <th style="text-align: left; padding: 8px 12px; width: 50%; border-bottom: 1px solid var(--border-color); color: var(--text-200);">Programa de Estudios</th>
                    <th style="text-align: center; padding: 8px 12px; width: 25%; border-bottom: 1px solid var(--border-color); color: var(--text-200);">Postulantes</th>
                    <th style="text-align: center; padding: 8px 12px; width: 25%; border-bottom: 1px solid var(--border-color); color: var(--text-200);">Ingresantes</th>
                  </tr>
                </thead>
                <tbody>
                  ${admissionData.map(d => {
                    const cleanProg = cleanText(d.programa);
                    return `
                      <tr>
                        <td style="padding: 8px 12px; font-weight: 600; color: var(--text-100); border-bottom: 1px solid rgba(255,255,255,0.03); max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${cleanProg}">${cleanProg}</td>
                        <td style="text-align: center; padding: 8px 12px; color: var(--text-200); border-bottom: 1px solid rgba(255,255,255,0.03); font-weight: 500;">${d.postulantes}</td>
                        <td style="text-align: center; padding: 8px 12px; color: var(--text-200); border-bottom: 1px solid rgba(255,255,255,0.03); font-weight: 500;">${d.ingresantes}</td>
                      </tr>
                    `;
                  }).join("")}
                  <tr class="total-row" style="position: sticky; bottom: 0; background-color: var(--bg-dark-900); font-weight: 700; border-top: 2px solid var(--border-color); box-shadow: 0 -1px 0 rgba(255,255,255,0.08);">
                    <td style="padding: 8px 12px; color: var(--text-100);">TOTAL GENERAL</td>
                    <td style="text-align: center; padding: 8px 12px; color: var(--text-100); font-weight: 800;">${totalPost}</td>
                    <td style="text-align: center; padding: 8px 12px; color: var(--text-100); font-weight: 800;">${totalIng}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- ASPECTO 4: EVOLUCIÓN HISTÓRICA DE INVESTIGADORES RENACYT -->
        <div class="card" style="padding: 1.5rem; background-color: var(--bg-dark-900); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; min-height: 520px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-100); display: flex; align-items: center; gap: 8px; margin: 0;">
              <i data-lucide="line-chart" style="color: #a78bfa; width: 18px; height: 18px;"></i>
              <span>Evolución de Investigadores RENACYT</span>
            </h3>
            <span style="font-size: 0.75rem; font-weight: 700; color: #a78bfa; background-color: rgba(167, 139, 250, 0.1); padding: 0.2rem 0.6rem; border-radius: 4px; border: 1px solid rgba(167, 139, 250, 0.2);">
              UPT Oficial
            </span>
          </div>

          <div style="background-color: var(--bg-dark-700); padding: 1rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <div>
              <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-300); display: block; text-transform: uppercase; letter-spacing: 0.5px;">Investigadores en ${latestEvol.Semestre}</span>
              <span style="font-size: 2.2rem; font-weight: 800; color: var(--text-100); margin-top: 4px; display: inline-block;">${latestEvol.Total}</span>
            </div>
            <i data-lucide="microscope" style="width: 44px; height: 44px; color: rgba(167, 139, 250, 0.25); stroke-width: 1.5;"></i>
          </div>

          <!-- Gráfico SVG de Línea Premium con Efecto Neon Glow (Rediseñado y ampliado) -->
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 1rem; flex-grow: 1;">
            <svg width="100%" height="260" viewBox="0 0 380 260" style="overflow: visible;">
              <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.0"/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              <!-- Líneas de cuadrícula horizontal -->
              ${[0, 10, 20, 30, 40].map(val => {
                const y = 25 + 195 - (val / 40) * 195;
                return `
                  <line x1="35" y1="${y}" x2="355" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
                  <text x="25" y="${y + 3.5}" fill="var(--text-400)" font-size="9" text-anchor="end" font-weight="600">${val}</text>
                `;
              }).join("")}

              <!-- Área bajo la curva con gradiente semi-transparente -->
              <path d="${pathD} L ${points[points.length - 1].x} 220 L ${points[0].x} 220 Z" fill="url(#area-gradient)" />
              
              <!-- Línea principal con efecto de brillo neon -->
              <path d="${pathD}" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
              
              <!-- Puntos (círculos) e indicadores de datos por semestre/año (más grandes y visibles) -->
              ${points.map((p, index) => {
                const isYearEnd = p.Semestre.endsWith("-II");
                const yearLabel = isYearEnd ? p.Semestre.split("-")[0] : "";
                return `
                  <circle cx="${p.x}" cy="${p.y}" r="4" fill="#a78bfa" stroke="#ffffff" stroke-width="1.2" />
                  <text x="${p.x}" y="${p.y - 8}" fill="var(--text-100)" font-size="9.5" font-weight="900" text-anchor="middle">${p.Total}</text>
                  ${yearLabel ? `<text x="${p.x}" y="240" fill="var(--text-300)" font-size="9.5" font-weight="700" text-anchor="middle">${yearLabel}</text>` : ''}
                `;
              }).join("")}
            </svg>
          </div>
          
          <!-- Pie del gráfico: Texto solicitado -->
          <div style="font-size: 0.75rem; color: var(--text-400); text-align: center; margin-top: 1.25rem; font-weight: 700; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">
            Docentes RENACYT en formato C9 al ${latestEvol.Semestre}
          </div>
        </div>

      </div>
    `;
  } else {
    // ----------------------------------------------------
    // DETALLE DE OTRAS ÁREAS (Listas dinámicas de Indicadores)
    // ----------------------------------------------------
    let title = "";
    let areaKey = "";
    let themeColor = "";
    
    if (activeTab === "acreditacion") {
      title = "Indicadores de Acreditación Nacional (SINEACE)";
      areaKey = "Acreditación";
      themeColor = "#3b82f6";
    } else if (activeTab === "iso9001") {
      title = "Sistema de Gestión de la Calidad (ISO 9001:2015)";
      areaKey = "ISO 9001";
      themeColor = "#8b5cf6";
    } else if (activeTab === "iso21001") {
      title = "Sistema de Gestión para Organizaciones Educativas (ISO 21001:2018)";
      areaKey = "ISO 21001";
      themeColor = "#ef4444";
    }

    const filteredIndicators = (indicadores || []).filter(i => i && i.tipo === areaKey);

    detailContainer.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <h2 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="shield-check" style="color: ${themeColor}; width: 20px; height: 20px;"></i>
          <span>${title}</span>
        </h2>
        
        ${filteredIndicators.length === 0 ? `
          <p style="color: var(--text-400); font-style: italic; text-align: center; padding: 2rem;">No hay indicadores registrados para esta área.</p>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 1.25rem;">
            ${filteredIndicators.map(ind => {
              const statusClass = ind.estado === "cumple" ? "cumple" : ind.estado === "en_proceso" ? "proceso" : "nocumple";
              const statusText = ind.estado === "cumple" ? "Cumple" : ind.estado === "en_proceso" ? "En Proceso" : "No Cumple";
              return `
                <div style="padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-dark-900); display: flex; flex-direction: column; justify-content: space-between; min-height: 140px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <span style="font-weight: 800; font-size: 0.9rem; color: ${themeColor};">${ind.codigo}</span>
                    <span class="badge-status ${statusClass}">${statusText}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-200); line-height: 1.5; margin-bottom: 1rem; flex-grow: 1;">${ind.nombre}</p>
                  <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; color: var(--text-400); border-top: 1px solid rgba(255,255,255,0.03); padding-top: 0.5rem;">
                    <span>Porcentaje de Avance:</span>
                    <span style="font-weight: 700; color: var(--text-200);">${ind.porcentajeAvance || 0}%</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}
      </div>
    `;
  }

  // Renderizar iconos de Lucide de nuevo
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Capturar evento de cambio en el selector de semestre
  const semSelect = container.querySelector("#dashboard-semester-select");
  if (semSelect) {
    semSelect.onchange = (e) => {
      window._dashboardSemester = e.target.value;
      renderDashboardPage(container); // Volver a pintar
    };
  }

  // Capturar clicks de navegación superior
  const clickMap = [
    { id: "#kpi-licenciamiento", key: "licenciamiento" }
  ];

  clickMap.forEach(item => {
    const el = container.querySelector(item.id);
    if (el) {
      el.onclick = () => {
        window._activeAreaTab = item.key;
        renderDashboardPage(container); // Cambiar y volver a pintar
      };
    }
  });
}
