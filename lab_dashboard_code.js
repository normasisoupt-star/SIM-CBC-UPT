
// ==========================================================================
// MATRIZ DE TALLERES Y LABORATORIOS ESPECIALIZADOS (CBC III.7)
// ==========================================================================
const LABORATORIOS_DATA = [{"id":1,"nombre":"BASE DE DATOS","tipo":"LABORATORIO","codigo":"SL02LA27","ubicacion":"3ER PISO PAB. P FAING P-306","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":2,"nombre":"REDES Y COMUNICACIÓN DE DATOS","tipo":"LABORATORIO","codigo":"SL02LA29","ubicacion":"3ER PISO PAB. P FAING P-311","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":3,"nombre":"DESARROLLO DE APLICACIONES 1","tipo":"LABORATORIO","codigo":"SL02LA28","ubicacion":"3ER PISO PAB. P FAING P-310","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":4,"nombre":"LENGUAJE DE PROGRAMACIÓN","tipo":"LABORATORIO","codigo":"SL02LA30","ubicacion":"3ER PISO PAB. Q FAING Q-302","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":5,"nombre":"DESARROLLO WEB","tipo":"LABORATORIO","codigo":"SL02LA32","ubicacion":"3ER PISO PAB. Q FAING Q-306","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":6,"nombre":"DESARROLLO DE APLICACIONES 2","tipo":"LABORATORIO","codigo":"SL02LA34","ubicacion":"3ER PISO PAB. R FAING R-306","facultad":"FAING","carreras":["INGENIERÍA DE SISTEMAS"],"total":1,"obs":""},{"id":7,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA41","ubicacion":"4TO PISO PAB. R FAING R-406","facultad":"FAING","carreras":["INGENIERÍA INDUSTRIAL"],"total":1,"obs":""},{"id":8,"nombre":"QUÍMICA 1","tipo":"LABORATORIO","codigo":"SL02LA24","ubicacion":"2DO PISO PAB. R FAING R-202","facultad":"FAING","carreras":["INGENIERÍA CIVIL","INGENIERÍA AGROINDUSTRIAL","INGENIERÍA INDUSTRIAL","MEDICINA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":6,"obs":""},{"id":9,"nombre":"QUÍMICA 2","tipo":"LABORATORIO","codigo":"SL02LA14","ubicacion":"1ER PISO PAB. Q FAING Q-106","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL","INGENIERÍA INDUSTRIAL"],"total":2,"obs":""},{"id":10,"nombre":"SIMULACIÓN ELECTRÓNICA","tipo":"LABORATORIO","codigo":"SL02LA36","ubicacion":"4TO PISO PAB. P FAING P-411","facultad":"FAING","carreras":["INGENIERÍA INDUSTRIAL","INGENIERÍA ELECTRÓNICA"],"total":2,"obs":""},{"id":11,"nombre":"CONTROL Y AUTOMATIZACIÓN","tipo":"LABORATORIO","codigo":"SL02LA31","ubicacion":"3ER PISO PAB. Q FAING Q-303","facultad":"FAING","carreras":["INGENIERÍA INDUSTRIAL","INGENIERÍA ELECTRÓNICA"],"total":2,"obs":""},{"id":12,"nombre":"ELECTRÓNICA","tipo":"LABORATORIO","codigo":"SL02LA35","ubicacion":"4TO PISO PAB. P FAING P-406","facultad":"FAING","carreras":["INGENIERÍA ELECTRÓNICA"],"total":1,"obs":""},{"id":13,"nombre":"TELECOMUNICACIONES","tipo":"LABORATORIO","codigo":"SL02LA38","ubicacion":"4TO PISO PAB. Q FAING Q-404","facultad":"FAING","carreras":["INGENIERÍA ELECTRÓNICA"],"total":1,"obs":""},{"id":14,"nombre":"MÁQUINAS ELÉCTRICAS","tipo":"LABORATORIO","codigo":"SL02LA39","ubicacion":"4TO PISO PAB. Q FAING Q-407","facultad":"FAING","carreras":["INGENIERÍA ELECTRÓNICA"],"total":1,"obs":""},{"id":15,"nombre":"TELEMÁTICA","tipo":"LABORATORIO","codigo":"SL02LA37","ubicacion":"4TO PISO PAB. Q FAING Q-403","facultad":"FAING","carreras":["INGENIERÍA ELECTRÓNICA"],"total":1,"obs":""},{"id":16,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA25","ubicacion":"2DO PISO PAB. R FAING R-205","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":17,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA26","ubicacion":"2DO PISO PAB. R FAING R-206","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":18,"nombre":"FÍSICA","tipo":"LABORATORIO","codigo":"SL02LA40","ubicacion":"4TO PISO PAB. R FAING R-403","facultad":"FAING","carreras":["INGENIERÍA CIVIL","INGENIERÍA AGROINDUSTRIAL"],"total":2,"obs":""},{"id":19,"nombre":"HIDRÁULICA","tipo":"LABORATORIO","codigo":"SL02LA17","ubicacion":"1ER PISO PAB. R FAING R-104","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":20,"nombre":"GABINETE DE TOPOGRAFÍA","tipo":"TALLER","codigo":"SL02T20","ubicacion":"1ER PISO PAB. R FAING R-105","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":21,"nombre":"TECNOLOGÍA DE CONCRETOS","tipo":"LABORATORIO","codigo":"SL02LA45","ubicacion":"1ER PISO PAB. S FAING S-106","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":22,"nombre":"ENSAYOS CONVENCIONALES","tipo":"LABORATORIO","codigo":"SL02LA46","ubicacion":"1ER PISO PAB. S FAING S-107 A","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":23,"nombre":"PAVIMENTO","tipo":"LABORATORIO","codigo":"SL02LA47","ubicacion":"1ER PISO PAB. S SUELOS S-109","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":24,"nombre":"ENSAYOS ESPECIALES","tipo":"LABORATORIO","codigo":"SL02LA48","ubicacion":"1ER PISO PAB. S SUELOS S-111","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":25,"nombre":"ESTRUCTURAS","tipo":"LABORATORIO","codigo":"SL02LA15","ubicacion":"1ER PISO PAB. Q FAING Q-107","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":26,"nombre":"CALIDAD DEL AGUA","tipo":"LABORATORIO","codigo":"SL02LA18","ubicacion":"2DO PISO PAB. P FAING P-206","facultad":"FAING","carreras":["INGENIERÍA AMBIENTAL"],"total":1,"obs":""},{"id":27,"nombre":"BIOLOGÍA Y MICROBIOLOGÍA","tipo":"LABORATORIO","codigo":"SL02LA33","ubicacion":"3ER PISO PAB. R FAING R-302","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL","INGENIERÍA AMBIENTAL","MEDICINA","ODONTOLOGÍA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":6,"obs":""},{"id":28,"nombre":"CALIDAD DE SUELOS","tipo":"LABORATORIO","codigo":"SL02LA21","ubicacion":"2DO PISO PAB. P FAING P-211","facultad":"FAING","carreras":["INGENIERÍA AMBIENTAL"],"total":1,"obs":""},{"id":29,"nombre":"CALIDAD DEL AIRE","tipo":"LABORATORIO","codigo":"SL02LA19","ubicacion":"2DO PISO PAB. P FAING P-210 B","facultad":"FAING","carreras":["INGENIERÍA AMBIENTAL"],"total":1,"obs":""},{"id":30,"nombre":"CÓMPUTO EPIAM","tipo":"LABORATORIO","codigo":"SL02LA16","ubicacion":"1ER PISO PAB. R FAING R-101","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL","INGENIERÍA AMBIENTAL"],"total":2,"obs":""},{"id":31,"nombre":"PROCESOS LÁCTEOS","tipo":"LABORATORIO","codigo":"SL02LA12","ubicacion":"1ER PISO PAB. P FAING P-115","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":32,"nombre":"ANÁLISIS SENSORIAL","tipo":"LABORATORIO","codigo":"SL02LA20","ubicacion":"2DO PISO PAB. P FAING P-210 A","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":33,"nombre":"FRUTAS Y HORTALIZAS","tipo":"LABORATORIO","codigo":"SL02LA13","ubicacion":"1ER PISO PAB. Q FAING Q-103","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":34,"nombre":"MICROBIOLOGÍA AGROINDUSTRIAL","tipo":"LABORATORIO","codigo":"SL02LA22","ubicacion":"2DO PISO PAB. Q FAING Q-202","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":35,"nombre":"ANÁLISIS DE PRODUCTOS AGROINDUSTRIALES","tipo":"LABORATORIO","codigo":"SL02LA23","ubicacion":"2DO PISO PAB. Q FAING Q-206","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":36,"nombre":"LABORATORIO DE PANIFICACIÓN","tipo":"LABORATORIO","codigo":"SL02LA44","ubicacion":"1ER PISO PAB. U FAING U-103 B","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":37,"nombre":"TALLER DE ENOLOGÍA Y LICORES","tipo":"LABORATORIO","codigo":"SL02T21","ubicacion":"2DO PISO PAB. U FAING U-201 A","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":38,"nombre":"FUNDO AGROINDUSTRIAL LAS VILCAS","tipo":"S/R","codigo":"","ubicacion":"","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":39,"nombre":"PROCESOS CÁRNICOS E HIDROBIOLÓGICOS","tipo":"LABORATORIO","codigo":"SL02LA11","ubicacion":"1ER PISO PAB. P FAING P-107","facultad":"FAING","carreras":["INGENIERÍA AGROINDUSTRIAL"],"total":1,"obs":""},{"id":40,"nombre":"BIM (BUILDING INFORMATION MODELING)","tipo":"LABORATORIO","codigo":"SL02LA43","ubicacion":"1ER PISO PAB. R FAING R-113","facultad":"FAING","carreras":["INGENIERÍA CIVIL"],"total":1,"obs":""},{"id":41,"nombre":"CÓMPUTO A","tipo":"LABORATORIO","codigo":"SL03LA01","ubicacion":"2DO PISO PAB. A FACEM A-204","facultad":"FACEM","carreras":["INGENIERÍA COMERCIAL","CIENCIAS CONTABLES Y FINANCIERAS","ADMINISTRACIÓN DE EMPRESAS","ADMINISTRACIÓN TURÍSTICO - HOTELERA","ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES","ECONOMÍA"],"total":6,"obs":""},{"id":42,"nombre":"CÓMPUTO B","tipo":"LABORATORIO","codigo":"SL03LA02","ubicacion":"3ER PISO PAB. A FACEM A-304","facultad":"FACEM","carreras":["CIENCIAS CONTABLES Y FINANCIERAS","ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES"],"total":2,"obs":""},{"id":43,"nombre":"CÓMPUTO C","tipo":"LABORATORIO","codigo":"SL03LA03","ubicacion":"4TO PISO PAB. A FACEM A-401","facultad":"FACEM","carreras":["INGENIERÍA COMERCIAL","CIENCIAS CONTABLES Y FINANCIERAS","ADMINISTRACIÓN TURÍSTICO - HOTELERA","ADMINISTRACIÓN DE NEGOCIOS INTERNACIONALES","ECONOMÍA"],"total":5,"obs":""},{"id":44,"nombre":"HOUSE KEEPING","tipo":"TALLER","codigo":"SL03T02","ubicacion":"4TO PISO PAB. B FACEM B-402","facultad":"FACEM","carreras":["ADMINISTRACIÓN TURÍSTICO - HOTELERA"],"total":1,"obs":""},{"id":45,"nombre":"BAR","tipo":"TALLER","codigo":"SL03T01","ubicacion":"3ER PISO PAB. B FACEM B-303","facultad":"FACEM","carreras":["ADMINISTRACIÓN TURÍSTICO - HOTELERA"],"total":1,"obs":""},{"id":46,"nombre":"GASTRONOMÍA","tipo":"TALLER","codigo":"SL03T03","ubicacion":"4TO PISO PAB. B FACEM B-406","facultad":"FACEM","carreras":["ADMINISTRACIÓN TURÍSTICO - HOTELERA"],"total":1,"obs":""},{"id":47,"nombre":"ODONTOLOGÍA I","tipo":"LABORATORIO","codigo":"SL02LA01","ubicacion":"1ER PISO PAB. I FACSA I-104 A","facultad":"FACSA","carreras":["ODONTOLOGÍA"],"total":1,"obs":""},{"id":48,"nombre":"ODONTOLOGÍA II","tipo":"LABORATORIO","codigo":"SL02LA02","ubicacion":"1ER PISO PAB. I FACSA I-104 B","facultad":"FACSA","carreras":["ODONTOLOGÍA"],"total":1,"obs":""},{"id":49,"nombre":"SALA DE FISIOLOGÍA Y FARMACOLOGÍA","tipo":"LABORATORIO","codigo":"SL02LA03","ubicacion":"1ER PISO PAB. I FACSA I-107","facultad":"FACSA","carreras":["MEDICINA","ODONTOLOGÍA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":4,"obs":""},{"id":50,"nombre":"ANATOMÍA","tipo":"LABORATORIO","codigo":"SL02LA04","ubicacion":"1ER PISO PAB. K FACSA K-102","facultad":"FACSA","carreras":["MEDICINA","ODONTOLOGÍA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":4,"obs":""},{"id":51,"nombre":"CIRUGÍA EXPERMIENTAL","tipo":"LABORATORIO","codigo":"SL02T01","ubicacion":"1ER PISO PAB. K FACSA K-107","facultad":"FACSA","carreras":["MEDICINA"],"total":1,"obs":"en C6 está como taller"},{"id":52,"nombre":"LABORATORIO DE CENTRO DE SIMULACIÓN (CENTRO DE CONTROL DE ÁREA CLÍNICO OBSTÉTRICA Y CENTRO DE CONTROL DEL ÁREA QUIRÚRGICA)","tipo":"LABORATORIO","codigo":"SL02T02","ubicacion":"3ER PISO PAB. I FACSA I-308","facultad":"FACSA","carreras":["MEDICINA"],"total":1,"obs":""},{"id":53,"nombre":"MICROBIOLOGÍA Y PARASITOLOGÍA","tipo":"LABORATORIO","codigo":"SL02LA05","ubicacion":"2DO PISO PAB. J FACSA J-201","facultad":"FACSA","carreras":["MEDICINA","ODONTOLOGÍA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":4,"obs":""},{"id":54,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA06","ubicacion":"2DO PISO PAB. J FACSA J-202 A","facultad":"FACSA","carreras":["MEDICINA","ODONTOLOGÍA","TERAPIA Y REHABILITACIÓN","LABORATORIO CLÍNICO"],"total":4,"obs":""},{"id":55,"nombre":"MICROSCOPIA","tipo":"LABORATORIO","codigo":"SL02LA07","ubicacion":"2DO PISO PAB. J FACSA J-203","facultad":"FACSA","carreras":["MEDICINA","LABORATORIO CLÍNICO"],"total":2,"obs":""},{"id":56,"nombre":"INVESTIGACIÓN","tipo":"LABORATORIO","codigo":"SL02LA08","ubicacion":"1ER PISO PAB. I FACSA I-108","facultad":"FACSA","carreras":["ODONTOLOGÍA"],"total":1,"obs":""},{"id":57,"nombre":"GABINETE DE TERAPIA FÍSICAY  REHABILITACIÓN","tipo":"TALLER","codigo":"SL02T04","ubicacion":"2DO PISO PAB. I FACSA I-204","facultad":"FACSA","carreras":["TERAPIA Y REHABILITACIÓN"],"total":1,"obs":""},{"id":58,"nombre":"CENTRO DOCENTE ODONTOLÓGICO","tipo":"LABORATORIO","codigo":"SL04LA01","ubicacion":"AV. BOLOGNESI","facultad":"FACSA","carreras":["ODONTOLOGÍA"],"total":1,"obs":""},{"id":59,"nombre":"SALA DE USOS MÚLTIPLES DE LABORATORIO CLÍNICO Y ANATOMÍA PATOLÓGICA","tipo":"LABORATORIO","codigo":"-","ubicacion":"","facultad":"FACSA","carreras":["LABORATORIO CLÍNICO"],"total":1,"obs":""},{"id":60,"nombre":"CENTRO DOCENTE EN TERAPIA FÍSICA Y REHABILTIACIÓN","tipo":"LABORATORIO","codigo":"-","ubicacion":"","facultad":"FACSA","carreras":["TERAPIA Y REHABILITACIÓN"],"total":1,"obs":""},{"id":61,"nombre":"CÓMPUTO EPCC","tipo":"LABORATORIO","codigo":"SL01LA01","ubicacion":"3ER PISO PAB. C FAEDCOH C-301","facultad":"FAEDCOH","carreras":["CIENCIAS DE LA COMUNICACIÓN"],"total":1,"obs":""},{"id":62,"nombre":"CÓMPUTO EPED / EPH","tipo":"LABORATORIO","codigo":"SL01LA02","ubicacion":"3ER PISO PAB. C FAEDCOH C-304","facultad":"FAEDCOH","carreras":["EDUCACIÓN INICIAL","EDUCACIÓN PRIMARIA","EDUCACIÓN FÍSICA Y DEPORTES","PSICOLOGÍA"],"total":4,"obs":""},{"id":63,"nombre":"CÁMARA GESSEL 01","tipo":"TALLER","codigo":"SL01T01","ubicacion":"1ER PISO PAB. E FAEDCOH E-104 A Y 104 B","facultad":"FAEDCOH","carreras":["PSICOLOGÍA"],"total":1,"obs":""},{"id":64,"nombre":"CÁMARA GESSEL 02","tipo":"TALLER","codigo":"SL01T02","ubicacion":"3ER PISO PAB. C FAEDCOH C-303 A Y C-303 B","facultad":"FAEDCOH","carreras":["PSICOLOGÍA"],"total":1,"obs":""},{"id":65,"nombre":"SET DE FOTOGRAFÍA Y VÍDEO","tipo":"TALLER","codigo":"SL01T03","ubicacion":"1ER PISO PAB. E FAEDCOH E-103 B","facultad":"FAEDCOH","carreras":["CIENCIAS DE LA COMUNICACIÓN"],"total":1,"obs":""},{"id":66,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA49","ubicacion":"1ER PISO PAB. L FADE L-103","facultad":"FADE","carreras":["DERECHO"],"total":1,"obs":""},{"id":67,"nombre":"SALA DE PROCESOS SIMULADOS","tipo":"TALLER","codigo":"SL02T24","ubicacion":"2DO PISO PAB. M FADE M-202","facultad":"FADE","carreras":["DERECHO"],"total":1,"obs":""},{"id":68,"nombre":"GABINETE DE PRÁCTICAS FORENSES","tipo":"TALLER","codigo":"SL02T05","ubicacion":"1ER PISO PAB. M FADE M-104","facultad":"FADE","carreras":["DERECHO"],"total":1,"obs":""},{"id":69,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA09","ubicacion":"2DO PISO PAB. N FAU N-209","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":70,"nombre":"CÓMPUTO","tipo":"LABORATORIO","codigo":"SL02LA10","ubicacion":"2DO PISO PAB. N FAU N-210","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":71,"nombre":"TALLER DE DISEÑO 11","tipo":"TALLER","codigo":"SL02T16","ubicacion":"2DO PISO PAB. N FAU N-202","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":72,"nombre":"TALLER DE DISEÑO 14","tipo":"TALLER","codigo":"SL02T22","ubicacion":"2DO PISO PAB. N FAU N-204","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":73,"nombre":"TALLER DE DISEÑO 15","tipo":"TALLER","codigo":"SL02T23","ubicacion":"2DO PISO PAB. N FAU N-208","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":74,"nombre":"TALLER DE DISEÑO 1","tipo":"TALLER","codigo":"SL02T06","ubicacion":"1ER PISO PAB. N FAU N-104","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":75,"nombre":"TALLER DE DISEÑO 2","tipo":"TALLER","codigo":"SL02T07","ubicacion":"1ER PISO PAB. N FAU N-111","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":76,"nombre":"TALLER DE DISEÑO 3","tipo":"TALLER","codigo":"SL02T08","ubicacion":"2DO PISO PAB. N FAU N-201","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":77,"nombre":"TALLER DE DISEÑO 4","tipo":"TALLER","codigo":"SL02T09","ubicacion":"2DO PISO PAB. N FAU N-203","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":78,"nombre":"TALLER DE DISEÑO 5","tipo":"TALLER","codigo":"SL02T10","ubicacion":"3ER PISO PAB. N FAU N-301","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":79,"nombre":"TALLER DE DISEÑO 6","tipo":"TALLER","codigo":"SL02T11","ubicacion":"3ER PISO PAB. N FAU N-303","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":80,"nombre":"TALLER DE DISEÑO 7","tipo":"TALLER","codigo":"SL02T12","ubicacion":"3ER PISO PAB. N FAU N-309","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":81,"nombre":"TALLER DE DISEÑO 8","tipo":"TALLER","codigo":"SL02T13","ubicacion":"3ER PISO PAB. N FAU N-310","facultad":"FAU","carreras":["ARQUITECTURA","URBANISMO"],"total":2,"obs":""},{"id":82,"nombre":"TALLER DE DISEÑO 9","tipo":"TALLER","codigo":"SL02T14","ubicacion":"4TO PISO PAB. N FAU N-401","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":83,"nombre":"TALLER DE DISEÑO 10","tipo":"TALLER","codigo":"SL02T15","ubicacion":"4TO PISO PAB. N FAU N-403","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":84,"nombre":"TALLER DE DISEÑO 12","tipo":"TALLER","codigo":"SL02T17","ubicacion":"4TO PISO PAB. N FAU N-409","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":85,"nombre":"TALLER DE DISEÑO 13","tipo":"TALLER","codigo":"SL02T18","ubicacion":"4TO PISO PAB. N FAU N-410","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""},{"id":86,"nombre":"TALLER DE ARTE","tipo":"TALLER","codigo":"SL02T19","ubicacion":"5TO PISO PAB. N FAU N-503","facultad":"FAU","carreras":["ARQUITECTURA"],"total":1,"obs":""}];

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

    container.innerHTML = `
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
            <div style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0.2rem 0;">${totalAmbientes}</div>
            <div style="font-size: 0.75rem; color: #34d399; font-weight: 600; display: flex; gap: 8px;">
              <span>🔬 ${totalLabs} Labs</span>
              <span>🎨 ${totalTalleres} Talleres</span>
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
            ${Object.keys(facCounts).map(fac => {
              const count = facCounts[fac];
              const pct = Math.round((count / totalAmbientes) * 100);
              return `
                <div style="background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.06); padding: 0.6rem; border-radius: 6px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700;">
                    <span style="color: #38bdf8;">${fac}</span>
                    <span style="color: #fff;">${count} (${pct}%)</span>
                  </div>
                  <div style="background: rgba(0,0,0,0.3); height: 6px; border-radius: 3px; margin-top: 4px; overflow: hidden;">
                    <div style="width: ${pct}%; height: 100%; background: #0284c7;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Barra de Filtros Interactivos -->
        <div class="cbc-filter-bar" style="display: flex; flex-wrap: wrap; gap: 0.75rem; background: rgba(15, 23, 42, 0.9); padding: 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08);">
          
          <div style="flex: 2; min-width: 220px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Búsqueda Rápida</span>
            <input type="text" id="lab-search-input" class="input-control" placeholder="Buscar por nombre, código SL, ubicación o aula..." value="${_labFilters.search}" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
          </div>

          <div style="flex: 1; min-width: 130px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Tipo</span>
            <select id="lab-filter-tipo" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todos" ${_labFilters.tipo === 'todos' ? 'selected' : ''}>Todos los Tipos</option>
              <option value="LABORATORIO" ${_labFilters.tipo === 'LABORATORIO' ? 'selected' : ''}>LABORATORIO</option>
              <option value="TALLER" ${_labFilters.tipo === 'TALLER' ? 'selected' : ''}>TALLER</option>
              <option value="S/R" ${_labFilters.tipo === 'S/R' ? 'selected' : ''}>ESPECIAL / OTROS</option>
            </select>
          </div>

          <div style="flex: 1; min-width: 130px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Facultad</span>
            <select id="lab-filter-facultad" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" ${_labFilters.facultad === 'todas' ? 'selected' : ''}>Todas las Facultades</option>
              <option value="FAING" ${_labFilters.facultad === 'FAING' ? 'selected' : ''}>FAING</option>
              <option value="FACSA" ${_labFilters.facultad === 'FACSA' ? 'selected' : ''}>FACSA</option>
              <option value="FAU" ${_labFilters.facultad === 'FAU' ? 'selected' : ''}>FAU</option>
              <option value="FACEM" ${_labFilters.facultad === 'FACEM' ? 'selected' : ''}>FACEM</option>
              <option value="FAEDCOH" ${_labFilters.facultad === 'FAEDCOH' ? 'selected' : ''}>FAEDCOH</option>
              <option value="FADE" ${_labFilters.facultad === 'FADE' ? 'selected' : ''}>FADE</option>
            </select>
          </div>

          <div style="flex: 2; min-width: 220px;">
            <span class="cbc-filter-label" style="font-size: 0.75rem; font-weight: 700; color: var(--text-300); display: block; margin-bottom: 4px;">Carrera Profesional</span>
            <select id="lab-filter-carrera" class="input-control" style="width: 100%; background: #0f172a; border: 1px solid #334155; color: #fff; padding: 0.5rem; border-radius: 6px; font-size: 0.85rem;">
              <option value="todas" ${_labFilters.carrera === 'todas' ? 'selected' : ''}>Todas las Carreras (${carrerasList.length})</option>
              ${carrerasList.map(c => `<option value="${c}" ${_labFilters.carrera === c ? 'selected' : ''}>${c}</option>`).join('')}
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
          <span>Mostrando <strong>${filtered.length}</strong> de <strong>${totalAmbientes}</strong> ambientes académicos registrados</span>
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
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-400);">
                      No se encontraron laboratorios o talleres que coincidan con los filtros seleccionados.
                    </td>
                  </tr>
                ` : filtered.map(item => {
                  const isLab = item.tipo === 'LABORATORIO';
                  const isTaller = item.tipo === 'TALLER';
                  const badgeBg = isLab ? 'rgba(16, 185, 129, 0.15)' : isTaller ? 'rgba(168, 85, 247, 0.15)' : 'rgba(245, 158, 11, 0.15)';
                  const badgeColor = isLab ? '#34d399' : isTaller ? '#a855f7' : '#f59e0b';
                  const badgeBorder = isLab ? 'rgba(16, 185, 129, 0.3)' : isTaller ? 'rgba(168, 85, 247, 0.3)' : 'rgba(245, 158, 11, 0.3)';

                  return `
                    <tr style="border-bottom: 1px solid #1e293b; transition: background 0.15s;" onmouseover="this.style.background='rgba(30, 41, 59, 0.5)'" onmouseout="this.style.background='transparent'">
                      <td style="padding: 0.6rem; text-align: center; font-weight: 700; color: var(--text-400);">${item.id}</td>
                      <td style="padding: 0.6rem;">
                        <span style="background: rgba(56, 189, 248, 0.1); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 2px 6px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 0.78rem;">
                          ${item.codigo || '-'}
                        </span>
                      </td>
                      <td style="padding: 0.6rem; font-weight: 700; color: #f8fafc;">${item.nombre}</td>
                      <td style="padding: 0.6rem;">
                        <span style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; padding: 2px 7px; border-radius: 4px; font-weight: 700; font-size: 0.73rem;">
                          ${item.tipo}
                        </span>
                      </td>
                      <td style="padding: 0.6rem; color: var(--text-300); font-size: 0.8rem;">${item.ubicacion || '-'}</td>
                      <td style="padding: 0.6rem; text-align: center;">
                        <span style="background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">
                          ${item.facultad}
                        </span>
                      </td>
                      <td style="padding: 0.6rem;">
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                          ${item.carreras.map(c => `
                            <span style="background: rgba(51, 65, 85, 0.6); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.06); padding: 1px 5px; border-radius: 3px; font-size: 0.72rem;">
                              ${c}
                            </span>
                          `).join('')}
                        </div>
                      </td>
                      <td style="padding: 0.6rem; text-align: center; font-weight: 800; color: #38bdf8;">${item.total}</td>
                      <td style="padding: 0.6rem; color: #f59e0b; font-size: 0.75rem;">${item.obs || '-'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

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
