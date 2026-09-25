/* ==========================================================================
   SIGECA - COMPONENTE ONEDRIVE PICKER MODAL (Simulación Premium)
   ========================================================================== */
import { onedrive } from "../services/onedrive.js?v=20260623.5";

export function initOneDriveModalListener() {
  window.addEventListener("open-onedrive-picker", async (e) => {
    const { title, filterType, onSelect, onCancel } = e.detail;
    
    // Obtener los archivos de OneDrive
    const files = await onedrive.getArchivosCompartidos();
    // Filtrar si es necesario
    const filteredFiles = filterType 
      ? files.filter(f => f.tipo === filterType) 
      : files;

    const modalRoot = document.getElementById("onedrive-modal-root");
    if (!modalRoot) return;

    let selectedFileIndex = -1;

    // Crear el HTML del modal
    modalRoot.innerHTML = `
      <div class="modal-overlay" id="onedrive-modal-overlay">
        <div class="modal-wrapper">
          <div class="modal-header">
            <h3 class="modal-title">
              <i data-lucide="cloud" class="onedrive-picker-icon" style="width: 22px; height: 22px;"></i>
              <span>${title}</span>
            </h3>
            <button class="modal-close" id="onedrive-modal-btn-close">
              <i data-lucide="x"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <p style="font-size: 0.85rem; color: var(--text-300); margin-bottom: 0.5rem;">
              Seleccione un archivo de su cuenta institucional conectada a Microsoft OneDrive. Las credenciales OAuth2.0 se gestionan en segundo plano.
            </p>
            
            <div class="onedrive-mock-files-list">
              ${filteredFiles.map((file, index) => {
                let icon = "file-text";
                if (file.tipo === "word") icon = "file-signature";
                if (file.tipo === "excel") icon = "file-spreadsheet";
                if (file.tipo === "pdf") icon = "file-check";
                
                return `
                  <div class="onedrive-mock-item" data-index="${index}">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <i data-lucide="${icon}" style="color: ${file.tipo === 'excel' ? '#107c41' : file.tipo === 'word' ? '#0078d4' : '#ea4335'}; width: 22px; height: 22px;"></i>
                      <div style="display: flex; flex-direction: column; text-align: left;">
                        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-100);">${file.nombre}</span>
                        <span style="font-size: 0.7rem; color: var(--text-400);">Modificado: ${file.fechaModificacion}</span>
                      </div>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--text-300); font-weight: 500;">${file.tamano}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-secondary" id="onedrive-modal-btn-cancel">Cancelar</button>
            <button class="btn btn-primary" id="onedrive-modal-btn-confirm" disabled>Vincular Archivo</button>
          </div>
        </div>
      </div>
    `;

    // Renderizar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }

    const overlay = document.getElementById("onedrive-modal-overlay");
    const btnClose = document.getElementById("onedrive-modal-btn-close");
    const btnCancel = document.getElementById("onedrive-modal-btn-cancel");
    const btnConfirm = document.getElementById("onedrive-modal-btn-confirm");
    const items = modalRoot.querySelectorAll(".onedrive-mock-item");

    // Cerrar modal
    const destroyModal = () => {
      modalRoot.innerHTML = "";
    };

    btnClose.onclick = () => {
      destroyModal();
      onCancel();
    };

    btnCancel.onclick = () => {
      destroyModal();
      onCancel();
    };

    // Selección de archivos
    items.forEach(item => {
      item.onclick = () => {
        items.forEach(i => i.classList.remove("selected"));
        item.classList.add("selected");
        selectedFileIndex = parseInt(item.getAttribute("data-index"));
        btnConfirm.removeAttribute("disabled");
      };
    });

    btnConfirm.onclick = () => {
      if (selectedFileIndex !== -1) {
        const selectedFile = filteredFiles[selectedFileIndex];
        destroyModal();
        onSelect(selectedFile);
      }
    };
  });
}
