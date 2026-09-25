/* ==========================================================================
   SIGECA - ANALIZADOR ESTADÍSTICO DE ENCUESTAS (Herramientas GECA)
   ========================================================================== */

// Datos de Ejemplo para demostración inmediata (simula respuestas de Google Forms)
const MOCK_ENCUESTA_DATA = [
  { "ID": 1, "Edad": 20, "Género": "Femenino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 12, "Calificación Promedio": 14.5, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 2, "Edad": 22, "Género": "Masculino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 20, "Calificación Promedio": 16.8, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 3, "Edad": 19, "Género": "Femenino", "Ciclo": 1, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 8, "Calificación Promedio": 11.2, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 4, "Edad": 21, "Género": "Masculino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 2, "Horas de Estudio Semanales": 6, "Calificación Promedio": 10.5, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 2 },
  { "ID": 5, "Edad": 23, "Género": "Femenino", "Ciclo": 7, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 25, "Calificación Promedio": 18.2, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 6, "Edad": 20, "Género": "Masculino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 15, "Calificación Promedio": 15.0, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 7, "Edad": 24, "Género": "Femenino", "Ciclo": 9, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 18, "Calificación Promedio": 15.4, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 8, "Edad": 21, "Género": "Femenino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 10, "Calificación Promedio": 13.0, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 9, "Edad": 22, "Género": "Masculino", "Ciclo": 6, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 22, "Calificación Promedio": 17.5, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 10, "Edad": 20, "Género": "Femenino", "Ciclo": 2, "1. ¿Qué tan satisfecho está con los servicios académicos?": 2, "Horas de Estudio Semanales": 5, "Calificación Promedio": 9.8, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 2 },
  { "ID": 11, "Edad": 22, "Género": "Femenino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 14, "Calificación Promedio": 14.2, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 12, "Edad": 21, "Género": "Masculino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 16, "Calificación Promedio": 14.8, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 13, "Edad": 23, "Género": "Masculino", "Ciclo": 8, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 28, "Calificación Promedio": 18.9, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 14, "Edad": 19, "Género": "Femenino", "Ciclo": 1, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 7, "Calificación Promedio": 12.0, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 15, "Edad": 20, "Género": "Femenino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 11, "Calificación Promedio": 13.8, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 16, "Edad": 25, "Género": "Masculino", "Ciclo": 10, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 26, "Calificación Promedio": 17.8, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 17, "Edad": 21, "Género": "Femenino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 9, "Calificación Promedio": 12.5, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 18, "Edad": 22, "Género": "Masculino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 15, "Calificación Promedio": 14.6, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 19, "Edad": 20, "Género": "Femenino", "Ciclo": 2, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 13, "Calificación Promedio": 14.0, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 20, "Edad": 23, "Género": "Masculino", "Ciclo": 7, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 17, "Calificación Promedio": 15.2, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 21, "Edad": 22, "Género": "Femenino", "Ciclo": 6, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 12, "Calificación Promedio": 13.4, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 22, "Edad": 21, "Género": "Masculino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 21, "Calificación Promedio": 16.5, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 23, "Edad": 19, "Género": "Femenino", "Ciclo": 2, "1. ¿Qué tan satisfecho está con los servicios académicos?": 2, "Horas de Estudio Semanales": 4, "Calificación Promedio": 9.5, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 2 },
  { "ID": 24, "Edad": 20, "Género": "Masculino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 14, "Calificación Promedio": 14.1, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 25, "Edad": 24, "Género": "Femenino", "Ciclo": 8, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 24, "Calificación Promedio": 17.6, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 26, "Edad": 22, "Género": "Femenino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 16, "Calificación Promedio": 15.1, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 27, "Edad": 21, "Género": "Masculino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 10, "Calificación Promedio": 13.2, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 28, "Edad": 23, "Género": "Femenino", "Ciclo": 7, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 19, "Calificación Promedio": 15.9, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 29, "Edad": 20, "Género": "Masculino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 23, "Calificación Promedio": 17.0, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 30, "Edad": 22, "Género": "Femenino", "Ciclo": 6, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 15, "Calificación Promedio": 14.9, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 31, "Edad": 21, "Género": "Masculino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 8, "Calificación Promedio": 11.8, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 2 },
  { "ID": 32, "Edad": 24, "Género": "Femenino", "Ciclo": 9, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 27, "Calificación Promedio": 18.5, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 33, "Edad": 20, "Género": "Masculino", "Ciclo": 2, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 9, "Calificación Promedio": 12.4, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 34, "Edad": 22, "Género": "Femenino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 13, "Calificación Promedio": 13.9, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 35, "Edad": 23, "Género": "Masculino", "Ciclo": 7, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 18, "Calificación Promedio": 15.6, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 36, "Edad": 19, "Género": "Femenino", "Ciclo": 1, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 11, "Calificación Promedio": 13.5, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 37, "Edad": 21, "Género": "Masculino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 22, "Calificación Promedio": 17.2, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 38, "Edad": 20, "Género": "Femenino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 10, "Calificación Promedio": 12.8, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 39, "Edad": 25, "Género": "Femenino", "Ciclo": 10, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 25, "Calificación Promedio": 18.0, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 40, "Edad": 22, "Género": "Masculino", "Ciclo": 6, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 16, "Calificación Promedio": 14.7, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 41, "Edad": 21, "Género": "Femenino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 2, "Horas de Estudio Semanales": 6, "Calificación Promedio": 10.2, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 2 },
  { "ID": 42, "Edad": 23, "Género": "Masculino", "Ciclo": 8, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 23, "Calificación Promedio": 17.4, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 43, "Edad": 20, "Género": "Femenino", "Ciclo": 3, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 13, "Calificación Promedio": 14.1, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 44, "Edad": 19, "Género": "Masculino", "Ciclo": 1, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 8, "Calificación Promedio": 11.5, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 45, "Edad": 24, "Género": "Femenino", "Ciclo": 9, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 21, "Calificación Promedio": 16.2, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 46, "Edad": 22, "Género": "Masculino", "Ciclo": 5, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 14, "Calificación Promedio": 14.0, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 47, "Edad": 21, "Género": "Femenino", "Ciclo": 4, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 17, "Calificación Promedio": 15.3, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 },
  { "ID": 48, "Edad": 23, "Género": "Masculino", "Ciclo": 7, "1. ¿Qué tan satisfecho está con los servicios académicos?": 3, "Horas de Estudio Semanales": 11, "Calificación Promedio": 12.9, "Modalidad Preferida": "Virtual", "2. ¿Considera adecuados los materiales de estudio?": 3 },
  { "ID": 49, "Edad": 20, "Género": "Femenino", "Ciclo": 2, "1. ¿Qué tan satisfecho está con los servicios académicos?": 4, "Horas de Estudio Semanales": 15, "Calificación Promedio": 14.4, "Modalidad Preferida": "Semipresencial", "2. ¿Considera adecuados los materiales de estudio?": 4 },
  { "ID": 50, "Edad": 22, "Género": "Masculino", "Ciclo": 6, "1. ¿Qué tan satisfecho está con los servicios académicos?": 5, "Horas de Estudio Semanales": 20, "Calificación Promedio": 16.9, "Modalidad Preferida": "Presencial", "2. ¿Considera adecuados los materiales de estudio?": 5 }
];

export async function renderEncuestasPage(container, userRole = "admin") {
  // Variables de Estado de la Página
  let activeDataset = null; // Guardará el array de objetos procesado
  let columnTypes = {}; // Mapeo de columna a 'numerico' | 'categorico' | 'likert'
  let activeMode = "descriptiva"; // 'descriptiva' | 'inferencial'
  
  // Variables seleccionadas para análisis
  let selectedDescVar = "";
  let selectedDescVar2 = ""; // Para tablas cruzadas
  let selectedDescType = "resumen"; // 'resumen' | 'variabilidad' | 'frecuencias' | 'crosstab'
  
  let selectedInferentialType = "auto_correlacion"; // 'auto_correlacion' | 'auto_comparacion' | 'confiabilidad'
  let inferentialVarNum = "";
  let inferentialVarNum2 = ""; // Para correlacion (Y)
  let inferentialVarCat = "";  // Para comparación de grupos

  // Helper para truncar etiquetas en los selects
  const truncateLabel = (str, maxLen = 35) => {
    if (str.length <= maxLen) return str;
    return str.substring(0, maxLen) + "...";
  };

  // Dibujar UI base y estilos CSS específicos
  container.innerHTML = `
    <style>
      .encuestas-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        color: var(--text-100);
      }

      /* Panel de Carga */
      .upload-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        align-items: stretch;
      }

      .dropzone-card {
        background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%);
        border: 2px dashed rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        cursor: pointer;
        text-align: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .dropzone-card:hover {
        border-color: var(--color-cumple);
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.7) 100%);
      }

      .dataset-info-card {
        background: rgba(30, 41, 59, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        backdrop-filter: blur(8px);
      }

      /* Navegación y Variables */
      .analysis-layout {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 1.5rem;
        align-items: start;
      }

      .control-panel {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        backdrop-filter: blur(10px);
      }

      .mode-tabs {
        display: flex;
        background: rgba(0, 0, 0, 0.2);
        padding: 0.25rem;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .mode-tab {
        flex: 1;
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
        font-weight: 600;
        background: none;
        border: none;
        color: var(--text-300);
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s ease;
        text-align: center;
      }

      .mode-tab.active {
        background: var(--color-cumple);
        color: #fff;
        box-shadow: 0 4px 12px -3px rgba(16, 185, 129, 0.35);
      }

      /* Contenedor Resultados */
      .results-panel {
        background: rgba(15, 23, 42, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 1.5rem;
        min-height: 400px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        backdrop-filter: blur(10px);
      }

      /* Gráficos */
      .chart-container {
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .interpretation-box {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(30, 41, 59, 0.2) 100%);
        border-left: 4px solid var(--color-cumple);
        border-radius: 0 8px 8px 0;
        padding: 1.25rem;
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--text-200);
      }

      /* Estilos Tablas Estadísticas */
      .stats-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
        margin-top: 0.5rem;
      }

      .stats-table th, .stats-table td {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .stats-table th {
        background: rgba(255, 255, 255, 0.03);
        font-weight: 600;
        color: var(--text-200);
        text-align: left;
      }

      /* Tooltips SVG */
      .chart-tooltip {
        position: absolute;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 4px;
        padding: 0.4rem 0.6rem;
        font-size: 0.75rem;
        pointer-events: none;
        display: none;
        z-index: 100;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      }
    </style>

    <div class="encuestas-wrapper">
      
      <!-- Bloque 1: Carga de Datos -->
      <div class="upload-container">
        <div class="dropzone-card" id="excel-dropzone">
          <i data-lucide="file-spreadsheet" style="width: 44px; height: 44px; color: var(--color-cumple);"></i>
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700;">Subir Hoja de Cálculo Excel</h3>
            <p style="font-size: 0.8rem; color: var(--text-300); margin-top: 0.25rem;">
              Arrastra tu archivo .xlsx aquí o haz clic para buscar en tu computadora
            </p>
          </div>
          <input type="file" id="excel-file-input" accept=".xlsx" style="display: none;">
          <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-400);">O también puedes probar con:</span>
            <button type="button" class="btn btn-secondary" id="btn-load-mock-survey" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">
              <i data-lucide="play-circle" style="width: 14px; height: 14px; margin-right: 4px;"></i>
              Cargar Datos de Ejemplo
            </button>
          </div>
        </div>

        <div class="dataset-info-card" id="dataset-info-panel">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-200); display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="database" style="color: var(--text-300);"></i>
            <span>Estado del Set de Datos</span>
          </h3>
          <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--text-400); gap: 0.75rem;" id="dataset-status-content">
            <i data-lucide="help-circle" style="width: 32px; height: 32px; opacity: 0.5;"></i>
            <p style="font-size: 0.85rem; margin: 0;">No se han cargado datos. Sube un archivo Excel o carga el set de ejemplo para iniciar.</p>
            <div style="margin-top: 0.5rem; padding: 0.6rem; border-radius: 6px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.15); font-size: 0.75rem; color: #fca5a5; display: flex; align-items: start; gap: 0.5rem; text-align: left; line-height: 1.35;">
              <i data-lucide="shield-alert" style="width: 16px; height: 16px; flex-shrink: 0; color: #f87171; margin-top: 2px;"></i>
              <span><strong>Privacidad de Datos:</strong> Su información no se almacena en ningún servidor. Al cerrar la sesión o hacer clic en "Comenzar de nuevo", todos los datos y análisis se eliminarán permanentemente de la memoria del navegador.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bloque 2: Panel de Análisis e Interfaz Principal -->
      <div class="analysis-layout" id="analysis-main-panel" style="display: none;">
        
        <div class="control-panel">
          <div>
            <h4 class="cbc-filter-label" style="margin-bottom: 0.5rem;">Tipo de Estadística</h4>
            <div class="mode-tabs">
              <button class="mode-tab active" id="tab-mode-descriptiva">Descriptiva</button>
              <button class="mode-tab" id="tab-mode-inferencial">Inferencial</button>
            </div>
          </div>

          <!-- Controles Descriptivos -->
          <div id="panel-descriptiva-controls" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label for="desc-select-type">Tipo de Análisis Descriptivo</label>
              <select id="desc-select-type" class="input-control">
                <option value="resumen">Resumir datos (Media, Moda, Mediana)</option>
                <option value="variabilidad">Medir variabilidad (Desv. estándar, Varianza)</option>
                <option value="frecuencias">Frecuencias y distribución</option>
                <option value="crosstab">Tablas cruzadas de contingencia</option>
              </select>
            </div>

            <div class="form-group">
              <label for="desc-select-var">Pregunta / Variable (X)</label>
              <select id="desc-select-var" class="input-control"></select>
            </div>

            <div class="form-group" id="crosstab-var-group" style="display: none;">
              <label for="desc-select-var2">Variable de Cruce (Y)</label>
              <select id="desc-select-var2" class="input-control"></select>
            </div>
          </div>

          <!-- Controles Inferenciales -->
          <div id="panel-inferencial-controls" style="display: none; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label for="infer-select-type">Tipo de Prueba Inferencial</label>
              <select id="infer-select-type" class="input-control">
                <option value="auto_correlacion">Correlación Inteligente (Pearson vs Spearman)</option>
                <option value="auto_comparacion">Comparación de Grupos Inteligente (t-test / ANOVA vs Mann-Whitney / Kruskal)</option>
                <option value="confiabilidad">Prueba de Confiabilidad (Alfa de Cronbach)</option>
              </select>
            </div>

            <div class="form-group" id="infer-group-var-num">
              <label for="infer-var-num">Variable Numérica / Ítem</label>
              <select id="infer-var-num" class="input-control"></select>
            </div>

            <div class="form-group" id="infer-group-var-num2">
              <label for="infer-var-num2">Segunda Variable Numérica</label>
              <select id="infer-var-num2" class="input-control"></select>
            </div>

            <div class="form-group" id="infer-group-var-cat" style="display: none;">
              <label for="infer-var-cat">Variable Categórica (Grupos)</label>
              <select id="infer-var-cat" class="input-control"></select>
            </div>
          </div>

          <button class="btn btn-primary" id="btn-run-analysis" style="width: 100%; justify-content: center; gap: 0.5rem;">
            <i data-lucide="calculator"></i>
            <span>Ejecutar Análisis</span>
          </button>
        </div>

        <!-- Resultados e Interpretación Derecho -->
        <div class="results-panel" id="results-display-panel">
          <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--text-400); padding: 4rem 1rem;">
            <i data-lucide="trending-up" style="width: 48px; height: 48px; margin-bottom: 0.75rem; opacity: 0.5;"></i>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-300);">Listo para Analizar</h3>
            <p style="font-size: 0.82rem; margin-top: 0.25rem; max-width: 400px;">
              El Set de Datos está cargado. Selecciona las opciones de análisis a la izquierda y ejecuta la prueba.
            </p>
          </div>
        </div>

      </div>

    </div>

    <!-- Div Tooltip Flotante para Gráficos -->
    <div class="chart-tooltip" id="svg-chart-tooltip"></div>
  `;

  // Inicializar Lucide
  if (window.lucide) window.lucide.createIcons();

  // Elementos DOM
  const dropzone = container.querySelector("#excel-dropzone");
  const fileInput = container.querySelector("#excel-file-input");
  const btnLoadMock = container.querySelector("#btn-load-mock-survey");
  const datasetInfoPanel = container.querySelector("#dataset-info-panel");
  const datasetStatusContent = container.querySelector("#dataset-status-content");
  const analysisMainPanel = container.querySelector("#analysis-main-panel");
  
  const tabDescriptiva = container.querySelector("#tab-mode-descriptiva");
  const tabInferencial = container.querySelector("#tab-mode-inferencial");
  const descriptivaControls = container.querySelector("#panel-descriptiva-controls");
  const inferencialControls = container.querySelector("#panel-inferencial-controls");
  
  const descSelectType = container.querySelector("#desc-select-type");
  const descSelectVar = container.querySelector("#desc-select-var");
  const descSelectVar2 = container.querySelector("#desc-select-var2");
  const crosstabVarGroup = container.querySelector("#crosstab-var-group");
  
  const inferSelectType = container.querySelector("#infer-select-type");
  const inferVarNum = container.querySelector("#infer-var-num");
  const inferVarNum2 = container.querySelector("#infer-var-num2");
  const inferVarCat = container.querySelector("#infer-var-cat");
  
  const inferGroupVarNum = container.querySelector("#infer-group-var-num");
  const inferGroupVarNum2 = container.querySelector("#infer-group-var-num2");
  const inferGroupVarCat = container.querySelector("#infer-group-var-cat");
  
  const btnRun = container.querySelector("#btn-run-analysis");
  const resultsPanel = container.querySelector("#results-display-panel");
  const tooltipDiv = container.querySelector("#svg-chart-tooltip");

  // Manejadores Carga de Archivos
  dropzone.onclick = () => fileInput.click();
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) handleExcelUpload(file);
  };

  // Drag & Drop
  dropzone.ondragover = (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--color-cumple)";
  };
  dropzone.ondragleave = () => {
    dropzone.style.borderColor = "rgba(255, 255, 255, 0.15)";
  };
  dropzone.ondrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      handleExcelUpload(file);
    } else {
      alert("Formato inválido. Sube un archivo de Excel (.xlsx).");
    }
  };

  btnLoadMock.onclick = () => {
    processDataset(MOCK_ENCUESTA_DATA, "Encuesta_Google_Forms_Ejemplo.xlsx");
  };

  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        if (!window.XLSX) {
          alert("La librería de lectura de Excel está cargando. Reintente en un momento.");
          return;
        }
        const workbook = window.XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = window.XLSX.utils.sheet_to_json(worksheet);
        if (!json || json.length === 0) {
          alert("El archivo Excel está vacío.");
          return;
        }
        processDataset(json, file.name);
      } catch (err) {
        alert("Error al procesar el archivo Excel.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const resetEncuestasState = () => {
    activeDataset = null;
    columnTypes = {};
    selectedDescVar = "";
    selectedDescVar2 = "";
    inferentialVarNum = "";
    inferentialVarNum2 = "";
    inferentialVarCat = "";

    datasetStatusContent.innerHTML = `
      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--text-400); gap: 0.75rem;">
        <i data-lucide="help-circle" style="width: 32px; height: 32px; opacity: 0.5;"></i>
        <p style="font-size: 0.85rem; margin: 0;">No se han cargado datos. Sube un archivo Excel o carga el set de ejemplo para iniciar.</p>
        <div style="margin-top: 0.5rem; padding: 0.6rem; border-radius: 6px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.15); font-size: 0.75rem; color: #fca5a5; display: flex; align-items: start; gap: 0.5rem; text-align: left; line-height: 1.35;">
          <i data-lucide="shield-alert" style="width: 16px; height: 16px; flex-shrink: 0; color: #f87171; margin-top: 2px;"></i>
          <span><strong>Privacidad de Datos:</strong> Su información no se almacena en ningún servidor. Al cerrar la sesión o hacer clic en "Comenzar de nuevo", todos los datos y análisis se eliminarán permanentemente de la memoria del navegador.</span>
        </div>
      </div>
    `;

    fileInput.value = "";
    analysisMainPanel.style.display = "none";
    resultsPanel.innerHTML = `
      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--text-400); padding: 4rem 1rem;">
        <i data-lucide="trending-up" style="width: 48px; height: 48px; margin-bottom: 0.75rem; opacity: 0.5;"></i>
        <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-300);">Listo para Analizar</h3>
        <p style="font-size: 0.82rem; margin-top: 0.25rem; max-width: 400px;">
          El Set de Datos está cargado. Selecciona las opciones de análisis a la izquierda y ejecuta la prueba.
        </p>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  };

  const processDataset = (data, filename) => {
    activeDataset = data;
    columnTypes = {};

    const columns = Object.keys(data[0]);
    columns.forEach(col => {
      const values = data.map(row => row[col]).filter(val => val !== undefined && val !== null && val !== "");
      if (values.length === 0) return;

      const allNumeric = values.every(val => !isNaN(Number(val)));
      if (allNumeric) {
        const uniqueVals = [...new Set(values.map(v => Number(v)))];
        const isLikertRange = uniqueVals.every(v => Number.isInteger(v) && v >= 1 && v <= 7);
        columnTypes[col] = (isLikertRange && uniqueVals.length <= 7) ? "likert" : "numerico";
      } else {
        columnTypes[col] = "categorico";
      }
    });

    // Cambiar texto de estado
    const numRows = data.length;
    const numCols = Object.keys(columnTypes).length;
    const numVars = Object.values(columnTypes).filter(t => t === "numerico").length;
    const catVars = Object.values(columnTypes).filter(t => t === "categorico").length;
    const likVars = Object.values(columnTypes).filter(t => t === "likert").length;

    datasetStatusContent.innerHTML = `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem; text-align: left;">
        <div style="font-size: 0.85rem; color: #fff; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: flex; align-items: center; gap: 0.25rem;">
          <i data-lucide="file-check" style="color: var(--color-cumple); width: 16px; height: 16px;"></i>
          <span style="overflow: hidden; text-overflow: ellipsis;">${filename}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <div class="card" style="padding: 0.4rem; background: rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center;">
            <span style="font-size: 0.65rem; color: var(--text-400);">Muestra (N)</span>
            <span style="font-size: 1.15rem; font-weight: 800; color: var(--color-cumple);">${numRows}</span>
          </div>
          <div class="card" style="padding: 0.4rem; background: rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center;">
            <span style="font-size: 0.65rem; color: var(--text-400);">Variables</span>
            <span style="font-size: 1.15rem; font-weight: 800; color: #60a5fa;">${numCols}</span>
          </div>
        </div>
        <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; color: var(--text-300); border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.5rem;">
          <span>Numéricas: <strong>${numVars}</strong> | Categóricas: <strong>${catVars}</strong> | Likert: <strong>${likVars}</strong></span>
        </div>
        <div style="padding: 0.5rem; border-radius: 6px; background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.12); font-size: 0.72rem; color: #fca5a5; display: flex; align-items: start; gap: 0.4rem; line-height: 1.3;">
          <i data-lucide="shield-alert" style="width: 14px; height: 14px; flex-shrink: 0; color: #f87171; margin-top: 1px;"></i>
          <span>La información no se almacena. Al cerrar sesión o hacer clic en "Comenzar de nuevo", los datos y análisis se borrarán permanentemente.</span>
        </div>
        <button type="button" class="btn btn-secondary" id="btn-reset-encuestas" style="width: 100%; font-size: 0.75rem; padding: 0.45rem; justify-content: center; gap: 0.4rem; border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); color: #fca5a5;">
          <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
          Comenzar de nuevo
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Enlace de evento para comenzar de nuevo
    const btnResetEncuestas = datasetStatusContent.querySelector("#btn-reset-encuestas");
    if (btnResetEncuestas) {
      btnResetEncuestas.onclick = () => {
        if (confirm("¿Está seguro de que desea borrar los datos cargados y todos los análisis actuales para comenzar de nuevo?")) {
          resetEncuestasState();
        }
      };
    }

    populateDropdowns();
    analysisMainPanel.style.display = "grid";
  };

  const populateDropdowns = () => {
    const vars = Object.keys(columnTypes);
    
    // Rellenar descriptivas con etiquetas truncadas en la opción
    const optionsHtml = vars.map(v => `<option value="${v}" title="${v}">${truncateLabel(v, 45)}</option>`).join("");
    descSelectVar.innerHTML = optionsHtml;
    descSelectVar2.innerHTML = optionsHtml;

    // Rellenar inferenciales
    const numericVars = vars.filter(v => columnTypes[v] === "numerico" || columnTypes[v] === "likert");
    const categVars = vars.filter(v => columnTypes[v] === "categorico" || columnTypes[v] === "likert");

    const numOptionsHtml = numericVars.map(v => `<option value="${v}" title="${v}">${truncateLabel(v, 45)}</option>`).join("");
    const catOptionsHtml = categVars.map(v => `<option value="${v}" title="${v}">${truncateLabel(v, 45)}</option>`).join("");

    inferVarNum.innerHTML = numOptionsHtml;
    inferVarNum2.innerHTML = numOptionsHtml;
    inferVarCat.innerHTML = catOptionsHtml;

    selectedDescVar = descSelectVar.value;
    selectedDescVar2 = descSelectVar2.value;
    inferentialVarNum = inferVarNum.value;
    inferentialVarNum2 = inferVarNum2.value;
    inferentialVarCat = inferVarCat.value;
  };

  // Eventos de controles descriptivos
  descSelectType.onchange = (e) => {
    selectedDescType = e.target.value;
    crosstabVarGroup.style.display = selectedDescType === "crosstab" ? "block" : "none";
  };

  descSelectVar.onchange = (e) => { selectedDescVar = e.target.value; };
  descSelectVar2.onchange = (e) => { selectedDescVar2 = e.target.value; };

  // Control inferencial
  inferSelectType.onchange = (e) => {
    selectedInferentialType = e.target.value;
    if (selectedInferentialType === "auto_correlacion") {
      inferGroupVarNum.style.display = "block";
      inferGroupVarNum2.style.display = "block";
      inferGroupVarCat.style.display = "none";
    } else if (selectedInferentialType === "auto_comparacion") {
      inferGroupVarNum.style.display = "block";
      inferGroupVarNum2.style.display = "none";
      inferGroupVarCat.style.display = "block";
    } else if (selectedInferentialType === "confiabilidad") {
      inferGroupVarNum.style.display = "none";
      inferGroupVarNum2.style.display = "none";
      inferGroupVarCat.style.display = "none";
    }
  };

  inferVarNum.onchange = (e) => { inferentialVarNum = e.target.value; };
  inferVarNum2.onchange = (e) => { inferentialVarNum2 = e.target.value; };
  inferVarCat.onchange = (e) => { inferentialVarCat = e.target.value; };

  tabDescriptiva.onclick = () => {
    activeMode = "descriptiva";
    tabDescriptiva.classList.add("active");
    tabInferencial.classList.remove("active");
    descriptivaControls.style.display = "flex";
    inferencialControls.style.display = "none";
  };

  tabInferencial.onclick = () => {
    activeMode = "inferencial";
    tabInferencial.classList.add("active");
    tabDescriptiva.classList.remove("active");
    inferencialControls.style.display = "flex";
    descriptivaControls.style.display = "none";
  };

  // ==========================================================================
  // MATEMÁTICAS ESTADÍSTICAS AVANZADAS Y VALIDACIÓN DE SUPUESTOS
  // ==========================================================================

  // Normal CDF Approximation
  const normalCdf = (x) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x >= 0 ? 1 - p : p;
  };

  // Beasley-Springer-Moro normal quantile approximation
  const normalQuantile = (p) => {
    if (p <= 0 || p >= 1) return 0;
    const q = p - 0.5;
    if (Math.abs(q) < 0.42) {
      const r = q * q;
      return q * (((0.010328 * r + 0.802853) * r + 2.515517) / (((0.001308 * r + 0.189269) * r + 1.432788) * r + 1));
    } else {
      const r = p < 0.5 ? p : 1 - p;
      const t = Math.sqrt(-2 * Math.log(r));
      const z = t - ((0.010328 * t + 0.802853) * t + 2.515517) / (((0.001308 * t + 0.189269) * t + 1.432788) * t + 1);
      return p < 0.5 ? -z : z;
    }
  };

  // Chi-Square Survival Function (Wilson-Hilferty transformation)
  const chi2Sf = (x, df) => {
    if (x <= 0) return 1;
    if (df === 2) return Math.exp(-x / 2); // Exacta
    const z = (Math.pow(x / df, 1/3) - (1 - 2 / (9 * df))) / Math.sqrt(2 / (9 * df));
    return 1 - normalCdf(z);
  };

  // Cálculo de estadísticas descriptivas univariadas
  const calculateDescriptives = (values) => {
    const numValues = values.map(v => Number(v)).filter(v => !isNaN(v)).sort((a, b) => a - b);
    const n = numValues.length;
    if (n === 0) return null;

    const sum = numValues.reduce((a, b) => a + b, 0);
    const media = sum / n;
    
    // Mediana
    let mediana = 0;
    if (n % 2 === 0) {
      mediana = (numValues[n/2 - 1] + numValues[n/2]) / 2;
    } else {
      mediana = numValues[Math.floor(n/2)];
    }

    // Moda
    const freqs = {};
    let maxFreq = 0;
    let moda = [];
    numValues.forEach(v => {
      freqs[v] = (freqs[v] || 0) + 1;
      if (freqs[v] > maxFreq) maxFreq = freqs[v];
    });
    for (let k in freqs) {
      if (freqs[k] === maxFreq) moda.push(Number(k));
    }

    // Varianza y desviación
    let varianza = 0;
    let desvEst = 0;
    if (n > 1) {
      const sumSq = numValues.reduce((a, b) => a + Math.pow(b - media, 2), 0);
      varianza = sumSq / (n - 1);
      desvEst = Math.sqrt(varianza);
    }

    const min = numValues[0];
    const max = numValues[n - 1];

    return { media, mediana, moda: moda.slice(0, 3), varianza, desvEst, n, min, max };
  };

  // Frecuencias
  const calculateFrequencies = (values) => {
    const freqs = {};
    values.forEach(v => { freqs[v] = (freqs[v] || 0) + 1; });
    const total = values.length;
    return Object.keys(freqs).map(key => ({
      val: key,
      count: freqs[key],
      percent: total > 0 ? (freqs[key] / total) * 100 : 0
    })).sort((a, b) => {
      if (!isNaN(Number(a.val)) && !isNaN(Number(b.val))) return Number(a.val) - Number(b.val);
      return String(a.val).localeCompare(String(b.val));
    });
  };

  // Cuartiles para Diagramas de Caja
  const calculateQuartiles = (values) => {
    const sorted = values.map(v => Number(v)).filter(v => !isNaN(v)).sort((a, b) => a - b);
    const getVal = (q) => {
      const pos = (sorted.length - 1) * q;
      const base = Math.floor(pos);
      const rest = pos - base;
      if (sorted[base + 1] !== undefined) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
      return sorted[base];
    };
    return {
      min: sorted[0],
      q1: getVal(0.25),
      q2: getVal(0.50), // Mediana
      q3: getVal(0.75),
      max: sorted[sorted.length - 1]
    };
  };

  // Prueba de Normalidad de Shapiro-Francia (Aproximación de Shapiro-Wilk)
  const calculateNormalidad = (values) => {
    const y = values.map(v => Number(v)).filter(v => !isNaN(v)).sort((a, b) => a - b);
    const n = y.length;
    if (n < 3) return { error: "Muestra demasiado pequeña para análisis de normalidad (mínimo N=3)." };

    const mean = y.reduce((a, b) => a + b, 0) / n;
    const ss = y.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    if (ss === 0) return { W: 1, p: 1, isNormal: true };

    // Calcular pesos de Royston/Shapiro-Francia
    const m = [];
    for (let i = 1; i <= n; i++) {
      m.push(normalQuantile((i - 0.375) / (n + 0.25)));
    }
    const sum_m2 = m.reduce((a, b) => a + b * b, 0);
    const a = m.map(mi => mi / Math.sqrt(sum_m2));

    // W statistic
    let dotProd = 0;
    for (let i = 0; i < n; i++) {
      dotProd += a[i] * y[i];
    }
    const W = Math.pow(dotProd, 2) / ss;

    // Calcular p-valor (Royston transformation to normal z)
    const u = Math.log(1 - W);
    const mean_u = -1.2725 + 1.0521 * (Math.log(Math.log(n)) - Math.log(n));
    const std_u = Math.exp(1.3708 - 0.5473 * Math.log(n));
    const z = (u - mean_u) / std_u;
    const p = 1 - normalCdf(z);

    return { W, p, isNormal: p >= 0.05 };
  };

  // Ranks para no paramétricas (handles ties)
  const getRanks = (arr) => {
    const sorted = arr.map((val, idx) => ({ val: Number(val), idx })).sort((a, b) => a.val - b.val);
    const ranks = new Array(arr.length);
    
    let i = 0;
    while (i < sorted.length) {
      let j = i;
      while (j < sorted.length - 1 && sorted[j + 1].val === sorted[i].val) {
        j++;
      }
      // Rango promedio de los empatados
      const rankSum = ((i + 1) + (j + 1)) * (j - i + 1) / 2;
      const avgRank = rankSum / (j - i + 1);
      for (let k = i; k <= j; k++) {
        ranks[sorted[k].idx] = avgRank;
      }
      i = j + 1;
    }
    return ranks;
  };

  // Pearson Correlation
  const calculatePearson = (xVals, yVals) => {
    const n = xVals.length;
    const meanX = xVals.reduce((a, b) => a + b, 0) / n;
    const meanY = yVals.reduce((a, b) => a + b, 0) / n;

    let num = 0, denX = 0, denY = 0;
    for (let i = 0; i < n; i++) {
      const dx = xVals[i] - meanX;
      const dy = yVals[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }
    if (denX === 0 || denY === 0) return { r: 0, p: 1 };
    const r = num / Math.sqrt(denX * denY);
    const t = r * Math.sqrt((n - 2) / (1 - r * r));
    const p = 2 * (1 - normalCdf(Math.abs(t)));
    return { r, p };
  };

  // Spearman Correlation
  const calculateSpearman = (xVals, yVals) => {
    const rx = getRanks(xVals);
    const ry = getRanks(yVals);
    const pearsonRes = calculatePearson(rx, ry);
    return { rho: pearsonRes.r, p: pearsonRes.p };
  };

  // Alfa de Cronbach
  const calculateCronbach = () => {
    // Tomar todas las variables Likert
    const likertVars = Object.keys(columnTypes).filter(k => columnTypes[k] === "likert");
    if (likertVars.length < 2) {
      return { error: "No se encontraron suficientes preguntas tipo Likert (escala 1-5) para calcular el Alfa." };
    }

    const k = likertVars.length;
    const n = activeDataset.length;
    
    // Varianzas individuales
    let sumIndividualVars = 0;
    likertVars.forEach(v => {
      const vals = activeDataset.map(r => Number(r[v])).filter(val => !isNaN(val));
      const desc = calculateDescriptives(vals);
      sumIndividualVars += desc.varianza;
    });

    // Varianza total (sumando filas)
    const rowSums = [];
    for (let i = 0; i < n; i++) {
      let rSum = 0;
      likertVars.forEach(v => {
        const val = Number(activeDataset[i][v]);
        rSum += isNaN(val) ? 0 : val;
      });
      rowSums.push(rSum);
    }
    const totalDesc = calculateDescriptives(rowSums);
    const varTotal = totalDesc.varianza;

    if (varTotal === 0) return { error: "La varianza total es cero, las respuestas son idénticas." };
    const alpha = (k / (k - 1)) * (1 - (sumIndividualVars / varTotal));

    return { alpha, k, n };
  };

  // Mann-Whitney U test (No paramétrico 2 grupos)
  const calculateMannWhitney = (vals1, vals2, key1, key2) => {
    const n1 = vals1.length;
    const n2 = vals2.length;
    
    // Combinar y clasificar
    const combined = [];
    vals1.forEach(v => combined.push({ val: v, g: 1 }));
    vals2.forEach(v => combined.push({ val: v, g: 2 }));

    const ranks = getRanks(combined.map(item => item.val));
    
    let sumRanks1 = 0;
    ranks.forEach((r, idx) => {
      if (combined[idx].g === 1) sumRanks1 += r;
    });

    const U1 = n1 * n2 + (n1 * (n1 + 1)) / 2 - sumRanks1;
    const U2 = n1 * n2 - U1;
    const U = Math.min(U1, U2);

    const meanU = (n1 * n2) / 2;
    const stdU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
    if (stdU === 0) return { error: "Varianza nula en U de Mann-Whitney." };

    const z = (U - meanU) / stdU;
    const p = 2 * (1 - normalCdf(Math.abs(z)));

    return { U, z, p, n1, n2, key1, key2 };
  };

  // Kruskal-Wallis (No paramétrico >2 grupos)
  const calculateKruskalWallis = (groups, keys) => {
    const combined = [];
    const n_j = {};
    keys.forEach(k => {
      n_j[k] = groups[k].length;
      groups[k].forEach(v => combined.push({ val: v, groupKey: k }));
    });

    const N = combined.length;
    const ranks = getRanks(combined.map(item => item.val));

    // Suma de rangos por grupo
    const R_j = {};
    keys.forEach(k => { R_j[k] = 0; });
    ranks.forEach((r, idx) => {
      R_j[combined[idx].groupKey] += r;
    });

    let sumR2_over_n = 0;
    keys.forEach(k => {
      sumR2_over_n += Math.pow(R_j[k], 2) / n_j[k];
    });

    const H = (12 / (N * (N + 1))) * sumR2_over_n - 3 * (N + 1);
    const df = keys.length - 1;
    const p = chi2Sf(H, df);

    return { H, df, p, keys, n_j, R_j };
  };

  // t-test Paramétrico
  const calculateTTest = (g1, g2, key1, key2) => {
    const desc1 = calculateDescriptives(g1);
    const desc2 = calculateDescriptives(g2);
    
    const n1 = desc1.n;
    const n2 = desc2.n;
    const m1 = desc1.media;
    const m2 = desc2.media;
    const v1 = desc1.varianza;
    const v2 = desc2.varianza;

    const se = Math.sqrt((v1 / n1) + (v2 / n2));
    if (se === 0) return { error: "Desviación cero en prueba t." };
    const t = (m1 - m2) / se;

    const num_df = Math.pow((v1 / n1) + (v2 / n2), 2);
    const den_df = (Math.pow(v1 / n1, 2) / (n1 - 1)) + (Math.pow(v2 / n2, 2) / (n2 - 1));
    const df = num_df / den_df;
    
    const p = 2 * (1 - normalCdf(Math.abs(t)));

    return { t, df, p, key1, key2, m1, m2 };
  };

  // ANOVA Paramétrico
  const calculateANOVA = (groups, keys) => {
    const allValues = [];
    const groupStats = {};
    keys.forEach(k => {
      const desc = calculateDescriptives(groups[k]);
      groupStats[k] = desc;
      allValues.push(...groups[k]);
    });

    const N = allValues.length;
    const overallMean = allValues.reduce((a, b) => a + b, 0) / N;

    let ssb = 0;
    keys.forEach(k => { ssb += groupStats[k].n * Math.pow(groupStats[k].media - overallMean, 2); });

    let ssw = 0;
    keys.forEach(k => {
      groups[k].forEach(v => { ssw += Math.pow(v - groupStats[k].media, 2); });
    });

    const df1 = keys.length - 1;
    const df2 = N - keys.length;
    const msb = ssb / df1;
    const msw = ssw / df2;
    if (msw === 0) return { error: "Varianza nula en ANOVA." };
    const F = msb / msw;
    const p = chi2Sf(F, df1);

    return { F, p, df1, df2, ssb, ssw, groupStats, keys };
  };

  // Tabla cruzada (Crosstab)
  const calculateCrossTab = (varX, varY) => {
    const xVals = activeDataset.map(r => r[varX]);
    const yVals = activeDataset.map(r => r[varY]);
    
    const xUnique = [...new Set(xVals)].sort();
    const yUnique = [...new Set(yVals)].sort();
    
    // Inicializar matriz
    const grid = {};
    xUnique.forEach(x => {
      grid[x] = {};
      yUnique.forEach(y => {
        grid[x][y] = 0;
      });
    });

    // Llenar matriz
    activeDataset.forEach(row => {
      const x = row[varX];
      const y = row[varY];
      if (grid[x] && grid[x][y] !== undefined) {
        grid[x][y]++;
      }
    });

    return { xUnique, yUnique, grid, total: activeDataset.length };
  };

  // Regresión y correlación de Pearson auxiliar para puntos
  const calculateCorrelation = (varX, varY) => {
    const xVals = activeDataset.map(r => Number(r[varX])).filter(v => !isNaN(v));
    const yVals = activeDataset.map(r => Number(r[varY])).filter(v => !isNaN(v));
    
    const n = Math.min(xVals.length, yVals.length);
    if (n < 3) return { error: "Se necesitan al menos 3 pares de datos válidos." };

    const meanX = xVals.reduce((a, b) => a + b, 0) / n;
    const meanY = yVals.reduce((a, b) => a + b, 0) / n;

    let num = 0;
    let denX = 0;
    let denY = 0;

    for (let i = 0; i < n; i++) {
      const dx = xVals[i] - meanX;
      const dy = yVals[i] - meanY;
      num += dx * dy;
      denX += dx * dx;
      denY += dy * dy;
    }

    if (denX === 0 || denY === 0) return { error: "Variabilidad cero en una de las variables seleccionadas." };

    const r = num / Math.sqrt(denX * denY);
    const r2 = r * r;

    // Regresión
    const slope = num / denX;
    const intercept = meanY - slope * meanX;

    // t-test para correlación
    const t = r * Math.sqrt((n - 2) / (1 - r2));
    const df = n - 2;
    const z_cdf = (x) => 1 / (1 + Math.exp(-0.044715 * Math.pow(x, 3) - 1.5976 * x));
    const p = 2 * (1 - z_cdf(Math.abs(t)));

    // Obtener los datos reales de dispersión para graficar
    const points = [];
    for (let i = 0; i < n; i++) {
      points.push({ x: xVals[i], y: yVals[i] });
    }

    return { r, r2, slope, intercept, p, points, n, meanX, meanY, minX: Math.min(...xVals), maxX: Math.max(...xVals), minY: Math.min(...yVals), maxY: Math.max(...yVals) };
  };

  // ==========================================================================
  // RENDERIZADO DE GRÁFICOS SVG AVANZADOS
  // ==========================================================================

  // Gráfico de Barras 3D
  const render3DBarChart = (list, title) => {
    const width = 600;
    const height = 350;
    const margin = { top: 40, right: 60, bottom: 60, left: 60 };

    const maxVal = Math.max(...list.map(item => item.count)) || 1;
    const count = list.length;
    const barWidth = Math.min(60, (width - margin.left - margin.right) / (count * 1.5));
    const gap = barWidth * 0.5;

    let barsSvg = "";
    
    list.forEach((item, idx) => {
      const val = item.count;
      const pct = item.percent.toFixed(1);
      const barHeight = (val / maxVal) * (height - margin.top - margin.bottom);
      
      const x = margin.left + idx * (barWidth + gap) + gap/2;
      const y = height - margin.bottom - barHeight;

      const depth = 15; // Profundidad 3D
      
      const frontFace = `M ${x} ${y} L ${x + barWidth} ${y} L ${x + barWidth} ${height - margin.bottom} L ${x} ${height - margin.bottom} Z`;
      const rightFace = `M ${x + barWidth} ${y} L ${x + barWidth + depth} ${y - depth} L ${x + barWidth + depth} ${height - margin.bottom - depth} L ${x + barWidth} ${height - margin.bottom} Z`;
      const topFace = `M ${x} ${y} L ${x + depth} ${y - depth} L ${x + barWidth + depth} ${y - depth} L ${x + barWidth} ${y} Z`;

      const hue = 150 + (idx * 25) % 120;
      const colorFront = `hsl(${hue}, 75%, 45%)`;
      const colorTop = `hsl(${hue}, 80%, 55%)`;
      const colorRight = `hsl(${hue}, 70%, 35%)`;

      barsSvg += `
        <g class="bar-3d-group" style="cursor: pointer;" id="bar-g-${idx}">
          <polygon points="${x},${height - margin.bottom} ${x + barWidth},${height - margin.bottom} ${x + barWidth + depth},${height - margin.bottom - depth} ${x + depth},${height - margin.bottom - depth}" fill="rgba(0,0,0,0.25)" />
          <path d="${rightFace}" fill="${colorRight}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
          <path d="${topFace}" fill="${colorTop}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
          <path d="${frontFace}" fill="${colorFront}" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" />
          <text x="${x + barWidth/2 + depth/2}" y="${y - depth - 5}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">${val}</text>
        </g>
      `;
    });

    let gridSvg = `
      <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
    `;

    let labelsSvg = "";
    list.forEach((item, idx) => {
      const x = margin.left + idx * (barWidth + gap) + gap/2 + barWidth/2;
      labelsSvg += `
        <text x="${x}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="10" fill="var(--text-300)" transform="rotate(-15, ${x}, ${height - margin.bottom + 18})">${item.val}</text>
      `;
    });

    const fullChart = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; overflow: visible;">
        <text x="${width/2}" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${title}</text>
        ${gridSvg}
        ${barsSvg}
        ${labelsSvg}
      </svg>
    `;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.innerHTML = fullChart;

    list.forEach((item, idx) => {
      const g = chartDiv.querySelector(`#bar-g-${idx}`);
      if (g) {
        attachTooltip(g, `<strong>${item.val}</strong><br>Frecuencia: ${item.count} estudiantes<br>Porcentaje: ${item.percent.toFixed(1)}%`);
      }
    });

    return chartDiv;
  };

  // Gráfico de Pastel 3D
  const render3DPieChart = (list, title) => {
    const width = 600;
    const height = 350;
    const centerX = width / 2;
    const centerY = height / 2 - 10;
    const rx = 140;
    const ry = 90;
    const thickness = 28;

    const colors = list.map((_, idx) => {
      const hue = 150 + (idx * 30) % 150;
      return {
        top: `hsl(${hue}, 75%, 45%)`,
        side: `hsl(${hue}, 70%, 32%)`
      };
    });

    const total = list.reduce((a, b) => a + b.count, 0);
    
    let currentAngle = 0;
    let pathsSvg = "";

    const getCoords = (angle) => {
      const rad = (angle - 90) * Math.PI / 180;
      return {
        x: centerX + rx * Math.cos(rad),
        y: centerY + ry * Math.sin(rad)
      };
    };

    list.forEach((item, idx) => {
      const angle = (item.count / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      if (item.count === 0) return;

      const p1 = getCoords(startAngle);
      const p2 = getCoords(endAngle);
      const largeArc = angle > 180 ? 1 : 0;

      let sliceTopPath = "";
      if (angle === 360) {
        sliceTopPath = `M ${centerX - rx} ${centerY} A ${rx} ${ry} 0 1 0 ${centerX + rx} ${centerY} A ${rx} ${ry} 0 1 0 ${centerX - rx} ${centerY} Z`;
      } else {
        sliceTopPath = `M ${centerX} ${centerY} L ${p1.x} ${p1.y} A ${rx} ${ry} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
      }

      let sidePath = "";
      if (angle === 360) {
        sidePath = `M ${centerX - rx} ${centerY} A ${rx} ${ry} 0 1 0 ${centerX + rx} ${centerY} L ${centerX + rx} ${centerY + thickness} A ${rx} ${ry} 0 1 1 ${centerX - rx} ${centerY + thickness} Z`;
      } else {
        sidePath = `M ${p1.x} ${p1.y} A ${rx} ${ry} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p2.x} ${p2.y + thickness} A ${rx} ${ry} 0 ${largeArc} 0 ${p1.x} ${p1.y + thickness} Z`;
      }

      pathsSvg += `
        <g class="pie-3d-group" style="cursor: pointer;" id="pie-g-${idx}">
          <path d="${sidePath}" fill="${colors[idx].side}" />
          <path d="${sliceTopPath}" fill="${colors[idx].top}" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />
        </g>
      `;
    });

    let legendsSvg = "";
    list.forEach((item, idx) => {
      const side = idx % 2 === 0 ? 1 : -1;
      const xPos = side === 1 ? width - 130 : 20;
      const yPos = 50 + Math.floor(idx/2) * 22;

      legendsSvg += `
        <g transform="translate(${xPos}, ${yPos})">
          <rect width="12" height="12" rx="3" fill="${colors[idx].top}" />
          <text x="18" y="10" font-size="10.5" font-weight="600" fill="var(--text-200)">${item.val.substring(0, 15)}: ${item.count} (${item.percent.toFixed(1)}%)</text>
        </g>
      `;
    });

    const fullChart = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; overflow: visible;">
        <text x="${width/2}" y="25" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${title}</text>
        ${pathsSvg}
        ${legendsSvg}
      </svg>
    `;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.innerHTML = fullChart;

    list.forEach((item, idx) => {
      const g = chartDiv.querySelector(`#pie-g-${idx}`);
      if (g) {
        attachTooltip(g, `<strong>${item.val}</strong><br>Frecuencia: ${item.count} respuestas<br>Porcentaje: ${item.percent.toFixed(1)}%`);
      }
    });

    return chartDiv;
  };

  // Gráfico de Dispersión
  const renderScatterPlot = (stats, title, labelX, labelY) => {
    const width = 600;
    const height = 350;
    const margin = { top: 40, right: 40, bottom: 50, left: 60 };

    const { points, slope, intercept, minX, maxX, minY, maxY } = stats;

    const paddingX = (maxX - minX) * 0.1 || 1;
    const paddingY = (maxY - minY) * 0.1 || 1;

    const scaleX = (val) => {
      return margin.left + ((val - (minX - paddingX)) / ((maxX + paddingX) - (minX - paddingX))) * (width - margin.left - margin.right);
    };

    const scaleY = (val) => {
      return height - margin.bottom - ((val - (minY - paddingY)) / ((maxY + paddingY) - (minY - paddingY))) * (height - margin.top - margin.bottom);
    };

    let dotsSvg = "";
    points.forEach((pt, idx) => {
      const cx = scaleX(pt.x);
      const cy = scaleY(pt.y);
      dotsSvg += `
        <circle cx="${cx}" cy="${cy}" r="5" fill="#60a5fa" stroke="#000" stroke-width="0.5" style="cursor: pointer; transition: r 0.2s;" id="dot-${idx}" />
      `;
    });

    const startXVal = minX - paddingX;
    const endXVal = maxX + paddingX;
    
    const startYVal = slope * startXVal + intercept;
    const endYVal = slope * endXVal + intercept;

    const x1 = scaleX(startXVal);
    const y1 = scaleY(startYVal);
    const x2 = scaleX(endXVal);
    const y2 = scaleY(endYVal);

    const trendlineSvg = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--color-cumple)" stroke-width="2.5" stroke-dasharray="4" filter="drop-shadow(0 0 4px rgba(16,185,129,0.5))" />
    `;

    const gridSvg = `
      <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <line x1="${margin.left}" y1="${margin.top}" x2="${width - margin.right}" y2="${margin.top}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      <line x1="${width - margin.right}" y1="${margin.top}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    `;

    const axisLabels = `
      <text x="${width/2}" y="${height - 12}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-200)">${labelX}</text>
      <text x="15" y="${height/2}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-200)" transform="rotate(-90, 15, ${height/2})">${labelY}</text>
      
      <text x="${scaleX(minX)}" y="${height - margin.bottom + 15}" text-anchor="middle" font-size="9" fill="var(--text-400)">${minX.toFixed(1)}</text>
      <text x="${scaleX(maxX)}" y="${height - margin.bottom + 15}" text-anchor="middle" font-size="9" fill="var(--text-400)">${maxX.toFixed(1)}</text>
      
      <text x="${margin.left - 8}" y="${scaleY(minY) + 3}" text-anchor="end" font-size="9" fill="var(--text-400)">${minY.toFixed(1)}</text>
      <text x="${margin.left - 8}" y="${scaleY(maxY) + 3}" text-anchor="end" font-size="9" fill="var(--text-400)">${maxY.toFixed(1)}</text>
    `;

    const fullChart = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; overflow: visible;">
        <text x="${width/2}" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${title}</text>
        ${gridSvg}
        ${trendlineSvg}
        ${dotsSvg}
        ${axisLabels}
      </svg>
    `;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.innerHTML = fullChart;

    points.forEach((pt, idx) => {
      const dot = chartDiv.querySelector(`#dot-${idx}`);
      if (dot) {
        attachTooltip(dot, `<strong>Registro #${idx + 1}</strong><br>${labelX}: ${pt.x.toFixed(1)}<br>${labelY}: ${pt.y.toFixed(1)}`);
      }
    });

    return chartDiv;
  };

  // ==========================================================================
  // RENDERIZADO DE GRÁFICOS SVG AVANZADOS
  // ==========================================================================

  const attachTooltip = (element, text) => {
    element.onmouseover = (e) => {
      tooltipDiv.style.display = "block";
      tooltipDiv.innerHTML = text;
      positionTooltip(e);
    };
    element.onmousemove = (e) => { positionTooltip(e); };
    element.onmouseout = () => { tooltipDiv.style.display = "none"; };
  };

  const positionTooltip = (e) => {
    const wrapper = container.querySelector(".encuestas-wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipHeight = tooltipDiv.offsetHeight;
    let left = e.clientX - wrapperRect.left + 15;
    let top = e.clientY - wrapperRect.top - tooltipHeight - 10;
    tooltipDiv.style.left = `${left}px`;
    tooltipDiv.style.top = `${top}px`;
  };

  // Histograma de Normalidad
  const renderHistogram = (values, title, normalStats) => {
    const width = 580;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };

    const min = Math.min(...values);
    const max = Math.max(...values);
    const binsCount = 6;
    const binWidth = (max - min) / binsCount || 1;

    // Calcular bins
    const bins = new Array(binsCount).fill(0).map((_, i) => ({
      start: min + i * binWidth,
      end: min + (i + 1) * binWidth,
      count: 0
    }));

    values.forEach(v => {
      let idx = Math.floor((v - min) / binWidth);
      if (idx >= binsCount) idx = binsCount - 1;
      if (idx < 0) idx = 0;
      bins[idx].count++;
    });

    const maxCount = Math.max(...bins.map(b => b.count)) || 1;
    const stepX = (width - margin.left - margin.right) / binsCount;

    let barsHtml = "";
    bins.forEach((b, i) => {
      const h = (b.count / maxCount) * (height - margin.top - margin.bottom);
      const x = margin.left + i * stepX + 2;
      const y = height - margin.bottom - h;
      const barW = stepX - 4;

      // Color degradado azul a verde
      const color = `hsl(${140 + i * 15}, 65%, 45%)`;

      barsHtml += `
        <rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="${color}" stroke="rgba(255,255,255,0.15)" id="hist-rect-${i}" style="cursor:pointer;" />
        <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${b.count}</text>
      `;
    });

    // Ejes
    const gridHtml = `
      <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
    `;

    // Rótulos X
    let labelsHtml = "";
    bins.forEach((b, i) => {
      const x = margin.left + i * stepX + stepX / 2;
      labelsHtml += `
        <text x="${x}" y="${height - margin.bottom + 15}" text-anchor="middle" font-size="8.5" fill="var(--text-300)">${b.start.toFixed(1)} - ${b.end.toFixed(1)}</text>
      `;
    });

    const fullChart = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; overflow: visible;">
        <text x="${width/2}" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${title}</text>
        ${gridHtml}
        ${barsHtml}
        ${labelsHtml}
      </svg>
    `;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.innerHTML = fullChart;

    bins.forEach((b, i) => {
      const rect = chartDiv.querySelector(`#hist-rect-${i}`);
      if (rect) {
        attachTooltip(rect, `<strong>Rango: ${b.start.toFixed(1)} - ${b.end.toFixed(1)}</strong><br>Ocurrencias: ${b.count} estudiantes`);
      }
    });

    return chartDiv;
  };

  // Diagrama de Caja (Box Plot SVG)
  const renderBoxPlot = (quartiles, title, labelY) => {
    const width = 300;
    const height = 300;
    const margin = { top: 40, right: 40, bottom: 40, left: 60 };

    const { min, q1, q2, q3, max } = quartiles;
    const range = (max - min) * 1.25 || 1;
    const pad = (max - min) * 0.12;
    const minYAxis = min - pad;
    const maxYAxis = max + pad;

    const scaleY = (val) => {
      return height - margin.bottom - ((val - minYAxis) / (maxYAxis - minYAxis)) * (height - margin.top - margin.bottom);
    };

    const cx = width / 2;
    const boxW = 80;

    const yMin = scaleY(min);
    const yQ1 = scaleY(q1);
    const yQ2 = scaleY(q2);
    const yQ3 = scaleY(q3);
    const yMax = scaleY(max);

    const boxPlotSvg = `
      <!-- Whiskers (Bigotes) -->
      <line x1="${cx}" y1="${yMin}" x2="${cx}" y2="${yQ1}" stroke="#60a5fa" stroke-width="2" />
      <line x1="${cx}" y1="${yQ3}" x2="${cx}" y2="${yMax}" stroke="#60a5fa" stroke-width="2" />
      
      <!-- Top and Bottom caps -->
      <line x1="${cx - boxW/4}" y1="${yMin}" x2="${cx + boxW/4}" y2="${yMin}" stroke="#60a5fa" stroke-width="2.5" />
      <line x1="${cx - boxW/4}" y1="${yMax}" x2="${cx + boxW/4}" y2="${yMax}" stroke="#60a5fa" stroke-width="2.5" />

      <!-- Caja (Caja Intercuartil Q1-Q3) -->
      <rect x="${cx - boxW/2}" y="${yQ3}" width="${boxW}" height="${yQ1 - yQ3}" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" stroke-width="2" id="box-rect" style="cursor:pointer;" />

      <!-- Línea de la Mediana (Q2) -->
      <line x1="${cx - boxW/2}" y1="${yQ2}" x2="${cx + boxW/2}" y2="${yQ2}" stroke="var(--color-cumple)" stroke-width="3.5" id="box-median" style="cursor:pointer;" />
    `;

    const axisHtml = `
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <text x="${margin.left - 8}" y="${yMin}" text-anchor="end" font-size="9" fill="var(--text-300)">${min.toFixed(1)} (Min)</text>
      <text x="${margin.left - 8}" y="${yQ1}" text-anchor="end" font-size="9" fill="var(--text-300)">${q1.toFixed(1)} (Q1)</text>
      <text x="${margin.left - 8}" y="${yQ2}" text-anchor="end" font-size="9" fill="var(--color-cumple)" font-weight="700">${q2.toFixed(1)} (Med)</text>
      <text x="${margin.left - 8}" y="${yQ3}" text-anchor="end" font-size="9" fill="var(--text-300)">${q3.toFixed(1)} (Q3)</text>
      <text x="${margin.left - 8}" y="${yMax}" text-anchor="end" font-size="9" fill="var(--text-300)">${max.toFixed(1)} (Max)</text>
    `;

    const fullChart = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; overflow: visible;">
        <text x="${width/2}" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${title}</text>
        ${boxPlotSvg}
        ${axisHtml}
      </svg>
    `;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.innerHTML = fullChart;

    const rect = chartDiv.querySelector("#box-rect");
    if (rect) {
      attachTooltip(rect, `<strong>Caja Intercuartil</strong><br>Q3 (75%): ${q3.toFixed(2)}<br>Mediana (50%): ${q2.toFixed(2)}<br>Q1 (25%): ${q1.toFixed(2)}<br>Rango IQ: ${(q3 - q1).toFixed(2)}`);
    }

    return chartDiv;
  };

  // ==========================================================================
  // EJECUCIÓN GENERAL DE ANÁLISIS & CONEXIÓN CON EVIDENCIAS Y REPORTES
  // ==========================================================================

  btnRun.onclick = () => {
    if (!activeDataset || activeDataset.length === 0) {
      alert("No hay un set de datos cargado.");
      return;
    }

    if (activeMode === "descriptiva") {
      runDescriptiveAnalysis();
    } else {
      runInferentialAnalysis();
    }
  };

  const runDescriptiveAnalysis = () => {
    const varX = selectedDescVar;
    const values = activeDataset.map(r => r[varX]);
    const type = columnTypes[varX];

    if (selectedDescType === "crosstab") {
      const varY = selectedDescVar2;
      if (varX === varY) {
        alert("Selecciona dos variables distintas para el cruce.");
        return;
      }
      const ct = calculateCrossTab(varX, varY);

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Tabla de Contingencia Cruzada</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>
        
        <p style="font-size:0.8rem; color:var(--text-300);">Fila: <strong>${varX}</strong> <br> Columna: <strong>${varY}</strong></p>

        <div class="table-container" style="overflow-x:auto;">
          <table class="stats-table">
            <thead>
              <tr>
                <th>Fila \\ Columna</th>
                ${ct.yUnique.map(y => `<th>${y}</th>`).join("")}
                <th style="font-weight:700;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${ct.xUnique.map(x => {
                let rowSum = 0;
                const cells = ct.yUnique.map(y => {
                  const val = ct.grid[x][y] || 0;
                  rowSum += val;
                  return `<td>${val}</td>`;
                }).join("");
                return `<tr><td style="font-weight:600;">${x}</td>${cells}<td style="font-weight:700;">${rowSum}</td></tr>`;
              }).join("")}
              <tr style="background: rgba(255,255,255,0.02); font-weight:700;">
                <td>Total General</td>
                ${ct.yUnique.map(y => {
                  let colSum = 0;
                  ct.xUnique.forEach(x => { colSum += ct.grid[x][y] || 0; });
                  return `<td>${colSum}</td>`;
                }).join("")}
                <td>${ct.total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación del Cruce
          </h4>
          <p>
            El análisis de tabla cruzada muestra la distribución de frecuencias entre las categorías de **${varX}** y **${varY}** para una muestra total de ${ct.total} alumnos. 
            Esta visualización permite identificar perfiles de respuesta cruzados y relaciones proporcionales empíricas.
          </p>
        </div>
      `;

    } else if (selectedDescType === "resumen") {
      // Resumir datos (Media, Moda, Mediana)
      const stats = calculateDescriptives(values);
      const freqs = calculateFrequencies(values);
      
      let chartDiv;
      if (type === "numerico") {
        chartDiv = renderHistogram(values, `Distribución de: ${varX}`, stats);
      } else {
        chartDiv = render3DBarChart(freqs.slice(0, 8), `Distribución: ${varX}`);
      }

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Resumen Descriptivo de Datos</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <p style="font-size:0.82rem; color:var(--text-300);">Pregunta analizada: <strong style="color:#fff;">${varX}</strong></p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15);">
            <h4 style="font-weight:700; color:var(--text-200); margin-bottom:0.5rem;">Resumen de Tendencia Central</h4>
            <table class="stats-table" style="font-size:0.8rem; margin:0;">
              <tr><td>N Registros válidos</td><td style="font-weight:700; text-align:right;">${stats ? stats.n : values.length}</td></tr>
              ${stats ? `
                <tr><td>Media (Promedio)</td><td style="font-weight:700; text-align:right; color:var(--color-cumple);">${stats.media.toFixed(3)}</td></tr>
                <tr><td>Mediana</td><td style="font-weight:700; text-align:right;">${stats.mediana.toFixed(3)}</td></tr>
                <tr><td>Moda</td><td style="font-weight:700; text-align:right;">${stats.moda.join(", ")}</td></tr>
              ` : `
                <tr><td colspan="2" style="font-size:0.75rem; color:var(--text-400);">La variable no es numérica. Se recomienda análisis de frecuencias.</td></tr>
              `}
            </table>
          </div>
          <div id="chart-mount-point"></div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación
          </h4>
          <p>
            Al resumir la variable **${varX}**, encontramos un valor medio de **${stats ? stats.media.toFixed(2) : 'N/A'}** unidades con un valor central (mediana) posicionado en **${stats ? stats.mediana.toFixed(2) : 'N/A'}**.
            Esta estimación permite calibrar el comportamiento promedio de la muestra respecto al ítem planteado en la encuesta.
          </p>
        </div>
      `;

      resultsPanel.querySelector("#chart-mount-point").appendChild(chartDiv);

    } else if (selectedDescType === "variabilidad") {
      // Medir variabilidad (desviacion estandar, varianza, rango)
      const stats = calculateDescriptives(values);
      
      let chartDiv;
      if (stats) {
        const quartiles = calculateQuartiles(values);
        chartDiv = renderBoxPlot(quartiles, `Diagrama de Caja (Box Plot): ${varX}`, varX);
      } else {
        const freqs = calculateFrequencies(values);
        chartDiv = render3DPieChart(freqs, `Frecuencias: ${varX}`);
      }

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Medición de Variabilidad</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <p style="font-size:0.82rem; color:var(--text-300);">Pregunta analizada: <strong style="color:#fff;">${varX}</strong></p>

        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 1.5rem; align-items: start;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15);">
            <h4 style="font-weight:700; color:var(--text-200); margin-bottom:0.5rem;">Estadísticos de Variabilidad</h4>
            <table class="stats-table" style="font-size:0.8rem; margin:0;">
              ${stats ? `
                <tr><td>Desviación Estándar (s)</td><td style="font-weight:700; text-align:right; color:#60a5fa;">${stats.desvEst.toFixed(3)}</td></tr>
                <tr><td>Varianza (s²)</td><td style="font-weight:700; text-align:right;">${stats.varianza.toFixed(3)}</td></tr>
                <tr><td>Rango muestral</td><td style="font-weight:700; text-align:right;">${(stats.max - stats.min).toFixed(2)}</td></tr>
                <tr><td>Mínimo</td><td style="font-weight:700; text-align:right;">${stats.min}</td></tr>
                <tr><td>Máximo</td><td style="font-weight:700; text-align:right;">${stats.max}</td></tr>
              ` : `
                <tr><td colspan="2" style="font-size:0.75rem; color:var(--text-400);">La variable no es cuantitativa. No aplica cálculo de variabilidad numérica.</td></tr>
              `}
            </table>
          </div>
          <div id="chart-mount-point"></div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación de Variabilidad
          </h4>
          <p>
            La desviación estándar de **${stats ? stats.desvEst.toFixed(2) : 'N/A'}** mide el grado de dispersión promedio de los datos de **${varX}** alrededor de su media.
            ${stats && stats.desvEst > 2.5 ? "Una desviación relativamente alta sugiere que las opiniones o registros de los alumnos están bastante fragmentados." : "Una desviación baja indica que las respuestas son uniformes y giran de manera muy concentrada en torno al promedio."}
          </p>
        </div>
      `;

      resultsPanel.querySelector("#chart-mount-point").appendChild(chartDiv);

    } else if (selectedDescType === "frecuencias") {
      // Frecuencias y pastel
      const freqs = calculateFrequencies(values);
      const chartDiv = render3DPieChart(freqs, `Pastel 3D: Frecuencias de ${varX}`);

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Distribución de Frecuencias</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <p style="font-size:0.82rem; color:var(--text-300);">Pregunta analizada: <strong style="color:#fff;">${varX}</strong></p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15); max-height:280px; overflow-y:auto;">
            <table class="stats-table" style="font-size:0.8rem; margin:0;">
              <thead>
                <tr>
                  <th>Valor</th>
                  <th>Conteo</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>
              <tbody>
                ${freqs.map(f => `
                  <tr>
                    <td style="font-weight:600;">${f.val}</td>
                    <td>${f.count}</td>
                    <td style="font-weight:700; color:var(--color-cumple);">${f.percent.toFixed(1)}%</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <div id="chart-mount-point"></div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación
          </h4>
          <p>
            El análisis porcentual de **${varX}** muestra que la opción con mayor peso es **"${freqs[freqs.length - 1]?.val}"** concentrando el **${freqs[freqs.length - 1]?.percent.toFixed(1)}%** del total de la muestra analizada.
          </p>
        </div>
      `;

      resultsPanel.querySelector("#chart-mount-point").appendChild(chartDiv);
    }

    if (window.lucide) window.lucide.createIcons();
    bindExportBtn();
  };

  const runInferentialAnalysis = () => {
    if (selectedInferentialType === "auto_correlacion") {
      const varX = inferentialVarNum;
      const varY = inferentialVarNum2;
      if (varX === varY) {
        alert("Por favor selecciona dos variables numéricas diferentes.");
        return;
      }

      const xVals = activeDataset.map(r => Number(r[varX])).filter(v => !isNaN(v));
      const yVals = activeDataset.map(r => Number(r[varY])).filter(v => !isNaN(v));

      // 1. Evaluar supuestos de normalidad
      const normX = calculateNormalidad(xVals);
      const normY = calculateNormalidad(yVals);

      let pXText = normX.error ? "N/A" : `p = ${normX.p.toFixed(4)} (${normX.isNormal ? 'Normal' : 'No Normal'})`;
      let pYText = normY.error ? "N/A" : `p = ${normY.p.toFixed(4)} (${normY.isNormal ? 'Normal' : 'No Normal'})`;

      // 2. Selección automática de la prueba
      const usePearson = normX.isNormal && normY.isNormal;
      let rCoeff = 0;
      let pVal = 1;
      let testName = "";

      if (usePearson) {
        testName = "Correlación de Pearson";
        const pearson = calculatePearson(xVals, yVals);
        rCoeff = pearson.r;
        pVal = pearson.p;
      } else {
        testName = "Correlación de Spearman";
        const spearman = calculateSpearman(xVals, yVals);
        rCoeff = spearman.rho;
        pVal = spearman.p;
      }

      // Regresión para tendencia
      const reg = calculateCorrelation(varX, varY);

      // Gráficos y renderizado
      const chartDiv = renderScatterPlot(reg, `${testName}: ${varX} vs ${varY}`, varX, varY);

      let force = "débil";
      if (Math.abs(rCoeff) >= 0.7) force = "fuerte";
      else if (Math.abs(rCoeff) >= 0.4) force = "moderada";

      const dir = rCoeff > 0 ? "positiva" : "negativa";
      const sigText = pVal < 0.05 ? "estadísticamente significativa (p < 0.05)" : "no significativa estadísticamente (p >= 0.05)";

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Selección Inteligente de Correlación</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <p style="font-size:0.8rem; color:var(--text-300);">Mapeo de supuestos y normalidad en variables continuas.</p>

        <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 1.5rem; align-items: start;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15); display:flex; flex-direction:column; gap:0.5rem;">
            <h4 style="font-weight:700; color:var(--text-200); margin-bottom:0.25rem;">Validación de Supuestos</h4>
            
            <div style="font-size:0.75rem; background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:6px; margin-bottom:0.5rem;">
              <strong>Normalidad (Shapiro-Francia):</strong><br>
              • Var X [${truncateLabel(varX, 20)}]: ${pXText}<br>
              • Var Y [${truncateLabel(varY, 20)}]: ${pYText}<br>
              <strong>Prueba aplicada:</strong> <span style="color:var(--color-cumple); font-weight:700;">${testName}</span>
            </div>

            <table class="stats-table" style="font-size:0.75rem; margin:0;">
              <tr><td>Coeficiente (${usePearson ? 'r' : 'rho'})</td><td style="font-weight:700; text-align:right; color:var(--color-cumple);">${rCoeff.toFixed(3)}</td></tr>
              <tr><td>Coeficiente R²</td><td style="font-weight:700; text-align:right;">${(rCoeff*rCoeff).toFixed(3)}</td></tr>
              <tr><td>Valor p (2-colas)</td><td style="font-weight:700; text-align:right;">${pVal.toFixed(4)}</td></tr>
              <tr><td>Ecuación de Regresión</td><td style="font-weight:700; text-align:right; font-family:monospace; color:#60a5fa;">Y = ${reg.slope.toFixed(2)}*X + ${reg.intercept.toFixed(2)}</td></tr>
            </table>
          </div>
          <div id="chart-mount-point"></div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación Experta
          </h4>
          <p>
            Se aplicó la prueba de **${testName}** debido a la ${usePearson ? 'normalidad conjunta' : 'no normalidad de una o ambas variables'} en los datos. 
            Se obtuvo un coeficiente de **${rCoeff.toFixed(3)}** con un p-valor de **${pVal.toFixed(4)}**, indicando una relación **${dir} ${force}** y **${sigText}**.
          </p>
        </div>
      `;

      resultsPanel.querySelector("#chart-mount-point").appendChild(chartDiv);

    } else if (selectedInferentialType === "auto_comparacion") {
      const varNum = inferentialVarNum;
      const varCat = inferentialVarCat;

      // Dividir en grupos por categoría
      const groups = {};
      activeDataset.forEach(row => {
        const cat = String(row[varCat]);
        const num = Number(row[varNum]);
        if (isNaN(num)) return;
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(num);
      });

      const keys = Object.keys(groups).sort();
      if (keys.length < 2) {
        alert("La variable de grupos debe tener al menos 2 categorías.");
        return;
      }

      // Evaluar normalidad global/grupal
      const numVals = activeDataset.map(r => Number(r[varNum])).filter(v => !isNaN(v));
      const normRes = calculateNormalidad(numVals);
      const isNormal = normRes.isNormal;

      let testName = "";
      let pVal = 1;
      let statText = "";
      let statVal = 0;
      let detailsHtml = "";

      if (keys.length === 2) {
        // Dos grupos: t-test vs Mann-Whitney
        const g1 = groups[keys[0]];
        const g2 = groups[keys[1]];
        if (isNormal) {
          testName = "Prueba t de Student para Muestras Independientes (Paramétrica)";
          const ttest = calculateTTest(g1, g2, keys[0], keys[1]);
          pVal = ttest.p;
          statVal = ttest.t;
          statText = `t = ${statVal.toFixed(3)} (gl = ${ttest.df.toFixed(1)})`;
        } else {
          testName = "Prueba U de Mann-Whitney (No Paramétrica)";
          const mw = calculateMannWhitney(g1, g2, keys[0], keys[1]);
          pVal = mw.p;
          statVal = mw.U;
          statText = `U = ${statVal} (z = ${mw.z.toFixed(3)})`;
        }
        
        detailsHtml = `
          <tr><td>Media grupo: <em>${keys[0]}</em></td><td style="font-weight:700; text-align:right;">${(g1.reduce((a,b)=>a+b,0)/g1.length).toFixed(2)} (n=${g1.length})</td></tr>
          <tr><td>Media grupo: <em>${keys[1]}</em></td><td style="font-weight:700; text-align:right;">${(g2.reduce((a,b)=>a+b,0)/g2.length).toFixed(2)} (n=${g2.length})</td></tr>
        `;

      } else {
        // 3 o más grupos: ANOVA vs Kruskal-Wallis
        if (isNormal) {
          testName = "Análisis de Varianza - ANOVA de una vía (Paramétrica)";
          const anova = calculateANOVA(groups, keys);
          pVal = anova.p;
          statVal = anova.F;
          statText = `F = ${statVal.toFixed(3)} (gl1 = ${anova.df1}, gl2 = ${anova.df2})`;
        } else {
          testName = "Prueba de Kruskal-Wallis (No Paramétrica)";
          const kw = calculateKruskalWallis(groups, keys);
          pVal = kw.p;
          statVal = kw.H;
          statText = `H (Chi²) = ${statVal.toFixed(3)} (gl = ${kw.df})`;
        }

        detailsHtml = keys.map(k => `
          <tr><td>Media grupo: <em>${k}</em></td><td style="font-weight:700; text-align:right;">${(groups[k].reduce((a,b)=>a+b,0)/groups[k].length).toFixed(2)} (n=${groups[k].length})</td></tr>
        `).join("");
      }

      // Dibujar caja comparativa o histograma descriptivo
      const chartList = keys.map(k => {
        const sum = groups[k].reduce((a,b)=>a+b,0);
        return { val: k, count: sum/groups[k].length, percent: 100 };
      });
      const chartDiv = render3DBarChart(chartList, `Comparación de Medias: ${varNum}`);

      const sigText = pVal < 0.05 ? "estadísticamente significativa (p < 0.05)" : "no significativa estadísticamente (p >= 0.05)";

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Comparación de Grupos Automática</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <p style="font-size:0.8rem; color:var(--text-300);">Determinación de diferencias de medias / rangos intergrupales.</p>

        <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 1.5rem; align-items: start;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15); display:flex; flex-direction:column; gap:0.5rem;">
            <h4 style="font-weight:700; color:var(--text-200); margin-bottom:0.25rem;">Validación de Normalidad</h4>
            
            <div style="font-size:0.75rem; background:rgba(255,255,255,0.02); padding:0.5rem; border-radius:6px; margin-bottom:0.5rem;">
              <strong>Supuesto de Normalidad (Shapiro-Francia):</strong><br>
              • p-valor de la muestra general: ${normRes.p.toFixed(4)}<br>
              • Distribución: <strong>${isNormal ? 'Normal (Paramétrica)' : 'No Normal (No Paramétrica)'}</strong><br>
              <strong>Prueba aplicada:</strong> <span style="color:var(--color-cumple); font-weight:700;">${testName}</span>
            </div>

            <table class="stats-table" style="font-size:0.75rem; margin:0;">
              ${detailsHtml}
              <tr style="border-top:1px solid rgba(255,255,255,0.1);">
                <td>Estadístico de la prueba</td>
                <td style="font-weight:700; text-align:right; color:#60a5fa;">${statText}</td>
              </tr>
              <tr>
                <td>p-valor resultante</td>
                <td style="font-weight:700; text-align:right; color:var(--color-cumple);">${pVal.toFixed(4)}</td>
              </tr>
            </table>
          </div>
          <div id="chart-mount-point"></div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación Experta
          </h4>
          <p>
            Se aplicó la prueba **${testName}** debido a la ${isNormal ? 'normalidad' : 'no normalidad'} evaluada de los datos continuos.
            Se obtuvo un p-valor de **${pVal.toFixed(4)}**, indicando que la diferencia en las variables es **${sigText}**.
            ${pVal < 0.05 ? "Se rechaza la hipótesis nula. Existen diferencias significativas entre los grupos evaluados." : "No se puede rechazar la hipótesis nula, lo que indica que no hay variaciones significativas intergrupales demostrables."}
          </p>
        </div>
      `;

      resultsPanel.querySelector("#chart-mount-point").appendChild(chartDiv);

    } else if (selectedInferentialType === "confiabilidad") {
      // Alfa de Cronbach
      const res = calculateCronbach();
      if (res.error) {
        alert(res.error);
        return;
      }

      // Visualización descriptiva del alfa (medidor tipo aguja)
      const pct = Math.max(0, Math.min(100, res.alpha * 100));
      
      let level = "Baja Confiabilidad";
      let levelColor = "#ef4444";
      if (res.alpha >= 0.9) { level = "Excelente consistencia interna"; levelColor = "#10b981"; }
      else if (res.alpha >= 0.8) { level = "Buena consistencia interna"; levelColor = "#34d399"; }
      else if (res.alpha >= 0.7) { level = "Aceptable consistencia interna"; levelColor = "#60a5fa"; }

      const gaugeHtml = `
        <svg width="220" height="150" viewBox="0 0 200 130" style="overflow:visible; display:block; margin:0 auto;">
          <!-- Arco fondo -->
          <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="15" stroke-linecap="round" />
          <!-- Arco relleno -->
          <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="url(#gradient-con)" stroke-dasharray="251" stroke-dashoffset="${251 - (251 * pct / 100)}" stroke-width="15" stroke-linecap="round" />
          <!-- Aguja central -->
          <circle cx="100" cy="110" r="6" fill="#fff" />
          <line x1="100" y1="110" x2="${100 + 70 * Math.cos(Math.PI * (1 - pct/100))}" y2="${110 - 70 * Math.sin(Math.PI * (1 - pct/100))}" stroke="#fff" stroke-width="3.5" />
          <!-- Texto central -->
          <text x="100" y="128" text-anchor="middle" font-size="22" font-weight="800" fill="${levelColor}">${res.alpha.toFixed(3)}</text>
          
          <defs>
            <linearGradient id="gradient-con" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ef4444" />
              <stop offset="50%" stop-color="#60a5fa" />
              <stop offset="100%" stop-color="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      `;

      resultsPanel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:1.1rem; font-weight:700; color:#fff;">Prueba de Confiabilidad (Alfa de Cronbach)</h3>
          <button class="btn btn-secondary" id="btn-export-report" style="padding:0.4rem 0.8rem; font-size:0.75rem;">
            <i data-lucide="printer" style="width:14px; height:14px; margin-right:4px;"></i> Exportar Reporte
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 1.5rem; align-items: center;">
          <div class="card" style="padding:1rem; background:rgba(0,0,0,0.15);">
            <h4 style="font-weight:700; color:var(--text-200); margin-bottom:0.75rem;">Consistencia Interna de Escala</h4>
            <table class="stats-table" style="font-size: 0.8rem; margin:0;">
              <tr><td>Alfa de Cronbach (&alpha;)</td><td style="font-weight:800; text-align:right; color:${levelColor}; font-size:1.1rem;">${res.alpha.toFixed(3)}</td></tr>
              <tr><td>Interpretación</td><td style="font-weight:700; text-align:right; color:${levelColor};">${level}</td></tr>
              <tr><td>Número de ítems (k)</td><td style="font-weight:700; text-align:right;">${res.k}</td></tr>
              <tr><td>Tamaño de Muestra (N)</td><td style="font-weight:700; text-align:right;">${res.n}</td></tr>
            </table>
          </div>
          <div class="chart-container">
            ${gaugeHtml}
          </div>
        </div>

        <div class="interpretation-box">
          <h4 style="font-weight:700; color:var(--color-cumple); margin-bottom:0.5rem; display:flex; align-items:center; gap:4px;">
            <i data-lucide="message-square-quote" style="width:16px; height:16px;"></i> Interpretación Experta
          </h4>
          <p>
            El Alfa de Cronbach obtenido fue de **${res.alpha.toFixed(3)}**, lo que indica una **${level.toLowerCase()}** del instrumento utilizado.
            ${res.alpha >= 0.70 ? "Este resultado valida la fiabilidad del cuestionario para fines de auditoría y análisis de la calidad académica en la institución." : "Se recomienda revisar la correlación interna de las preguntas del cuestionario debido al bajo nivel de consistencia registrado."}
          </p>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
    bindExportBtn();
  };

  // Bind para exportación del reporte de impresión
  const bindExportBtn = () => {
    const btnExport = container.querySelector("#btn-export-report");
    if (btnExport) {
      btnExport.onclick = () => {
        const resultsClone = resultsPanel.cloneNode(true);
        const btn = resultsClone.querySelector("#btn-export-report");
        if (btn) btn.remove();

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <title>Reporte Estadístico Avanzado - SIM-CBC</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Inter', sans-serif;
                color: #1e293b;
                background: #fff;
                padding: 3rem;
                max-width: 800px;
                margin: 0 auto;
                line-height: 1.6;
              }
              .header {
                border-bottom: 2px solid #0f172a;
                padding-bottom: 1rem;
                margin-bottom: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .title {
                font-size: 1.6rem;
                font-weight: 700;
                color: #0f172a;
                margin: 0;
              }
              .meta { font-size: 0.8rem; color: #64748b; }
              .stats-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 0.85rem;
                margin: 1.5rem 0;
              }
              .stats-table th, .stats-table td {
                padding: 0.75rem 1rem;
                border: 1px solid #e2e8f0;
                color: #334155;
              }
              .stats-table th {
                background: #f8fafc;
                color: #0f172a;
                font-weight: 600;
              }
              .chart-container {
                width: 100%;
                max-width: 450px;
                margin: 1.5rem auto;
                border: 1px solid #e2e8f0;
                padding: 1rem;
                border-radius: 8px;
              }
              svg text { fill: #1e293b !important; }
              svg line, svg path, svg rect { stroke-opacity: 0.4; }
              .interpretation-box {
                background: #f8fafc;
                border-left: 4px solid #10b981;
                padding: 1.25rem;
                margin-top: 1.5rem;
                border-radius: 0 4px 4px 0;
              }
              .interpretation-box h4 { margin: 0 0 0.5rem 0; color: #0f172a; }
              .print-btn {
                background: #0f172a;
                color: #fff;
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                margin-bottom: 2rem;
              }
              @media print {
                .print-btn { display: none; }
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            <button class="print-btn" onclick="window.print()">Guardar como PDF / Imprimir</button>
            <div class="header">
              <div>
                <h1 class="title">Reporte Estadístico de Calidad Académica</h1>
                <span class="meta">SIM-CBC • Herramientas GECA de Auditoría y Encuestas</span>
              </div>
              <div style="text-align: right;" class="meta">
                Fecha: ${new Date().toLocaleDateString('es-ES')}<br>
                Muestra Total (N): ${activeDataset.length} alumnos
              </div>
            </div>
            <div>
              ${resultsClone.innerHTML}
            </div>
          </body>
          </html>
        `);
        printWindow.document.close();
      };
    }
  };
}
