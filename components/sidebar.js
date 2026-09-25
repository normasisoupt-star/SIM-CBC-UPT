/* ==========================================================================
   SIGECA - COMPONENTE SIDEBAR (Navegación Lateral Rediseñada con RBAC)
   ========================================================================== */

export function renderSidebar(activePage = "dashboard") {
  // Obtener usuario actual desde el almacenamiento local
  const currentUser = JSON.parse(localStorage.getItem("sigeca_current_user")) || {
    nombre: "Usuario Invitado",
    rol: "Visualizador",
    subtipo: "N/A",
    areas: []
  };

  const isLicenciamientoActive = ["plan", "evidencias", "cbc_estadisticas", "transparencia", "transparencia_cbc", "asesor_sunedu", "asesor_licenciamiento"].includes(activePage);
  const isAcreditacionActive = ["acred_sineace", "acred_cinda", "acred_icacit", "acreditacion"].includes(activePage);
  const isGecaActive = ["malla", "encuestas", "prompts"].includes(activePage);

  const userName = currentUser.nombre;
  let userRoleText = currentUser.rol === "Administrador" ? "Administrador" : "Usuario";

  // Obtener iniciales del nombre
  const userInitials = userName
    ? userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "UI";

  // Helper para verificar acceso a áreas
  const hasAccess = () => true;

  return `
    <div class="sidebar">
      <!-- Marca / Logo -->
      <div class="sidebar-brand">
        <div class="sidebar-logo">
          <i data-lucide="shield-check" style="width: 28px; height: 28px;"></i>
        </div>
        <div>
          <h2 class="sidebar-title">SIM-CBC</h2>
          <div class="sidebar-subtitle">Sistema de Información y Monitoreo CBC</div>
        </div>
      </div>
      
      <!-- Navegación -->
      <nav class="sidebar-nav">
        <!-- Dashboard Principal -->
        <a class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" data-page="dashboard">
          <i data-lucide="layout-dashboard"></i>
          <span>Resumen General</span>
        </a>

        <!-- Sección de Administración (Solo Admin) -->
        ${currentUser.rol === "Administrador" ? `
          <div class="sidebar-section-header">Administración</div>
          <a class="nav-item ${activePage === 'usuarios' ? 'active' : ''}" data-page="usuarios">
            <i data-lucide="users"></i>
            <span>Control de Usuarios</span>
          </a>
          <a class="nav-item ${activePage === 'monitoreo' ? 'active' : ''}" data-page="monitoreo">
            <i data-lucide="activity"></i>
            <span>Monitoreo del Sistema</span>
          </a>
        ` : ""}

        <!-- Sección de Solicitudes (Solo Profesional Estándar) -->
        ${currentUser.rol === "Profesional" && currentUser.subtipo === "Estándar" ? `
          <div class="sidebar-section-header">Solicitudes</div>
          <a class="nav-item ${activePage === 'solicitudes' ? 'active' : ''}" data-page="solicitudes">
            <i data-lucide="key-round"></i>
            <span>Solicitar Accesos</span>
          </a>
        ` : ""}

        <div class="sidebar-section-header">Áreas de Gestión</div>

        <!-- 1. Licenciamiento (Con Submenú) -->
        ${hasAccess("Licenciamiento") ? `
          <div class="nav-group">
            <a class="nav-item ${isLicenciamientoActive ? 'active' : ''}" id="nav-item-licenciamiento" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i data-lucide="award"></i>
                <span>Licenciamiento</span>
              </div>
              <i data-lucide="chevron-down" style="width: 16px; height: 16px; transition: transform var(--transition-fast); transform: ${isLicenciamientoActive ? 'rotate(180deg)' : 'rotate(0deg)'};" id="lic-chevron"></i>
            </a>
            
            <div class="nav-submenu" id="lic-submenu" style="display: ${isLicenciamientoActive ? 'flex' : 'none'};">
              <a class="nav-subitem ${activePage === 'plan' ? 'active' : ''}" data-page="plan">
                <i data-lucide="file-text"></i>
                <span>Plan de Estudios</span>
              </a>
              
              <!-- Condiciones Básicas (Expandible) -->
              <div class="nav-group-nested" style="width: 100%;">
                <a class="nav-subitem ${['evidencias', 'cbc_estadisticas', 'transparencia', 'transparencia_cbc', 'asesor_sunedu', 'asesor_licenciamiento'].includes(activePage) ? 'active' : ''}" id="nav-item-cbc" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-decoration: none;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i data-lucide="folder-open"></i>
                    <span>Condiciones Básicas</span>
                  </div>
                  <i data-lucide="chevron-down" style="width: 16px; height: 16px; transition: transform var(--transition-fast); transform: ${['evidencias', 'cbc_estadisticas', 'transparencia', 'transparencia_cbc', 'asesor_sunedu', 'asesor_licenciamiento'].includes(activePage) ? 'rotate(180deg)' : 'rotate(0deg)'};" id="cbc-chevron"></i>
                </a>
                
                <div class="nav-submenu" id="cbc-submenu" style="display: ${['evidencias', 'cbc_estadisticas', 'transparencia', 'transparencia_cbc', 'asesor_sunedu', 'asesor_licenciamiento'].includes(activePage) ? 'flex' : 'none'}; padding-left: 1.25rem; border-left: 1px solid rgba(255, 255, 255, 0.06); flex-direction: column; gap: 0.25rem; margin-left: 0.5rem; margin-top: 0.25rem; margin-bottom: 0.25rem;">
                  <a class="nav-subitem ${activePage === 'evidencias' ? 'active' : ''}" data-page="evidencias">
                    <i data-lucide="table-properties"></i>
                    <span>Matriz de Cumplimiento</span>
                  </a>
                  <a class="nav-subitem ${activePage === 'cbc_estadisticas' ? 'active' : ''}" data-page="cbc_estadisticas">
                    <i data-lucide="bar-chart-2"></i>
                    <span>Informes y Estadísticas</span>
                  </a>
                  <a class="nav-subitem ${activePage === 'transparencia' ? 'active' : ''}" data-page="transparencia">
                    <i data-lucide="eye"></i>
                    <span>Transparencia (art. 11)</span>
                  </a>
                  <a class="nav-subitem ${activePage === 'transparencia_cbc' ? 'active' : ''}" data-page="transparencia_cbc">
                    <i data-lucide="award"></i>
                    <span>Transparencia CBC VIII</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ` : ""}



        <!-- 5. Herramientas GECA -->
        <div class="sidebar-section-header">Herramientas</div>
        <div class="nav-group">
          <a class="nav-item ${isGecaActive ? 'active' : ''}" id="nav-item-geca" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i data-lucide="wrench"></i>
              <span>Herramientas GECA</span>
            </div>
            <i data-lucide="chevron-down" style="width: 16px; height: 16px; transition: transform var(--transition-fast); transform: ${isGecaActive ? 'rotate(180deg)' : 'rotate(0deg)'};" id="geca-chevron"></i>
          </a>
          
          <div class="nav-submenu" id="geca-submenu" style="display: ${isGecaActive ? 'flex' : 'none'};">
            <a class="nav-subitem ${activePage === 'malla' ? 'active' : ''}" data-page="malla">
              <i data-lucide="table-properties"></i>
              <span>Malla Curricular C1</span>
            </a>
            <a class="nav-subitem ${activePage === 'encuestas' ? 'active' : ''}" data-page="encuestas">
              <i data-lucide="pie-chart"></i>
              <span>Analizador de Encuestas</span>
            </a>
            <a class="nav-subitem ${activePage === 'prompts' ? 'active' : ''}" data-page="prompts">
              <i data-lucide="terminal"></i>
              <span>Generador de Prompts</span>
            </a>
          </div>
        </div>
      </nav>
      
      <!-- Footer del Perfil de Usuario -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">${userInitials}</div>
          <div class="user-info" style="min-width: 0; flex-grow: 1;">
            <span class="user-name" title="${userName}">${userName}</span>
            <span class="user-role">${userRoleText}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
