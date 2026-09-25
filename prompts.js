/* ==========================================================================
   SIGECA - GENERADOR PROFESIONAL DE PROMPTS (Herramientas GECA)
   ========================================================================== */

// Ideas de ejemplo rápidas para poblar el formulario
const MOCK_IDEAS = [
  {
    title: "Redactar Correo Formal",
    idea: "Escribir un correo electrónico formal al Decano solicitando prórroga para la entrega de la carpeta de autoevaluación debido a demoras en la firma de las actas.",
    platform: "chatgpt",
    tone: "profesional",
    template: "estandar"
  },
  {
    title: "Analizar Notas en Excel",
    idea: "Analizar una tabla de calificaciones finales de alumnos, identificar a los que tienen bajo rendimiento y proponer un plan de tutoría académica personalizado.",
    platform: "gemini",
    tone: "tecnico",
    template: "cot"
  },
  {
    title: "Crear Rúbrica SINEACE",
    idea: "Crear una rúbrica analítica detallada con niveles de desempeño (Inicio, Proceso, Logrado, Sobresaliente) para evaluar el portafolio de evidencias de egreso de Ingeniería.",
    platform: "gemini",
    tone: "academico",
    template: "few_shot"
  },
  {
    title: "Diseñar Script de Malla C1",
    idea: "Desarrollar un código en JavaScript que verifique los prerrequisitos de una lista de cursos cargados en un array y resalte los cruces de horario en una malla.",
    platform: "chatgpt",
    tone: "tecnico",
    template: "estandar"
  }
];

export async function renderPromptsPage(container, userRole = "admin") {
  // Estado local de la página
  let selectedPlatform = "chatgpt";
  let selectedTone = "profesional";
  let selectedTemplate = "estandar";

  // Dibujar UI base y estilos CSS específicos
  container.innerHTML = `
    <style>
      .prompts-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        color: var(--text-100);
      }

      .prompts-layout {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 1.5rem;
        align-items: start;
      }

      .prompts-card {
        background: rgba(15, 23, 42, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        backdrop-filter: blur(10px);
      }

      /* Chips de Plataforma */
      .platform-selector {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        margin-top: 0.25rem;
      }

      .platform-chip {
        padding: 0.6rem 0.5rem;
        font-size: 0.78rem;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        color: var(--text-300);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
      }

      .platform-chip:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.06);
        color: #fff;
      }

      .platform-chip.active {
        background: linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.25) 100%);
        border-color: #60a5fa;
        color: #fff;
        box-shadow: 0 4px 15px -3px rgba(59, 130, 246, 0.3);
      }

      /* Ideas Rápidas */
      .quick-ideas-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }

      .quick-idea-card {
        padding: 0.6rem 0.8rem;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.78rem;
        font-weight: 500;
        color: var(--text-200);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .quick-idea-card:hover {
        background: rgba(16, 185, 129, 0.06);
        border-color: var(--color-cumple);
        color: #fff;
      }

      /* Contenedor de Prompt Generado */
      .output-prompt-box {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 1.25rem;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        font-size: 0.82rem;
        line-height: 1.5;
        color: #e2e8f0;
        white-space: pre-wrap;
        word-break: break-word;
        max-height: 420px;
        overflow-y: auto;
        position: relative;
      }

      /* Accordion */
      .accordion-item {
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding-top: 0.75rem;
        margin-top: 0.5rem;
      }

      .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--text-200);
      }

      .accordion-content {
        font-size: 0.78rem;
        color: var(--text-400);
        margin-top: 0.4rem;
        line-height: 1.45;
        display: none;
      }
    </style>

    <div class="prompts-wrapper">
      
      <!-- Fila de Introducción -->
      <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; background: linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.5) 100%);">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 0.5rem;">
          <i data-lucide="terminal" style="color: var(--color-cumple);"></i>
          <span>Generador Inteligente de Prompts Académicos</span>
        </h3>
        <p style="font-size: 0.82rem; color: var(--text-300); margin: 0; line-height: 1.5;">
          Escriba su idea en un lenguaje simple. El sistema aplicará técnicas avanzadas de ingeniería de prompts 
          (RTCE Framework) para reescribir su instrucción estructuradamente, evitando alucinaciones y optimizándola para la IA que elija.
        </p>
      </div>

      <!-- Diseño Principal -->
      <div class="prompts-layout">
        
        <!-- Panel Izquierdo: Configuración e Idea -->
        <div class="prompts-card">
          
          <!-- Ideas Rápidas -->
          <div>
            <label style="font-size: 0.78rem; color: var(--text-400); font-weight: 600; text-transform: uppercase;">Ideas Rápidas de Ejemplo</label>
            <div class="quick-ideas-grid" style="margin-top: 0.4rem;">
              ${MOCK_IDEAS.map((item, idx) => `
                <div class="quick-idea-card" data-index="${idx}">
                  <i data-lucide="sparkles" style="width: 12px; height: 12px; color: var(--color-cumple); flex-shrink: 0;"></i>
                  <span>${item.title}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Cuadro de texto de la Idea -->
          <div class="form-group">
            <label for="prompt-input-idea" style="font-size: 0.85rem; font-weight: 600;">Escriba su idea o instrucción básica:</label>
            <textarea id="prompt-input-idea" class="input-control" rows="5" style="resize: vertical; font-size: 0.85rem; padding: 0.75rem; line-height: 1.45;" placeholder="Ej. Redactar una carta formal solicitando prórroga del plan de estudios..."></textarea>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.25rem; font-size: 0.72rem; color: var(--text-400);">
              <span>Describa lo que desea lograr de forma directa.</span>
              <span id="idea-char-count">0 caracteres</span>
            </div>
          </div>

          <!-- Selección de Plataforma -->
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 0.4rem;">Plataforma de Destino / IA:</label>
            <div class="platform-selector">
              <button type="button" class="platform-chip active" data-platform="chatgpt">
                <i data-lucide="message-square" style="width: 18px; height: 18px;"></i>
                <span>ChatGPT</span>
              </button>
              <button type="button" class="platform-chip" data-platform="gemini">
                <i data-lucide="gem" style="width: 18px; height: 18px;"></i>
                <span>Gemini</span>
              </button>
              <button type="button" class="platform-chip" data-platform="notebook">
                <i data-lucide="book-open" style="width: 18px; height: 18px;"></i>
                <span>NotebookLM</span>
              </button>
              <button type="button" class="platform-chip" data-platform="otro">
                <i data-lucide="cpu" style="width: 18px; height: 18px;"></i>
                <span>Otro</span>
              </button>
            </div>

            <!-- Campo dinámico para 'Otro' -->
            <div class="form-group" id="group-custom-platform" style="display: none; margin-top: 0.75rem;">
              <label for="prompt-custom-platform" style="font-size: 0.75rem; color: var(--text-300);">Especifique la Plataforma / IA:</label>
              <input type="text" id="prompt-custom-platform" class="input-control" placeholder="Ej. Claude 3.5 Sonnet, DeepSeek, Llama 3..." style="font-size: 0.8rem; padding: 0.45rem 0.65rem;">
            </div>
          </div>

          <!-- Ajustes Avanzados: Grid de 2 columnas -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label for="prompt-select-tone">Tono de la Respuesta</label>
              <select id="prompt-select-tone" class="input-control" style="font-size: 0.8rem;">
                <option value="profesional" selected>Profesional y formal</option>
                <option value="tecnico">Técnico y descriptivo</option>
                <option value="academico">Académico y riguroso</option>
                <option value="creativo">Creativo e innovador</option>
                <option value="directo">Directo e imperativo</option>
              </select>
            </div>

            <div class="form-group">
              <label for="prompt-select-template">Estructura del Prompt</label>
              <select id="prompt-select-template" class="input-control" style="font-size: 0.8rem;">
                <option value="estandar" selected>Estándar (Rol + Tarea)</option>
                <option value="cot">Paso a paso (Chain of Thought)</option>
                <option value="few_shot">Basado en Ejemplos (Few-Shot)</option>
              </select>
            </div>
          </div>

          <!-- Botón de Generar -->
          <button type="button" class="btn btn-primary" id="btn-generate-prompt" style="width: 100%; justify-content: center; gap: 0.5rem; font-weight: 700; padding: 0.75rem;">
            <i data-lucide="wand2"></i>
            <span>Optimizar y Generar Prompt</span>
          </button>

        </div>

        <!-- Panel Derecho: Prompt Optimizado -->
        <div class="prompts-card" id="panel-output-prompt" style="min-height: 480px; justify-content: space-between;">
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 1rem; font-weight: 700; color: #fff;">Prompt Profesional Generado</h4>
              <span class="status-pill cumple" id="badge-target-ia" style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase;">
                ChatGPT
              </span>
            </div>

            <!-- Aviso de Privacidad Persistente -->
            <div style="padding: 0.6rem 0.75rem; border-radius: 8px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.12); font-size: 0.75rem; color: #fca5a5; display: flex; align-items: start; gap: 0.5rem; line-height: 1.4;">
              <i data-lucide="shield-alert" style="width: 16px; height: 16px; flex-shrink: 0; color: #f87171; margin-top: 1px;"></i>
              <span><strong>Aviso de Privacidad:</strong> Los prompts creados no se almacenan. Al cerrar la sesión o presionar "Iniciar otro prompt", todos los textos e ideas se eliminarán permanentemente del navegador.</span>
            </div>

            <!-- Caja de Salida del Prompt -->
            <div id="output-prompt-placeholder" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--text-400); padding: 4rem 1rem; border: 1px dashed rgba(255,255,255,0.06); border-radius: 8px;">
              <i data-lucide="terminal" style="width: 44px; height: 44px; margin-bottom: 0.75rem; opacity: 0.4;"></i>
              <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-300);">Listo para Construir</h5>
              <p style="font-size: 0.78rem; max-width: 300px; margin-top: 0.25rem;">
                Escriba su idea o elija un ejemplo rápido a la izquierda y presione "Optimizar y Generar Prompt".
              </p>
            </div>

            <div id="output-prompt-content" style="display: none; flex-direction: column; gap: 1rem;">
              <div class="output-prompt-box" id="box-prompt-text"></div>
              
              <!-- Botones de Acción -->
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 0.75rem;">
                  <button type="button" class="btn btn-primary" id="btn-copy-prompt" style="justify-content: center; gap: 0.4rem; padding: 0.6rem;">
                    <i data-lucide="copy" id="icon-copy"></i>
                    <span id="text-copy">Copiar al Portapapeles</span>
                  </button>
                  <a href="https://chatgpt.com" target="_blank" class="btn btn-secondary" id="btn-open-chat" style="justify-content: center; gap: 0.4rem; padding: 0.6rem; text-decoration: none;">
                    <i data-lucide="external-link"></i>
                    <span>Abrir Chat IA</span>
                  </a>
                </div>
                <button type="button" class="btn btn-secondary" id="btn-reset-prompt" style="width: 100%; font-size: 0.78rem; padding: 0.55rem; justify-content: center; gap: 0.4rem; border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.04); color: #fca5a5;">
                  <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
                  <span>Iniciar otro prompt</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Sección Educativa Accordion -->
          <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;" id="educational-panel">
            <h5 style="font-size: 0.8rem; font-weight: 700; color: var(--text-200); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.25rem;">
              <i data-lucide="graduation-cap" style="color: var(--color-cumple); width: 14px; height: 14px;"></i>
              Explicación del Diseño del Prompt:
            </h5>
            
            <div class="accordion-item">
              <div class="accordion-header" id="acc-header-1">
                <span>1. Asignación del Rol Profesional</span>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
              </div>
              <div class="accordion-content" id="acc-content-1">
                Para que la IA responda con precisión, el generador analiza palabras clave en su idea y le asigna un rol experto específico. Esto altera la "temperatura" conceptual de la IA, enfocando sus respuestas en las mejores prácticas de esa disciplina.
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" id="acc-header-2">
                <span>2. Framework de Estructuración (RTCE)</span>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
              </div>
              <div class="accordion-content" id="acc-content-2">
                El prompt se divide en Rol (quién es), Tarea (qué hace), Contexto (por qué lo hace) y Expectativa (cómo debe verse el resultado). Esta separación evita divagaciones y entrega respuestas altamente formateadas.
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-header" id="acc-header-3">
                <span>3. Delimitadores y Restricciones</span>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
              </div>
              <div class="accordion-content" id="acc-content-3">
                Se agregan instrucciones de control como "razona paso a paso" o "no inventes hechos", además de delimitadores markdown/XML. Esto es crucial para plataformas como Gemini y Claude, reduciendo errores y previniendo la alucinación de datos.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  // Inicializar Lucide
  if (window.lucide) window.lucide.createIcons();

  // Elementos DOM
  const textareaIdea = container.querySelector("#prompt-input-idea");
  const charCountSpan = container.querySelector("#idea-char-count");
  const chipsPlatform = container.querySelectorAll(".platform-chip");
  const groupCustomPlatform = container.querySelector("#group-custom-platform");
  const inputCustomPlatform = container.querySelector("#prompt-custom-platform");
  const selectTone = container.querySelector("#prompt-select-tone");
  const selectTemplate = container.querySelector("#prompt-select-template");
  const btnGenerate = container.querySelector("#btn-generate-prompt");
  
  const placeholderPanel = container.querySelector("#output-prompt-placeholder");
  const contentPanel = container.querySelector("#output-prompt-content");
  const badgeTargetIA = container.querySelector("#badge-target-ia");
  const boxPromptText = container.querySelector("#box-prompt-text");
  
  const btnCopy = container.querySelector("#btn-copy-prompt");
  const iconCopy = container.querySelector("#icon-copy");
  const textCopy = container.querySelector("#text-copy");
  const btnOpenChat = container.querySelector("#btn-open-chat");
  const quickIdeas = container.querySelectorAll(".quick-idea-card");

  // Contador de caracteres
  textareaIdea.oninput = () => {
    charCountSpan.innerText = `${textareaIdea.value.length} caracteres`;
  };

  // Manejo de Chips de Plataforma
  chipsPlatform.forEach(chip => {
    chip.onclick = () => {
      chipsPlatform.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      selectedPlatform = chip.getAttribute("data-platform");

      if (selectedPlatform === "otro") {
        groupCustomPlatform.style.display = "block";
        inputCustomPlatform.focus();
      } else {
        groupCustomPlatform.style.display = "none";
      }

      // Actualizar enlace externo
      updateExternalChatUrl();
    };
  });

  // Actualizar enlace al chat externo
  const updateExternalChatUrl = () => {
    let url = "https://chatgpt.com";
    if (selectedPlatform === "gemini") url = "https://gemini.google.com";
    else if (selectedPlatform === "notebook") url = "https://notebooklm.google.com";
    btnOpenChat.setAttribute("href", url);
  };

  // Carga de Ideas Rápidas
  quickIdeas.forEach(card => {
    card.onclick = () => {
      const idx = card.getAttribute("data-index");
      const item = MOCK_IDEAS[idx];
      
      textareaIdea.value = item.idea;
      charCountSpan.innerText = `${item.idea.length} caracteres`;
      
      // Ajustar plataforma
      selectedPlatform = item.platform;
      chipsPlatform.forEach(c => {
        if (c.getAttribute("data-platform") === selectedPlatform) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });
      groupCustomPlatform.style.display = selectedPlatform === "otro" ? "block" : "none";

      // Ajustar tono y plantilla
      selectTone.value = item.tone;
      selectTemplate.value = item.template;
      
      selectedTone = item.tone;
      selectedTemplate = item.template;

      updateExternalChatUrl();
    };
  });

  // Accordion Logic
  const accordionHeaders = container.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.onclick = () => {
      const parent = header.parentElement;
      const content = parent.querySelector(".accordion-content");
      const chevron = header.querySelector("[data-lucide='chevron-down']");
      
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
      
      if (chevron) {
        chevron.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
      }
    };
  });

  // Copiar al Portapapeles con fallback para entornos HTTP no seguros
  btnCopy.onclick = () => {
    const text = boxPromptText.innerText;
    if (!text) return;

    const showSuccessState = () => {
      textCopy.innerText = "¡Copiado con éxito!";
      btnCopy.classList.remove("btn-primary");
      btnCopy.classList.add("btn-success");
      
      if (window.lucide) {
        btnCopy.querySelector("i").outerHTML = `<i data-lucide="check" id="icon-copy"></i>`;
        window.lucide.createIcons();
      }

      setTimeout(() => {
        textCopy.innerText = "Copiar al Portapapeles";
        btnCopy.classList.remove("btn-success");
        btnCopy.classList.add("btn-primary");
        if (window.lucide) {
          btnCopy.querySelector("i").outerHTML = `<i data-lucide="copy" id="icon-copy"></i>`;
          window.lucide.createIcons();
        }
      }, 2000);
    };

    // Intentar con la API moderna navigator.clipboard si está disponible (HTTPS / localhost)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(showSuccessState)
        .catch(() => runFallbackCopy(text));
    } else {
      runFallbackCopy(text);
    }

    function runFallbackCopy(textToCopy) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        
        if (successful) {
          showSuccessState();
        } else {
          throw new Error("execCommand copy falló");
        }
      } catch (err) {
        console.error("Error en fallback de copia:", err);
        // Si todo falla, seleccionamos el texto del cuadro para facilitar que el usuario presione Ctrl+C
        window.getSelection().removeAllRanges();
        const range = document.createRange();
        range.selectNode(boxPromptText);
        window.getSelection().addRange(range);
        alert("Selección automática realizada. Por favor presione Ctrl+C (o mantenga presionado para copiar en celular) debido a limitaciones de seguridad de su navegador.");
      }
    }
  };

  // Lógica de Generación de Prompt
  btnGenerate.onclick = () => {
    const ideaText = textareaIdea.value.trim();
    if (!ideaText) {
      alert("Por favor ingrese una idea básica para estructurar el prompt.");
      return;
    }

    // Cambiar estado a cargando
    btnGenerate.disabled = true;
    const originalBtnHtml = btnGenerate.innerHTML;
    btnGenerate.innerHTML = `
      <div class="loader" style="width: 14px; height: 14px; margin-right: 4px;"></div>
      <span>Analizando y Estructurando...</span>
    `;

    setTimeout(() => {
      // Compilar el prompt
      const compiledPrompt = compilePrompt(ideaText);
      
      // Mostrar salida
      placeholderPanel.style.display = "none";
      contentPanel.style.display = "flex";
      boxPromptText.innerText = compiledPrompt;

      // Actualizar badge
      let platformName = selectedPlatform;
      if (selectedPlatform === "otro") {
        platformName = inputCustomPlatform.value.trim() || "IA Genérica";
      }
      badgeTargetIA.innerText = platformName;

      // Restablecer botón
      btnGenerate.disabled = false;
      btnGenerate.innerHTML = originalBtnHtml;
      if (window.lucide) window.lucide.createIcons();
    }, 800); // Retardo artificial para micro-animación premium
  };

  const resetPromptState = () => {
    textareaIdea.value = "";
    charCountSpan.innerText = "0 caracteres";
    inputCustomPlatform.value = "";
    
    selectedPlatform = "chatgpt";
    chipsPlatform.forEach(c => {
      if (c.getAttribute("data-platform") === "chatgpt") {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });
    groupCustomPlatform.style.display = "none";
    
    selectTone.value = "profesional";
    selectTemplate.value = "estandar";
    selectedTone = "profesional";
    selectedTemplate = "estandar";
    
    contentPanel.style.display = "none";
    placeholderPanel.style.display = "flex";
    boxPromptText.innerText = "";
    badgeTargetIA.innerText = "ChatGPT";

    updateExternalChatUrl();

    if (window.lucide) window.lucide.createIcons();
  };

  const btnResetPrompt = container.querySelector("#btn-reset-prompt");
  if (btnResetPrompt) {
    btnResetPrompt.onclick = () => {
      if (confirm("¿Está seguro de que desea borrar los textos actuales e iniciar un nuevo prompt?")) {
        resetPromptState();
      }
    };
  }

  // Motor del Compilador de Prompts (Framework RTCE)
  const compilePrompt = (idea) => {
    // 1. Detección Inteligente del Rol Profesional basado en Palabras Clave
    let role = "Asesor de Estrategia Académica y Consultor en Inteligencia Artificial";
    let domain = "Asistencia General";
    const lowercaseIdea = idea.toLowerCase();

    if (lowercaseIdea.includes("correo") || lowercaseIdea.includes("carta") || lowercaseIdea.includes("solicitud") || lowercaseIdea.includes("oficio") || lowercaseIdea.includes("comunicar")) {
      role = "Especialista en Comunicación Institucional y Redactor de Estilo Profesional";
      domain = "Redacción y Comunicación";
    } else if (lowercaseIdea.includes("código") || lowercaseIdea.includes("script") || lowercaseIdea.includes("javascript") || lowercaseIdea.includes("python") || lowercaseIdea.includes("programar") || lowercaseIdea.includes("html") || lowercaseIdea.includes("css") || lowercaseIdea.includes("sql") || lowercaseIdea.includes("base de datos")) {
      role = "Ingeniero de Software Senior y Arquitecto de Sistemas Académicos";
      domain = "Desarrollo y Código";
    } else if (lowercaseIdea.includes("analizar") || lowercaseIdea.includes("estadística") || lowercaseIdea.includes("datos") || lowercaseIdea.includes("excel") || lowercaseIdea.includes("normalidad") || lowercaseIdea.includes("gráfico") || lowercaseIdea.includes("encuesta") || lowercaseIdea.includes("anova") || lowercaseIdea.includes("t-test")) {
      role = "Analista de Inteligencia de Datos Educativos e Investigador Estadístico";
      domain = "Análisis Estadístico";
    } else if (lowercaseIdea.includes("rúbrica") || lowercaseIdea.includes("evaluación") || lowercaseIdea.includes("sílabo") || lowercaseIdea.includes("currículum") || lowercaseIdea.includes("competencia") || lowercaseIdea.includes("malla") || lowercaseIdea.includes("sineace") || lowercaseIdea.includes("calidad")) {
      role = "Diseñador Instruccional y Auditor de Acreditación de Calidad Universitaria (SINEACE)";
      domain = "Gestión Curricular y Acreditación";
    } else if (lowercaseIdea.includes("clase") || lowercaseIdea.includes("examen") || lowercaseIdea.includes("tutoría") || lowercaseIdea.includes("alumno") || lowercaseIdea.includes("estudiante") || lowercaseIdea.includes("enseñar")) {
      role = "Pedagogo Universitario y Mentor de Estrategia de Aprendizaje Activo";
      domain = "Metodología Educativa";
    }

    // 2. Mapeo del Tono Seleccionado
    let toneInstruction = "formal, claro, conciso y profesional";
    if (selectedTone === "tecnico") toneInstruction = "altamente preciso, con rigor técnico, estructurado por capas y basado en datos";
    else if (selectedTone === "academico") toneInstruction = "científico, formal, estructurado con vocabulario universitario y respaldado con justificaciones lógicas";
    else if (selectedTone === "creativo") toneInstruction = "innovador, dinámico, con un enfoque original, persuasivo y motivador";
    else if (selectedTone === "directo") toneInstruction = "conciso, directo al punto, imperativo, evitando explicaciones introductorias o redundancias";

    // 3. Adaptación según Plataforma de Destino (Instrucciones específicas del motor)
    let platformHeader = "";
    let platformFooter = "";
    let targetPlatformName = selectedPlatform;

    if (selectedPlatform === "chatgpt") {
      targetPlatformName = "ChatGPT";
      platformHeader = `<!-- OPTIMIZADO PARA CHATGPT (MARKDOWN ESTRUCTURADO) -->`;
      platformFooter = `Format constraints:\n- Responde exclusivamente en formato Markdown estructurado con jerarquías H2 y H3.\n- Si incluyes ejemplos o códigos, colócalos en bloques de código delimitados (\`\`\`).\n- Evita introducciones genéricas como "Aquí está el resultado..." y entrega la salida directamente.`;
    } else if (selectedPlatform === "gemini") {
      targetPlatformName = "Google Gemini";
      platformHeader = `<!-- OPTIMIZADO PARA GEMINI (XML-TAGGED GUIDELINES) -->`;
      platformFooter = `Format constraints:\n- Estructura las diferentes partes de tu respuesta utilizando secciones bien definidas.\n- Utiliza viñetas detalladas para las explicaciones.\n- Integra el razonamiento o pasos lógicos si es necesario.\n- Gemini constraint: Evita alucinaciones. Si requieres datos externos que no están explícitos en el contexto, indícalo claramente.`;
    } else if (selectedPlatform === "notebook") {
      targetPlatformName = "NotebookLM";
      platformHeader = `<!-- OPTIMIZADO PARA NOTEBOOKLM (ESTRATEGIAS BASADAS EN FUENTES) -->`;
      platformFooter = `Format constraints:\n- NotebookLM instruction: Tu respuesta debe estar estrictamente justificada y fundamentada en los documentos cargados en el cuaderno (fuentes).\n- Proporciona citas implícitas o referencias de sección cuando expliques conceptos.\n- Si la información no se encuentra en las fuentes, responde declarando que no cuentas con la información en el material cargado. No inventes hechos.`;
    } else {
      const customName = inputCustomPlatform.value.trim() || "IA Genérica";
      targetPlatformName = customName;
      platformHeader = `<!-- OPTIMIZADO PARA ${customName.toUpperCase()} -->`;
      platformFooter = `Format constraints:\n- Adáptate a las mejores prácticas de la plataforma ${customName}.\n- Entrega una estructura de salida limpia, legible y directamente aplicable a la tarea propuesta.`;
    }

    // 4. Mapeo de la Estructura (Plantilla) y Ensamblado del Prompt RTCE
    let promptResult = "";

    // Construcción del cuerpo del prompt profesional
    const rolSection = `[ROL PROFESIONAL]
Actúa como un experto con el rol de: ${role}. Tu dominio de especialización es: "${domain}".`;

    const contextSection = `[CONTEXTO Y ANTECEDENTES]
El usuario necesita realizar una tarea en el ámbito de la calidad y gestión académica universitaria.
La idea básica proporcionada por el usuario es:
"${idea}"`;

    let taskSection = `[TAREA PRINCIPAL]
Analiza la idea proporcionada y elabora un resultado completo de nivel experto. Desarrolla a detalle la instrucción original para que sea completamente profesional, rigurosa y libre de errores de redacción, lógica o formato.`;

    let constraintsSection = `[RESTRICCIONES Y TONO]
1. Tono de la respuesta: ${toneInstruction}.
2. Calidad de datos: No inventes fechas oficiales, nombres ni normativas específicas a menos que te sean provistas. Si faltan datos, coloca placeholders claros entre corchetes (ej. [Nombre del Decano]).
3. Mantén un estándar ético y académico en toda la redacción o código generado.`;

    let outputFormatSection = `[FORMATO DE SALIDA EXPECTATIVO]
Entrega el resultado final con un formato limpio y profesional:
- Utiliza títulos y subtítulos claros.
- Si es correspondencia, incluye estructura formal completa (fecha, destinatario, cuerpo, saludo, firma).
- Si es código, proporciona comentarios explicativos de cada función clave.
- Si es una rúbrica o análisis, organízalo en tablas legibles.`;

    // Modificaciones según plantilla seleccionada
    if (selectedTemplate === "cot") {
      taskSection += `\n- Razonamiento paso a paso (Chain of Thought): Antes de dar la solución o respuesta final, escribe una sección titulada "Razonamiento y Lógica" donde desgloses y analices secuencialmente las variables implicadas en la tarea.`;
      constraintsSection += `\n4. Muestra explícitamente el hilo conductor de tus deducciones para validar la calidad del proceso.`;
    } else if (selectedTemplate === "few_shot") {
      outputFormatSection += `\n- Estructura de ejemplo (Few-Shot): Si el usuario no ha provisto ejemplos, genera tú mismo un micro-ejemplo (Ejemplo de Entrada -> Ejemplo de Salida) antes de entregar el resultado final de la tarea principal, para ejemplificar el estándar de cumplimiento.`;
    }

    // Ensamblar todo el documento de prompt
    promptResult = `${platformHeader}

${rolSection}

${contextSection}

${taskSection}

${constraintsSection}

${outputFormatSection}

[INSTRUCCIONES DE FORMATO DE LA IA]
${platformFooter}`;

    return promptResult;
  };
}
