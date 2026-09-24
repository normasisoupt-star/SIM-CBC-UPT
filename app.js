/* ==========================================================================
   SIGECA - APLICACIÓN PRINCIPAL & ENRUTADOR (SPA Controller)
   ========================================================================== */
import { initOneDriveModalListener } from "./components/onedrive-modal.js?v=20260720.1";
import { db } from "./services/db.js?v=20260720.1";
import { renderWelcomePage } from "./pages/welcome.js?v=20260720.1";
import { renderSidebar } from "./components/sidebar.js?v=20260720.1";
import { renderHeader } from "./components/header.js?v=20260720.1";

// Páginas cargadas dinámicamente
import { renderDashboardPage } from "./pages/dashboard.js?v=20260720.1";
import { renderMallaPage } from "./pages/malla.js?v=20260720.1";
import { renderPlanPage } from "./pages/plan.js?v=20260720.1";
import { renderEvidenciasPage } from "./pages/evidencias.js?v=20260720.18";

import { renderEncuestasPage } from "./pages/encuestas.js?v=20260720.1";
import { renderPromptsPage } from "./pages/prompts.js?v=20260720.1";
import { renderUsuariosPage } from "./pages/usuarios.js?v=20260720.1";
import { renderSolicitudesPage } from "./pages/solicitudes.js?v=20260720.1";
import { renderAsesorSuneduPage } from "./pages/asesor_sunedu.js?v=20260720.1";
import { renderMonitoreoPage } from "./pages/monitoreo.js?v=20260720.1";
import { renderTransparenciaPage } from "./pages/transparencia.js?v=20260721.6";
import { renderTransparenciaCbcPage } from "./pages/transparencia_cbc.js?v=20260721.5";

class AppController {
  constructor() {
    this.appContainer = document.getElementById("app");
    this.currentUser = null;
    this.activePage = "dashboard";
    this.cleanupWelcome = null;
    
    // Cargar tema guardado desde localStorage
    const savedTheme = localStorage.getItem("sigeca_theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    this.init();
  }

  async init() {
    // Inicializar el escuchador global del picker de OneDrive
    initOneDriveModalListener();

    // Sincronizar base de datos en segundo plano sin congelar el renderizado (máximo 1s de espera inicial)
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await Promise.race([db.syncPromise, timeoutPromise]);
    } catch (e) {
      console.error("Error al sincronizar base de datos del servidor:", e);
    }

    // Cargar sesión guardada si existe
    const savedUser = localStorage.getItem("sigeca_current_user");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      // Validar si la ruta inicial por hash es permitida
      const page = window.location.hash.replace("#", "");
      if (this.getAllowedPages().includes(page) && this.hasPageAccess(page)) {
        this.activePage = page;
      } else {
        this.activePage = "dashboard";
        window.location.hash = "#dashboard";
      }
      this.renderAppShell();
    } else {
      this.activePage = "welcome";
      window.location.hash = "#welcome";
      this.renderWelcome();
    }

    // Escuchar cambios de Hash en la URL para enrutamiento nativo SPA
    window.addEventListener("hashchange", () => {
      const page = window.location.hash.replace("#", "");
      
      if (!this.currentUser) {
        if (page !== "welcome") {
          window.location.hash = "#welcome";
        } else {
          this.activePage = "welcome";
          this.renderWelcome();
        }
        return;
      }
      
      if (this.getAllowedPages().includes(page)) {
        this.activePage = page;
        this.navigate(page);
      }
    });
  }

  // Lista de páginas soportadas en el sistema
  getAllowedPages() {
    return [
      "welcome", "dashboard", "malla", "plan", "evidencias", "cbc_estadisticas", "transparencia", "transparencia_cbc", "asesor_sunedu", "asesor_licenciamiento",
      
      "encuestas", "prompts", "usuarios", "solicitudes", "monitoreo"
    ];
  }

  // Guardia de Navegación / Verificación de Permisos Académicos
  hasPageAccess(page) {
    if (page === "welcome") return true;
    if (!this.currentUser) return false;
    
    // El Administrador tiene acceso irrestricto
    if (this.currentUser.rol === "Administrador") return true;

    // Control de Usuarios y Monitoreo son de acceso exclusivo para el Administrador
    if (page === "usuarios" || page === "monitoreo") {
      return false;
    }

    // Solicitudes es para Profesional Estándar
    if (page === "solicitudes") {
      return this.currentUser.rol === "Profesional" && this.currentUser.subtipo === "Estándar";
    }

    // Módulos Académicos restringidos
    const areaMap = {
      plan: "Licenciamiento",
      evidencias: "Licenciamiento",
      cbc_estadisticas: "Licenciamiento",
      transparencia: "Licenciamiento",
      transparencia_cbc: "Licenciamiento",
      asesor_sunedu: "Licenciamiento",
      asesor_licenciamiento: "Licenciamiento",

    };

    const requiredArea = areaMap[page];
    if (requiredArea) {
      // Las autoridades pueden ver todas las áreas académicas
      if (this.currentUser.rol === "Profesional" && this.currentUser.subtipo === "Autoridades") {
        return true;
      }
      // Colaboradores y profesionales de área deben tener el área en su listado
      return this.currentUser.areas && this.currentUser.areas.includes(requiredArea);
    }

    // El dashboard y el resto de herramientas son accesibles para todos
    return true;
  }

  // Renderizar la pantalla de Bienvenida (que contiene el login)
  renderWelcome() {
    // Limpiar intervalos de slideshow anteriores para evitar fugas de memoria
    if (this.cleanupWelcome) {
      this.cleanupWelcome();
      this.cleanupWelcome = null;
    }

    this.cleanupWelcome = renderWelcomePage("app", (user) => {
      this.currentUser = user;
      this.activePage = "dashboard";
      window.location.hash = "#dashboard";
      this.renderAppShell();

      // Limpiar el slideshow de bienvenida al iniciar sesión
      if (this.cleanupWelcome) {
        this.cleanupWelcome();
        this.cleanupWelcome = null;
      }
    });
  }

  // Renderizar la pantalla de Login (ahora redirige al flujo de bienvenida)
  renderLogin() {
    this.renderWelcome();
  }

  // Renderizar el contorno del dashboard (Sidebar + Header + Contenido)
  renderAppShell() {
    this.appContainer.innerHTML = `
      ${renderSidebar(this.activePage)}
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
      <div class="main-wrapper">
        <div id="header-container">
          ${renderHeader(this.getPageTitle(this.activePage), this.currentUser)}
        </div>
        <div id="page-content-wrapper">
          <div class="loader-container">
            <div class="loader"></div>
            <p>Cargando módulo...</p>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    this.bindShellEvents();
    this.navigate(this.activePage);
  }

  // Capturar eventos de la estructura global (Sidebar y Cabecera)
  bindShellEvents() {
    // Toggle Sidebar en Dispositivos Móviles
    const btnToggleSidebar = this.appContainer.querySelector("#btn-toggle-sidebar");
    const sidebar = this.appContainer.querySelector(".sidebar");
    const overlay = this.appContainer.querySelector("#sidebar-overlay");
    
    if (btnToggleSidebar && sidebar && overlay) {
      btnToggleSidebar.onclick = (e) => {
        e.stopPropagation();
        sidebar.classList.toggle("sidebar-open");
        overlay.classList.toggle("active");
      };
      
      overlay.onclick = () => {
        sidebar.classList.remove("sidebar-open");
        overlay.classList.remove("active");
      };
    }

    // 1. Navegación de Items Principales del Sidebar
    const navItems = this.appContainer.querySelectorAll(".sidebar-nav .nav-item");
    navItems.forEach(item => {
      if (item.id === "nav-item-licenciamiento") {
        item.onclick = (e) => {
          e.preventDefault();
          const submenu = this.appContainer.querySelector("#lic-submenu");
          const chevron = this.appContainer.querySelector("#lic-chevron");
          if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "flex";
            chevron.style.transform = "rotate(180deg)";
          } else {
            submenu.style.display = "none";
            chevron.style.transform = "rotate(0deg)";
          }
        };
      } else if (item.id === "nav-item-acreditacion") {
        item.onclick = (e) => {
          e.preventDefault();
          const submenu = this.appContainer.querySelector("#acred-submenu");
          const chevron = this.appContainer.querySelector("#acred-chevron");
          if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "flex";
            chevron.style.transform = "rotate(180deg)";
          } else {
            submenu.style.display = "none";
            chevron.style.transform = "rotate(0deg)";
          }
        };
      } else if (item.id === "nav-item-geca") {
        item.onclick = (e) => {
          e.preventDefault();
          const submenu = this.appContainer.querySelector("#geca-submenu");
          const chevron = this.appContainer.querySelector("#geca-chevron");
          if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "flex";
            chevron.style.transform = "rotate(180deg)";
          } else {
            submenu.style.display = "none";
            chevron.style.transform = "rotate(0deg)";
          }
        };
      } else {
        item.onclick = () => {
          const page = item.getAttribute("data-page");
          window.location.hash = `#${page}`;
        };
      }
    });

    // 2. Navegación de Sub-items del Sidebar
    const subItems = this.appContainer.querySelectorAll(".sidebar-nav .nav-subitem");
    subItems.forEach(sub => {
      if (sub.id === "nav-item-cbc") {
        sub.onclick = (e) => {
          e.preventDefault();
          const submenu = this.appContainer.querySelector("#cbc-submenu");
          const chevron = this.appContainer.querySelector("#cbc-chevron");
          if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "flex";
            chevron.style.transform = "rotate(180deg)";
          } else {
            submenu.style.display = "none";
            chevron.style.transform = "rotate(0deg)";
          }
        };
      } else {
        sub.onclick = () => {
          const page = sub.getAttribute("data-page");
          if (page) window.location.hash = `#${page}`;
        };
      }
    });

    // 3. Botón de Logout
    const btnLogout = this.appContainer.querySelector("#btn-logout-action");
    if (btnLogout) {
      btnLogout.onclick = () => {
        localStorage.removeItem("sigeca_current_user");
        localStorage.removeItem("sigeca_cursos");
        localStorage.removeItem("sigeca_credit_settings");
        this.currentUser = null;
        this.renderLogin();
      };
    }

    // 4. Selector de Temas
    const themeBtn = this.appContainer.querySelector("#theme-dropdown-btn");
    const themeMenu = this.appContainer.querySelector("#theme-dropdown-menu");
    if (themeBtn && themeMenu) {
      themeBtn.onclick = (e) => {
        e.stopPropagation();
        const isHidden = themeMenu.style.display === "none" || themeMenu.style.display === "";
        themeMenu.style.display = isHidden ? "flex" : "none";
      };
      
      // Cerrar el menú al hacer clic en cualquier parte del documento
      document.addEventListener("click", () => {
        themeMenu.style.display = "none";
      });
      
      const themeOptions = themeMenu.querySelectorAll(".theme-option-btn");
      themeOptions.forEach(opt => {
        opt.onclick = () => {
          const theme = opt.getAttribute("data-theme");
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("sigeca_theme", theme);
          themeMenu.style.display = "none";
        };
      });
    }
  }

  // Enrutar dinámicamente y cargar el componente de página correspondiente
  async navigate(page) {
    const pageWrapper = document.getElementById("page-content-wrapper");
    if (!pageWrapper) return;

    // Cerrar sidebar y overlay al cambiar de página en móviles
    const sidebar = this.appContainer.querySelector(".sidebar");
    const overlay = this.appContainer.querySelector("#sidebar-overlay");
    if (sidebar && sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.remove("sidebar-open");
      if (overlay) overlay.classList.remove("active");
    }

    // Actualizar título en Header
    const headerTitle = document.querySelector(".header-title-container h1");
    if (headerTitle) {
      headerTitle.innerText = this.getPageTitle(page);
    }

    // Actualizar clases activas en Sidebar (tanto items principales como sub-items)
    const isLicenciamientoActive = ["plan", "evidencias", "cbc_estadisticas", "asesor_sunedu", "asesor_licenciamiento"].includes(page);
    const isAcreditacionActive = ["acred_sineace", "acred_cinda", "acred_icacit", "acreditacion"].includes(page);
    const isGecaActive = ["malla", "encuestas", "prompts"].includes(page);
    
    // Highlight en items principales
    const navItems = this.appContainer.querySelectorAll(".sidebar-nav .nav-item");
    navItems.forEach(item => {
      if (item.id === "nav-item-licenciamiento") {
        if (isLicenciamientoActive) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      } else if (item.id === "nav-item-acreditacion") {
        if (isAcreditacionActive) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      } else if (item.id === "nav-item-geca") {
        if (isGecaActive) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      } else {
        if (item.getAttribute("data-page") === page) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    });

    // Highlight en sub-items
    const subItems = this.appContainer.querySelectorAll(".sidebar-nav .nav-subitem");
    subItems.forEach(sub => {
      if (sub.getAttribute("data-page") === page) {
        sub.classList.add("active");
      } else {
        sub.classList.remove("active");
      }
    });

    // Expandir submenús si la página activa pertenece a ellos
    const licSubmenu = this.appContainer.querySelector("#lic-submenu");
    const licChevron = this.appContainer.querySelector("#lic-chevron");
    if (licSubmenu && licChevron) {
      if (isLicenciamientoActive) {
        licSubmenu.style.display = "flex";
        licChevron.style.transform = "rotate(180deg)";
      } else {
        licSubmenu.style.display = "none";
        licChevron.style.transform = "rotate(0deg)";
      }
    }

    const acredSubmenu = this.appContainer.querySelector("#acred-submenu");
    const acredChevron = this.appContainer.querySelector("#acred-chevron");
    if (acredSubmenu && acredChevron) {
      if (isAcreditacionActive) {
        acredSubmenu.style.display = "flex";
        acredChevron.style.transform = "rotate(180deg)";
      } else {
        acredSubmenu.style.display = "none";
        acredChevron.style.transform = "rotate(0deg)";
      }
    }

    const gecaSubmenu = this.appContainer.querySelector("#geca-submenu");
    const gecaChevron = this.appContainer.querySelector("#geca-chevron");
    if (gecaSubmenu && gecaChevron) {
      if (isGecaActive) {
        gecaSubmenu.style.display = "flex";
        gecaChevron.style.transform = "rotate(180deg)";
      } else {
        gecaSubmenu.style.display = "none";
        gecaChevron.style.transform = "rotate(0deg)";
      }
    }

    const cbcSubmenu = this.appContainer.querySelector("#cbc-submenu");
    const cbcChevron = this.appContainer.querySelector("#cbc-chevron");
    if (cbcSubmenu && cbcChevron) {
      if (["evidencias", "cbc_estadisticas", "transparencia", "transparencia_cbc", "asesor_sunedu", "asesor_licenciamiento"].includes(page)) {
        cbcSubmenu.style.display = "flex";
        cbcChevron.style.transform = "rotate(180deg)";
      } else {
        cbcSubmenu.style.display = "none";
        cbcChevron.style.transform = "rotate(0deg)";
      }
    }

    // Guardia de seguridad SPA: Validar acceso
    if (!this.hasPageAccess(page)) {
      pageWrapper.innerHTML = `
        <div class="page-content" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
          <div class="card" style="border-color: var(--color-nocumple); text-align: center; max-width: 500px; padding: 3rem 2rem;">
            <div style="background-color: var(--color-nocumple-bg); color: var(--color-nocumple); width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; border: 1px solid rgba(239, 68, 68, 0.2);">
              <i data-lucide="shield-alert" style="width: 30px; height: 30px;"></i>
            </div>
            <h3 style="color: var(--text-100); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem;">Acceso Restringido</h3>
            <p style="color: var(--text-300); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Usted no cuenta con los permisos requeridos para visualizar el módulo académico <strong>"${this.getPageTitle(page)}"</strong>.
              Si necesita acceso, puede gestionarlo a través de la sección de solicitudes del menú lateral.
            </p>
            <button class="btn btn-primary" onclick="window.location.hash = '#dashboard'">
              <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
              <span>Volver al Resumen General</span>
            </button>
          </div>
        </div>
      `;
      if (window.lucide) {
        window.lucide.createIcons();
      }
      return;
    }

    // Cargar contenido
    try {
      if (page === "dashboard") {
        await renderDashboardPage(pageWrapper);
      } else if (page === "malla") {
        await renderMallaPage(pageWrapper, this.currentUser.rol);
      } else if (page === "plan") {
        await renderPlanPage(pageWrapper, this.currentUser.rol);
      } else if (page === "evidencias") {
        await renderEvidenciasPage(pageWrapper, this.currentUser.rol, "matriz");
      } else if (page === "cbc_estadisticas") {
        await renderEvidenciasPage(pageWrapper, this.currentUser.rol, "estadisticas");
      } else if (page === "transparencia") {
        await renderTransparenciaPage(pageWrapper, this.currentUser.rol);
      } else if (page === "transparencia_cbc") {
        await renderTransparenciaCbcPage(pageWrapper, this.currentUser.rol);
      } else if (page === "asesor_sunedu" || page === "asesor_licenciamiento") {
        await renderAsesorSuneduPage(pageWrapper, this.currentUser.rol);

      } else if (page === "encuestas") {
        await renderEncuestasPage(pageWrapper, this.currentUser.rol);
      } else if (page === "prompts") {
        await renderPromptsPage(pageWrapper, this.currentUser.rol);
      } else if (page === "usuarios") {
        await renderUsuariosPage(pageWrapper);
      } else if (page === "solicitudes") {
        await renderSolicitudesPage(pageWrapper);
      } else if (page === "monitoreo") {
        await renderMonitoreoPage(pageWrapper, this.currentUser.rol);
      }
    } catch (err) {
      console.error(err);
      pageWrapper.innerHTML = `
        <div class="page-content">
          <div class="card" style="border-color: var(--color-nocumple);">
            <h3 style="color: var(--color-nocumple); margin-bottom: 0.5rem;">Error al cargar el módulo</h3>
            <p style="color: var(--text-300); font-size: 0.9rem;">
              Ocurrió un error inesperado al renderizar la página. Detalle técnico: ${err.message}
            </p>
          </div>
        </div>
      `;
    }
  }

  // Helper para obtener nombres de página
  getPageTitle(page) {
    switch(page) {
      case "dashboard": return "Resumen General de la Calidad";
      case "malla": return "Malla Curricular (C1)";
      case "plan": return "Plan de Estudios";
      case "evidencias": return "Condiciones Básicas de Calidad";
      case "cbc_estadisticas": return "Informes y Estadísticas de Calidad";
      case "transparencia": return "Transparencia (art. 11) - Ley 30220";
      case "transparencia_cbc": return "Transparencia CBC VIII";
      case "asesor_sunedu":
      case "asesor_licenciamiento": return "Asesor de Licenciamiento";

      case "encuestas": return "Analizador Estadístico de Encuestas";
      case "prompts": return "Generador Profesional de Prompts";
      case "usuarios": return "Control de Usuarios y Permisos";
      case "solicitudes": return "Solicitudes de Acceso a Áreas";
      case "monitoreo": return "Monitoreo del Sistema";
      default: return "SIGECA";
    }
  }
}

// Inicializar la SPA de forma segura evitando condiciones de carrera
const initApp = () => {
  new AppController();
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  initApp();
} else {
  document.addEventListener("DOMContentLoaded", initApp);
}
