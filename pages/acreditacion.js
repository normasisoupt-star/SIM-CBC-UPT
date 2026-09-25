/* ==========================================================================
   SIGECA - PÁGINA DE ACREDITACIÓN (Estándares SINEACE, CINDA y ICACIT)
   ========================================================================== */
import { db } from "../services/db.js?v=20260623.5";

export async function renderAcreditacionPage(container, userRole = "admin", activeSubTab = "sineace") {
  const [indicadores, evidencias] = await Promise.all([
    db.getIndicadores(),
    db.getEvidencias()
  ]);

  const listIndicadores = indicadores || [];

  if (activeSubTab === "sineace") {
    const acrIndicadores = listIndicadores.filter(i => i && i.tipo === "Acreditación");
    const promAcreditacion = acrIndicadores.length > 0
      ? Math.round(acrIndicadores.reduce((acc, i) => acc + (i.porcentajeAvance || 0), 0) / acrIndicadores.length)
      : 0;

    container.innerHTML = `
      <div class="page-content">
        <!-- Progreso General SINEACE -->
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; background: linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%); margin-bottom: 1.5rem;">
          <div style="flex-grow: 1;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.5rem;">Progreso General de Acreditación (SINEACE)</h2>
            <p style="font-size: 0.85rem; color: var(--text-300); max-width: 600px; margin-bottom: 1.25rem;">
              El porcentaje refleja la autoevaluación institucional y evidencias asociadas a los estándares del Factor 1 (Dirección Estratégica) y Factor 2 (Formación Integral).
            </p>
            <div style="width: 100%; height: 8px; background-color: var(--bg-dark-900); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
              <div style="width: ${promAcreditacion}%; height: 100%; background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%); border-radius: 4px;"></div>
            </div>
          </div>
          <div style="text-align: center; background-color: var(--bg-dark-900); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); min-width: 120px;">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Promedio</span>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-light);">${promAcreditacion}%</div>
          </div>
        </div>

        <!-- Listado de Estándares Acreditación SINEACE -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem;">Estándares de Calidad SINEACE</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${acrIndicadores.map(ind => {
              const statusClass = ind.estado === "cumple" ? "cumple" : ind.estado === "en_proceso" ? "proceso" : "nocumple";
              const statusText = ind.estado === "cumple" ? "Cumple" : ind.estado === "en_proceso" ? "En Proceso" : "No Cumple";
              
              const evs = evidencias.filter(e => e.indicadorId === ind.id);

              return `
                <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
                  <div style="flex-grow: 1; min-width: 280px;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">${ind.codigo}</span>
                      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">${ind.nombre}</h4>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">${ind.descripcion}</p>
                    
                    <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                      <span>Responsable: <strong>${ind.responsable}</strong></span>
                      <span>Evidencias subidas: <strong>${evs.length}</strong></span>
                    </div>
                  </div>

                  <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                    <span class="badge-status ${statusClass}">${statusText}</span>
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">${ind.porcentajeAvance}% avance</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Sección Informativa de Trabajo SINEACE -->
        <div class="card" style="border-left: 4px solid var(--accent); padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; background-color: rgba(37,99,235,0.03);">
          <i data-lucide="help-circle" style="color: var(--accent-light); flex-shrink: 0; width: 24px; height: 24px;"></i>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.25rem;">Etapa de Acreditación SINEACE</h4>
            <p style="font-size: 0.85rem; color: var(--text-300); line-height: 1.5;">
              Las opciones de vinculación de evidencias y autoevaluación específicas de los estándares de Acreditación SINEACE se activarán en el siguiente sprint. Por el momento, puede cargar evidencias desde el módulo de Licenciamiento vinculando sus archivos al código de indicador correspondiente.
            </p>
          </div>
        </div>
      </div>
    `;
  } else if (activeSubTab === "cinda") {
    container.innerHTML = `
      <div class="page-content">
        <!-- Progreso General CINDA -->
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; background: linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%); margin-bottom: 1.5rem;">
          <div style="flex-grow: 1;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.5rem;">Progreso General de Acreditación Internacional (CINDA)</h2>
            <p style="font-size: 0.85rem; color: var(--text-300); max-width: 600px; margin-bottom: 1.25rem;">
              Porcentaje de alineación con las pautas de evaluación y aseguramiento de la calidad internacional del Centro Interuniversitario de Desarrollo (CINDA).
            </p>
            <div style="width: 100%; height: 8px; background-color: var(--bg-dark-900); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
              <div style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%); border-radius: 4px;"></div>
            </div>
          </div>
          <div style="text-align: center; background-color: var(--bg-dark-900); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); min-width: 120px;">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Promedio</span>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-light);">0%</div>
          </div>
        </div>

        <!-- Listado de Estándares Acreditación CINDA -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem;">Criterios de Calidad Internacional (CINDA)</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex-grow: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">CINDA-01</span>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">Gestión Institucional y Académica</h4>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">Planificación estratégica, políticas institucionales, recursos financieros y viabilidad del programa académico.</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                  <span>Responsable: <strong>Dirección de Calidad</strong></span>
                  <span>Evidencias subidas: <strong>0</strong></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span class="badge-status nocumple">No Cumple</span>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">0% avance</div>
              </div>
            </div>

            <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex-grow: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">CINDA-02</span>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">Cuerpo Docente y Enseñanza-Aprendizaje</h4>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">Idoneidad del cuerpo de profesores, metodologías pedagógicas aplicadas y mecanismos de evaluación de estudiantes.</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                  <span>Responsable: <strong>Vicerrectorado Académico</strong></span>
                  <span>Evidencias subidas: <strong>0</strong></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span class="badge-status nocumple">No Cumple</span>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">0% avance</div>
              </div>
            </div>

            <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex-grow: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">CINDA-03</span>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">Resultados de Investigación e Internacionalización</h4>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">Publicaciones científicas, convenios internacionales y movilidad de estudiantes y docentes de la universidad.</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                  <span>Responsable: <strong>Dirección de Investigación</strong></span>
                  <span>Evidencias subidas: <strong>0</strong></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span class="badge-status nocumple">No Cumple</span>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">0% avance</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Informativa de Trabajo CINDA -->
        <div class="card" style="border-left: 4px solid var(--accent); padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; background-color: rgba(37,99,235,0.03);">
          <i data-lucide="help-circle" style="color: var(--accent-light); flex-shrink: 0; width: 24px; height: 24px;"></i>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.25rem;">Etapa de Acreditación CINDA</h4>
            <p style="font-size: 0.85rem; color: var(--text-300); line-height: 1.5;">
              Los procesos de vinculación de evidencias para la Acreditación Internacional CINDA se encuentran en fase de configuración de criterios específicos. El módulo completo de evaluación estará disponible en la próxima actualización del sistema.
            </p>
          </div>
        </div>
      </div>
    `;
  } else if (activeSubTab === "icacit") {
    container.innerHTML = `
      <div class="page-content">
        <!-- Progreso General ICACIT -->
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; background: linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%); margin-bottom: 1.5rem;">
          <div style="flex-grow: 1;">
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.5rem;">Progreso General de Acreditación (ICACIT)</h2>
            <p style="font-size: 0.85rem; color: var(--text-300); max-width: 600px; margin-bottom: 1.25rem;">
              Alineación con los criterios del comité de acreditación de ingeniería, tecnología y ciencia (ICACIT) bajo el Acuerdo de Washington.
            </p>
            <div style="width: 100%; height: 8px; background-color: var(--bg-dark-900); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
              <div style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%); border-radius: 4px;"></div>
            </div>
          </div>
          <div style="text-align: center; background-color: var(--bg-dark-900); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); min-width: 120px;">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-400); font-weight: 700;">Promedio</span>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-light);">0%</div>
          </div>
        </div>

        <!-- Listado de Estándares Acreditación ICACIT -->
        <div class="card" style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1.25rem;">Criterios del Comité de Acreditación ICACIT</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex-grow: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">ICACIT-01</span>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">Resultados del Estudiante (Student Outcomes)</h4>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">Capacidad de aplicar conocimientos de matemáticas, ciencias e ingeniería, diseñar experimentos e identificar problemas complejos.</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                  <span>Responsable: <strong>Coordinación Académica</strong></span>
                  <span>Evidencias subidas: <strong>0</strong></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span class="badge-status nocumple">No Cumple</span>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">0% avance</div>
              </div>
            </div>

            <div style="padding: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: rgba(255,255,255,0.01); display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
              <div style="flex-grow: 1; min-width: 280px;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-light);">ICACIT-02</span>
                  <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100);">Mejora Continua (Continuous Improvement)</h4>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.75rem;">Mecanismos de autoevaluación sistemática y planes de acción orientados a mejorar la calidad del programa de ingeniería.</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.75rem; color: var(--text-400);">
                  <span>Responsable: <strong>Comité de Autoevaluación</strong></span>
                  <span>Evidencias subidas: <strong>0</strong></span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span class="badge-status nocumple">No Cumple</span>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-200);">0% avance</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección Informativa de Trabajo ICACIT -->
        <div class="card" style="border-left: 4px solid var(--accent); padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; background-color: rgba(37,99,235,0.03);">
          <i data-lucide="help-circle" style="color: var(--accent-light); flex-shrink: 0; width: 24px; height: 24px;"></i>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-100); margin-bottom: 0.25rem;">Etapa de Acreditación ICACIT</h4>
            <p style="font-size: 0.85rem; color: var(--text-300); line-height: 1.5;">
              Los criterios del modelo ICACIT se encuentran en fase de recopilación inicial. Las matrices completas de rúbricas de evaluación del estudiante y autoevaluación del perfil de egreso estarán disponibles próximamente.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}
