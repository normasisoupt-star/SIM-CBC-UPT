/* ==========================================================================
   SIGECA - COMPONENTE HEADER (Cabecera Principal Rediseñada)
   ========================================================================== */

export function renderHeader(title = "Dashboard", currentUser = null) {
  let roleText = "Invitado";
  if (currentUser) {
    roleText = currentUser.rol;
    if (currentUser.rol === "Profesional") {
      roleText = currentUser.subtipo === "Autoridades" ? "Prof. Autoridad" : "Prof. de Área";
    }
  }

  return `
    <header class="main-header">
      <div class="header-title-container" style="display: flex; align-items: center; gap: 0.75rem;">
        <button id="btn-toggle-sidebar" class="btn-sidebar-toggle" style="background: none; border: none; color: var(--text-100); display: none; align-items: center; justify-content: center; cursor: pointer; padding: 0.25rem; border-radius: var(--radius-md); transition: background var(--transition-fast); outline: none;">
          <i data-lucide="menu" style="width: 22px; height: 22px;"></i>
        </button>
        <h1>${title}</h1>
      </div>
      
      <div class="header-actions">
        <!-- Información de Sesión del Usuario -->
        ${currentUser ? `
          <div class="header-user-badge" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 0.4rem 0.8rem; background-color: var(--bg-dark-900); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
            <i data-lucide="user" style="width: 16px; height: 16px; color: var(--accent-light);"></i>
            <span class="header-user-name" style="font-weight: 600; color: var(--text-100);">${currentUser.nombre}</span>
            <span class="header-user-role" style="font-size: 0.7rem; background-color: var(--accent-glow); color: var(--accent-light); padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700; border: 1px solid rgba(37, 99, 235, 0.2);">${roleText}</span>
          </div>
        ` : ""}

        <!-- Selector de Tema (Dropdown) -->
        <div class="theme-dropdown" style="position: relative; display: inline-block;">
          <button id="theme-dropdown-btn" class="btn-theme" style="font-size: 0.85rem; padding: 0.4rem 0.8rem; display: flex; align-items: center; gap: 6px; background-color: var(--bg-dark-900); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-200); cursor: pointer; height: 34px; outline: none;">
            <i data-lucide="palette" style="width: 16px; height: 16px; color: var(--accent-light);"></i>
            <span>Tema</span>
            <i data-lucide="chevron-down" style="width: 14px; height: 14px; margin-left: 2px;"></i>
          </button>
          <div id="theme-dropdown-menu" style="display: none; position: absolute; right: 0; top: 110%; background-color: var(--bg-dark-700); border: 1px solid var(--border-color); border-radius: var(--radius-md); box-shadow: var(--shadow-md); z-index: 1000; min-width: 150px; flex-direction: column; overflow: hidden; padding: 4px 0;">
            <button class="theme-option-btn" data-theme="default" style="width: 100%; padding: 0.5rem 1rem; text-align: left; background: none; border: none; color: var(--text-200); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #2563eb;"></span>
              <span>Predeterminado</span>
            </button>
            <button class="theme-option-btn" data-theme="upt" style="width: 100%; padding: 0.5rem 1rem; text-align: left; background: none; border: none; color: var(--text-200); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #1b3060;"></span>
              <span>Tema UPT</span>
            </button>
            <button class="theme-option-btn" data-theme="dark" style="width: 100%; padding: 0.5rem 1rem; text-align: left; background: none; border: none; color: var(--text-200); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #000000; border: 1px solid #555;"></span>
              <span>Botón Dark</span>
            </button>
          </div>
        </div>

        <!-- Estado de Base de Datos -->
        <div class="db-status-badge">
          <span class="db-status-dot active" style="background-color: var(--color-cumple);"></span>
          <span>LocalStorage DB</span>
        </div>

        <!-- Botón de Cerrar Sesión -->
        <button class="btn-logout" id="btn-logout-action" title="Cerrar Sesión">
          <i data-lucide="log-out" style="width: 20px; height: 20px;"></i>
        </button>
      </div>
    </header>
  `;
}
