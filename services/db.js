/* ==========================================================================
   SIGECA - SERVICIO DE BASE DE DATOS HÍBRIDO (Firestore / Local Mock DB)
   ========================================================================== */

// Datos Iniciales Semilla (Seed Data) en caso de que no existan en LocalStorage
const INITIAL_PROGRAMAS = [
  {"id": "prog_p1", "facultad": "FAEDCOH", "codigo": "P1", "nombre": "Educacin Inicial", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2022", "anoResolucion": "2022-09-05", "vigencia": "4", "resolucionUltimaActualizacion": "RES N 285-2022-UPT-CU", "resolucionAdecuacion": "RES. N227-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1CSk-jQR1kCy9HrZC1m7Qw_pSF1RGNDNw/view?usp=sharing"},
  {"id": "prog_p2", "facultad": "FAEDCOH", "codigo": "P2", "nombre": "Educacin Primaria", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2022", "anoResolucion": "2022-09-05", "vigencia": "4", "resolucionUltimaActualizacion": "RES N 286-2022-UPT-CU", "resolucionAdecuacion": "RES. N227-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1aqmO_1s0hHrAnI9cOQgI4miFDbNH1xR3/view?usp=sharing"},
  {"id": "prog_p3", "facultad": "FAEDCOH", "codigo": "P3", "nombre": "Educacin Secundaria Especialidad: Lengua y Literatura", "tipo": "Pregrado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-03-15", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 049-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1YxNSA4Ac8W5bgXEQW_hHC7DW0GOxgJnG/view?usp=sharing"},
  {"id": "prog_p4", "facultad": "FAEDCOH", "codigo": "P4", "nombre": "Educacin Secundaria Especialidad: Matemtica, Fsica y Computacin", "tipo": "Pregrado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-03-15", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 049-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1CyCcQAQ5yFEDmd0GpPWeJ2Wu29Iuim10/view?usp=sharing"},
  {"id": "prog_p5", "facultad": "FAEDCOH", "codigo": "P5", "nombre": "Educacin Secundaria Especialidad: Ciencias Histricos Sociales y Religin", "tipo": "Pregrado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-03-15", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 049-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1FFK8GiykCCB5GenvZ1T1U_ejyF2elPPX/view?usp=sharing"},
  {"id": "prog_p6", "facultad": "FAEDCOH", "codigo": "P6", "nombre": "Educacin Secundaria Especialidad: Ciencia, Tecnologa y Ambiente", "tipo": "Pregrado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2007-01-01", "vigencia": "19", "resolucionUltimaActualizacion": "RES N 029-2007-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p7", "facultad": "FAEDCOH", "codigo": "P7", "nombre": "Educacin Fsica y Deportes", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2022", "anoResolucion": "2022-09-05", "vigencia": "4", "resolucionUltimaActualizacion": "RES N 287-2022-UPT-CU", "resolucionAdecuacion": "RES. N227-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1vEL6ZdLY-MVQ9t5RcSpNnVnBn3ecIseH/view?usp=sharing"},
  {"id": "prog_p8", "facultad": "FAEDCOH", "codigo": "P8", "nombre": "Educacin Tcnica", "tipo": "Pregrado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2007-01-01", "vigencia": "19", "resolucionUltimaActualizacion": "RES N 029-2007-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p9", "facultad": "FAEDCOH", "codigo": "P9", "nombre": "Ciencias de la Comunicacin", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2025-11-12", "vigencia": "1", "resolucionUltimaActualizacion": "RES N 379-2025-UPT-CU", "resolucionAdecuacion": "RES. N204-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQCGjdfvunzSTJyt9ufc87c1AbdEfA8Rs3nIY7-yUwWWLxo?e=E4dgL3"},
  {"id": "prog_p10", "facultad": "FAEDCOH", "codigo": "P10", "nombre": "Psicologa", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2025-11-19", "vigencia": "1", "resolucionUltimaActualizacion": "RES. N388-2025-UPT-CU", "resolucionAdecuacion": "RES. N203-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQCGjdfvunzSTJyt9ufc87c1AbdEfA8Rs3nIY7-yUwWWLxo?e=E4dgL3"},
  {"id": "prog_p11", "facultad": "FAING", "codigo": "P11", "nombre": "Ingeniera Electrnica", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-12-11", "vigencia": "6", "resolucionUltimaActualizacion": "RES N 343-2024-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "Declarado pero con observacin por SUNEDU, an en proceso ", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQD1zAPoY1wgToCfCS072YaXAaJKgsvk324xW_fw7eKW_qE?e=q3EwhX"},
  {"id": "prog_p12", "facultad": "FAING", "codigo": "P12", "nombre": "Ingeniera de Sistemas", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2022", "anoResolucion": "2022-04-20", "vigencia": "4", "resolucionUltimaActualizacion": "RES N 093-2022-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1Jsg_Am0qe1iuU05AKKJAi1oDsgTUKA6K/view?usp=sharing"},
  {"id": "prog_p13", "facultad": "FAING", "codigo": "P13", "nombre": "Ingeniera Civil", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2025-06-23", "vigencia": "1", "resolucionUltimaActualizacion": "RES. N 197-2025-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "Declarado pero con observacin por SUNEDU, an en proceso ", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQCQWNqhnP5tTr92uZY_XVHPARMondRl3MxQ5vuuk7JKtNI?e=rkDVfz"},
  {"id": "prog_p14", "facultad": "FAING", "codigo": "P14", "nombre": "Ingeniera Agroindustrial", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2021", "anoResolucion": "2020-09-10", "vigencia": "6", "resolucionUltimaActualizacion": "RES N 103-2020-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1Q82me0jPNvgHVQ8U46SC352cZUkQ3ix_/view?usp=sharing"},
  {"id": "prog_p15", "facultad": "FAING", "codigo": "P15", "nombre": "Ingeniera Ambiental", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N 341-2024-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "Declarado pero con observacin por SUNEDU, an en proceso ", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQCXblbazgPMQrFEbDuxPgexAfCbRj3LCqdNkdAAHnRNpx4?e=sTxQHr"},
  {"id": "prog_p16", "facultad": "FAING", "codigo": "P16", "nombre": "Ingeniera Industrial", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N342-2024-UPT-CU", "resolucionAdecuacion": "RES. 195-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "Declarado pero con observacin por SUNEDU, an en proceso ", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQAjbVIkphUKSJcV1IbNLtRlAWmfK0TL6jFGf3QeEbaaSi4?e=O0lx9t"},
  {"id": "prog_p17", "facultad": "FADE", "codigo": "P17", "nombre": "Derecho", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-07-24", "vigencia": "3", "resolucionUltimaActualizacion": "RES N273-2023-UPT-CU", "resolucionAdecuacion": "RES. N196-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/15uEGmx9maY2tlk2ar6UQCSfv4nEvm8qf/view?usp=sharing"},
  {"id": "prog_p18", "facultad": "FACSA", "codigo": "P18", "nombre": "Medicina Humana", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2021", "anoResolucion": "2020-08-25", "vigencia": "6", "resolucionUltimaActualizacion": "RES N 087-2020-UPT-CU", "resolucionAdecuacion": "RES. N199-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1p9y9Gc1jVEQghGVo_RM8Q_A-AtdAswzB/view?usp=sharing"},
  {"id": "prog_p19", "facultad": "FACSA", "codigo": "P19", "nombre": "Odontologa", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N344-2024-UPT-CU", "resolucionAdecuacion": "RES. N200-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQBgWEDyON0US5xuxsUKyH6BAd2GSuIkeDF3Ab2xbK7ZdS8?e=QKYrVb"},
  {"id": "prog_p20", "facultad": "FACSA", "codigo": "P20", "nombre": "Tecnologa Mdica con Mencin en Terapia Fsica y Rehabilitacin", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2025-09-15", "vigencia": "1", "resolucionUltimaActualizacion": "RES. N285-2025-UPT-CU", "resolucionAdecuacion": "RES. N201-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "SI", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQCY3xyNqdvRTJuaMxola1pxAbIPf7xEBeuOc__TmvaBB34?e=wxzxR1"},
  {"id": "prog_p21", "facultad": "FACSA", "codigo": "P21", "nombre": "Tecnologa Mdica con Mencin en Laboratorio Clnico y Anatoma Patolgica", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2025-11-19", "vigencia": "1", "resolucionUltimaActualizacion": "RES. N 387-2025-UPT-CU", "resolucionAdecuacion": "RES. N202-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQDRNk8LMV69TIdar3Y0mRaxAY9sx3MYqdiq6Tc4Xyd5BHM?e=Lq9m0F"},
  {"id": "prog_p22", "facultad": "FAU", "codigo": "P22", "nombre": "Arquitectura", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-08-22", "vigencia": "3", "resolucionUltimaActualizacion": "RES N 010-2023-UPT-AU", "resolucionAdecuacion": "RES. N197-2024-UPT-CU", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1VJN7d4Rh2PAjzOeK2bcfq9fxUZSKBp3S/view?usp=drive_link"},
  {"id": "prog_p23", "facultad": "FACEM", "codigo": "P23", "nombre": "Administracin Turstico-Hotelera", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N340-2024-UPT-CU", "resolucionAdecuacion": "RES. N198-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EbTvGJpRwoZFmiBK3tL_F2IB8mlGxGFYSLcaDfBD489wkg?e=9MLUUk"},
  {"id": "prog_p24", "facultad": "FACEM", "codigo": "P24", "nombre": "Ciencias Contables y Financieras", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2024-11-19", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N322-2024-UPT-CU", "resolucionAdecuacion": "RES. N198-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQAOvdm849TxQ4wRqsVmQvuhAQQ2_7mFqQJHzbqaAleF-x0?e=faZyzZ"},
  {"id": "prog_p25", "facultad": "FACEM", "codigo": "P25", "nombre": "Administracin de Negocios Internacionales", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N339-2024-UPT-CU", "resolucionAdecuacion": "RES. N198-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EezYOYPJASlLtABkU37nu0MBMAB9IiXczJ203KuLpw4kmA?e=aFlSbi"},
  {"id": "prog_p26", "facultad": "FACEM", "codigo": "P26", "nombre": "Economa", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N337-2024-UPT-CU", "resolucionAdecuacion": "RES. N198-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/ESj4t_p-u-5LpCq-30ZtsZwBX1Xrunapdx3PhebXkoQKWA?e=hn5web"},
  {"id": "prog_p27", "facultad": "FACEM", "codigo": "P27", "nombre": "Ingeniera Comercial", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2024-12-11", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N338-2024-UPT-CU", "resolucionAdecuacion": "RES. N198-2024-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EXOsCj34fBlLlsx4MNsKBNcBMvxJ1uGSnfI1aZlERSDcYg?e=7e9bUh"},
  {"id": "prog_p28", "facultad": "Post Grado", "codigo": "P28", "nombre": "Maestría en Arquitectura Paisajista", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-10-11", "vigencia": "3", "resolucionUltimaActualizacion": "RES N 368-2023-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. 042-2024-UPT-CU", "semiAnoEnviado": "2024", "semiAnoResolucion": "2024", "semiVigencia": "2", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1GjDA2a0pWfgQ2VjRPTeziJO-Rhf_TDlG/view?usp=sharing"},
  {"id": "prog_p29", "facultad": "Post Grado", "codigo": "P29", "nombre": "Maestría en Derecho con Mencin en Ciencias Penales", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES N 194-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1dM3z07RJ_I1cyStqiwdPe_Tc8LWk_WGa/view?usp=sharing"},
  {"id": "prog_p30", "facultad": "Post Grado", "codigo": "P30", "nombre": "Maestría en Contabilidad, Tributacin y Auditora", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. 193-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1pZFrdQvguS0OR8ZabOfHGA8SpJndtxbl/view?usp=sharing"},
  {"id": "prog_p31", "facultad": "Post Grado", "codigo": "P31", "nombre": "Maestría en Gestin y Polticas Pblicas", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES N 190-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1RFPS8L-oAmE80mcGXErfhQ_fqQTbx5OU/view?usp=sharing"},
  {"id": "prog_p32", "facultad": "Post Grado", "codigo": "P32", "nombre": "Maestría en Administracin y Direccin de Empresas", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 192-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. 140-2025-UPT-CU", "semiAnoEnviado": "2025", "semiAnoResolucion": "2025", "semiVigencia": "1", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "SI", "distResolucionAprobacion": "RES. 002-2025-UPT-CU", "distLaResolucionRedeseno": "SI", "distCuentaPlan": "SI", "distMalla": "SI", "distFormatoC1": "SI", "distTablaEquivalencias": "SI", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1cJ_WebT__ELOFPnG0s497brdyaJmBY1d/view?usp=sharing"},
  {"id": "prog_p34", "facultad": "Post Grado", "codigo": "P34", "nombre": "Maestría en Ingeniera Civil con Mencin en Transportes", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 198-2023-UPT-CU", "resolucionAdecuacion": "RES N 198-2023-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. N 222-2024-UPT-CU", "semiAnoEnviado": "2024", "semiAnoResolucion": "2024", "semiVigencia": "2", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1rTgk70uhNauJsF_T4pBFb3VUe1hBrD8w/view?usp=drive_link"},
  {"id": "prog_p35", "facultad": "Post Grado", "codigo": "P35", "nombre": "Maestría en Ingeniera Civil con Mencin en Estructuras", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 196-2023-UPT-CU", "resolucionAdecuacion": "RES N 196-2023-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. N 219-2024-UPT-CU", "semiAnoEnviado": "2024", "semiAnoResolucion": "2024", "semiVigencia": "2", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/17IUbEGkD2d5WzMdUrjgmFtLS_2MwryGg/view?usp=sharing"},
  {"id": "prog_p36", "facultad": "Post Grado", "codigo": "P36", "nombre": "Maestría en Ingeniera Civil con mencin en Gerencia de la Construccin", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 195-2023-UPT-CU", "resolucionAdecuacion": "RES N 195-2023-UPT-CU", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. N 221-2024-UPT-CU", "semiAnoEnviado": "2024", "semiAnoResolucion": "2024", "semiVigencia": "2", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1RAAfVoeDAyqlRdIWU84clNlMIl29ABHx/view?usp=sharing"},
  {"id": "prog_p37", "facultad": "Post Grado", "codigo": "P37", "nombre": "Maestría en Gestin Ambiental y Desarrollo Sostenible", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2015-01-30", "vigencia": "11", "resolucionUltimaActualizacion": "RES N 005-2015-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1nAAVwlFtfsDj-_ulSeZ56CVxXIa2nyer/view?usp=sharing"},
  {"id": "prog_p38", "facultad": "Post Grado", "codigo": "P38", "nombre": "Maestría en Ingeniera de Software", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2016-01-28", "vigencia": "10", "resolucionUltimaActualizacion": "RES N 013-2016-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/14uWxJqn9F9xlhm8bF58f4xQoxf9gJs5h/view?usp=sharing"},
  {"id": "prog_p39", "facultad": "Post Grado", "codigo": "P39", "nombre": "Maestría en Marketing y Gestin Comercial", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2015-01-30", "vigencia": "11", "resolucionUltimaActualizacion": "RES N 003-2015-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/160dtRDbcGAPlRN9NiU0XyogMUk6IAkDI/view?usp=sharing"},
  {"id": "prog_p40", "facultad": "Post Grado", "codigo": "P40", "nombre": "Maestría en Derecho Constitucional", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-10-11", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 369-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1WO6I6UB9CxafiIwbpbWFZ2OrZyjFbH4V/view?usp=sharing"},
  {"id": "prog_p41", "facultad": "Post Grado", "codigo": "P41", "nombre": "Maestría en Derecho con Mencin en Derecho Civil y Comercial", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2015-01-01", "vigencia": "2026", "resolucionUltimaActualizacion": "", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "no cuenta resolucin digital", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p42", "facultad": "Post Grado", "codigo": "P42", "nombre": "Maestría en Investigacin Cientfica e Innovacin", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-10-11", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 370-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. 001-2025-UPT-CU", "semiAnoEnviado": "2025", "semiAnoResolucion": "2025", "semiVigencia": "1", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "SI", "distResolucionAprobacion": "RES. 141-2025-UPT-CU", "distLaResolucionRedeseno": "SI", "distCuentaPlan": "SI", "distMalla": "SI", "distFormatoC1": "SI", "distTablaEquivalencias": "SI", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1VmW_UO0Bxbifovvk_8JVGrgPLjDSLWd_/view?usp=sharing"},
  {"id": "prog_p43", "facultad": "Post Grado", "codigo": "P43", "nombre": "Maestría en Docencia Universitaria y Gestin Educativa", "tipo": "Maestría", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "vigencia": "3", "resolucionUltimaActualizacion": "RES. 191-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "SI", "semiResolucionAprobacion": "RES. 474-2023-UPT-CU", "semiAnoEnviado": "2023", "semiAnoResolucion": "2023", "semiVigencia": "3", "semiLaResolucionRedeseno": "SI", "semiCuentaPlan": "SI", "semiMalla": "SI", "semiFormatoC1": "SI", "semiTablaEquivalencias": "SI", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1Xs_383W2i3OLZKi4Oe2z305ZCp10zSUt/view?usp=sharing"},
  {"id": "prog_p44", "facultad": "Post Grado", "codigo": "P44", "nombre": "Maestría en Ingeniera Comercial y Negocios Internacionales", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2015-01-01", "vigencia": "11", "resolucionUltimaActualizacion": "RES N 407-2015-UPT-R", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "no se cuenta con resolucin digital", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p45", "facultad": "Post Grado", "codigo": "P45", "nombre": "Maestría en Management International", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2009-01-01", "vigencia": "17", "resolucionUltimaActualizacion": "RES N 003-2009-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "no se cuenta con resolucin digital", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p46", "facultad": "Post Grado", "codigo": "P46", "nombre": "Maestría en Informtica", "tipo": "Maestría", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-03-15", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 067-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1Xn0qXLw_1NG05ge4AwPv-U8q0-7S0wgl/view?usp=sharing"},
  {"id": "prog_p47", "facultad": "Post Grado", "codigo": "P47", "nombre": "Doctorado en Administracin", "tipo": "Doctorado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-11-29", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 432-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1OuzBdlSGDMS8om-MgjX_jILY-y-NwVqt/view?usp=sharing"},
  {"id": "prog_p48", "facultad": "Post Grado", "codigo": "P48", "nombre": "Doctorado en Derecho", "tipo": "Doctorado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-12-15", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 475-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/153uB3hVvye03bssOdYaaDoIV9ewnvOJ0/view?usp=sharing"},
  {"id": "prog_p49", "facultad": "Post Grado", "codigo": "P49", "nombre": "Doctorado en Derecho Penal y Poltica Criminal", "tipo": "Doctorado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2016-01-01", "vigencia": "10", "resolucionUltimaActualizacion": "RES N 053-2016-UPT-R", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "no se cuenta con resolucin diital", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_p50", "facultad": "Post Grado", "codigo": "P50", "nombre": "Doctorado en Educacin con Mencin en Gestin Educativa", "tipo": "Doctorado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2023-12-15", "vigencia": "3", "resolucionUltimaActualizacion": "RES. N 476-2023-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "SI", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1TlXrKEepo0nVcyU4jhmWFuFVj7fC-5TO/view?usp=sharing"},
  {"id": "prog_p51", "facultad": "Post Grado", "codigo": "P51", "nombre": "Doctorado en Arquitectura y Dinmicas Urbanas", "tipo": "Doctorado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2016-10-07", "vigencia": "10", "resolucionUltimaActualizacion": "RES N 154-2016-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/16G-UUzQlsTQcyQZqY6UZRxfvGlMyfZIa/view?usp=sharing"},
  {"id": "prog_p52", "facultad": "Post Grado", "codigo": "P52", "nombre": "Doctorado en Ciencias Contables", "tipo": "Doctorado", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2016-10-07", "vigencia": "10", "resolucionUltimaActualizacion": "RES N 155-2016-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1uckEC6ZNMj7okR-ZlRlD8_nKtiDkK1Tm/view?usp=sharing"},
  {"id": "prog_p53", "facultad": "FACEM", "codigo": "P53", "nombre": "Administracin de Empresas", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2024", "anoResolucion": "2024-12-04", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N012-2024-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EWZ8K6FF335MjgAsB33HEqIBaaeK-1kIrxVI-qJU0FtsUw?e=8gZbrv"},
  {"id": "prog_p54", "facultad": "FAU", "codigo": "P54", "nombre": "Urbanismo", "tipo": "Pregrado", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2025", "anoResolucion": "2025-10-27", "vigencia": "1", "resolucionUltimaActualizacion": "RES. N006-2025-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "", "semiResolucionAprobacion": "", "semiAnoEnviado": "", "semiAnoResolucion": "", "semiVigencia": "", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EZVq5MCsoxdOqsK2ZJ9S7LgBzCIGs37yRREzcFrdtmKPCQ?e=lBdhoD"},
  {"id": "prog_se01_1", "facultad": "FAEDCOH", "codigo": "SE01.1", "nombre": "Segunda Especialidad en Intervencin de Problemas de Aprendizaje", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2013-01-01", "vigencia": "13", "resolucionUltimaActualizacion": "RES N 009-2013-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se01_2", "facultad": "FAEDCOH", "codigo": "SE01.2", "nombre": "Segunda Especialdiad en Eduacin Inclusiva y Atencin a la Diversidad", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2013-01-01", "vigencia": "13", "resolucionUltimaActualizacion": "RES N 010-2013-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se01_3", "facultad": "FAEDCOH", "codigo": "SE01.3", "nombre": "Segunda Especialidad en Estimulacin Temprana", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2007-01-01", "vigencia": "19", "resolucionUltimaActualizacion": "RES N 015-2007-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se01_4", "facultad": "FAEDCOH", "codigo": "SE01.4", "nombre": "Segunda Especialidad en Logopedia y Terapia Integral del Lenguaje", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2025-03-13", "vigencia": "1", "resolucionUltimaActualizacion": "RES N 103-2025-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "an no declarado", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EUaNBa1SqJFGqNU6IiQHK4YBw6IWGUFQDU4WKAFKVsLluQ?e=iHO6ud"},
  {"id": "prog_se02", "facultad": "FAING", "codigo": "SE02", "nombre": "Segunda Especialidad en Ingeniera de Telecomunicaciones", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2014-01-01", "vigencia": "12", "resolucionUltimaActualizacion": "RES N 0211-2014-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se03_1", "facultad": "FAING", "codigo": "SE03.1", "nombre": "Segunda Especialidad en Ingeniera Sismo Resistente", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 009-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se03_2", "facultad": "FAING", "codigo": "SE03.2", "nombre": "Segunda Especialidad en Gerencia y Control de la Construccin", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 021-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se04_1", "facultad": "FAING", "codigo": "SE04.1", "nombre": "Segunda Especialidad en Ingeniera en Agronegocios", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 008-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se04_2", "facultad": "FAING", "codigo": "SE04.2", "nombre": "Segunda Especialidad en Ingeniera Agroindustrial", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 007-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se05", "facultad": "FAING", "codigo": "SE05", "nombre": "Segunda Especialdiad en Ingeniera Ambiental", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2022", "anoResolucion": "2021-08-31", "vigencia": "5", "resolucionUltimaActualizacion": "RES N 149-2021-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1SCAAYCRRHMgZjE91JKgp6x372rezklmo/view?usp=sharing"},
  {"id": "prog_se06", "facultad": "FADE", "codigo": "SE06", "nombre": "Segunda Especialidad en Ciencias Poltica, Gestin Pblica y Gobierno", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 004-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_1", "facultad": "FACSA", "codigo": "SE07.1", "nombre": "Segunda Especialidad en Pediatra", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 050-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_2", "facultad": "FACSA", "codigo": "SE07.2", "nombre": "Segunda Especialidad en Medicina Interna", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 051-2017-UPT.CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_3", "facultad": "FACSA", "codigo": "SE07.3", "nombre": "Segunda Especialidad en Ginecologa y Obstetricia", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 052-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_4", "facultad": "FACSA", "codigo": "SE07.4", "nombre": "Segunda Especialidad en Ciruga General", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 053-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_5", "facultad": "FACSA", "codigo": "SE07.5", "nombre": "Segunda Especialdiad en Anestesiologa", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 054-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_6", "facultad": "FACSA", "codigo": "SE07.6", "nombre": "segunda Especialdiad en Medicina Familiar y Salud Comunitaria", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 055-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_7", "facultad": "FACSA", "codigo": "SE07.7", "nombre": "Segunda Especialidad en Psiquiatra", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 056-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "SI", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se07_8", "facultad": "FACSA", "codigo": "SE07.8", "nombre": "Segunda Especialidad en Neumonologa", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2017-01-01", "vigencia": "9", "resolucionUltimaActualizacion": "RES N 057-2017-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se08_1", "facultad": "FACSA", "codigo": "SE08.1", "nombre": "Segunda Especialidad en Odontopediatra", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-01-01", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N109-2024-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQAMQOu8pko1SqPRe2foguqZAUJaqCXF-fJd3S9k3WapDgc?e=Vrqz1z"},
  {"id": "prog_se08_2", "facultad": "FACSA", "codigo": "SE08.2", "nombre": "Segunda Especialidad en Periodoncia e Implantologa", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-04-17", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N107-2024-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQAWO3WcyDMoQKLqWw4Aj3H6Afl7GtpTHV8ux7gz7jV23Z0?e=LR4Oca"},
  {"id": "prog_se08_3", "facultad": "FACSA", "codigo": "SE08.3", "nombre": "Segunda Especialidad en Ortodoncia y Ortopedia Maxilar", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-04-17", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N108-2024-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQDSdrIS_RusQrl5-p_SPsDBAcCfRnKHUlqJ21LZd5h_i6o?e=NiGlCo"},
  {"id": "prog_se08_4", "facultad": "FACSA", "codigo": "SE08.4", "nombre": "Segunda Especialdiad en Endodoncia", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-04-17", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N110-2024-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQDgv_hJb_SMRJRMHMnqKIZpAQRZf21IVqOfORUmIuoPjwU?e=N7rZXw"},
  {"id": "prog_se08_5", "facultad": "FACSA", "codigo": "SE08.5", "nombre": "Segunda Especialidad en Rehabilitacin Oral", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2026", "anoResolucion": "2024-04-17", "vigencia": "2", "resolucionUltimaActualizacion": "RES. N106-2024-UPT-CU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/IQBs4_l6FHlSR43bxP2mUTyoAQmep8m5JKc7D8tbZiKYSqE?e=dZXxAA"},
  {"id": "prog_se08_6", "facultad": "FACSA", "codigo": "SE08.6", "nombre": "Segunda Especialidad en Odontologa Restauradora y Esttica", "tipo": "Segunda Especialidad", "estado": "ACTIVO", "actualizoPlan": "SI", "enviadoSunedu": "2023", "anoResolucion": "2022-01-28", "vigencia": "4", "resolucionUltimaActualizacion": "RES. N 004-2022-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "SI", "cuentaPlanEstudios": "SI", "mallaCurricular": "SI", "formatoA4": "SI", "formatoC1": "SI", "formatoRC1": "", "tablaEquivalencias": "SI", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": "https://drive.google.com/file/d/1brZNmo0VBvkRWH4sKuJ7zwIVZDTSFtIf/view?usp=sharing"},
  {"id": "prog_se09", "facultad": "FAU", "codigo": "SE09", "nombre": "Segunda Especialdiad en Ordenamiento-Acondicionamiento Territorial y sistema de Informacin Geogrfica", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 022-2008-UPT-FAU-CF", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se10_1", "facultad": "FACEM", "codigo": "SE10.1", "nombre": "Segunda Especialidad en Gastronoma", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 006-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se10_2", "facultad": "FACEM", "codigo": "SE10.2", "nombre": "Segunda Especialidad en Turismo y Hotelera", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 008-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se11", "facultad": "FACEM", "codigo": "SE11", "nombre": "Segunda Especialidad en Tributacin", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2007-01-01", "vigencia": "19", "resolucionUltimaActualizacion": "RES N 016-2007-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se12_1", "facultad": "FACEM", "codigo": "SE12.1", "nombre": "Segunda Especialidad en Adminsitracin", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 005-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se12_2", "facultad": "FACEM", "codigo": "SE12.2", "nombre": "Segunda Especialidad en Administracin de Medios de Comunicacin", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 015-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se12_3", "facultad": "FACEM", "codigo": "SE12.3", "nombre": "Segunda Especialdiad en Comercio Exterior y Negocios Internacionales", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2007-01-01", "vigencia": "19", "resolucionUltimaActualizacion": "RES N 016-2007-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se13", "facultad": "FACEM", "codigo": "SE13", "nombre": "Segunda Especialidad en Microfinanzas y Riesgo", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2012-01-01", "vigencia": "14", "resolucionUltimaActualizacion": "RES N 009-2012-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se14_1", "facultad": "FACEM", "codigo": "SE14.1", "nombre": "Segunda Especialidad en Marketing", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 013-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"id": "prog_se14_2", "facultad": "FACEM", "codigo": "SE14.2", "nombre": "Segunda Especialidad en Proyectos de Inversin", "tipo": "Segunda Especialidad", "estado": "INACTIVO", "actualizoPlan": "NO", "enviadoSunedu": "", "anoResolucion": "2008-01-01", "vigencia": "18", "resolucionUltimaActualizacion": "RES N 014-2008-UPT-AU", "resolucionAdecuacion": "--", "resolucionRedeseno": "NO", "cuentaPlanEstudios": "NO", "mallaCurricular": "NO", "formatoA4": "SI", "formatoC1": "NO", "formatoRC1": "", "tablaEquivalencias": "NO", "presencialVirtual20": "NO", "observaciones": "", "semiCuentaResolucion": "NO", "semiResolucionAprobacion": "", "semiAnoEnviado": "0", "semiAnoResolucion": "0", "semiVigencia": "0", "semiLaResolucionRedeseno": "", "semiCuentaPlan": "", "semiMalla": "", "semiFormatoC1": "", "semiTablaEquivalencias": "", "distCuentaResolucion": "", "distResolucionAprobacion": "", "distLaResolucionRedeseno": "", "distCuentaPlan": "", "distMalla": "", "distFormatoC1": "", "distTablaEquivalencias": "", "distObservaciones": "", "modalidad": "presencial", "resolucionLink": ""},
  {"facultad": "Post Grado", "codigo": "P28_", "nombre": "Maestría en Arquitectura Paisajista", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2024", "anoResolucion": "2024-01-15", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 042-2024-UPT-CU", "resolucionLink": "https://drive.google.com/file/d/1y4hAoUGVrVe_ZHZ7rDKLu5Xl9tW4SoU0/view?usp=sharing", "observaciones": "", "id": "prog_p28_"},
  {"facultad": "Post Grado", "codigo": "P32_", "nombre": "Maestría en Administracin y Direccin de Empresas", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2025", "anoResolucion": "2025-04-09", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 140-2025-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EekELuxNN4lIsUiltzQM4sIBZR65hzfeTd1DmOrJLaMKiQ?e=r4oKZG", "observaciones": "", "id": "prog_p32_"},
  {"facultad": "Post Grado", "codigo": "P33_", "nombre": "Maestría en Ingeniera Civil con Mencin en Geotcnia", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2024", "anoResolucion": "2024-08-07", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 220-2024-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EXUw2rBt2TFBvwHuWcSB5ncBel27H4uyBpCW9Rqwl7p5bw?e=KEkzXA", "observaciones": "", "id": "prog_p33_"},
  {"facultad": "Post Grado", "codigo": "P34_", "nombre": "Maestría en Ingeniera Civil con Mencin en Transportes", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2024", "anoResolucion": "2024-08-07", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 222-2024-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EQPdKq6m1RFPl_swHlqgW-MBf2KiyYZK0cma2ZOw6YTwSg?e=opRol5", "observaciones": "", "id": "prog_p34_"},
  {"facultad": "Post Grado", "codigo": "P35_", "nombre": "Maestría en Ingeniera Civil con Mencin en Estructuras", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2024", "anoResolucion": "2024-08-07", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 219-2024-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EeexoGzeHC5OiJOvb4y85iYBIdoVOLUhzUoAVtHWQB8wMw?e=0PuBt6", "observaciones": "", "id": "prog_p35_"},
  {"facultad": "Post Grado", "codigo": "P36", "nombre": "Maestría en Ingeniera Civil con mencin en Gerencia de la Construccin", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2024", "anoResolucion": "2024-08-07", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 221-2024-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EYJGyhCXTzpOnX0jYURQ-5EBWKYTk8wDFtBFqH3c9bUpww?e=QVTpBH", "observaciones": "", "id": "prog_p36"},
  {"facultad": "Post Grado", "codigo": "P33", "nombre": "Maestría en Ingeniera Civil con Mencin en Geotcnia", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2023", "anoResolucion": "2023-06-21", "modalidad": "presencial", "resolucionUltimaActualizacion": "RES N 197-2023-UPT-CU", "resolucionLink": "https://drive.google.com/file/d/1GsTZM7C-7urQYdWieXCNCvwwag0B11Fy/view?usp=drive_link", "observaciones": "", "id": "prog_p33"},
  {"facultad": "Post Grado", "codigo": "P42", "nombre": "Maestría en Investigacin Cientfica e Innovacin", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2025", "anoResolucion": "2025-01-03", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 001-2025-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EfR3RVCBl0FDrkMSi0MjfpQBxtD9E6kaKHb287VoMBoCYA?e=6yu6l5", "observaciones": "", "id": "prog_p42"},
  {"facultad": "Post Grado", "codigo": "P43", "nombre": "Maestría en Docencia Universitaria y Gestin Educativa", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2023", "anoResolucion": "2023-12-15", "modalidad": "semipresencial", "resolucionUltimaActualizacion": "RES N 474-2023-UPT-CU", "resolucionLink": "https://drive.google.com/file/d/18t-lbgiGqo_TtD-NJMbVfCGIEyKulWTC/view?usp=sharing", "observaciones": "", "id": "prog_p43"},
  {"facultad": "Post Grado", "codigo": "P32__", "nombre": "Maestría en Administracin y Direccin de Empresas", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2025", "anoResolucion": "2025-01-03", "modalidad": "a distancia / no presencial", "resolucionUltimaActualizacion": "RES N 002-2025-UPT-CU", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EcKCsrCpjSNGoCXpugDAr2cBdkLse_gCVec3JVS0CX3yEw?e=ZfQ0Ng", "observaciones": "", "id": "prog_p32__"},
  {"facultad": "Post Grado", "codigo": "P42__", "nombre": "Maestría en Investigacin Cientfica e Innovacin", "tipo": "Maestría", "estado": "ACTIVO", "enviadoSunedu": "2025", "anoResolucion": "2025-04-09", "modalidad": "a distancia / no presencial", "resolucionUltimaActualizacion": "", "resolucionLink": "https://uptpe-my.sharepoint.com/:b:/g/personal/licencia_institucional_upt_pe/EbhMYf_0H7VHt_EuNJwqfmgBHQ5DkxeSAn8X910POXwilQ?e=TB1Y85", "observaciones": "", "id": "prog_p42__"}
];

const INITIAL_CICLOS = [
  { id: "ciclo_01", numero: 1, nombre: "Primer Ciclo" },
  { id: "ciclo_02", numero: 2, nombre: "Segundo Ciclo" },
  { id: "ciclo_03", numero: 3, nombre: "Tercer Ciclo" },
  { id: "ciclo_04", numero: 4, nombre: "Cuarto Ciclo" },
  { id: "ciclo_05", numero: 5, nombre: "Quinto Ciclo" },
  { id: "ciclo_06", numero: 6, nombre: "Sexto Ciclo" },
  { id: "ciclo_07", numero: 7, nombre: "Séptimo Ciclo" },
  { id: "ciclo_08", numero: 8, nombre: "Octavo Ciclo" },
  { id: "ciclo_09", numero: 9, nombre: "Noveno Ciclo" },
  { id: "ciclo_10", numero: 10, nombre: "Décimo Ciclo" },
  { id: "ciclo_11", numero: 11, nombre: "Undécimo Ciclo" },
  { id: "ciclo_12", numero: 12, nombre: "Duodécimo Ciclo" },
  { id: "ciclo_13", numero: 13, nombre: "Decimotercer Ciclo" }
];

const INITIAL_CURSOS = [
  { id: "curso_101", codigo: "SIS-101", nombre: "Algoritmos y Programación", cicloId: "ciclo_01", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "General", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_102", codigo: "SIS-102", nombre: "Introducción a la Ingeniería de Sistemas", cicloId: "ciclo_01", creditos: 3, horasTP: 2, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "General", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_103", codigo: "MAT-101", nombre: "Análisis Matemático I", cicloId: "ciclo_01", creditos: 5, horasTP: 4, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "General", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  
  { id: "curso_201", codigo: "SIS-201", nombre: "Estructuras de Datos", cicloId: "ciclo_02", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "Específico", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_202", codigo: "MAT-201", nombre: "Análisis Matemático II", cicloId: "ciclo_02", creditos: 5, horasTP: 4, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "General", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  
  { id: "curso_301", codigo: "SIS-301", nombre: "Programación Orientada a Objetos", cicloId: "ciclo_03", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "Específico", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_302", codigo: "SIS-302", nombre: "Bases de Datos I", cicloId: "ciclo_03", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "Específico", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  
  { id: "curso_401", codigo: "SIS-401", nombre: "Ingeniería de Requerimientos", cicloId: "ciclo_04", creditos: 3, horasTP: 2, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "De especialidad", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_402", codigo: "SIS-402", nombre: "Arquitectura de Computadoras", cicloId: "ciclo_04", creditos: 4, horasTP: 3, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "Específico", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  
  { id: "curso_501", codigo: "SIS-501", nombre: "Ingeniería de Software I", cicloId: "ciclo_05", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "De especialidad", modalidad: "Presencial", programaId: "prog_ing_sistemas" },
  { id: "curso_502", codigo: "SIS-502", nombre: "Redes y Conectividad", cicloId: "ciclo_05", creditos: 4, horasTP: 2, horasTV: 0, horasPP: 4, horasPV: 0, tipoCurso: "obligatorio", tipoEstudio: "Específico", modalidad: "Presencial", programaId: "prog_ing_sistemas" },

  { id: "curso_601", codigo: "SIS-601", nombre: "Sistemas Distribuidos", cicloId: "ciclo_06", creditos: 3, horasTP: 0, horasTV: 2, horasPP: 0, horasPV: 2, tipoCurso: "obligatorio", tipoEstudio: "De especialidad", modalidad: "Virtual", programaId: "prog_ing_sistemas" },
  { id: "curso_602", codigo: "SIS-602", nombre: "Proyecto de Tesis I", cicloId: "ciclo_07", creditos: 4, horasTP: 1, horasTV: 1, horasPP: 2, horasPV: 2, tipoCurso: "obligatorio", tipoEstudio: "De especialidad", modalidad: "Virtual", programaId: "prog_ing_sistemas" },
  { id: "curso_electivo1", codigo: "", nombre: "Tópicos Especiales en Inteligencia Artificial", cicloId: "ciclo_08", creditos: 3, horasTP: 2, horasTV: 0, horasPP: 2, horasPV: 0, tipoCurso: "electivo", tipoEstudio: "De especialidad", modalidad: "Presencial", programaId: "prog_ing_sistemas" }
];

const INITIAL_INDICADORES = [
  { id: "ind_lic_1", codigo: "Indicador 1", nombre: "La Universidad tiene definidos sus objetivos institucionales", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.1 Objetivos Institucionales", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Rectorado / Dirección de Planificación" },
  { id: "ind_lic_2", codigo: "Indicador 2", nombre: "La Universidad cuenta con planes de estudio para cada uno de los programas de pregrado y/o postgrado", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.2 Objetivos Académicos y Planes de Estudio", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Director de Escuela" },
  { id: "ind_lic_3", codigo: "Indicador 3", nombre: "Existencia de un documento normativo que regule las modalidades y los requisitos para la obtención del grado y el título de los programas de estudio de la Universidad.", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.3 Grados y Títulos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Secretaría General" },
  { id: "ind_lic_4", codigo: "Indicador 4", nombre: "La Universidad cuenta con sistemas de información que brinden soporte a los procesos de: gestión económica y financiera, gestión docentes, matrícula y registro académico. Adicionalmente cuenta con tres (03) de los siguientes cuatro (04) procesos: gestión de egresados, gestión de investigación, biblioteca y portal de transparencia.", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.4 Sistemas de Información", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Tecnología de la Información (OTI)" },
  { id: "ind_lic_5", codigo: "Indicador 5", nombre: "Existencia de un documento normativo que regule los procesos de admisión", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.5 Procesos de Admisión", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Comisión de Admisión" },
  { id: "ind_lic_6", codigo: "Indicador 6", nombre: "La Universidad cuenta con información sobre los procesos de admisión y los ingresantes según modalidades de ingreso por período académico", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.5 Procesos de Admisión", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Comisión de Admisión" },
  { id: "ind_lic_7", codigo: "Indicador 7", nombre: "Plan de Gestión de la Calidad / Plan de mejora continua orientado a elevar la calidad de la formación académica", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.6 Plan de Gestión de la Calidad", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Calidad y Acreditación" },
  { id: "ind_lic_8", codigo: "Indicador 8", nombre: "La Universidad cuenta con un área de Gestión de la Calidad", descripcion: "CBC I: Existencia de objetivos académicos, grados y títulos a otorgar y planes de estudio - I.6 Plan de Gestión de la Calidad", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Calidad y Acreditación" },
  { id: "ind_lic_9", codigo: "Indicador 9", nombre: "Existencia de un presupuesto institucional proyectado a cinco (05) años en concordancia con los objetivos estratégicos.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.1 Creación de Nuevas Universidades", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Planificación y Presupuesto" },
  { id: "ind_lic_10", codigo: "Indicador 10", nombre: "Existencia de un Plan de Financiamiento de cinco (05) años.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.1 Creación de Nuevas Universidades", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Planificación y Presupuesto" },
  { id: "ind_lic_11", codigo: "Indicador 11", nombre: "Vinculación de la oferta educativa propuesta a la demanda laboral.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.1 Creación de Nuevas Universidades", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Asuntos Académicos" },
  { id: "ind_lic_12", codigo: "Indicador 12", nombre: "Oferta educativa relacionada con las políticas nacionales y regionales de educación universitaria.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.1 Creación de Nuevas Universidades", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Asuntos Académicos" },
  { id: "ind_lic_13", codigo: "Indicador 13", nombre: "Fuentes de financiamiento de la universidad, para las universidades privadas.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.1 Creación de Nuevas Universidades", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Administración" },
  { id: "ind_lic_14", codigo: "Indicador 14", nombre: "Vinculación de los nuevos programas de estudios, a la demanda laboral.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.2 Creación de Nuevos Programas en Universidades Existentes", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Director de Escuela" },
  { id: "ind_lic_15", codigo: "Indicador 15", nombre: "Existencia de Plan de Financiamiento que demuestre la disponibilidad de recursos humanos y económicos para el inicio y sostenibilidad del nuevo programa de estudio a ofrecer.", descripcion: "CBC II: Oferta educativa compatible con los fines propuestos en planeamiento - II.2 Creación de Nuevos Programas en Universidades Existentes", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Planificación y Presupuesto" },
  { id: "ind_lic_16", codigo: "Indicador 16", nombre: "Todos los locales de la universidad cumplen con las normas sobre compatibilidad de uso y zonificación urbana.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.1 Ubicación de los Locales", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura / Mantenimiento" },
  { id: "ind_lic_17", codigo: "Indicador 17", nombre: "Locales propios, alquilados, bajo cesión de uso o algún otro título de uso exclusivo para su propósito.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.2 Posesión de Locales", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección General de Administración" },
  { id: "ind_lic_18", codigo: "Indicador 18", nombre: "Los locales cumplen con las normas de seguridad estructural en edificaciones y prevención de riesgos en estricto cumplimiento con las normas del Centro Nacional de Estimación, Prevención y Reducción del Riesgo de Desastres - CENEPRED/INDECI.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.3 Seguridad Estructural y Siniestros", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Comité de Seguridad y Salud en el Trabajo" },
  { id: "ind_lic_19", codigo: "Indicador 19", nombre: "La universidad cuenta con un reglamento interno de seguridad y salud en el trabajo y protocolos de seguridad.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.3 Seguridad Estructural y Siniestros", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Comité de Seguridad y Salud en el Trabajo" },
  { id: "ind_lic_20", codigo: "Indicador 20", nombre: "La universidad cuenta con estándares de seguridad para el funcionamiento de los laboratorios, según corresponda.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.4 Seguridad de Uso de Laboratorios y Talleres", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Coordinación de Laboratorios" },
  { id: "ind_lic_21", codigo: "Indicador 21", nombre: "Disponibilidad de agua potable y desagüe.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.5 Disponibilidad de Servicios Públicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_22", codigo: "Indicador 22", nombre: "Disponibilidad de energía eléctrica", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.5 Disponibilidad de Servicios Públicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_23", codigo: "Indicador 23", nombre: "Disponibilidad de líneas telefónicas", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.5 Disponibilidad de Servicios Públicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_24", codigo: "Indicador 24", nombre: "Disponibilidad de Internet en los ambientes que brinden el servicio educativo de todos sus locales. El servicio de Internet debe contar con banda ancha requerida para la educación superior universitaria, conforme a lo establecido por el órgano competente y de acuerdo a la disponibilidad del servicio de telecomunicaciones en la región.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.5 Disponibilidad de Servicios Públicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Tecnología de la Información (OTI)" },
  { id: "ind_lic_25", codigo: "Indicador 25", nombre: "Dotación de servicios higiénicos para los estudiantes en todos los locales, de acuerdo con el art. 13 de la Norma Técnica A.040 Educación contenido en el Reglamento Nacional de Edificaciones (RNE).", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.6 Dotación de Servicios Higiénicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_26", codigo: "Indicador 26", nombre: "Dotación de servicios higiénicos para personal docente y administrativo en todos sus locales, de acuerdo con el art. 15 de la Norma Técnica A.080 del RNE.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.6 Dotación de Servicios Higiénicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_27", codigo: "Indicador 27", nombre: "La universidad cuenta con talleres y laboratorios de enseñanza propios, de conformidad con el número de estudiantes, actividades académicas y programas de estudio. (Formato C6)", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.7 Talleres y Laboratorios para la Enseñanza", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Director de Escuela / Coordinación de Laboratorios" },
  { id: "ind_lic_28", codigo: "Indicador 28", nombre: "Los laboratorios de enseñanza están equipados de acuerdo a su especialidad. (Formato C7)", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.7 Talleres y Laboratorios para la Enseñanza", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Coordinación de Laboratorios" },
  { id: "ind_lic_29", codigo: "Indicador 29", nombre: "La universidad cuenta con ambientes para los docentes, en cada local que ofrece el servicio educativo.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.8 Ambientes para Docentes", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura" },
  { id: "ind_lic_30", codigo: "Indicador 30", nombre: "Existencia de presupuesto y un plan de mantenimiento.", descripcion: "CBC III: Infraestructura y equipamiento adecuado - III.9 Mantenimiento de la Infraestructura y Equipamiento", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Infraestructura / Presupuesto" },
  { id: "ind_lic_31", codigo: "Indicador 31", nombre: "Existencia de políticas, normas y procedimientos para el fomento y realización de la investigación como una actividad esencial y obligatoria de la universidad.", descripcion: "CBC IV: Líneas de Investigación - IV.1 Líneas de Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Investigación" },
  { id: "ind_lic_32", codigo: "Indicador 32", nombre: "Existencia de un Órgano Universitario de Investigación cuyo responsable tenga grado de doctor.", descripcion: "CBC IV: Líneas de Investigación - IV.1 Líneas de Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Vicerrectorado de Investigación" },
  { id: "ind_lic_33", codigo: "Indicador 33", nombre: "Existencia de líneas de investigación. Asimismo, se debe indicar el presupuesto asignado para la investigación, equipamiento, personal y otros.", descripcion: "CBC IV: Líneas de Investigación - IV.1 Líneas de Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Investigación / Presupuesto" },
  { id: "ind_lic_34", codigo: "Indicador 34", nombre: "Código de Ética para la investigación.", descripcion: "CBC IV: Líneas de Investigación - IV.1 Líneas de Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Comité de Ética de Investigación" },
  { id: "ind_lic_35", codigo: "Indicador 35", nombre: "Políticas de protección de la propiedad intelectual.", descripcion: "CBC IV: Líneas de Investigación - IV.1 Líneas de Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Propiedad Intelectual" },
  { id: "ind_lic_36", codigo: "Indicador 36", nombre: "La universidad tiene un registro de docentes que realizan investigación. Asimismo, los docentes deben estar registrados en el DINA", descripcion: "CBC IV: Líneas de Investigación - IV.2 Docentes que Realizan Investigación", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Investigación / Recursos Humanos" },
  { id: "ind_lic_37", codigo: "Indicador 37", nombre: "La universidad tiene un registro de documentos de investigación y/o repositorio institucional. Los documentos de investigación incluyen tesis, informes de investigación, publicaciones científicas, entre otros.", descripcion: "CBC IV: Líneas de Investigación - IV.3 Registro de Documentos y Proyectos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Biblioteca / Repositorio Institucional" },
  { id: "ind_lic_38", codigo: "Indicador 38", nombre: "La universidad tiene un registro de proyecto(s) de investigación en proceso de ejecución.", descripcion: "CBC IV: Líneas de Investigación - IV.3 Registro de Documentos y Proyectos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Investigación" },
  { id: "ind_lic_39", codigo: "Indicador 39", nombre: "La universidad tiene como mínimo el 25% del total de docentes a tiempo completo.", descripcion: "CBC V: Personal Docente Calificado - V.1 Existencia del 25% del Total de Docentes a Tiempo Completo", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Recursos Humanos / Oficina de Personal" },
  { id: "ind_lic_40", codigo: "Indicador 40", nombre: "Los docentes incorporados a la docencia universitaria con fecha posterior a la entrada en vigencia de la Ley Universitaria que dediquen horas de docencia en pregrado o postgrado cuentan al menos con grado de maestro o doctor, según corresponda.", descripcion: "CBC V: Personal Docente Calificado - V.2 Requisitos para el Ejercicio de la Docencia", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Recursos Humanos / Asuntos Académicos" },
  { id: "ind_lic_41", codigo: "Indicador 41", nombre: "La universidad regula los mecanismos y/o procedimientos para la selección, evaluación periódica del desempeño y ratificación de sus docentes, incluyendo como criterio la calificación de los estudiantes por semestre académico.", descripcion: "CBC V: Personal Docente Calificado - V.3 Selección, Evaluación y Capacitación Docente", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Recursos Humanos / Comisión Evaluadora" },
  { id: "ind_lic_42", codigo: "Indicador 42", nombre: "La universidad regula la capacitación de sus docentes.", descripcion: "CBC V: Personal Docente Calificado - V.3 Selección, Evaluación y Capacitación Docente", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Recursos Humanos / Dirección de Capacitación" },
  { id: "ind_lic_43", codigo: "Indicador 43", nombre: "La universidad cuenta en todos sus locales con un tópico o con el servicio tercerizado.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.1 Servicios de Salud", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Bienestar Universitario / Servicio Médico" },
  { id: "ind_lic_44", codigo: "Indicador 44", nombre: "Existencia de servicios sociales disponibles para los estudiantes: bienestar social, bienestar estudiantil, programas de voluntariado, entre otros.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.2 Servicio Social", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Bienestar Universitario / Servicio Social" },
  { id: "ind_lic_45", codigo: "Indicador 45", nombre: "Existencia de servicios psicopedagógicos disponibles para todos los estudiantes.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.3 Servicios Psicopedagógicos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Bienestar Universitario / Psicopedagogía" },
  { id: "ind_lic_46", codigo: "Indicador 46", nombre: "Existencia de servicios deportivos en al menos tres disciplinas deportivas, disponibles para los estudiantes, con el objetivo de fomentar su participación y desarrollo.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.4 Servicios Deportivos", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Bienestar Universitario / Oficina de Deportes" },
  { id: "ind_lic_47", codigo: "Indicador 47", nombre: "Existencia y difusión de servicios culturales disponibles para todos los estudiantes para su participación y desarrollo del mismo.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.5 Servicios Culturales", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Bienestar Universitario / Centro Cultural" },
  { id: "ind_lic_48", codigo: "Indicador 48", nombre: "Existencia de servicios de seguridad y vigilancia en todos sus locales.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.6 Servicios de Seguridad y Vigilancia", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Jefe de Seguridad / Administración" },
  { id: "ind_lic_49", codigo: "Indicador 49", nombre: "La universidad cuenta con políticas, planes y acciones para la protección al ambiente", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.7 Adecuación al Entorno y Protección al Ambiente", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Gestión Ambiental" },
  { id: "ind_lic_50", codigo: "Indicador 50", nombre: "Material bibliográfico según planes de estudio de sus programas. El acervo bibliográfico puede ser en físico y/o virtual. Las bibliotecas virtuales deben estar suscritas.", descripcion: "CBC VI: Servicios Educacionales Complementarios - VI.8 Acervo Bibliográfico", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Biblioteca" },
  { id: "ind_lic_51", codigo: "Indicador 51", nombre: "Existencia de un área, dirección o jefatura encargada del seguimiento del graduado.", descripcion: "CBC VII: Mecanismos de Mediación e Inserción Laboral - VII.1 Mecanismos de Mediación para Estudiantes y Egresados", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Seguimiento al Graduado" },
  { id: "ind_lic_52", codigo: "Indicador 52", nombre: "Mecanismos de apoyo a la inserción laboral.", descripcion: "CBC VII: Mecanismos de Mediación e Inserción Laboral - VII.1 Mecanismos de Mediación para Estudiantes y Egresados", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Bolsa de Trabajo" },
  { id: "ind_lic_53", codigo: "Indicador 53", nombre: "Existencia de convenios con instituciones públicas y/o privadas de prácticas pre profesionales y profesionales.", descripcion: "CBC VII: Mecanismos de Mediación e Inserción Laboral - VII.1 Mecanismos de Mediación para Estudiantes y Egresados", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Relaciones Interinstitucionales" },
  { id: "ind_lic_54", codigo: "Indicador 54", nombre: "Mecanismos de coordinación y alianzas estratégicas con el sector público y/o privado", descripcion: "CBC VII: Mecanismos de Mediación e Inserción Laboral - VII.2 Alianzas Estratégicas Sector Público/Privado", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Dirección de Relaciones Interinstitucionales" },
  { id: "ind_lic_55", codigo: "Indicador 55", nombre: "Transparencia de la información institucional a través de su portal web.", descripcion: "CBC VIII: Transparencia de Universidades - VIII.1 Transparencia", tipo: "Licenciamiento", estado: "nocumple", porcentajeAvance: 0, responsable: "Oficina de Imagen y Relaciones Públicas / Transparencia" },
  { id: "ind_acr_1", codigo: "SINEACE.01", nombre: "Planificación del Programa", descripcion: "El programa de estudios está alineado con los propósitos de la institución y perfil de egreso.", tipo: "Acreditación", estado: "cumple", porcentajeAvance: 90, responsable: "Comité de Acreditación" },
  { id: "ind_acr_2", codigo: "SINEACE.12", nombre: "Perfil de Egreso Coherente", descripcion: "El perfil de egreso del programa es evaluado periódicamente con egresados.", tipo: "Acreditación", estado: "en_proceso", porcentajeAvance: 50, responsable: "Comisión Curricular" },
  { id: "ind_acr_3", codigo: "SINEACE.22", nombre: "Seguimiento al Desempeño Estudiantil", descripcion: "Mecanismos e indicadores para medir el desempeño y logro del perfil de egreso.", tipo: "Acreditación", estado: "nocumple", porcentajeAvance: 0, responsable: "Calidad Académica" },
  { id: "ind_iso9_1", codigo: "ISO9.1", nombre: "Gestión de Procesos y Riesgos de Calidad", descripcion: "Control sistemático de procesos de enseñanza-aprendizaje y planes de contingencia.", tipo: "ISO 9001", estado: "cumple", porcentajeAvance: 100, responsable: "Coordinador de Calidad" },
  { id: "ind_iso9_2", codigo: "ISO9.2", nombre: "Satisfacción del Estudiante y Partes", descripcion: "Encuestas, retroalimentación y planes de mejora continua según resultados de satisfacción.", tipo: "ISO 9001", estado: "en_proceso", porcentajeAvance: 40, responsable: "Oficina de Calidad" },
  { id: "ind_iso21_1", codigo: "ISO21.1", nombre: "Gestión de Recursos de Aprendizaje Educativo", descripcion: "Disponibilidad y accesibilidad de recursos bibliográficos y virtuales especializados.", tipo: "ISO 21001", estado: "en_proceso", porcentajeAvance: 60, responsable: "Biblioteca / TI" },
  { id: "ind_iso21_2", codigo: "ISO21.2", nombre: "Necesidades Educativas Especiales", descripcion: "Adaptación curricular, accesibilidad física y tecnológica para la inclusión.", tipo: "ISO 21001", estado: "nocumple", porcentajeAvance: 10, responsable: "Bienestar Universitario" }
];

const INITIAL_MEDIOS_VERIFICACION = [
  { id: "mv_lic_1", codigo: "MV1", nombre: "Estatuto de la Universidad u otro documento aprobado por la autoridad competente de la Universidad", indicadorId: "ind_lic_1" },
  { id: "mv_lic_2", codigo: "MV2", nombre: "Planes de estudios de los programas de estudio aprobado por la autoridad competente de la Universidad (Resolución), indicando su última fecha de actualización", indicadorId: "ind_lic_2" },
  { id: "mv_lic_3", codigo: "MV3", nombre: "Formato de malla curricular y análisis de créditos académicos - SUNEDU", indicadorId: "ind_lic_2" },
  { id: "mv_lic_4", codigo: "MV4", nombre: "Estatuto de la Universidad, Reglamento de Grados y Títulos u otro documento normativo aprobado por la autoridad competente de la universidad, indicando última fecha de actualización.", indicadorId: "ind_lic_3" },
  { id: "mv_lic_5", codigo: "MV5", nombre: "Manual de usuario o documento pertinente que evidencia los Sistemas de Información", indicadorId: "ind_lic_4" },
  { id: "mv_lic_6", codigo: "MV6", nombre: "Normativa o reglamento de admisión aprobado por la autoridad competente de la Universidad, que regule las modalidades de ingreso para todos los programas de estudios, indicando su última actualización", indicadorId: "ind_lic_5" },
  { id: "mv_lic_7", codigo: "MV7", nombre: "Informe estadístico de admisión de los últimos 2 años, según corresponda. (lo cual aplica para universidades existentes antes de la Ley Nº 30220)", indicadorId: "ind_lic_6" },
  { id: "mv_lic_8", codigo: "MV8", nombre: "Plan de gestión de la calidad institucional, aprobado por la autoridad competente de la Universidad", indicadorId: "ind_lic_7" },
  { id: "mv_lic_9", codigo: "MV9", nombre: "Documento que acredite la existencia de la creación del área de Gestión de la Calidad, dirección o departamento emitido por la autoridad competente de la Universidad, indicando su fecha de aprobación, y la relación del personal calificado asignado a la misma.", indicadorId: "ind_lic_8" },
  { id: "mv_lic_10", codigo: "MV10", nombre: "Presupuesto Institucional formulado de acuerdo a su Plan Estratégico y/o planes operativos para los próximos cinco (05) años, que incluya el presupuesto de gestión administrativa, de investigación, de infraestructura y de equipamiento (ampliación, renovación, mantenimiento, etc.), de gestión académica, de servicios complementarios, de programas de bienestar, entre otros.", indicadorId: "ind_lic_9" },
  { id: "mv_lic_11", codigo: "MV11", nombre: "Plan de financiamiento del presupuesto institucional para los próximos cinco (05) años", indicadorId: "ind_lic_10" },
  { id: "mv_lic_12", codigo: "MV12", nombre: "Documento o estudios que justifiquen el desarrollo de los programas de estudios.", indicadorId: "ind_lic_11" },
  { id: "mv_lic_13", codigo: "MV13", nombre: "Documento que sustente la correspondencia entre la oferta educativa propuesta y las políticas nacionales y regionales de educación universitaria. De acuerdo a la especialidad, dichas políticas pueden estar vinculadas con: Agenda de competitividad del CNC; Plan Estratégico de Desarrollo Nacional; Plan Nacional de Ciencia y Tecnología; Plan de Desarrollo Concertado Regional.", indicadorId: "ind_lic_12" },
  { id: "mv_lic_14", codigo: "MV14", nombre: "Documento donde se indique las fuentes de financiamiento de la universidad.", indicadorId: "ind_lic_13" },
  { id: "mv_lic_15", codigo: "MV15", nombre: "Documento o estudios que justifiquen la creación de los nuevos programas de estudios.", indicadorId: "ind_lic_14" },
  { id: "mv_lic_16", codigo: "MV16", nombre: "Plan de financiamiento de los nuevos programas de estudio a ofrecer.", indicadorId: "ind_lic_15" },
  { id: "mv_lic_17", codigo: "MV17", nombre: "Licencia de Funcionamiento Municipal vigente y/o Certificado de Parámetros Urbanísticos.", indicadorId: "ind_lic_16" },
  { id: "mv_lic_18", codigo: "MV18", nombre: "Títulos de propiedad de todos sus locales debidamente registrados en la SUNARP", indicadorId: "ind_lic_17" },
  { id: "mv_lic_19", codigo: "MV19", nombre: "Contratos de alquiler debidamente registrados en la SUNARP de todos sus locales, cumpliendo los plazos mínimos de ley según el tipo de universidad.", indicadorId: "ind_lic_17" },
  { id: "mv_lic_20", codigo: "MV20", nombre: "Títulos o documentos que expresen el derecho real que ejerce sobre todos sus locales;", indicadorId: "ind_lic_17" },
  { id: "mv_lic_21", codigo: "MV21", nombre: "Contrato, convenio u otro documento pertinente en caso de cesión en uso exclusivo.", indicadorId: "ind_lic_17" },
  { id: "mv_lic_22", codigo: "MV22", nombre: "Certificado vigente de Inspección Técnica de Seguridad en Edificaciones que corresponda (ITSE Básica, Ex Post, Ex Ante o de Detalle) emitido por la autoridad competente.", indicadorId: "ind_lic_18" },
  { id: "mv_lic_23", codigo: "MV23", nombre: "Reglamento interno de seguridad y salud en el trabajo, protocolos de seguridad y planes de seguridad, que incluyan almacenamiento y gestión de sustancias peligrosas y disposición de residuos.", indicadorId: "ind_lic_19" },
  { id: "mv_lic_24", codigo: "MV24", nombre: "Documento que demuestre la existencia de comités de seguridad biológica, química y radiológica, según corresponda, indicando personal calificado y suscrito por autoridad competente.", indicadorId: "ind_lic_20" },
  { id: "mv_lic_25", codigo: "MV25", nombre: "Certificado de factibilidad del servicio y/o el último recibo de servicio de agua, evidenciando el nivel de consumo y no registrar deuda, o alternativa autorizada en zonas rurales.", indicadorId: "ind_lic_21" },
  { id: "mv_lic_26", codigo: "MV26", nombre: "Certificado de factibilidad del servicio y/o el último recibo de servicio de energía eléctrica, evidenciando el nivel de consumo y no registrar deuda, o alternativa autorizada en zonas rurales.", indicadorId: "ind_lic_22" },
  { id: "mv_lic_27", codigo: "MV27", nombre: "Contrato de servicio y el recibo de los últimos tres meses de telefonía, evidenciando el nivel de consumo y no registrar deuda.", indicadorId: "ind_lic_23" },
  { id: "mv_lic_28", codigo: "MV28", nombre: "Contrato del servicio de Internet de banda ancha, indicando características del mismo, último recibo de pago y Formato SUNEDU con listado de ambientes conectados.", indicadorId: "ind_lic_24" },
  { id: "mv_lic_29", codigo: "MV29", nombre: "Formato SUNEDU incorporando el requerimiento de dotación de servicios higiénicos por local para estudiantes según normas A.040 y A.080 del RNE y registro fotográfico.", indicadorId: "ind_lic_25" },
  { id: "mv_lic_30", codigo: "MV30", nombre: "Formato SUNEDU incorporando el requerimiento de dotación de servicios higiénicos por local para personal docente y administrativo según normas A.040 y A.080 del RNE y registro fotográfico.", indicadorId: "ind_lic_26" },
  { id: "mv_lic_31", codigo: "MV31", nombre: "Formato SUNEDU de laboratorios y talleres de enseñanza propios, de conformidad con estudiantes, actividades y programas de estudio.", indicadorId: "ind_lic_27" },
  { id: "mv_lic_32", codigo: "MV32", nombre: "Formato SUNEDU detallando el equipamiento de los laboratorios de enseñanza según su especialidad.", indicadorId: "ind_lic_28" },
  { id: "mv_lic_33", codigo: "MV33", nombre: "Formato SUNEDU registrando la ubicación de los ambientes para docentes en cada local de la universidad.", indicadorId: "ind_lic_29" },
  { id: "mv_lic_34", codigo: "MV34", nombre: "Presupuesto y plan de mantenimiento aprobado por la autoridad competente de la universidad, indicando la última fecha de actualización.", indicadorId: "ind_lic_30" },
  { id: "mv_lic_35", codigo: "MV35", nombre: "Estatuto o Plan Estratégico Institucional u otro documento pertinente aprobado por la autoridad competente de la universidad que fomente la investigación.", indicadorId: "ind_lic_31" },
  { id: "mv_lic_36", codigo: "MV36", nombre: "Estatuto u otro documento pertinente aprobado y relación del personal del órgano universitario de investigación.", indicadorId: "ind_lic_32" },
  { id: "mv_lic_37", codigo: "MV37", nombre: "Resolución rectoral que apruebe las líneas de investigación con presupuesto asignado para investigación, equipamiento, personal y otros.", indicadorId: "ind_lic_33" },
  { id: "mv_lic_38", codigo: "MV38", nombre: "Código de ética para el investigador, con su resolución de aprobación correspondiente.", indicadorId: "ind_lic_34" },
  { id: "mv_lic_39", codigo: "MV39", nombre: "Resolución o documento que indique las políticas de protección de la propiedad intelectual aprobadas por la autoridad competente.", indicadorId: "ind_lic_35" },
  { id: "mv_lic_40", codigo: "MV40", nombre: "Padrón de docentes actualizado al período vigente según formato SUNEDU, señalando docentes investigadores y registro en DINA.", indicadorId: "ind_lic_36" },
  { id: "mv_lic_41", codigo: "MV41", nombre: "Repositorio institucional y nacional (ALICIA) y/o Plan de Implementación para universidades nuevas.", indicadorId: "ind_lic_37" },
  { id: "mv_lic_42", codigo: "MV42", nombre: "Registro de proyectos precisando nombre del proyecto, objetivos, investigador principal, recursos, cronograma, presupuesto y financiador.", indicadorId: "ind_lic_38" },
  { id: "mv_lic_43", codigo: "MV43", nombre: "Padrón de docentes actualizado al periodo vigente, según formato de Relación Docente - SUNEDU.", indicadorId: "ind_lic_39" },
  { id: "mv_lic_44", codigo: "MV44", nombre: "Padrón de docentes actualizado y Declaración Jurada sobre el cumplimiento de la calificación docente según Ley Nº 30220.", indicadorId: "ind_lic_40" },
  { id: "mv_lic_45", codigo: "MV45", nombre: "Instrumento normativo, reglamento o documento que contenga procedimientos de selección, evaluación y ratificación docente aprobados.", indicadorId: "ind_lic_41" },
  { id: "mv_lic_46", codigo: "MV46", nombre: "Instrumento normativo que regule la evaluación de desempeño y Plan de Capacitación Docente aprobado.", indicadorId: "ind_lic_42" },
  { id: "mv_lic_47", codigo: "MV47", nombre: "Formato SUNEDU de ubicación del tópico (de encontrarse dentro de las instalaciones) y presupuesto destinado a la prestación del servicio.", indicadorId: "ind_lic_43" },
  { id: "mv_lic_48", codigo: "MV48", nombre: "Contrato o convenio para la prestación del servicio médico a través de terceros (si el servicio es tercerizado).", indicadorId: "ind_lic_43" },
  { id: "mv_lic_49", codigo: "MV49", nombre: "Documento que acredite el presupuesto destinado a la prestación del servicio social universitario.", indicadorId: "ind_lic_44" },
  { id: "mv_lic_50", codigo: "MV50", nombre: "Contrato o convenio para la prestación de servicios de bienestar/social a través de terceros.", indicadorId: "ind_lic_44" },
  { id: "mv_lic_51", codigo: "MV51", nombre: "Documento que acredite el presupuesto destinado a la prestación del servicio psicopedagógico.", indicadorId: "ind_lic_45" },
  { id: "mv_lic_52", codigo: "MV52", nombre: "Contrato o convenio para la prestación del servicio psicopedagógico a través de terceros.", indicadorId: "ind_lic_45" },
  { id: "mv_lic_53", codigo: "MV53", nombre: "Documento que acredite el presupuesto destinado a la prestación del servicio deportivo.", indicadorId: "ind_lic_46" },
  { id: "mv_lic_54", codigo: "MV54", nombre: "Contrato o convenio para la prestación del servicio deportivo a través de terceros.", indicadorId: "ind_lic_46" },
  { id: "mv_lic_55", codigo: "MV55", nombre: "Normatividad, Reglamento y/o Estatuto donde se indique la existencia de al menos tres (3) disciplinas deportivas.", indicadorId: "ind_lic_46" },
  { id: "mv_lic_56", codigo: "MV56", nombre: "Documento que acredite el presupuesto destinado a la prestación de servicios culturales.", indicadorId: "ind_lic_47" },
  { id: "mv_lic_57", codigo: "MV57", nombre: "Contrato o convenio para la prestación de servicios culturales a través de terceros.", indicadorId: "ind_lic_47" },
  { id: "mv_lic_58", codigo: "MV58", nombre: "Documento que acredite el presupuesto destinado a la prestación de servicios de seguridad y vigilancia.", indicadorId: "ind_lic_48" },
  { id: "mv_lic_59", codigo: "MV59", nombre: "Contrato o convenio para la prestación de servicios de seguridad y vigilancia a través de terceros.", indicadorId: "ind_lic_48" },
  { id: "mv_lic_60", codigo: "MV60", nombre: "Documento que contenga las políticas, planes y acciones de adecuación al entorno y protección al ambiente.", indicadorId: "ind_lic_49" },
  { id: "mv_lic_61", codigo: "MV61", nombre: "Acervo bibliográfico físico: Lista codificada del material bibliográfico indicando año de publicación, filial y programa relacionado.", indicadorId: "ind_lic_50" },
  { id: "mv_lic_62", codigo: "MV62", nombre: "Acervo bibliográfico virtual: Contratos o convenios de uso de bibliotecas virtuales, equivalentes a CONCYTEC.", indicadorId: "ind_lic_50" },
  { id: "mv_lic_63", codigo: "MV63", nombre: "Documento de aprobación de la creación del área, dirección o departamento de seguimiento del graduado emitido por autoridad competente.", indicadorId: "ind_lic_51" },
  { id: "mv_lic_64", codigo: "MV64", nombre: "ROF, MOF u otro documento que especifique las funciones del área encargada del seguimiento del graduado.", indicadorId: "ind_lic_51" },
  { id: "mv_lic_65", codigo: "MV65", nombre: "Plan de seguimiento al graduado aprobado por la autoridad competente de la universidad.", indicadorId: "ind_lic_51" },
  { id: "mv_lic_66", codigo: "MV66", nombre: "Registro de graduados por semestre y programas de estudio de los dos últimos años.", indicadorId: "ind_lic_51" },
  { id: "mv_lic_67", codigo: "MV67", nombre: "Plataforma virtual de la bolsa de trabajo en portal web oficial (dominio propio) disponible para estudiantes y graduados.", indicadorId: "ind_lic_52" },
  { id: "mv_lic_68", codigo: "MV68", nombre: "Registro de actividades orientadas a la mejora de la inserción laboral tales como cursos, talleres, seminarios y programas.", indicadorId: "ind_lic_52" },
  { id: "mv_lic_69", codigo: "MV69", nombre: "Registro de convenios con instituciones públicas y/o privadas de prácticas pre profesionales y profesionales.", indicadorId: "ind_lic_53" },
  { id: "mv_lic_70", codigo: "MV70", nombre: "Documento o norma que acredite mecanismos de coordinación y alianzas estratégicas con el sector público y/o privado.", indicadorId: "ind_lic_54" },
  { id: "mv_lic_71", codigo: "MV71", nombre: "Portal web institucional (dominio propio) conteniendo misión/visión, admisiones, vacantes, tarifas, plana docente y malla curricular.", indicadorId: "ind_lic_55" }
];

const INITIAL_EVIDENCIAS = [];

const INITIAL_PLAN_INFO = {
  codigo: "PE-ING-SIS-2026",
  nombre: "Plan de Estudios 2026",
  programaId: "prog_ing_sistemas",
  perfilEgreso: "El graduado de Ingeniería de Sistemas de nuestra institución es un líder tecnológico ético e innovador, capaz de modelar, diseñar y auditar arquitecturas complejas de software, integrar servicios cloud empresariales y estructurar proyectos de Business Intelligence y Data Science para resolver problemas estratégicos globales.",
  documentoWordUrl: "https://institucion-my.sharepoint.com/:w:/g/personal/plan_estudios_sistemas_docx",
  documentoWordId: "OD_WORD_PLAN2026",
  ultimaActualizacion: "2026-06-15T21:00:00Z"
};

const INITIAL_USERS = [
  {
    email: "licencia_institucional@upt.pe",
    password: "J04qu1n.23",
    nombre: "Administrador Calidad",
    rol: "Administrador",
    subtipo: "N/A",
    areas: ["Licenciamiento"],
    status: "active",
    solicitudes: []
  },
  {
    email: "colaborador@institucion.edu.pe",
    password: "colaborador123",
    nombre: "Colaborador Calidad",
    rol: "Usuario",
    subtipo: "N/A",
    areas: ["Licenciamiento"],
    status: "active",
    solicitudes: []
  },
  {
    email: "autoridad@institucion.edu.pe",
    password: "autoridad123",
    nombre: "Dr. Fernando Ruiz",
    rol: "Usuario",
    subtipo: "N/A",
    areas: ["Licenciamiento"],
    status: "active",
    solicitudes: []
  },
  {
    email: "profesional@institucion.edu.pe",
    password: "profesional123",
    nombre: "Ing. Juan Pérez",
    rol: "Usuario",
    subtipo: "N/A",
    areas: ["Licenciamiento"],
    status: "active",
    solicitudes: []
  }
];

// Clase que maneja el almacenamiento y lógica de base de datos
class DatabaseService {
  constructor() {
    this.isFirebaseConnected = false; // Indicador de conexión real a Firebase
    this.isInitializing = true;
    this.initLocalStorage();
    this.isInitializing = false;
    
    // Sincronizar la base de datos local desde el servidor al iniciar
    this.syncPromise = this.loadFromServer();
    
     // Interceptar llamadas a Storage.prototype.setItem para guardar cambios en el servidor automáticamente (compatible con Chrome)
     const self = this;
     const originalSetItem = Storage.prototype.setItem;
     this.saveDebounceTimer = null;
     localStorage.setItem("sigeca_last_local_write", "0");
     
     Storage.prototype.setItem = function(key, value) {
       originalSetItem.apply(this, arguments);
       const keysToSync = [
         "sigeca_programas",
         "sigeca_ciclos",
         "sigeca_indicadores",
         "sigeca_medios_verificacion",
         "sigeca_evidencias",
         "sigeca_plan_info",
         "sigeca_usuarios",
         "sigeca_condiciones",
         "sigeca_estadisticas_institucionales",
         "sigeca_transparencia",
         "sigeca_transparencia_cbc",
          "sigeca_tablero_indicadores",
          "sigeca_semestre_links"
       ];
       if (!self.isInitializing && keysToSync.includes(key)) {
         originalSetItem.call(localStorage, "sigeca_last_local_write", Date.now().toString());
         if (self.saveDebounceTimer) {
           clearTimeout(self.saveDebounceTimer);
         }
         self.saveDebounceTimer = setTimeout(() => {
           self.saveToServer().catch(err => console.error("Error sincronizando setItem al servidor:", err));
         }, 100); // Agrupar escrituras en 100ms para guardado casi instantáneo
       }
     };
    
    // Iniciar sondeo de base de datos en segundo plano para sincronización multi-navegador en tiempo real
    this.startAutoSyncPolling();
  }

  // Inicializa la base de datos mock local si no existe
  initLocalStorage() {
    let existingCiclos = localStorage.getItem("sigeca_ciclos");
    let needsReset = false;
    if (!existingCiclos || existingCiclos === "null" || existingCiclos === "undefined") {
      needsReset = true;
    } else {
      try {
        if (JSON.parse(existingCiclos).length < 13) {
          needsReset = true;
        }
      } catch (e) {
        needsReset = true;
      }
    }

    const storedProgs = localStorage.getItem("sigeca_programas");
    let needsProgsReset = false;
    if (!storedProgs || storedProgs === "null" || storedProgs === "undefined") {
      needsProgsReset = true;
    } else {
      try {
        const parsed = JSON.parse(storedProgs);
        if (parsed.length < 10) {
          needsProgsReset = true;
        } else if (parsed.length > 0 && !parsed[0].hasOwnProperty("distCuentaResolucion")) {
          needsProgsReset = true;
        }
      } catch (e) {
        needsProgsReset = true;
      }
    }

    if (needsProgsReset) {
      localStorage.setItem("sigeca_programas", JSON.stringify(INITIAL_PROGRAMAS));
    } else {
      // Auto-reparar el nombre de P34 si se guardó con Estructuras por error
      try {
        const progs = JSON.parse(storedProgs);
        let changed = false;
        const index = progs.findIndex(p => p.codigo === "P34" && p.nombre.includes("Estructuras"));
        if (index !== -1) {
          progs[index].nombre = "Maestría en Ingeniería Civil con Mención en Transportes";
          changed = true;
        }
        if (changed) {
          localStorage.setItem("sigeca_programas", JSON.stringify(progs));
        }
      } catch (e) {
        console.error("Error al auto-reparar programas", e);
      }
    }
    
    if (needsReset) {
      localStorage.setItem("sigeca_ciclos", JSON.stringify(INITIAL_CICLOS));
      localStorage.setItem("sigeca_cursos", JSON.stringify(INITIAL_CURSOS));
    } else {
      const rawCiclos = localStorage.getItem("sigeca_ciclos");
      if (!rawCiclos || rawCiclos === "null" || rawCiclos === "undefined") {
        localStorage.setItem("sigeca_ciclos", JSON.stringify(INITIAL_CICLOS));
      }
      const rawCursos = localStorage.getItem("sigeca_cursos");
      if (!rawCursos || rawCursos === "null" || rawCursos === "undefined") {
        localStorage.setItem("sigeca_cursos", JSON.stringify(INITIAL_CURSOS));
      } else {
        // Ejecutar migración para asegurar que todos los cursos tengan modalidad
        try {
          const stored = localStorage.getItem("sigeca_cursos");
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed)) {
            let updated = false;
            parsed.forEach(c => {
              if (c && !c.modalidad) {
                c.modalidad = ((c.horasTV || 0) + (c.horasPV || 0) > 0) ? "Virtual" : "Presencial";
                updated = true;
              }
            });
            if (updated) {
              localStorage.setItem("sigeca_cursos", JSON.stringify(parsed));
            }
          } else {
            localStorage.setItem("sigeca_cursos", JSON.stringify([]));
          }
        } catch (e) {
          console.error("Error migrando cursos en localStorage", e);
          localStorage.setItem("sigeca_cursos", JSON.stringify([]));
        }
      }
    }
    
    const storedInds = localStorage.getItem("sigeca_indicadores");
    let needsLicReset = false;
    if (!storedInds || storedInds === "null" || storedInds === "undefined") {
      needsLicReset = true;
    } else {
      try {
        const parsedInds = JSON.parse(storedInds);
        if (parsedInds && Array.isArray(parsedInds)) {
          const hasNewLic = parsedInds.some(i => i && i.id === "ind_lic_55");
          if (!hasNewLic) {
            needsLicReset = true;
          }
        } else {
          needsLicReset = true;
        }
      } catch (e) {
        needsLicReset = true;
      }
    }

    if (needsLicReset) {
      localStorage.setItem("sigeca_indicadores", JSON.stringify(INITIAL_INDICADORES));
      localStorage.setItem("sigeca_medios_verificacion", JSON.stringify(INITIAL_MEDIOS_VERIFICACION));
      localStorage.setItem("sigeca_evidencias", JSON.stringify(INITIAL_EVIDENCIAS));
    } else {
      const rawInds = localStorage.getItem("sigeca_indicadores");
      if (!rawInds || rawInds === "null" || rawInds === "undefined") {
        localStorage.setItem("sigeca_indicadores", JSON.stringify(INITIAL_INDICADORES));
      }
      const rawMedios = localStorage.getItem("sigeca_medios_verificacion");
      if (!rawMedios || rawMedios === "null" || rawMedios === "undefined") {
        localStorage.setItem("sigeca_medios_verificacion", JSON.stringify(INITIAL_MEDIOS_VERIFICACION));
      }
      const rawEvidencias = localStorage.getItem("sigeca_evidencias");
      if (!rawEvidencias || rawEvidencias === "null" || rawEvidencias === "undefined") {
        localStorage.setItem("sigeca_evidencias", JSON.stringify(INITIAL_EVIDENCIAS));
      }
    }
    const rawPlanInfo = localStorage.getItem("sigeca_plan_info");
    if (!rawPlanInfo || rawPlanInfo === "null" || rawPlanInfo === "undefined") {
      localStorage.setItem("sigeca_plan_info", JSON.stringify(INITIAL_PLAN_INFO));
    }

    // Auto-reparar evidencias existentes para asegurar que tengan medioId y semestre
    try {
      const storedEvidencias = localStorage.getItem("sigeca_evidencias");
      if (storedEvidencias) {
        const evidencias = JSON.parse(storedEvidencias);
        let updated = false;
        evidencias.forEach(e => {
          if (!e.semestre) {
            e.semestre = "2025-I";
            updated = true;
          }
          if (!e.medioId) {
            if (e.indicadorId === "ind_lic_1") {
              e.medioId = e.nombre && e.nombre.includes("Resolución") ? "mv_1_3" : "mv_1_1";
              updated = true;
            } else if (e.indicadorId === "ind_lic_2") {
              e.medioId = "mv_2_1";
              updated = true;
            } else if (e.indicadorId === "ind_lic_3") {
              e.medioId = "mv_3_1";
              updated = true;
            }
          }
        });
        if (updated) {
          localStorage.setItem("sigeca_evidencias", JSON.stringify(evidencias));
        }
      }
    } catch (e) {
      console.error("Error al auto-reparar evidencias", e);
    }

    const storedUsers = localStorage.getItem("sigeca_usuarios");
    let needsUsersReset = !storedUsers;
    if (storedUsers) {
      try {
        const parsed = JSON.parse(storedUsers);
        const hasNewAdmin = parsed.some(u => u.email === "licencia_institucional@upt.pe");
        if (!hasNewAdmin) {
          needsUsersReset = true;
        }
      } catch (e) {
        needsUsersReset = true;
      }
    }
    if (needsUsersReset) {
      localStorage.setItem("sigeca_usuarios", JSON.stringify(INITIAL_USERS));
    }
  }

  // Helper de Firebase Config Simulation
  // En producción, aquí se importarían los módulos oficiales de Firebase.
  getFirebaseConfig() {
    return {
      apiKey: "AIzaSyFakeKey_SIGECA_1234567890",
      authDomain: "sigeca-calidad-academica.firebaseapp.com",
      projectId: "sigeca-calidad-academica",
      storageBucket: "sigeca-calidad-academica.appspot.com",
      messagingSenderId: "9988776655",
      appId: "1:9988776655:web:abcdef123456"
    };
  }

  // --- MÉTODOS DE CONSULTA Y EDICIÓN ---

  // PROGRAMAS
  async getProgramas() {
    return JSON.parse(localStorage.getItem("sigeca_programas")) || [];
  }

  async savePrograma(programa) {
    const todos = JSON.parse(localStorage.getItem("sigeca_programas")) || [];
    if (programa.id) {
      const index = todos.findIndex(p => p.id === programa.id);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...programa };
      }
    } else {
      programa.id = "prog_" + (programa.codigo ? programa.codigo.toLowerCase().replace(/\./g, "_") : Date.now());
      todos.push(programa);
    }
    localStorage.setItem("sigeca_programas", JSON.stringify(todos));
    return programa;
  }

  async deletePrograma(id) {
    const todos = JSON.parse(localStorage.getItem("sigeca_programas"));
    const filtrados = todos.filter(p => p.id !== id);
    localStorage.setItem("sigeca_programas", JSON.stringify(filtrados));
    return true;
  }

  // TABLERO DE INDICADORES
  async getTableroIndicadores() {
    return JSON.parse(localStorage.getItem("sigeca_tablero_indicadores") || "[]");
  }

  async saveTableroIndicador(ind) {
    const todos = JSON.parse(localStorage.getItem("sigeca_tablero_indicadores") || "[]");
    const index = todos.findIndex(i => i.id === ind.id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...ind };
    } else {
      todos.push(ind);
    }
    localStorage.setItem("sigeca_tablero_indicadores", JSON.stringify(todos));
    return ind;
  }

  // CICLOS
  async getCiclos() {
    return JSON.parse(localStorage.getItem("sigeca_ciclos")) || [];
  }

  // CURSOS (MALLA CURRICULAR)
  async getCursos(programaId = "prog_ing_sistemas") {
    const todos = JSON.parse(localStorage.getItem("sigeca_cursos")) || [];
    return todos.filter(c => c && c.programaId === programaId);
  }

  async saveCurso(curso) {
    const todos = JSON.parse(localStorage.getItem("sigeca_cursos"));
    if (!curso.modalidad) {
      curso.modalidad = ((curso.horasTV || 0) + (curso.horasPV || 0) > 0) ? "Virtual" : "Presencial";
    }
    if (curso.id) {
      // Editar existente
      const index = todos.findIndex(c => c.id === curso.id);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...curso };
      }
    } else {
      // Crear nuevo
      curso.id = "curso_" + Date.now();
      curso.programaId = curso.programaId || "prog_ing_sistemas";
      todos.push(curso);
    }
    localStorage.setItem("sigeca_cursos", JSON.stringify(todos));
    return curso;
  }

  async deleteCurso(cursoId) {
    const todos = JSON.parse(localStorage.getItem("sigeca_cursos"));
    const filtrados = todos.filter(c => c.id !== cursoId);
    localStorage.setItem("sigeca_cursos", JSON.stringify(filtrados));
    return true;
  }

  // INDICADORES (CBC, Acreditación, ISO)
  async getIndicadores() {
    return JSON.parse(localStorage.getItem("sigeca_indicadores")) || [];
  }

  async updateIndicador(id, fields) {
    const todos = JSON.parse(localStorage.getItem("sigeca_indicadores"));
    const index = todos.findIndex(i => i.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...fields };
      localStorage.setItem("sigeca_indicadores", JSON.stringify(todos));
      return todos[index];
    }
    throw new Error("Indicador no encontrado");
  }

  // MEDIOS DE VERIFICACIÓN (CBC)
  async getMediosVerificacion() {
    return JSON.parse(localStorage.getItem("sigeca_medios_verificacion")) || [];
  }

  async saveMedioVerificacion(medio) {
    const todos = await this.getMediosVerificacion();
    const index = todos.findIndex(m => m.id === medio.id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...medio };
    } else {
      todos.push(medio);
    }
    localStorage.setItem("sigeca_medios_verificacion", JSON.stringify(todos));
    return medio;
  }

  // EVIDENCIAS
  async getEvidencias() {
    return JSON.parse(localStorage.getItem("sigeca_evidencias")) || [];
  }

  async getEvidenciasPorIndicador(indicadorId) {
    const todas = await this.getEvidencias();
    return todas.filter(e => e.indicadorId === indicadorId);
  }

  async saveEvidencia(evidencia) {
    const todas = JSON.parse(localStorage.getItem("sigeca_evidencias") || "[]");
    evidencia.id = "evi_" + Date.now();
    evidencia.fechaSubida = new Date().toISOString();
    todas.push(evidencia);
    localStorage.setItem("sigeca_evidencias", JSON.stringify(todas));
    
    // Al agregar una evidencia, actualizamos automáticamente el indicador relacionado
    await this.recalcularEstadoIndicador(evidencia.indicadorId);
    
    return evidencia;
  }

  async getSemestreLinks() {
    const raw = localStorage.getItem("sigeca_semestre_links");
    return raw ? JSON.parse(raw) : {};
  }

  async saveSemestreLink(semestre, type, url) {
    const links = await this.getSemestreLinks();
    if (!links[semestre]) {
      links[semestre] = {};
    }
    links[semestre][type] = url;
    localStorage.setItem("sigeca_semestre_links", JSON.stringify(links));
    return links;
  }

  async recalcularEstadoIndicador(indicadorId) {
    let nuevoAvance = 0;
    let nuevoEstado = "nocumple";

    if (indicadorId.startsWith("ind_lic_")) {
      // Licenciamiento: calcular en base a Medios de Verificación (MVs) cumplidos
      const todosMvs = await this.getMediosVerificacion();
      const mvsFiltrados = todosMvs.filter(m => m.indicadorId === indicadorId);
      
      if (mvsFiltrados.length > 0) {
        const todasEvidencias = await this.getEvidencias();
        let mvsCumplidos = 0;
        
        mvsFiltrados.forEach(mv => {
          // Si hay al menos una evidencia con ese medioId, este MV cumple
          const tieneEvidencia = todasEvidencias.some(e => e.medioId === mv.id);
          if (tieneEvidencia) {
            mvsCumplidos++;
          }
        });
        
        nuevoAvance = Math.round((mvsCumplidos / mvsFiltrados.length) * 100);
      }
    } else {
      // Acreditación o ISO: mantener lógica preexistente por cantidad de evidencias
      const evidencias = await this.getEvidenciasPorIndicador(indicadorId);
      if (evidencias.length === 1) {
        nuevoAvance = 60;
      } else if (evidencias.length >= 2) {
        nuevoAvance = 100;
      }
    }

    if (nuevoAvance === 100) {
      nuevoEstado = "cumple";
    } else if (nuevoAvance > 0) {
      nuevoEstado = "en_proceso";
    } else {
      nuevoEstado = "nocumple";
    }

    await this.updateIndicador(indicadorId, {
      porcentajeAvance: nuevoAvance,
      estado: nuevoEstado
    });
  }

  async deleteEvidencia(evidenciaId) {
    const todas = JSON.parse(localStorage.getItem("sigeca_evidencias") || "[]");
    const evidencia = todas.find(e => e.id === evidenciaId);
    const filtradas = todas.filter(e => e.id !== evidenciaId);
    localStorage.setItem("sigeca_evidencias", JSON.stringify(filtradas));
    
    if (evidencia) {
      await this.recalcularEstadoIndicador(evidencia.indicadorId);
    }
    return true;
  }

  async getPlanInfo() {
    return JSON.parse(localStorage.getItem("sigeca_plan_info"));
  }

  async savePlanInfo(info) {
    const actual = JSON.parse(localStorage.getItem("sigeca_plan_info"));
    const nuevo = { ...actual, ...info, ultimaActualizacion: new Date().toISOString() };
    localStorage.setItem("sigeca_plan_info", JSON.stringify(nuevo));
    return nuevo;
  }

  // CONFIGURACIÓN DE CRÉDITOS
  async getCreditSettings() {
    const defaultSettings = { valorTeoricas: 16, valorPracticas: 32, modalidadCarrera: "Presencial" };
    const saved = localStorage.getItem("sigeca_credit_settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  }

  async saveCreditSettings(settings) {
    localStorage.setItem("sigeca_credit_settings", JSON.stringify(settings));
    return settings;
  }

  // TRANSPARENCIA
  async getTransparencia() {
    const saved = localStorage.getItem("sigeca_transparencia");
    return saved ? JSON.parse(saved) : { corte: [], historial: [], informacion: [] };
  }

  // TRANSPARENCIA CBC VIII
  async getTransparenciaCbc() {
    const saved = localStorage.getItem("sigeca_transparencia_cbc");
    return saved ? JSON.parse(saved) : { corte: [], historial: [] };
  }

  // --- MÉTODOS DE USUARIOS ---
  async getUsers() {
    const raw = JSON.parse(localStorage.getItem("sigeca_usuarios")) || [];
    let updated = false;
    const migrated = raw.map(u => {
      if (u.rol !== "Administrador" && u.rol !== "Usuario") {
        u.rol = "Usuario";
        u.subtipo = "N/A";
        updated = true;
      }
      return u;
    });
    if (updated) {
      localStorage.setItem("sigeca_usuarios", JSON.stringify(migrated));
    }
    return migrated;
  }

  async saveUsers(users) {
    localStorage.setItem("sigeca_usuarios", JSON.stringify(users));
    await this.saveToServer();
  }

  async authenticateUser(email, password) {
    const users = await this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error("Usuario no registrado");
    }
    if (user.password !== password) {
      throw new Error("Contraseña incorrecta");
    }
    if (user.status === "pending") {
      throw new Error("Su cuenta está pendiente de habilitación por el Administrador.");
    }
    if (user.status === "inactive") {
      throw new Error("Su cuenta ha sido inhabilitada. Contacte al Administrador.");
    }
    // Retorna un objeto de sesión
    return {
      email: user.email,
      rol: user.rol,
      subtipo: user.subtipo,
      nombre: user.nombre,
      areas: user.areas,
      solicitudes: user.solicitudes || [],
      token: "mock-jwt-token-" + Date.now()
    };
  }

  async registerUser(userData) {
    const users = await this.getUsers();
    const exists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      throw new Error("El correo institucional ya está registrado");
    }
    
    // Todo nuevo usuario registrado nace con rol 'Usuario' y status 'pending' (requiere aprobación del Admin)
    const newUser = {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombre,
      rol: userData.rol || "Usuario",
      subtipo: "N/A",
      areas: ["Licenciamiento"],
      status: "pending",
      solicitudes: []
    };
    
    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  async updateUserStatus(email, status) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      users[index].status = status;
      await this.saveUsers(users);
      return users[index];
    }
    throw new Error("Usuario no encontrado");
  }

  async deleteUser(email) {
    const users = await this.getUsers();
    const filtered = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    await this.saveUsers(filtered);
    return true;
  }

  async updateUserAreas(email, areas) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      users[index].areas = areas;
      await this.saveUsers(users);
      
      // Si el usuario editado es el actual logueado, actualizar su sesión
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        currentUser.areas = areas;
        localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));
      }
      
      return users[index];
    }
    throw new Error("Usuario no encontrado");
  }

  async updateUserProfile(email, profileData) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      if (profileData.nombre) users[index].nombre = profileData.nombre;
      if (profileData.password) users[index].password = profileData.password;
      if (profileData.areas) users[index].areas = profileData.areas;
      await this.saveUsers(users);
      
      // Actualizar sesión si es el usuario logueado
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        if (profileData.nombre) currentUser.nombre = profileData.nombre;
        if (profileData.areas) currentUser.areas = profileData.areas;
        localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));
      }
      
      return users[index];
    }
    throw new Error("Usuario no encontrado");
  }

  async requestAreaAccess(email, area) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      const user = users[index];
      if (user.areas.includes(area)) {
        throw new Error("Ya tiene acceso a esta área");
      }
      user.solicitudes = user.solicitudes || [];
      if (user.solicitudes.includes(area)) {
        throw new Error("Ya existe una solicitud pendiente para esta área");
      }
      user.solicitudes.push(area);
      await this.saveUsers(users);
      
      // Actualizar sesión si es el usuario logueado
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        currentUser.solicitudes = user.solicitudes;
        localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));
      }
      return user;
    }
    throw new Error("Usuario no encontrado");
  }

  async approveAreaAccess(email, area) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      const user = users[index];
      user.solicitudes = (user.solicitudes || []).filter(a => a !== area);
      if (!user.areas.includes(area)) {
        user.areas.push(area);
      }
      await this.saveUsers(users);
      
      // Actualizar sesión si es el usuario logueado
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        currentUser.areas = user.areas;
        currentUser.solicitudes = user.solicitudes;
        localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));
      }
      return user;
    }
    throw new Error("Usuario no encontrado");
  }

  async rejectAreaAccess(email, area) {
    const users = await this.getUsers();
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      const user = users[index];
      user.solicitudes = (user.solicitudes || []).filter(a => a !== area);
      await this.saveUsers(users);
      
      // Actualizar sesión si es el usuario logueado
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user"));
      if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
        currentUser.solicitudes = user.solicitudes;
        localStorage.setItem("sigeca_current_user", JSON.stringify(currentUser));
      }
      return user;
    }
    throw new Error("Usuario no encontrado");
  }

  async getEstadisticasInstitucionales() {
    const raw = localStorage.getItem("sigeca_estadisticas_institucionales");
    if (!raw || raw === "null" || raw === "undefined") {
      return {
        alumnos_regulares: [],
        docentes: [],
        docentes_renacyt: [],
        postulantes: [],
        ingresantes: [],
        egresados: [],
        servicios_complementarios: []
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing sigeca_estadisticas_institucionales", e);
      return {
        alumnos_regulares: [],
        docentes: [],
        docentes_renacyt: [],
        postulantes: [],
        ingresantes: [],
        egresados: [],
        servicios_complementarios: []
      };
    }
  }

  async saveEstadisticasInstitucionales(data) {
    localStorage.setItem("sigeca_estadisticas_institucionales", JSON.stringify(data));
  }

  async getTransparencia() {
    const raw = localStorage.getItem("sigeca_transparencia");
    if (!raw || raw === "null" || raw === "undefined") {
      return {
        corte: [],
        historial: [],
        informacion: []
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing sigeca_transparencia", e);
      return {
        corte: [],
        historial: [],
        informacion: []
      };
    }
  }

  async saveTransparencia(data) {
    localStorage.setItem("sigeca_transparencia", JSON.stringify(data));
  }

  async getTransparenciaCbc() {
    const raw = localStorage.getItem("sigeca_transparencia_cbc");
    if (!raw || raw === "null" || raw === "undefined") {
      return {
        corte: [],
        historial: []
      };
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing sigeca_transparencia_cbc", e);
      return {
        corte: [],
        historial: []
      };
    }
  }

  async saveTransparenciaCbc(data) {
    localStorage.setItem("sigeca_transparencia_cbc", JSON.stringify(data));
  }

  // Cargar base de datos desde el archivo central en el servidor
  async loadFromServer() {
    try {
      const response = await fetch('/api/db?t=' + Date.now());
      if (!response.ok) return;
      const data = await response.json();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        // Desactivar el interceptor para evitar bucles durante la carga
        this.isInitializing = true;
        
        const keysMap = {
          programas: "sigeca_programas",
          ciclos: "sigeca_ciclos",
          cursos: "sigeca_cursos",
          indicadores: "sigeca_indicadores",
          medios_verificacion: "sigeca_medios_verificacion",
          evidencias: "sigeca_evidencias",
          plan_info: "sigeca_plan_info",
          credit_settings: "sigeca_credit_settings",
          usuarios: "sigeca_usuarios",
          condiciones: "sigeca_condiciones",
          estadisticas_institucionales: "sigeca_estadisticas_institucionales",
          transparencia: "sigeca_transparencia",
          transparencia_cbc: "sigeca_transparencia_cbc",
          tablero_indicadores: "sigeca_tablero_indicadores",
          semestre_links: "sigeca_semestre_links"
        };
        
        for (const [serverKey, localKey] of Object.entries(keysMap)) {
          if (data[serverKey] !== undefined) {
            const serverVal = data[serverKey];
            const localValStr = localStorage.getItem(localKey);
            // Evitar que datos vacíos del servidor sobrescriban datos locales poblados
            if (Array.isArray(serverVal) && serverVal.length === 0) {
              if (localValStr && localValStr !== "[]" && localValStr !== "null" && localValStr !== "undefined") {
                console.warn(`SIGECA: Ignorando sobrescritura de ${localKey} con datos vacíos del servidor para proteger datos locales.`);
                continue;
              }
            }
            localStorage.setItem(localKey, JSON.stringify(serverVal));
          }
        }
        
        this.isInitializing = false;
        console.log("SIGECA: Base de datos sincronizada desde el servidor con éxito.");
      }
    } catch (e) {
      this.isInitializing = false;
      console.warn("SIGECA: No se pudo sincronizar desde el servidor (trabajando en modo local/desconectado):", e);
    }
  }

  // Guardar la base de datos completa en el archivo central del servidor
  async saveToServer() {
    try {
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user")) || {};
      const userEmail = currentUser.email || "Anonimo";
      const userRole = currentUser.rol || "Invitado";

      const payload = {
        programas: JSON.parse(localStorage.getItem("sigeca_programas") || "[]"),
        ciclos: JSON.parse(localStorage.getItem("sigeca_ciclos") || "[]"),
        cursos: JSON.parse(localStorage.getItem("sigeca_cursos") || "[]"),
        indicadores: JSON.parse(localStorage.getItem("sigeca_indicadores") || "[]"),
        medios_verificacion: JSON.parse(localStorage.getItem("sigeca_medios_verificacion") || "[]"),
        evidencias: JSON.parse(localStorage.getItem("sigeca_evidencias") || "[]"),
        plan_info: JSON.parse(localStorage.getItem("sigeca_plan_info") || "null"),
        credit_settings: JSON.parse(localStorage.getItem("sigeca_credit_settings") || "null"),
        usuarios: JSON.parse(localStorage.getItem("sigeca_usuarios") || "[]"),
        condiciones: JSON.parse(localStorage.getItem("sigeca_condiciones") || "null"),
        estadisticas_institucionales: JSON.parse(localStorage.getItem("sigeca_estadisticas_institucionales") || "null"),
        transparencia: JSON.parse(localStorage.getItem("sigeca_transparencia") || "null"),
        transparencia_cbc: JSON.parse(localStorage.getItem("sigeca_transparencia_cbc") || "null"),
        tablero_indicadores: JSON.parse(localStorage.getItem("sigeca_tablero_indicadores") || "[]"),
        semestre_links: JSON.parse(localStorage.getItem("sigeca_semestre_links") || "{}")
      };
      
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-User-Email': userEmail,
          'X-User-Role': userRole
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log("SIGECA: Cambios persistidos en el servidor correctamente.");
      } else {
        console.error("SIGECA: El servidor rechazó el guardado.");
      }
    } catch (e) {
      console.error("SIGECA: Error al persistir cambios en el servidor:", e);
    }
  }

  // Polling para sincronización multi-navegador en tiempo real (cada 3 segundos)
  startAutoSyncPolling() {
    setInterval(async () => {
      if (this.isInitializing) return;
      // Evitar que el sondeo sobrescriba cambios locales recién hechos antes de que se guarden (comparte estado entre pestañas)
      const lastWrite = parseInt(localStorage.getItem("sigeca_last_local_write") || "0");
      if (lastWrite && (Date.now() - lastWrite < 5000)) {
        return;
      }
      try {
        const response = await fetch("/api/db?t=" + Date.now());
        if (response.status === 200) {
          const serverData = await response.json();
          if (serverData && typeof serverData === "object" && Object.keys(serverData).length > 0) {
            let hasChanges = false;
            
            const keysToCompare = [
              { localKey: "sigeca_evidencias", dbKey: "evidencias" },
              { localKey: "sigeca_programas", dbKey: "programas" },
              { localKey: "sigeca_ciclos", dbKey: "ciclos" },
              { localKey: "sigeca_indicadores", dbKey: "indicadores" },
              { localKey: "sigeca_medios_verificacion", dbKey: "medios_verificacion" },
              { localKey: "sigeca_plan_info", dbKey: "plan_info" },
              { localKey: "sigeca_usuarios", dbKey: "usuarios" },
              { localKey: "sigeca_condiciones", dbKey: "condiciones" },
              { localKey: "sigeca_estadisticas_institucionales", dbKey: "estadisticas_institucionales" },
              { localKey: "sigeca_transparencia", dbKey: "transparencia" },
              { localKey: "sigeca_transparencia_cbc", dbKey: "transparencia_cbc" },
              { localKey: "sigeca_tablero_indicadores", dbKey: "tablero_indicadores" },
              { localKey: "sigeca_semestre_links", dbKey: "semestre_links" }
            ];
            
            this.isInitializing = true; // Desactivar interceptor local
            for (const item of keysToCompare) {
              const localValStr = localStorage.getItem(item.localKey);
              const serverVal = serverData[item.dbKey];
              
              // Evitar que datos vacíos del servidor sobrescriban datos locales poblados
              if (Array.isArray(serverVal) && serverVal.length === 0) {
                if (localValStr && localValStr !== "[]" && localValStr !== "null" && localValStr !== "undefined") {
                  console.warn(`[DB SYNC] Ignorando sincronización vacía del servidor para ${item.localKey} para proteger datos locales.`);
                  continue;
                }
              }
              
              const serverValStr = serverVal !== undefined ? JSON.stringify(serverVal) : null;
              
              if (localValStr !== serverValStr) {
                if (serverValStr === null) {
                  localStorage.removeItem(item.localKey);
                } else {
                  localStorage.setItem(item.localKey, serverValStr);
                }
                hasChanges = true;
              }
            }
            this.isInitializing = false;
            
            if (hasChanges) {
              console.log("[DB SYNC] Cambios remotos detectados. Disparando evento de actualización...");
              window.dispatchEvent(new CustomEvent("sigeca_db_updated"));
            }
          }
        }
      } catch (err) {
        console.error("SIGECA: Error in startAutoSyncPolling:", err);
        this.isInitializing = false;
      }
    }, (window.location && window.location.search && window.location.search.includes("run_tests=true")) ? 1000 : 3000);
  }
}

export const db = new DatabaseService();
export default db;
