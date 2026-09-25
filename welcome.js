/* ==========================================================================
   SIGECA - PÁGINA DE BIENVENIDA Y PRESENTACIÓN INSTITUCIONAL (UPT)
   ========================================================================== */

import { renderLoginPage } from "./login.js?v=20260717.1";

/**
 * Renderiza la pantalla de bienvenida interactiva de la UPT.
 * @param {string} containerId - ID del contenedor HTML de la app
 * @param {function} onLoginSuccess - Callback cuando el inicio de sesión es exitoso
 */
export function renderWelcomePage(containerId, onLoginSuccess) {
  const container = document.getElementById(containerId);
  if (!container) return () => {};

  let hasRendered = false;
  let slideInterval = null;

  const renderNow = () => {
    if (!hasRendered) {
      hasRendered = true;
      showWelcomeContent();
    }
  };

  // Pre-cargar imágenes asíncronamente con fallback a raíz
  const bgImg = new Image();
  bgImg.onerror = () => { bgImg.src = "./universidad_privada_de_tacna_bg.jpg"; };
  bgImg.src = "./assets/universidad_privada_de_tacna_bg.jpg";

  const logoImg = new Image();
  logoImg.onerror = () => { logoImg.src = "./universidad_privada_de_tacna_logo_transparent.png"; };
  logoImg.src = "./assets/universidad_privada_de_tacna_logo_transparent.png";

  // Renderizar la pantalla inmediatamente sin esperar
  renderNow();

  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function showWelcomeContent() {
    // Render base structure HTML with a smooth initial fade-in
    container.innerHTML = `
      <div class="welcome-screen-container" style="opacity: 0; transition: opacity 0.4s ease-in-out;">
        
        <!-- Fondo animado interactivo (Video-like Slideshow) -->
        <div class="welcome-slideshow">
          <div class="slide active" style="background-image: url('./assets/universidad_privada_de_tacna_bg.jpg')"></div>
          <div class="slide" style="background-image: url('./assets/slide_LABORATORIO-8.jpg')"></div>
          <div class="slide" style="background-image: url('./assets/slide_SISTEMAS-8.jpg')"></div>
          <div class="slide" style="background-image: url('./assets/slide_CIVIL-8.jpg')"></div>
          <div class="slide" style="background-image: url('./assets/slide_MEDICINA-8.jpg')"></div>
          <div class="slide" style="background-image: url('./assets/slide_ARQUITECTURA-8.jpg')"></div>
        </div>
        
        <!-- Filtros de superposición para contraste y ambiente institucional (Azul Marino) -->
        <div class="welcome-overlay-gradient"></div>
        <div class="welcome-overlay-vignette"></div>
        <div class="welcome-glow-navy"></div>
        <div class="welcome-glow-navy-2"></div>

        <!-- Contenedor Principal Split-Screen -->
        <div class="welcome-content">
          
          <!-- Panel Izquierdo: Presentación Institucional e Información de Calidad -->
          <div class="welcome-left-panel">
            
            <!-- Encabezado de Marca UPT (Logo Todo Blanco y Grande, Sin Textos) -->
            <div class="welcome-brand">
              <div class="logo-wrapper-large">
                <img src="./assets/universidad_privada_de_tacna_logo_transparent.png" alt="Logo UPT" class="upt-logo-large">
              </div>
            </div>

            <!-- Presentación del Sistema -->
            <div class="welcome-hero-text">
              <h1 class="welcome-system-title">SIM-CBC</h1>
              <p class="welcome-system-desc">
                Sistema de Información y Monitoreo de las Condiciones Básicas de Calidad.
              </p>
            </div>

            <!-- Métricas e Hitos Institucionales Destacados (Diseño Serio e Institucional) -->
            <div class="welcome-milestones">
              
              <div class="milestone-card">
                <div class="milestone-icon">
                  <i data-lucide="award"></i>
                </div>
                <div class="milestone-details">
                  <span class="milestone-value">Licenciado desde el 2017</span>
                  <span class="milestone-desc">Condiciones básicas de calidad institucional validadas por la SUNEDU.</span>
                </div>
              </div>

              <div class="milestone-card">
                <div class="milestone-icon">
                  <i data-lucide="trophy"></i>
                </div>
                <div class="milestone-details">
                  <span class="milestone-value">Puesto 27 del Ranking</span>
                  <span class="milestone-desc">Ubicada en el ranking de universidades privadas según el IV informe bienal de SUNEDU.</span>
                </div>
              </div>

            </div>

            <!-- Oficina de Gestión de la Calidad y Carreras Profesionales -->
            <div class="welcome-careers-showcase">
              <div class="quality-office-banner">
                <div class="quality-office-header">
                  <i data-lucide="line-chart"></i>
                  <h3>Oficina de Gestión de la Calidad</h3>
                </div>
                <p class="quality-office-slogan">Trabajando por la excelencia y la mejora continua</p>
              </div>
              
              <h3 class="careers-section-title">Carreras profesionales de la UPT</h3>
              <div class="careers-carousel-container">
                <div class="careers-track" id="careers-track">
                  <!-- Se inyectarán dinámicamente -->
                </div>
              </div>
            </div>

          </div>

          <!-- Panel Derecho: Formulario de Autenticación Integrado -->
          <div class="welcome-right-panel">
            <div class="auth-card-wrapper">
              <div class="auth-header-badge">
                <i data-lucide="lock" style="width: 14px; height: 14px;"></i>
                <span>Acceso Seguro a la Plataforma</span>
              </div>
              
              <!-- Contenedor donde se inyecta el login.js -->
              <div id="welcome-login-target"></div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Trigger smooth fade-in
    requestAnimationFrame(() => {
      const screen = container.querySelector(".welcome-screen-container");
      if (screen) screen.style.opacity = "1";
    });

    // Renderizar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Inyectar el login
    renderLoginPage("welcome-login-target", onLoginSuccess);

    // Inyectar items de la marquesina
    const careers = [
      { name: "Ingeniera de Sistemas", img: "./assets/thumb_SISTEMAS-8.png" },
      { name: "Ingeniera Civil", img: "./assets/thumb_CIVIL-8.png" },
      { name: "Medicina Humana", img: "./assets/thumb_MEDICINA-8.png" },
      { name: "Arquitectura", img: "./assets/thumb_ARQUITECTURA-8.png" },
      { name: "Ingeniera Industrial", img: "./assets/thumb_INDUSTRIAL-8.png" },
      { name: "Derecho", img: "./assets/thumb_DERECHO-8.png" },
      { name: "Odontologa", img: "./assets/thumb_ODONTOLOGIA-8.png" },
      { name: "Contabilidad", img: "./assets/thumb_CONTABILIDAD-8.png" },
      { name: "Psicologa", img: "./assets/thumb_PSICOLOGIA-8.png" },
      { name: "Economa", img: "./assets/thumb_ECONOMIA-8.png" },
      { name: "Ing. Agroindustrial", img: "./assets/thumb_AGROINDUSTRIAL-8.png" },
      { name: "Ing. Ambiental", img: "./assets/thumb_AMBIENTAL-8.png" },
      { name: "Terapia Fsica", img: "./assets/thumb_TERAPIA-8.png" }
    ];

    const track = document.getElementById("careers-track");
    if (track) {
      const renderCareers = [...careers, ...careers];
      track.innerHTML = renderCareers.map((c, index) => `
        <div class="career-card" data-index="${index % careers.length}">
          <div class="career-img-wrapper">
            <img src="${c.img}" alt="${c.name}" onerror="this.src='./assets/caratula.jpg'">
          </div>
          <span class="career-name">${c.name}</span>
        </div>
      `).join("");
    }

    // Slideshow setup
    const slides = container.querySelectorAll(".welcome-slideshow .slide");
    let currentSlide = 0;

    function showSlide(index) {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove("active");
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      slides[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startSlideshow() {
      stopSlideshow();
      slideInterval = setInterval(nextSlide, 7000);
    }

    // Inicializar slideshow automático
    startSlideshow();
  }

  // Return the cleanup handler synchronously
  return () => {
    stopSlideshow();
  };
}
