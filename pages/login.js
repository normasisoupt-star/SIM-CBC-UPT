/* ==========================================================================
   SIGECA - PÁGINA DE LOGIN Y REGISTRO (RBAC)
   ========================================================================== */

import { db } from "../services/db.js?v=20260717.2";

export function renderLoginPage(containerId, onLoginSuccess) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="login-container">
      <div class="login-background-glow"></div>
      <div class="login-background-glow-2"></div>
      
      <div class="login-card" id="auth-card">
        <!-- VISTA DE LOGIN -->
        <div id="login-view">
          <div class="login-header">
            <div class="login-logo">
              <i data-lucide="shield-check" style="width: 50px; height: 50px;"></i>
            </div>
            <h1 class="login-title">SIM-CBC</h1>
            <p class="login-subtitle">Sistema de Información y Monitoreo de las Condiciones Básicas de Calidad</p>
          </div>

          <div id="login-message" class="alert-message" style="display: none; margin-bottom: 1rem; padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;"></div>
          
          <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-group">
              <label for="login-email">Correo Institucional</label>
              <input type="email" id="login-email" class="input-control" placeholder="usuario@institucion.edu.pe" required>
            </div>
            
            <div class="form-group">
              <label for="login-password">Contraseña</label>
              <input type="password" id="login-password" class="input-control" placeholder="••••••••" required>
            </div>

            <div class="form-group">
              <label for="login-role">Rol para Acceder</label>
              <select id="login-role" class="input-control" style="background-color: var(--bg-dark-900); color: var(--text-100);" required>
                <option value="" disabled selected>Seleccione su rol...</option>
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
              </select>
            </div>
            
            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.8rem;">
              <span>Iniciar Sesión</span>
              <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="#" id="go-to-register" style="color: var(--accent-light); font-size: 0.85rem; text-decoration: none; font-weight: 500; transition: color var(--transition-fast);">
              ¿No tienes una cuenta? Regístrate aquí
            </a>
          </div>
        </div>

        <!-- VISTA DE REGISTRO -->
        <div id="register-view" style="display: none;">
          <div class="login-header" style="margin-bottom: 1.5rem;">
            <div class="login-logo" style="margin-bottom: 0.5rem;">
              <i data-lucide="user-plus" style="width: 45px; height: 45px;"></i>
            </div>
            <h1 class="login-title" style="font-size: 1.5rem;">Crear Cuenta</h1>
            <p class="login-subtitle">Registro en el Sistema de Gestión de Calidad</p>
          </div>

          <div id="register-message" class="alert-message" style="display: none; margin-bottom: 1rem; padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem;"></div>

          <form id="register-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="form-group">
              <label for="reg-nombre">Nombre Completo</label>
              <input type="text" id="reg-nombre" class="input-control" placeholder="Ej. Dr. Carlos Mendoza" required>
            </div>

            <div class="form-group">
              <label for="reg-email">Correo Institucional</label>
              <input type="email" id="reg-email" class="input-control" placeholder="usuario@institucion.edu.pe" required>
            </div>

            <div class="form-group">
              <label for="reg-password">Contraseña</label>
              <input type="password" id="reg-password" class="input-control" placeholder="Mínimo 6 caracteres" required minlength="6">
            </div>

            <div class="form-group">
              <label for="reg-rol">Tipo de Cuenta Solicitada</label>
              <select id="reg-rol" class="input-control" style="background-color: var(--bg-dark-900); color: var(--text-100);" required>
                <option value="Usuario" selected>Usuario (Lectura y Monitoreo SIM-CBC)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.8rem;">
              <span>Registrarse</span>
              <i data-lucide="user-check" style="width: 18px; height: 18px;"></i>
            </button>
          </form>

          <div style="text-align: center; margin-top: 1rem;">
            <a href="#" id="go-to-login" style="color: var(--accent-light); font-size: 0.85rem; text-decoration: none; font-weight: 500; transition: color var(--transition-fast);">
              ¿Ya tienes una cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Renderizar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Elementos del DOM
  const loginView = document.getElementById("login-view");
  const registerView = document.getElementById("register-view");
  const goToRegister = document.getElementById("go-to-register");
  const goToLogin = document.getElementById("go-to-login");

  const loginForm = document.getElementById("login-form");
  const loginMsg = document.getElementById("login-message");

  const registerForm = document.getElementById("register-form");
  const registerMsg = document.getElementById("register-message");
  const regRol = document.getElementById("reg-rol");

  // Mostrar mensaje de alerta
  function showMessage(element, text, type = "error") {
    element.textContent = text;
    element.style.display = "block";
    if (type === "success") {
      element.style.backgroundColor = "var(--color-cumple-bg)";
      element.style.color = "var(--color-cumple)";
      element.style.border = "1px solid rgba(16, 185, 129, 0.2)";
    } else {
      element.style.backgroundColor = "var(--color-nocumple-bg)";
      element.style.color = "var(--color-nocumple)";
      element.style.border = "1px solid rgba(239, 68, 68, 0.2)";
    }
  }

  // Navegación entre vistas
  goToRegister.onclick = (e) => {
    e.preventDefault();
    loginView.style.display = "none";
    registerView.style.display = "block";
    registerForm.reset();
    registerMsg.style.display = "none";
  };

  goToLogin.onclick = (e) => {
    e.preventDefault();
    registerView.style.display = "none";
    loginView.style.display = "block";
    loginForm.reset();
    loginMsg.style.display = "none";
  };

  // Procesar Login Form
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    loginMsg.style.display = "none";

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const selectedRole = document.getElementById("login-role").value;

    try {
      const session = await db.authenticateUser(email, password);

      // Validar coincidencia de rol seleccionado
      if (selectedRole === "Administrador" && session.rol !== "Administrador") {
        throw new Error(`Las credenciales ingresadas no corresponden a una cuenta de Administrador.`);
      } else if (selectedRole === "Usuario" && session.rol === "Administrador") {
        // Permitir que un administrador también pueda ingresar en vista de Usuario si lo desea
      }

      localStorage.setItem("sigeca_current_user", JSON.stringify(session));
      onLoginSuccess(session);
    } catch (err) {
      showMessage(loginMsg, err.message, "error");
    }
  };

  // Procesar Registro Form
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    registerMsg.style.display = "none";

    const nombre = document.getElementById("reg-nombre").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const registeredRol = regRol.value;
    
    // Validar que el correo sea institucional de la UPT o de prueba
    const emailLower = email.toLowerCase();
    const isUptEmail = emailLower.endsWith("@upt.pe") || emailLower.endsWith("@upt.edu.pe") || emailLower.endsWith("@institucion.edu.pe");
    if (!isUptEmail) {
      showMessage(registerMsg, "El registro está restringido a correos institucionales de la UPT (*@upt.pe, *@upt.edu.pe).", "error");
      return;
    }
    
    let rol = registeredRol;
    let subtipo = "N/A";
    let areas = [];
    
    if (registeredRol === "Autoridad") {
      rol = "Profesional";
      subtipo = "Autoridades";
      areas = ["Licenciamiento"];
    } else if (registeredRol === "Profesional") {
      rol = "Profesional";
      subtipo = "Estándar";
      areas = Array.from(areaCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    } else {
      areas = Array.from(areaCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    }

    // Validar áreas
    if (rol === "Colaborador") {
      if (areas.length === 0) {
        showMessage(registerMsg, "Debe seleccionar al menos 1 área de gestión.", "error");
        return;
      }
      if (areas.length > 2) {
        showMessage(registerMsg, "Como Colaborador, puede tener acceso a un máximo de 2 áreas.", "error");
        return;
      }
    } else if (registeredRol === "Profesional") {
      if (areas.length !== 1) {
        showMessage(registerMsg, "Debe seleccionar exactamente 1 área académica inicial.", "error");
        return;
      }
    }

    try {
      await db.registerUser({
        nombre,
        email,
        password,
        rol,
        subtipo,
        areas
      });

      showMessage(
        registerMsg,
        "Registro exitoso. Su cuenta ha sido creada y está pendiente de habilitación por el Administrador. Una vez que el administrador la habilite, podrá iniciar sesión.",
        "success"
      );

      // Redirigir a login después de 4 segundos
      setTimeout(() => {
        registerView.style.display = "none";
        loginView.style.display = "block";
        loginForm.reset();
        loginMsg.style.display = "none";
        
        // Colocar el correo recién registrado en el login
        document.getElementById("login-email").value = email;
        document.getElementById("login-password").value = "";
      }, 4500);

    } catch (err) {
      showMessage(registerMsg, err.message, "error");
    }
  };
}
