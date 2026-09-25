/* ==========================================================================
   SIGECA - PANEL DE CONTROL Y MONITOREO DEL SISTEMA (Exclusivo Admin)
   ========================================================================== */

export async function renderMonitoreoPage(container, userRole = "Visualizador") {
  // Guardia estricta a nivel de vista
  if (userRole !== "Administrador") {
    container.innerHTML = `
      <div class="page-content" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
        <div class="card" style="border-color: var(--color-nocumple); text-align: center; max-width: 500px; padding: 3rem 2rem;">
          <div style="background-color: var(--color-nocumple-bg); color: var(--color-nocumple); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; border: 1px solid rgba(239, 68, 68, 0.2);">
            <i data-lucide="shield-alert" style="width: 30px; height: 30px;"></i>
          </div>
          <h3 style="color: var(--text-100); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;">Acceso Restringido</h3>
          <p style="color: var(--text-300); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
            El módulo de monitoreo del sistema es exclusivo para usuarios con privilegios de Administrador.
          </p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Inyectar estructura inicial
  container.innerHTML = `
    <style>
      .monitoring-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        color: var(--text-100);
      }
      .monitoring-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .m-card {
        background: var(--bg-200);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: var(--shadow-sm);
        position: relative;
        overflow: hidden;
      }
      .m-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
      }
      .m-card-success::before { background: var(--color-cumple); }
      .m-card-warning::before { background: var(--color-proceso); }
      .m-card-info::before { background: var(--color-accent, var(--color-primary)); }
      
      .m-card-icon {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .m-card-success .m-card-icon { background: rgba(16, 185, 129, 0.1); color: var(--color-cumple); }
      .m-card-warning .m-card-icon { background: rgba(245, 158, 11, 0.1); color: var(--color-proceso); }
      .m-card-info .m-card-icon { background: rgba(59, 130, 246, 0.1); color: var(--color-primary); }

      .m-card-info-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .m-card-title {
        font-size: 0.85rem;
        color: var(--text-300);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
      }
      .m-card-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-100);
      }
      .m-card-desc {
        font-size: 0.75rem;
        color: var(--text-400);
      }
      
      .monitoring-grid {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 1.5rem;
      }
      @media (max-width: 1024px) {
        .monitoring-grid {
          grid-template-columns: 1fr;
        }
      }

      .terminal-container {
        background: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 500px;
      }
      .terminal-header {
        background: #1e293b;
        padding: 0.75rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #334155;
      }
      .terminal-title {
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.85rem;
        color: #cbd5e1;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .terminal-dots {
        display: flex;
        gap: 0.35rem;
      }
      .t-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .t-dot-red { background: #ef4444; }
      .t-dot-yellow { background: #f59e0b; }
      .t-dot-green { background: #10b981; }

      .terminal-body {
        padding: 1rem;
        overflow-y: auto;
        flex-grow: 1;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.8rem;
        color: #38bdf8;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      .terminal-line {
        margin-bottom: 0.25rem;
      }
      .terminal-line.err { color: #f87171; }
      .terminal-line.warn { color: #fbbf24; }
      .terminal-line.info { color: #34d399; }
      .terminal-line.system { color: #a78bfa; }

      .audit-card {
        background: var(--bg-200);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .audit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.75rem;
      }
      .audit-title {
        font-size: 1rem;
        font-weight: 700;
      }
      .audit-table-wrapper {
        overflow-x: auto;
        max-height: 400px;
      }
      .audit-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      .audit-table th {
        background: var(--bg-300);
        color: var(--text-200);
        text-align: left;
        padding: 0.65rem;
        font-weight: 600;
        border-bottom: 2px solid var(--border-color);
      }
      .audit-table td {
        padding: 0.65rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-300);
      }
      .audit-table tr:hover {
        background: rgba(255, 255, 255, 0.02);
      }
      
      /* Heartbeat pulse animation */
      .pulse-indicator {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: var(--color-cumple);
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      .pulse-indicator::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        width: 18px;
        height: 18px;
        border: 2px solid var(--color-cumple);
        border-radius: 50%;
        animation: pulse-anim 1.5s infinite ease-out;
        opacity: 0;
      }
      @keyframes pulse-anim {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      
      .refresh-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--bg-300);
        border: 1px solid var(--border-color);
        color: var(--text-200);
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all var(--transition-fast);
      }
      .refresh-btn:hover {
        background: var(--border-color);
        color: var(--text-100);
      }
    </style>
    
    <div class="monitoring-wrapper page-content">
      <!-- Fila de Tarjetas de Estado -->
      <div class="monitoring-cards" id="m-cards-container">
        <div class="m-card m-card-success">
          <div class="m-card-icon"><i data-lucide="refresh-cw" class="animate-spin"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Sincronización Drive</div>
            <div class="m-card-value">Cargando...</div>
          </div>
        </div>
        <div class="m-card m-card-warning">
          <div class="m-card-icon"><i data-lucide="hard-drive"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Último Respaldo</div>
            <div class="m-card-value">Cargando...</div>
          </div>
        </div>
        <div class="m-card m-card-info">
          <div class="m-card-icon"><i data-lucide="database"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Cambios Registrados</div>
            <div class="m-card-value">Cargando...</div>
          </div>
        </div>
      </div>
      
      <!-- Fila Principal: Terminal Logs & Tabla Auditoría -->
      <div class="monitoring-grid">
        <!-- Columna Izquierda: Terminal Logs -->
        <div class="terminal-container">
          <div class="terminal-header">
            <div class="terminal-title">
              <span class="pulse-indicator" id="sync-pulse"></span>
              <span>syslog@sigeca:~# tail -n 50 server_logs.txt</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <button class="refresh-btn" id="btn-refresh-logs">
                <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
                <span>Refrescar</span>
              </button>
              <div class="terminal-dots">
                <span class="t-dot t-dot-red"></span>
                <span class="t-dot t-dot-yellow"></span>
                <span class="t-dot t-dot-green"></span>
              </div>
            </div>
          </div>
          <div class="terminal-body" id="terminal-body-content">
            Cargando logs del sistema...
          </div>
        </div>
        
        <!-- Columna Derecha: Tabla Auditoría -->
        <div class="audit-card">
          <div class="audit-header">
            <h4 class="audit-title">Historial de Actualizaciones BD</h4>
            <i data-lucide="history" style="color: var(--text-300); width: 18px; height: 18px;"></i>
          </div>
          <div class="audit-table-wrapper">
            <table class="audit-table">
              <thead>
                <tr>
                  <th>Fecha/Hora</th>
                  <th>Usuario</th>
                  <th>IP Origen</th>
                  <th>Tamaño</th>
                </tr>
              </thead>
              <tbody id="audit-table-body">
                <tr>
                  <td colspan="4" style="text-align: center; color: var(--text-400);">Cargando historial de cambios...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Enlazar controles
  const btnRefresh = container.querySelector("#btn-refresh-logs");
  if (btnRefresh) {
    btnRefresh.onclick = () => loadMonitoringData();
  }

  // Carga inicial
  await loadMonitoringData();

  async function loadMonitoringData() {
    const spinIcon = btnRefresh ? btnRefresh.querySelector("i") : null;
    if (spinIcon) spinIcon.classList.add("animate-spin");

    try {
      const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user")) || {};
      const userRole = currentUser.rol || "Visualizador";
      
      const response = await fetch('/api/monitoring', {
        headers: {
          'X-User-Role': userRole
        }
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          showError("Acceso Denegado: Su rol no cuenta con privilegios administrativos para monitorear el sistema.");
        } else {
          showError(`Error al cargar datos (${response.status})`);
        }
        return;
      }
      
      const data = await response.json();
      updateUI(data);
    } catch (e) {
      showError(`Error de red: ${e.message}`);
    } finally {
      if (spinIcon) spinIcon.classList.remove("animate-spin");
    }
  }

  function updateUI(data) {
    // 1. Actualizar Tarjetas
    const cardsContainer = container.querySelector("#m-cards-container");
    if (cardsContainer) {
      const syncStatusText = data.sync_active ? "Activo" : (data.last_sync_status === "error" ? "Error" : "Inactivo");
      const syncCardClass = data.sync_active ? "m-card-success" : (data.last_sync_status === "error" ? "m-card-warning" : "m-card-info");
      const syncIcon = data.sync_active ? "activity" : "alert-triangle";
      
      cardsContainer.innerHTML = `
        <div class="m-card ${syncCardClass}">
          <div class="m-card-icon"><i data-lucide="${syncIcon}"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Sincronización Drive</div>
            <div class="m-card-value">${syncStatusText}</div>
            <div class="m-card-desc">Última: ${data.last_sync_time || "Nunca"}</div>
          </div>
        </div>
        <div class="m-card m-card-warning">
          <div class="m-card-icon"><i data-lucide="hard-drive"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Último Respaldo</div>
            <div class="m-card-value">${data.last_backup_time !== "N/A" ? "Completado" : "Ninguno"}</div>
            <div class="m-card-desc">${data.last_backup_time || "N/A"}</div>
          </div>
        </div>
        <div class="m-card m-card-info">
          <div class="m-card-icon"><i data-lucide="database"></i></div>
          <div class="m-card-info-content">
            <div class="m-card-title">Cambios Registrados</div>
            <div class="m-card-value">${data.db_updates ? data.db_updates.length : 0}</div>
            <div class="m-card-desc">Últimas escrituras en BD</div>
          </div>
        </div>
      `;
    }

    // Actualizar indicador de pulso
    const pulse = container.querySelector("#sync-pulse");
    if (pulse) {
      if (data.sync_active) {
        pulse.style.background = "#10b981";
      } else {
        pulse.style.background = data.last_sync_status === "error" ? "#ef4444" : "#f59e0b";
      }
    }

    // 2. Actualizar Terminal
    const terminalBody = container.querySelector("#terminal-body-content");
    if (terminalBody) {
      terminalBody.innerHTML = "";
      if (data.logs && data.logs.length > 0) {
        data.logs.forEach(line => {
          const div = document.createElement("div");
          div.className = "terminal-line";
          
          if (line.includes("[Error]") || line.includes(" 500 ") || line.includes("Error")) {
            div.classList.add("err");
          } else if (line.includes("Advertencia") || line.includes("[Backup]") || line.includes(" 404 ") || line.includes(" 403 ")) {
            div.classList.add("warn");
          } else if (line.includes("[Database Update]") || line.includes("Sincronización") || line.includes(" 200 ")) {
            div.classList.add("info");
          } else if (line.includes("[System]") || line.includes("Starting SIGECA")) {
            div.classList.add("system");
          }
          div.textContent = line;
          terminalBody.appendChild(div);
        });
        terminalBody.scrollTop = terminalBody.scrollHeight;
      } else {
        terminalBody.innerHTML = `<div style="color: #64748b;">No hay logs disponibles en el servidor.</div>`;
      }
    }

    // 3. Actualizar Tabla de Auditoría
    const tableBody = container.querySelector("#audit-table-body");
    if (tableBody) {
      tableBody.innerHTML = "";
      if (data.db_updates && data.db_updates.length > 0) {
        const sortedUpdates = [...data.db_updates].reverse();
        sortedUpdates.forEach(update => {
          const tr = document.createElement("tr");
          const kbSize = (update.size / 1024).toFixed(2) + " KB";
          
          tr.innerHTML = `
            <td>${update.timestamp}</td>
            <td style="font-weight: 500; color: var(--text-200); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${update.email}">${update.email}</td>
            <td>${update.ip}</td>
            <td style="font-family: monospace;">${kbSize}</td>
          `;
          tableBody.appendChild(tr);
        });
      } else {
        tableBody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--text-400); padding: 1.5rem 0;">
              No se han registrado escrituras en la base de datos desde el inicio del servidor.
            </td>
          </tr>
        `;
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function showError(msg) {
    const cardsContainer = container.querySelector("#m-cards-container");
    if (cardsContainer) {
      cardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 1rem; color: #ef4444; text-align: center; font-weight: 600;">
          ${msg}
        </div>
      `;
    }
    const terminalBody = container.querySelector("#terminal-body-content");
    if (terminalBody) {
      terminalBody.innerHTML = `<div style="color: #f87171;">Fallo al conectar con el servicio de monitoreo.</div>`;
    }
  }
}
