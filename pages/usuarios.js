/* ==========================================================================
   SIGECA - PÁGINA DE CONTROL DE USUARIOS (Solo Administrador)
   ========================================================================== */

import { db } from "../services/db.js?v=20260717.2";

export async function renderUsuariosPage(container) {
  if (!container) return;

  // Renderizar esqueleto con loaders y modal de edición unificado
  container.innerHTML = `
    <div class="content-header" style="margin-bottom: 2rem;">
      <div>
        <h1 class="page-title" style="font-size: 1.75rem; font-weight: 800; color: var(--text-100);">Control de Usuarios y Accesos</h1>
        <p class="page-subtitle" style="font-size: 0.875rem; color: var(--text-300);">Gestione la validación de nuevas cuentas, asignación de roles (Administrador / Usuario), habilitación de accesos y restablecimiento de contraseñas.</p>
      </div>
    </div>
    
    <div id="usuarios-loader" class="loader-container" style="height: 200px;">
      <div class="loader"></div>
    </div>

    <div id="usuarios-content" style="display: none; display: flex; flex-direction: column; gap: 2rem;">
      
      <!-- SECCIÓN SOLICITUDES DE REGISTRO PENDIENTES DE VALIDACIÓN -->
      <div class="card" id="card-solicitudes" style="display: none;">
        <h2 style="font-size: 1.1rem; font-weight: 700; color: #f59e0b; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="user-check" style="color: #f59e0b;"></i>
          <span>Nuevas Solicitudes de Registro Pendientes de Validación</span>
        </h2>
        <div class="table-container">
          <table class="evidencias-table" id="table-solicitudes">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Institucional</th>
                <th>Rol Solicitado</th>
                <th style="text-align: center; width: 220px;">Validación del Administrador</th>
              </tr>
            </thead>
            <tbody id="tbody-solicitudes"></tbody>
          </table>
        </div>
      </div>

      <!-- LISTADO GENERAL DE USUARIOS HABILITADOS / REGISTRADOS -->
      <div class="card">
        <h2 style="font-size: 1.1rem; font-weight: 700; color: var(--text-100); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">
          <i data-lucide="users" style="color: var(--accent-light);"></i>
          <span>Listado de Cuentas de Usuario en SIM-CBC</span>
        </h2>
        <div class="table-container">
          <table class="evidencias-table" id="table-usuarios">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo Institucional</th>
                <th>Rol de Sistema</th>
                <th>Estado de Cuenta</th>
                <th style="text-align: center; width: 300px;">Acciones de Gestión</th>
              </tr>
            </thead>
            <tbody id="tbody-usuarios"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- MODAL PARA EDITAR USUARIO UNIFICADO (PERFIL, CONTRASEÑA Y ÁREAS) -->
    <div id="edit-user-modal" class="modal-overlay" style="display: none;">
      <div class="modal-wrapper" style="max-width: 500px;">
        <div class="modal-header">
          <h3 class="modal-title">
            <i data-lucide="user-cog"></i>
            <span>Editar Perfil y Permisos</span>
          </h3>
          <button class="modal-close" id="btn-close-modal">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 1rem;">
          
          <div class="form-group">
            <label for="modal-user-name">Nombre Completo</label>
            <input type="text" id="modal-user-name" class="input-control" required placeholder="Ej. Dr. Carlos Mendoza">
          </div>

          <div class="form-group">
            <label for="modal-user-password">Contraseña (Modificar o Restablecer)</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="modal-user-password" class="input-control" style="flex-grow: 1;" required placeholder="••••••••">
              <button type="button" class="btn btn-secondary" id="btn-generate-password" style="padding: 0.45rem 0.65rem;" title="Generar contraseña segura">
                <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i>
                <span style="font-size: 0.75rem; font-weight: bold;">Generar</span>
              </button>
            </div>
            <span style="font-size: 0.7rem; color: var(--text-400); margin-top: 4px;">Puede tipear una contraseña manualmente o hacer clic en "Generar" para restablecerla.</span>
          </div>

          <div class="form-group" id="modal-role-group" style="margin-top: 0.25rem;">
            <label for="modal-user-role" style="margin-bottom: 0.5rem; text-transform: none; font-weight: 600;">Rol Asignado en SIM-CBC:</label>
            <select id="modal-user-role" class="input-control" style="background-color: var(--bg-dark-900); color: var(--text-100);">
              <option value="Usuario">Usuario (Lectura y Consulta General)</option>
              <option value="Administrador">Administrador (Control Total y Edición)</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="btn-cancel-modal">Cancelar</button>
          <button class="btn btn-primary" id="btn-save-modal">Guardar Cambios</button>
        </div>
      </div>
    </div>
  `;

  // Inicializar íconos de Lucide iniciales
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Variables de edición
  let activeEditUserEmail = null;
  let activeEditUserRole = null;

  async function loadData() {
    const loader = document.getElementById("usuarios-loader");
    const content = document.getElementById("usuarios-content");
    if (loader) loader.style.display = "flex";
    if (content) content.style.display = "none";

    try {
      const users = await db.getUsers();
      
      // 1. Filtrar y renderizar solicitudes de registro pendientes de validación
      const pendingUsers = users.filter(u => u.status === "pending");
      const cardSolicitudes = document.getElementById("card-solicitudes");
      const tbodySolicitudes = document.getElementById("tbody-solicitudes");
      
      if (pendingUsers.length > 0) {
        cardSolicitudes.style.display = "block";
        tbodySolicitudes.innerHTML = pendingUsers.map(u => `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-100);">${u.nombre}</div>
            </td>
            <td>
              <span style="font-family: monospace; font-size: 0.85rem; color: #38bdf8;">${u.email}</span>
            </td>
            <td>
              <span class="badge-status" style="background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">
                ${u.rol || 'Usuario'}
              </span>
            </td>
            <td style="text-align: center;">
              <div style="display: flex; gap: 0.5rem; justify-content: center;">
                <button class="btn btn-success btn-toggle-status" data-email="${u.email}" data-status="active" title="Validar y habilitar cuenta" style="padding: 0.4rem 0.75rem; font-size: 0.78rem;">
                  <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
                  <span>Aprobar y Habilitar</span>
                </button>
                <button class="btn btn-danger btn-decline-user" data-email="${u.email}" title="Rechazar solicitud" style="padding: 0.4rem 0.75rem; font-size: 0.78rem;">
                  <i data-lucide="x-circle" style="width: 14px; height: 14px;"></i>
                  <span>Declinar</span>
                </button>
              </div>
            </td>
          </tr>
        `).join("");
      } else {
        cardSolicitudes.style.display = "none";
      }

      // 2. Renderizar listado general de usuarios
      const tbodyUsuarios = document.getElementById("tbody-usuarios");
      tbodyUsuarios.innerHTML = users.map(u => {
        const isAdmin = u.rol === "Administrador";
        const roleBadgeStyle = isAdmin
          ? "background-color: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);"
          : "background-color: rgba(168, 85, 247, 0.15); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.3);";
        const roleText = isAdmin ? "Administrador" : "Usuario";

        // Estado Badge
        let statusBadge = "";
        if (u.status === "active") {
          statusBadge = `<span class="badge-status cumple">Habilitado</span>`;
        } else if (u.status === "pending") {
          statusBadge = `<span class="badge-status proceso">Pendiente de Validación</span>`;
        } else {
          statusBadge = `<span class="badge-status nocumple">Inhabilitado</span>`;
        }

        // Acciones
        let actionsHtml = "";
        if (!isAdmin) {
          if (u.status === "pending") {
            actionsHtml = `
              <button class="btn btn-success btn-toggle-status" data-email="${u.email}" data-status="active" title="Aprobar y Habilitar" style="padding: 0.4rem 0.6rem;">
                <i data-lucide="check" style="width: 14px; height: 14px; color: white;"></i>
                <span style="font-size: 0.75rem;">Aprobar</span>
              </button>
              <button class="btn btn-danger btn-decline-user" data-email="${u.email}" title="Declinar solicitud" style="padding: 0.4rem 0.6rem;">
                <i data-lucide="x-circle" style="width: 14px; height: 14px; color: white;"></i>
                <span style="font-size: 0.75rem;">Declinar</span>
              </button>
            `;
          } else {
            if (u.status === "active") {
              actionsHtml = `
                <button class="btn btn-secondary btn-toggle-status" data-email="${u.email}" data-status="inactive" title="Inhabilitar cuenta" style="padding: 0.4rem 0.6rem;">
                  <i data-lucide="user-x" style="width: 14px; height: 14px; color: var(--color-nocumple);"></i>
                  <span style="font-size: 0.75rem;">Inhabilitar</span>
                </button>
              `;
            } else {
              actionsHtml = `
                <button class="btn btn-secondary btn-toggle-status" data-email="${u.email}" data-status="active" title="Habilitar cuenta" style="padding: 0.4rem 0.6rem;">
                  <i data-lucide="user-check" style="width: 14px; height: 14px; color: var(--color-cumple);"></i>
                  <span style="font-size: 0.75rem;">Habilitar</span>
                </button>
              `;
            }
          }

          actionsHtml += `
            <button class="btn btn-secondary btn-edit-user" data-email="${u.email}" title="Editar perfil y rol" style="padding: 0.4rem 0.6rem;">
              <i data-lucide="edit" style="width: 14px; height: 14px;"></i>
              <span style="font-size: 0.75rem;">Editar</span>
            </button>
            <button class="btn btn-danger btn-delete-user" data-email="${u.email}" title="Eliminar cuenta permanentemente" style="padding: 0.4rem 0.6rem;">
              <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
            </button>
          `;
        } else {
          actionsHtml = `
            <button class="btn btn-secondary btn-edit-user" data-email="${u.email}" title="Editar perfil y contraseña" style="padding: 0.4rem 0.6rem;">
              <i data-lucide="edit" style="width: 14px; height: 14px;"></i>
              <span style="font-size: 0.75rem;">Editar</span>
            </button>
          `;
        }

        return `
          <tr>
            <td>
              <div style="font-weight: 700; color: var(--text-100);">${u.nombre}</div>
            </td>
            <td>
              <span style="font-family: monospace; font-size: 0.85rem; color: var(--text-200);">${u.email}</span>
            </td>
            <td>
              <span class="badge-status" style="${roleBadgeStyle}">${roleText}</span>
            </td>
            <td>${statusBadge}</td>
            <td style="text-align: center;">
              <div style="display: flex; gap: 0.4rem; justify-content: center; align-items: center;">
                ${actionsHtml}
              </div>
            </td>
          </tr>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Registrar eventos
      setupEventListeners();

      if (loader) loader.style.display = "none";
      if (content) content.style.display = "flex";

    } catch (e) {
      console.error(e);
      alert("Error al cargar listado de usuarios.");
    }
  }

  // Configurar manejadores de eventos
  function setupEventListeners() {
    // 1. Aprobar solicitud de área (sub-tabla)
    container.querySelectorAll(".btn-approve-req").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        const area = btn.getAttribute("data-area");
        if (confirm(`¿Aprobar solicitud de acceso al área "${area}" para el usuario ${email}?`)) {
          try {
            await db.approveAreaAccess(email, area);
            alert("Acceso aprobado con éxito.");
            await loadData();
          } catch (e) {
            alert(e.message);
          }
        }
      };
    });

    // 2. Rechazar solicitud de área (sub-tabla)
    container.querySelectorAll(".btn-reject-req").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        const area = btn.getAttribute("data-area");
        if (confirm(`¿Rechazar solicitud de acceso al área "${area}" para el usuario ${email}?`)) {
          try {
            await db.rejectAreaAccess(email, area);
            alert("Solicitud rechazada.");
            await loadData();
          } catch (e) {
            alert(e.message);
          }
        }
      };
    });

    // 3. Habilitar/Inhabilitar cuenta
    container.querySelectorAll(".btn-toggle-status").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        const status = btn.getAttribute("data-status");
        const act = status === "active" ? "habilitar" : "inhabilitar";
        if (confirm(`¿Está seguro de que desea ${act} la cuenta de ${email}?`)) {
          try {
            await db.updateUserStatus(email, status);
            alert(`Usuario ${status === "active" ? "habilitado" : "inhabilitado"} con éxito.`);
            await loadData();
          } catch (e) {
            alert(e.message);
          }
        }
      };
    });

    // 4. Declinar registro de nuevo usuario (solicitud no autorizada)
    container.querySelectorAll(".btn-decline-user").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        if (confirm(`¿Declinar la solicitud de registro del nuevo usuario ${email}?\nEsto eliminará permanentemente su solicitud.`)) {
          try {
            await db.deleteUser(email);
            alert("Solicitud de registro declinada y eliminada con éxito.");
            await loadData();
          } catch (e) {
            alert(e.message);
          }
        }
      };
    });

    // 5. Eliminar Usuario permanentemente
    container.querySelectorAll(".btn-delete-user").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        if (confirm(`¿Está completamente seguro de que desea ELIMINAR permanentemente la cuenta de ${email}?\nEsta acción es irreversible.`)) {
          try {
            await db.deleteUser(email);
            alert("Cuenta de usuario eliminada permanentemente.");
            await loadData();
          } catch (e) {
            alert(e.message);
          }
        }
      };
    });

    // 6. Abrir Modal de Edición Unificada
    container.querySelectorAll(".btn-edit-user").forEach(btn => {
      btn.onclick = async () => {
        const email = btn.getAttribute("data-email");
        activeEditUserEmail = email;

        const users = await db.getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) return;

        activeEditUserRole = user.rol;

        // Mostrar Modal
        const modal = document.getElementById("edit-user-modal");
        const modalName = document.getElementById("modal-user-name");
        const modalPassword = document.getElementById("modal-user-password");
        const modalAreasGroup = document.getElementById("modal-areas-group");
        const modalLabel = document.getElementById("modal-areas-label");
        const modalHint = document.getElementById("modal-hint");

        // Rellenar campos del modal
        modalName.value = user.nombre || "";
        modalPassword.value = user.password || "";

        // Ajustar visibilidad y comportamiento de áreas según el rol
        if (user.rol === "Administrador") {
          modalAreasGroup.style.display = "none";
        } else if (user.rol === "Profesional" && user.subtipo === "Autoridades") {
          modalAreasGroup.style.display = "block";
          modalLabel.textContent = "Áreas Académicas Permitidas:";
          modalHint.textContent = "Las autoridades tienen visualización completa de todas las áreas académicas.";
          const checkboxes = modal.querySelectorAll("input[name='modal-areas']");
          checkboxes.forEach(cb => {
            cb.checked = true;
            cb.disabled = true;
          });
        } else {
          modalAreasGroup.style.display = "block";
          if (user.rol === "Colaborador") {
            modalLabel.textContent = "Seleccione Áreas Asignadas (Máximo 2):";
            modalHint.textContent = "Los Colaboradores pueden modificar un máximo de 2 áreas de gestión.";
          } else {
            modalLabel.textContent = "Seleccione Áreas Académicas Permitidas:";
            modalHint.textContent = "El Profesional de Área tiene visualización de lectura en las áreas indicadas.";
          }

          const checkboxes = modal.querySelectorAll("input[name='modal-areas']");
          checkboxes.forEach(cb => {
            cb.checked = user.areas && user.areas.includes(cb.value);
            cb.disabled = false;
          });

          // Configurar restricción dinámica para Colaborador (máx 2)
          checkboxes.forEach(cb => {
            cb.onclick = () => {
              const selected = Array.from(checkboxes).filter(c => c.checked);
              if (user.rol === "Colaborador" && selected.length > 2) {
                cb.checked = false;
                alert("Como Colaborador, solo puede seleccionar hasta un máximo de 2 áreas.");
              }
            };
          });
        }

        modal.style.display = "flex";
      };
    });
  }

  // Generador de contraseñas seguras
  document.getElementById("btn-generate-password").onclick = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%&*";
    let newPass = "";
    // Asegurar combinación de mayúscula, minúscula y número
    newPass += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    newPass += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    newPass += "0123456789"[Math.floor(Math.random() * 10)];
    newPass += "!@#%&*"[Math.floor(Math.random() * 6)];
    
    for (let i = 0; i < 6; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Mezclar caracteres
    newPass = newPass.split('').sort(() => 0.5 - Math.random()).join('');
    document.getElementById("modal-user-password").value = newPass;
  };

  // Cerrar Modal
  const closeModal = () => {
    const modal = document.getElementById("edit-user-modal");
    modal.style.display = "none";
    activeEditUserEmail = null;
    activeEditUserRole = null;
  };

  document.getElementById("btn-close-modal").onclick = closeModal;
  document.getElementById("btn-cancel-modal").onclick = closeModal;

  // Guardar Cambios en Modal
  document.getElementById("btn-save-modal").onclick = async () => {
    if (!activeEditUserEmail) return;

    const modal = document.getElementById("edit-user-modal");
    const nombre = document.getElementById("modal-user-name").value.trim();
    const password = document.getElementById("modal-user-password").value.trim();

    if (!nombre) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (!password || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Obtener áreas si corresponde
    let areas = [];
    if (activeEditUserRole === "Administrador") {
      areas = ["Licenciamiento", "Acreditación", "ISO 9001", "ISO 21001"];
    } else if (activeEditUserRole === "Profesional" && activeEditUserRole === "Autoridades") {
      areas = ["Licenciamiento", "Acreditación", "ISO 9001", "ISO 21001"];
    } else {
      const checkboxes = modal.querySelectorAll("input[name='modal-areas']");
      areas = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      if (activeEditUserRole === "Colaborador") {
        if (areas.length === 0) {
          alert("Un Colaborador debe tener al menos 1 área de gestión asignada.");
          return;
        }
        if (areas.length > 2) {
          alert("Un Colaborador no puede exceder las 2 áreas de gestión.");
          return;
        }
      }
    }

    try {
      await db.updateUserProfile(activeEditUserEmail, {
        nombre,
        password,
        areas
      });
      
      alert("Cambios de usuario guardados con éxito.");
      closeModal();
      await loadData();
    } catch (e) {
      alert(e.message);
    }
  };

  // Registrar sincronización automática en tiempo real
  const handleDbSyncUpdate = async () => {
    console.log("[USUARIOS SYNC] Recibido evento de base de datos actualizada. Redibujando listado...");
    await loadData();
  };

  window.addEventListener("sigeca_db_updated", handleDbSyncUpdate);

  if (window._cleanupUsuariosSync) {
    window.removeEventListener("sigeca_db_updated", window._cleanupUsuariosSync);
  }
  window._cleanupUsuariosSync = handleDbSyncUpdate;

  // Cargar información inicial
  await loadData();
}
