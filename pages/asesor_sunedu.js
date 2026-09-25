export function renderAsesorSuneduPage(container, userRole) {
  const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user")) || { nombre: "Usuario" };
  const user_name = currentUser.nombre;
  
  let chatHistory = []; // session memory

  container.innerHTML = `
    <div class="page-content" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1.25rem; height: calc(100vh - 120px); min-height: 500px; width: 100%;">
      <!-- Split-screen Container -->
      <div style="display: flex; gap: 1.25rem; height: 100%; width: 100%; flex-wrap: wrap;">
        
        <!-- Left Panel: Chat Interface -->
        <div class="card" style="flex: 1; min-width: 320px; display: flex; flex-direction: column; background: var(--bg-dark-700); border: 1px solid var(--border-color); padding: 1rem; border-radius: 12px; height: 100%;">
          <!-- Header -->
          <div style="padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; animation: pulse 2s infinite;"></div>
              <strong style="color: var(--text-100); font-size: 0.96rem; text-transform: uppercase;">Asesor de Licenciamiento</strong>
            </div>
            <button id="btn-clear-chat" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; border: none; background: rgba(255,255,255,0.05); color: var(--text-300);">
              <i data-lucide="trash-2" style="width: 12px; height: 12px; display: inline-block; margin-right: 4px; vertical-align: middle;"></i>
              <span style="vertical-align: middle;">Limpiar Chat</span>
            </button>
          </div>
 
          <!-- Messages History Box -->
          <div id="chat-messages-box" style="flex: 1; overflow-y: auto; padding: 1rem 0; display: flex; flex-direction: column; gap: 12px;">
            <!-- Welcome message -->
            <div style="display: flex; flex-direction: column; gap: 6px; background: var(--bg-dark-600); border: 1px solid var(--border-color); padding: 1rem; border-radius: 10px; max-width: 90%; align-self: flex-start;">
              <span style="font-size: 0.9rem; color: var(--text-100); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                <i data-lucide="bot" style="width: 16px; height: 16px; color: var(--accent);"></i>
                <span>Asesor de Licenciamiento</span>
              </span>
              <p style="font-size: 0.9rem; color: var(--text-200); line-height: 1.5; margin: 0;">
                ¡Hola, <strong>${user_name}</strong>! Soy tu <strong>Asesor de Licenciamiento</strong>, un asistente virtual basado en la tecnología de Google Gemini, integrado como especialista técnico y legal de alta precisión dentro del Sistema de Información y Monitoreo de las Condiciones Básicas de Calidad (SIM-CBC). Mi propósito es guiarte, explicarte y asesorarte sobre el cumplimiento normativo universitario de SUNEDU y la Ley Universitaria.
              </p>
            </div>
          </div>
 
          <!-- Input area -->
          <div style="display: flex; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
            <input type="text" id="chat-input" class="form-input" placeholder="Pregunta sobre las normas de SUNEDU y la Ley Universitaria..." style="flex: 1; background: var(--bg-dark-800); border-color: var(--border-color); color: var(--text-100); border-radius: 8px; font-size: 0.92rem; padding: 0.6rem 0.8rem;" />
            <button id="btn-send-chat" class="btn btn-primary" style="padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; display: flex; align-items: center; gap: 6px; background: var(--accent); border: none; color: #fff;">
              <span>Preguntar</span>
              <i data-lucide="send" style="width: 14px; height: 14px;"></i>
            </button>
          </div>
        </div>

        <!-- Right Panel: PDF Viewer -->
        <div class="card" style="flex: 1.2; min-width: 380px; display: flex; flex-direction: column; background: var(--bg-dark-700); border: 1px solid var(--border-color); border-radius: 12px; height: 100%; overflow: hidden;">
          <!-- Viewer Header -->
          <div id="viewer-header" style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.1); display: none; justify-content: space-between; align-items: center;">
            <div style="min-width: 0; flex: 1;">
              <span style="font-size: 0.75rem; color: var(--text-400); text-transform: uppercase; font-weight: 700; display: block; letter-spacing: 0.05em;">Documento Citado</span>
              <strong id="viewer-doc-title" style="color: var(--text-100); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 90%;">Documento.pdf</strong>
            </div>
            <a id="viewer-download-link" href="#" download class="btn btn-secondary" style="font-size: 0.85rem; padding: 0.35rem 0.8rem; border-radius: 6px; background: var(--bg-dark-800); color: var(--text-100); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 6px; text-decoration: none;">
              <i data-lucide="download" style="width: 13px; height: 13px; color: var(--accent);"></i>
              <span>Descargar</span>
            </a>
          </div>

          <!-- Viewer Content Box -->
          <div id="viewer-content-box" style="flex: 1; display: flex; align-items: center; justify-content: center; background: var(--bg-dark-900); position: relative;">
            <!-- Empty state -->
            <div id="viewer-empty-state" style="text-align: center; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 12px; max-width: 320px;">
              <div style="background: var(--bg-dark-800); border: 1px solid var(--border-color); color: var(--text-400); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                <i data-lucide="file-text" style="width: 28px; height: 28px;"></i>
              </div>
              <h4 style="color: var(--text-100); font-size: 1rem; font-weight: 700; margin: 0;">Visor de Documentos Oficiales</h4>
              <p style="color: var(--text-300); font-size: 0.85rem; line-height: 1.5; margin: 0;">
                Cuando el Asesor encuentre una respuesta, podrás abrir el PDF original aquí para visualizar la fuente oficial citada.
              </p>
            </div>
            
            <!-- Embedded PDF Frame -->
            <iframe id="pdf-viewer-frame" style="width: 100%; height: 100%; border: none; display: none;" src=""></iframe>
          </div>
        </div>

      </div>
    </div>
    
    <style>
      @keyframes pulse {
        0% { transform: scale(0.9); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(0.9); opacity: 0.6; }
      }
    </style>
  `;

  // Attach elements
  if (window.lucide) window.lucide.createIcons();

  const messagesBox = container.querySelector("#chat-messages-box");
  const chatInput = container.querySelector("#chat-input");
  const btnSend = container.querySelector("#btn-send-chat");
  const btnClear = container.querySelector("#btn-clear-chat");
  const viewerHeader = container.querySelector("#viewer-header");
  const viewerDocTitle = container.querySelector("#viewer-doc-title");
  const viewerDownloadLink = container.querySelector("#viewer-download-link");
  const viewerEmptyState = container.querySelector("#viewer-empty-state");
  const pdfViewerFrame = container.querySelector("#pdf-viewer-frame");

  // Helper to scroll to bottom of chat
  const scrollToBottom = () => {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  // Helper to add chat bubble with streaming (word-by-word typing effect) and test-mode safety
  const appendMessage = (role, text, sourceCard = null) => {
    const isBot = role === "bot";
    const bubble = document.createElement("div");
    bubble.style.display = "flex";
    bubble.style.flexDirection = "column";
    bubble.style.gap = "6px";
    bubble.style.padding = "0.85rem 1rem";
    bubble.style.borderRadius = "10px";
    bubble.style.maxWidth = "85%";
    
    if (isBot) {
      bubble.style.alignSelf = "flex-start";
      bubble.style.background = "var(--bg-dark-600)";
      bubble.style.border = "1px solid var(--border-color)";
      bubble.style.color = "var(--text-200)";
    } else {
      bubble.style.alignSelf = "flex-end";
      bubble.style.background = "var(--accent)";
      bubble.style.color = "#fff";
    }

    const header = document.createElement("span");
    header.style.fontSize = "0.82rem";
    header.style.fontWeight = "700";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.gap = "4px";
    
    if (isBot) {
      header.style.color = "var(--accent)";
      header.innerHTML = `<i data-lucide="bot" style="width: 14px; height: 14px; color: var(--accent);"></i><span>Asesor de Licenciamiento</span>`;
    } else {
      header.style.color = "var(--text-300)";
      header.innerHTML = `<i data-lucide="user" style="width: 14px; height: 14px;"></i><span>Tú</span>`;
    }
    bubble.appendChild(header);

    // Split text into paragraphs (lines)
    const paragraphs = text.split("\n").map(p => p.trim()).filter(p => p.length > 0);
    const pElements = [];
    
    paragraphs.forEach((pText) => {
      const pEl = document.createElement("p");
      pEl.style.fontSize = "0.88rem";
      pEl.style.lineHeight = "1.5";
      pEl.style.margin = "0 0 8px 0";
      pEl.style.whiteSpace = "pre-line";
      bubble.appendChild(pEl);
      pElements.push({ el: pEl, text: pText });
    });
    
    // Remove bottom margin of last paragraph
    if (pElements.length > 0) {
      pElements[pElements.length - 1].el.style.margin = "0";
    }

    const isTestMode = window.location.search.includes("run_tests=true");
    
    if (!isBot || isTestMode) {
      // Immediate display (for user messages or when running E2E tests)
      pElements.forEach(item => {
        item.el.innerText = item.text;
      });
      if (sourceCard) {
        bubble.appendChild(sourceCard);
      }
      messagesBox.appendChild(bubble);
      if (window.lucide) window.lucide.createIcons();
      scrollToBottom();
    } else {
      // Typing effect (word-by-word) for bots in production/normal mode
      messagesBox.appendChild(bubble);
      scrollToBottom();
      
      let pIdx = 0;
      const typeNextParagraph = () => {
        if (pIdx >= pElements.length) {
          if (sourceCard) {
            bubble.appendChild(sourceCard);
            if (window.lucide) window.lucide.createIcons();
            scrollToBottom();
          }
          return;
        }
        
        const item = pElements[pIdx];
        const words = item.text.split(" ");
        let wordIdx = 0;
        
        const typeWord = () => {
          if (wordIdx >= words.length) {
            pIdx++;
            setTimeout(typeNextParagraph, 120); // Delay between paragraphs
            return;
          }
          
          item.el.innerText += (wordIdx === 0 ? "" : " ") + words[wordIdx];
          wordIdx++;
          scrollToBottom();
          setTimeout(typeWord, 30); // Typing speed: 30ms per word
        };
        
        typeWord();
      };
      
      typeNextParagraph();
    }
  };

  // Helper to load PDF in the right pane
  const loadPdfInViewer = (filename, pageNum, title) => {
    // Show header
    viewerHeader.style.display = "flex";
    viewerDocTitle.innerText = title;
    viewerDownloadLink.href = `/sunedu_docs/${filename}`;

    // Hide empty state
    viewerEmptyState.style.display = "none";
    
    // Load iframe
    pdfViewerFrame.style.display = "block";
    pdfViewerFrame.src = `/sunedu_docs/${filename}#page=${pageNum}`;
  };

  // Handle typing effect for bot response
  const appendTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.style.alignSelf = "flex-start";
    indicator.style.background = "rgba(255,255,255,0.02)";
    indicator.style.border = "1px solid rgba(255,255,255,0.04)";
    indicator.style.padding = "0.75rem 1rem";
    indicator.style.borderRadius = "10px";
    indicator.style.display = "flex";
    indicator.style.gap = "4px";
    indicator.style.alignItems = "center";
    
    indicator.innerHTML = `
      <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-400); animation: pulse 1s infinite alternate 0.1s;"></span>
      <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-400); animation: pulse 1s infinite alternate 0.2s;"></span>
      <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-400); animation: pulse 1s infinite alternate 0.3s;"></span>
    `;
    messagesBox.appendChild(indicator);
    scrollToBottom();
  };

  const removeTypingIndicator = () => {
    const indicator = container.querySelector("#typing-indicator");
    if (indicator) indicator.remove();
  };

  // Send request
  const sendQuery = async (queryText) => {
    if (!queryText.trim()) return;
    
    // Add user message
    appendMessage("user", queryText);
    chatInput.value = "";
    
    appendTypingIndicator();

    try {
      const response = await fetch("/api/asesor_sunedu/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          history: chatHistory,
          user: user_name
        })
      });
      
      const res = await response.json();
      removeTypingIndicator();
      
      if (res.status === "success") {
        // Add to history context
        chatHistory.push({ role: "user", text: queryText });
        chatHistory.push({ role: "assistant", text: res.answer, document: res.document, page: res.page });
        
        // Create citation card
        const card = document.createElement("div");
        card.style.marginTop = "8px";
        card.style.padding = "0.5rem 0.75rem";
        card.style.background = "rgba(6, 182, 212, 0.08)";
        card.style.border = "1px solid rgba(6, 182, 212, 0.2)";
        card.style.borderRadius = "8px";
        card.style.display = "flex";
        card.style.justifyContent = "space-between";
        card.style.alignItems = "center";
        card.style.gap = "10px";
        
        card.innerHTML = `
          <div style="min-width: 0; flex: 1;">
            <span style="font-size: 0.7rem; color: var(--accent-light); font-weight: 700; text-transform: uppercase; display: block;">Fuente Citada</span>
            <strong style="color: #fff; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 90%;" title="${res.title}">${res.title} (Pág. ${res.page})</strong>
          </div>
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-secondary btn-view-source" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: none; background: var(--accent); color: #fff; font-weight: 700;">Ver</button>
            <a href="${res.downloadUrl}" download class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; display: flex; align-items: center; justify-content: center;"><i data-lucide="download" style="width: 11px; height: 11px;"></i></a>
          </div>
        `;

        card.querySelector(".btn-view-source").onclick = () => {
          loadPdfInViewer(res.document, res.page, res.title);
        };

        appendMessage("bot", res.answer, card);
        
        // Auto open PDF on citation
        loadPdfInViewer(res.document, res.page, res.title);
      } else if (res.status === "derived") {
        // Alerta o derivación
        chatHistory.push({ role: "user", text: queryText });
        chatHistory.push({ role: "assistant", text: res.answer });
        
        const card = document.createElement("div");
        card.style.marginTop = "8px";
        card.style.padding = "0.5rem 0.75rem";
        card.style.background = "rgba(239, 68, 68, 0.08)";
        card.style.border = "1px solid rgba(239, 68, 68, 0.2)";
        card.style.borderRadius = "8px";
        card.innerHTML = `
          <span style="font-size: 0.75rem; color: #f87171; font-weight: 700; display: flex; align-items: center; gap: 4px;">
            <i data-lucide="shield-alert" style="width: 12px; height: 12px;"></i>
            <span>Caso derivado al Administrador</span>
          </span>
        `;
        appendMessage("bot", res.answer, card);
      } else {
        appendMessage("bot", "Error al conectar con la base de datos.");
      }
    } catch (e) {
      removeTypingIndicator();
      console.error(e);
      appendMessage("bot", "Error de comunicación con el servidor local de SIM-CBC.");
    }
  };

  btnSend.onclick = () => {
    sendQuery(chatInput.value);
  };

  chatInput.onkeydown = (e) => {
    if (e.key === "Enter") {
      sendQuery(chatInput.value);
    }
  };

  btnClear.onclick = () => {
    chatHistory = [];
    messagesBox.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); padding: 1rem; border-radius: 10px; max-width: 90%; align-self: flex-start;">
        <span style="font-size: 0.9rem; color: #fff; font-weight: 700; display: flex; align-items: center; gap: 6px;">
          <i data-lucide="bot" style="width: 16px; height: 16px; color: var(--accent);"></i>
          <span>Asesor de Licenciamiento</span>
        </span>
        <p style="font-size: 0.9rem; color: var(--text-200); line-height: 1.5; margin: 0;">
          ¡Hola, <strong>${user_name}</strong>! Soy tu <strong>Asesor de Licenciamiento</strong>, un asistente virtual basado en la tecnología de Google Gemini, integrado como especialista técnico y legal de alta precisión dentro del Sistema de Información y Monitoreo de las Condiciones Básicas de Calidad (SIM-CBC). Mi propósito es guiarte, explicarte y asesorarte sobre el cumplimiento normativo universitario de SUNEDU y la Ley Universitaria.
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    viewerHeader.style.display = "none";
    pdfViewerFrame.style.display = "none";
    pdfViewerFrame.src = "";
    viewerEmptyState.style.display = "flex";
  };
}
