// SIGECA E2E Automated Integration Test Runner
(async function() {
  if (!window.location.search.includes("run_tests=true")) {
    return;
  }

  console.log("[TEST] Starting automated E2E tests...");
  
  const report = (type, status, message) => {
    console.log(`[TEST ${status.toUpperCase()}]: ${message}`);
    fetch('/api/log_error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: `TEST_${type}`,
        message: `Status: ${status} - ${message}`,
        url: window.location.href
      })
    }).catch(err => console.error("Failed to send test log", err));
  };

  async function waitForElement(selector, timeout = 6000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const el = document.querySelector(selector);
      if (el) return el;
      await new Promise(r => setTimeout(r, 100));
    }
    throw new Error(`Timeout waiting for element: ${selector}`);
  }

  // Helper to logout
  const doLogout = async () => {
    const btn = document.querySelector("#btn-logout-action");
    if (btn) {
      report("LOGOUT", "INFO", "Clicking logout button...");
      btn.click();
    } else {
      report("LOGOUT", "INFO", "No logout button, clearing localStorage...");
      localStorage.removeItem("sigeca_current_user");
      window.location.hash = "#welcome";
    }
    await new Promise(r => setTimeout(r, 1000));
  };

  // Helper to login
  const doLogin = async (email, password, role) => {
    await doLogout();
    
    report("LOGIN", "INFO", `Logging in as ${email} (${role})...`);
    const emailInput = await waitForElement("#login-email");
    const passInput = await waitForElement("#login-password");
    const roleSelect = await waitForElement("#login-role");
    const form = await waitForElement("#login-form");
    
    emailInput.value = email;
    passInput.value = password;
    roleSelect.value = role;
    
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    passInput.dispatchEvent(new Event('input', { bubbles: true }));
    roleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    
    form.dispatchEvent(new Event('submit', { bubbles: true }));
    await new Promise(r => setTimeout(r, 2000));
  };

  try {
    // ==========================================
    // TEST 1: PLANES DE ESTUDIO CARD 6 (ADMIN)
    // ==========================================
    report("TEST1_START", "INFO", "--- Test 1: Planes de Estudio - Card 6 (Admin) ---");
    await doLogin("licencia_institucional@upt.pe", "J04qu1n.23", "Administrador");
    
    window.location.hash = "#plan";
    const tabEstadisticasBtn = await waitForElement("#btn-tab-estadisticas");
    tabEstadisticasBtn.click();
    
    const card6 = await waitForElement("#card-declarados-ano");
    if (!card6) throw new Error("Card 6 (#card-declarados-ano) not found.");
    
    const svgChart = card6.querySelector("svg");
    if (!svgChart) throw new Error("SVG chart not found inside Card 6.");
    
    const bars = card6.querySelectorAll(".bar-3d-group");
    if (bars.length === 0) throw new Error("No 3D bar groups found in Card 6 SVG chart.");
    
    let targetBar = [...bars].find(b => b.getAttribute("data-label") === "2025") || bars[0];
    targetBar.dispatchEvent(new Event('click', { bubbles: true }));
    
    await new Promise(r => setTimeout(r, 500));
    const listContainer = card6.querySelector("#detail-programs-list");
    if (!listContainer || listContainer.style.display === "none") {
      throw new Error("Detail programs list did not display on click.");
    }
    report("TEST1_SUCCESS", "SUCCESS", "Planes de Estudio Card 6 verified successfully.");

    // ==========================================
    // TEST 2: CONDICIONES BÁSICAS IMPORTADOR (ADMIN)
    // ==========================================
    report("TEST2_START", "INFO", "--- Test 2: Condiciones Básicas - Excel Importer UI (Admin) ---");
    window.location.hash = "#cbc_estadisticas";
    await new Promise(r => setTimeout(r, 1000));
    
    const statsContent = await waitForElement("#cbc-tab-estadisticas-content");
    if (!statsContent) throw new Error("#cbc-tab-estadisticas-content not found.");
    
    let dropzone = statsContent.querySelector("#cbc-excel-dropzone");
    let updateBtn = statsContent.querySelector("#btn-show-importer");
    
    if (!dropzone && !updateBtn) {
      throw new Error("Admin should see either the dropzone (empty semester) or the update button (semester with data).");
    }
    
    if (updateBtn) {
      report("TEST2_FLOW", "INFO", "Data exists. Clicking 'Cargar/Actualizar desde Excel' to show importer...");
      updateBtn.click();
      await new Promise(r => setTimeout(r, 500));
      dropzone = statsContent.querySelector("#cbc-excel-dropzone");
    }
    
    if (!dropzone) {
      throw new Error("Dropzone did not display for Admin.");
    }
    
    const templateBtn = statsContent.querySelector("#btn-download-template");
    if (!templateBtn) {
      throw new Error("Download template button not found for Admin.");
    }
    
    report("TEST2_SUCCESS", "SUCCESS", "Excel Importer UI visible and verified for Admin.");

    // ==========================================
    // TEST 3: CONDICIONES BÁSICAS RESTRICCIONES (NON-ADMIN)
    // ==========================================
    report("TEST3_START", "INFO", "--- Test 3: Condiciones Básicas - Restrictions (Non-Admin) ---");
    await doLogin("prueba20908070ab@upt.edu.pe", "ara12345", "Profesional");
    
    window.location.hash = "#cbc_estadisticas";
    await new Promise(r => setTimeout(r, 1000));
    
    const nonAdminStats = await waitForElement("#cbc-tab-estadisticas-content");
    if (!nonAdminStats) throw new Error("#cbc-tab-estadisticas-content not found for non-Admin.");
    
    const forbiddenDropzone = nonAdminStats.querySelector("#cbc-excel-dropzone");
    const forbiddenUpdateBtn = nonAdminStats.querySelector("#btn-show-importer");
    const forbiddenTemplateBtn = nonAdminStats.querySelector("#btn-download-template");
    
    if (forbiddenDropzone) throw new Error("Security Violation: Non-Admin can see the Excel dropzone!");
    if (forbiddenUpdateBtn) throw new Error("Security Violation: Non-Admin can see the 'Cargar/Actualizar' button!");
    if (forbiddenTemplateBtn) throw new Error("Security Violation: Non-Admin can see the download template button!");
    
    report("TEST3_SUCCESS", "SUCCESS", "Security constraints verified successfully. Non-Admin users cannot see import tools.");

    // ==========================================
    // TEST 4: DYNAMIC REAL-TIME SYNC
    // ==========================================
    report("TEST4_START", "INFO", "--- Test 4: Real-Time DB Synchronization (Chrome/Vivaldi) ---");
    await doLogin("licencia_institucional@upt.pe", "J04qu1n.23", "Administrador");
    window.location.hash = "#cbc_estadisticas";
    await new Promise(r => setTimeout(r, 1000));
    
    const initialText = document.querySelector("#cbc-tab-estadisticas-content").innerText;
    report("TEST4_FLOW", "INFO", "Initial state fetched. Simulating remote database change...");
    
    const db_response = await fetch("/api/db?t=" + Date.now());
    const db_data = await db_response.json();
    
    const semester = "2026-I";
    const dummyAlumno = {
      semestre: semester,
      facultad: "Facultad de Prueba Sync",
      programa: "Programa de Prueba Sync",
      cantidad: 999
    };
    
    db_data.estadisticas_institucionales = db_data.estadisticas_institucionales || {};
    db_data.estadisticas_institucionales.alumnos_regulares = (db_data.estadisticas_institucionales.alumnos_regulares || []).filter(a => a.facultad !== dummyAlumno.facultad);
    db_data.estadisticas_institucionales.alumnos_regulares.push(dummyAlumno);
    
    await fetch("/api/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db_data)
    });
    
    report("TEST4_FLOW", "INFO", "Server DB updated. Waiting 5 seconds for background sync polling to trigger...");
    await new Promise(r => setTimeout(r, 5500));
    
    const updatedText = document.querySelector("#cbc-tab-estadisticas-content").innerText;
    
    // Clean up
    db_data.estadisticas_institucionales.alumnos_regulares = db_data.estadisticas_institucionales.alumnos_regulares.filter(a => a.facultad !== dummyAlumno.facultad);
    await fetch("/api/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db_data)
    });
    
    if (initialText === updatedText) {
      throw new Error("Stats view did not redraw or update after server database change.");
    }
    
    report("TEST4_SUCCESS", "SUCCESS", "Dynamic real-time database synchronization verified successfully! UI updated automatically without refresh.");

    // ==========================================
    // TEST 5: ASESOR SUNEDU (ADMIN)
    // ==========================================
    report("TEST5_START", "INFO", "--- Test 5: Asesor SUNEDU Q&A and PDF Viewer (Admin) ---");
    window.location.hash = "#asesor_sunedu";
    await new Promise(r => setTimeout(r, 1000));

    const chatInput = await waitForElement("#chat-input");
    const btnSend = await waitForElement("#btn-send-chat");
    const messagesBox = await waitForElement("#chat-messages-box");

    // 5.1 Test valid query
    report("TEST5_FLOW", "INFO", "Sending valid query: 'creacion de escuelas'...");
    chatInput.value = "creacion de escuelas";
    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    btnSend.click();

    // Wait for bot response with citation
    report("TEST5_FLOW", "INFO", "Waiting for bot response with citation...");
    let start = Date.now();
    let citationCard = null;
    while (Date.now() - start < 25000) {
      citationCard = messagesBox.querySelector(".btn-view-source");
      if (citationCard) break;
      await new Promise(r => setTimeout(r, 100));
    }
    if (!citationCard) {
      throw new Error("Bot did not return a citation card for valid query 'creacion de escuelas'.");
    }
    const downloadLink = citationCard.closest("div").querySelector("a[download]");
    const citedPath = downloadLink ? downloadLink.getAttribute("href") : "";

    report("TEST5_FLOW", "INFO", "Citation card found. Clicking 'Ver' to verify PDF frame...");
    citationCard.click();
    await new Promise(r => setTimeout(r, 500));
    
    const iframe = document.querySelector("#pdf-viewer-frame");
    if (!iframe || iframe.style.display === "none" || (citedPath && !decodeURIComponent(iframe.src).includes(citedPath))) {
      throw new Error(`PDF viewer iframe did not load or show the correct file. Cited path: ${citedPath}, iframe src: ${iframe ? iframe.src : 'none'}`);
    }
    report("TEST5_FLOW", "INFO", "PDF Viewer successfully loaded the cited resolution page.");

    // 5.2 Test invalid query (deviation rule)
    report("TEST5_FLOW", "INFO", "Sending invalid query: 'receta de ceviche'...");
    chatInput.value = "receta de ceviche";
    chatInput.dispatchEvent(new Event('input', { bubbles: true }));
    btnSend.click();

    // Wait for deviation response
    report("TEST5_FLOW", "INFO", "Waiting for bot deviation response...");
    start = Date.now();
    let deviationBubble = null;
    while (Date.now() - start < 25000) {
      const bubbles = messagesBox.querySelectorAll("p");
      deviationBubble = [...bubbles].find(p => p.innerText.includes("No he encontrado una resolución específica para tu consulta"));
      if (deviationBubble) break;
      await new Promise(r => setTimeout(r, 100));
    }
    if (!deviationBubble) {
      throw new Error("Bot did not return the expected deviation response for query 'receta de ceviche'.");
    }
    
    const expectedDeviation = "No he encontrado una resolución específica para tu consulta en mi base de datos. He derivado tu caso con el Administrador del Sistema para una revisión personalizada.";
    if (deviationBubble.innerText.trim() !== expectedDeviation) {
      throw new Error(`Deviation text mismatch.\nExpected: "${expectedDeviation}"\nGot: "${deviationBubble.innerText.trim()}"`);
    }
    report("TEST5_SUCCESS", "SUCCESS", "Asesor SUNEDU Q&A, PDF Viewer navigation, and deviation alerts verified successfully!");

    report("ALL_SUCCESS", "SUCCESS", "All E2E tests (Planes Card 6, CBC Excel Importer RBAC, Real-Time Sync & Asesor SUNEDU) passed successfully!");
    
  } catch (err) {
    report("FAILURE", "ERROR", `Test failed: ${err.message}\nStack: ${err.stack}`);
  }
})();
