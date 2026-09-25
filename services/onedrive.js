/* ==========================================================================
   SIGECA - SERVICIO DE INTEGRACIÓN CON MICROSOFT ONEDRIVE (Graph API)
   ========================================================================== */

// Archivos mock en el OneDrive institucional
const ONEDRIVE_MOCK_FILES = [
  { id: "OD_WORD_PLAN2026", nombre: "Plan_Estudios_Sistemas_2026.docx", tamano: "4.8 MB", tipo: "word", url: "https://institucion-my.sharepoint.com/:w:/g/personal/plan_estudios_sistemas_docx", fechaModificacion: "2026-06-15 10:24 AM" },
  { id: "OD_EXCEL_C1_SIS", nombre: "Malla_Curricular_C1_Sistemas.xlsx", tamano: "2.1 MB", tipo: "excel", url: "https://institucion-my.sharepoint.com/:x:/g/personal/malla_curricular_c1_xlsx", fechaModificacion: "2026-06-16 08:30 AM" },
  { id: "OD_PDF_RES124", nombre: "Resolucion_Decanal_124_Aprobacion.pdf", tamano: "1.2 MB", tipo: "pdf", url: "https://institucion-my.sharepoint.com/:b:/g/personal/resolucion_aprobacion_pdf", fechaModificacion: "2026-06-14 03:15 PM" },
  { id: "OD_PDF_CONVENIO", nombre: "Convenio_Marco_Interinstitucional_2026.pdf", tamano: "3.5 MB", tipo: "pdf", url: "https://institucion-my.sharepoint.com/:b:/g/personal/convenio_marco_pdf", fechaModificacion: "2026-05-20 11:00 AM" },
  { id: "OD_EXCEL_INV_LAB", nombre: "Inventario_Laboratorios_Calidad.xlsx", tamano: "2.1 MB", tipo: "excel", url: "https://institucion-my.sharepoint.com/:x:/g/personal/inventario_laboratorios_xlsx", fechaModificacion: "2026-06-15 11:00 AM" },
  { id: "OD_WORD_PERFIL_EGR", nombre: "Perfil_Egreso_Sistemas_Final.docx", tamano: "1.5 MB", tipo: "word", url: "https://institucion-my.sharepoint.com/:w:/g/personal/perfil_egreso_sistemas_docx", fechaModificacion: "2026-06-10 09:00 AM" }
];

class OneDriveService {
  constructor() {
    this.clientId = "00000000-0000-0000-0000-000000000000"; // Reemplazar con ID de Azure AD
    this.tenantId = "common"; // O ID institucional
    this.scopes = ["Files.ReadWrite.All", "User.Read"];
  }

  // Obtener lista de archivos mock en OneDrive (Simula lectura de carpeta)
  async getArchivosCompartidos() {
    return ONEDRIVE_MOCK_FILES;
  }

  // Simula el OneDrive File Picker de Microsoft
  async openFilePicker(options = {}) {
    return new Promise((resolve) => {
      // Usaremos un evento personalizado para abrir el modal interactivo de OneDrive
      const event = new CustomEvent("open-onedrive-picker", {
        detail: {
          title: options.title || "Seleccionar archivo de OneDrive Institucional",
          filterType: options.filterType || null, // pdf | word | excel | null
          onSelect: (selectedFile) => {
            resolve(selectedFile);
          },
          onCancel: () => {
            resolve(null);
          }
        }
      });
      window.dispatchEvent(event);
    });
  }

  /* ---------------------------------------------------------
     GUÍA Y CÓDIGO DE INTEGRACIÓN PARA PRODUCCIÓN (Microsoft Graph)
     --------------------------------------------------------- */
     
  // 1. Inicialización de MSAL.js para Autenticación
  getMsalConfig() {
    return `
    // Ejemplo de inicialización con @azure/msal-browser
    import * as msal from "@azure/msal-browser";

    const msalConfig = {
      auth: {
        clientId: "${this.clientId}",
        authority: "https://login.microsoftonline.com/${this.tenantId}",
        redirectUri: window.location.origin,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
      }
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);
    `;
  }

  // 2. Método de Producción para Subir Archivo a OneDrive
  getSubirArchivoProduccionSnippet() {
    return `
    // Subir un archivo usando Microsoft Graph API
    async function uploadFileToOneDrive(accessToken, file, folderPath) {
      const endpoint = \`https://graph.microsoft.com/v1.0/me/drive/root:${folderPath}/${file.name}:/content\`;
      
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Authorization": \`Bearer ${accessToken}\`,
          "Content-Type": file.type
        },
        body: file
      });
      
      if (!response.ok) throw new Error("Error subiendo a OneDrive");
      const data = await response.json();
      
      // Crear enlace de lectura compartido institucional
      const shareEndpoint = \`https://graph.microsoft.com/v1.0/me/drive/items/${data.id}/createLink\`;
      const shareResponse = await fetch(shareEndpoint, {
        method: "POST",
        headers: {
          "Authorization": \`Bearer ${accessToken}\`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "view",
          scope: "organization" // Solo usuarios de la institución
        })
      });
      
      const shareData = await shareResponse.json();
      return {
        onedriveFileId: data.id,
        onedriveUrl: shareData.link.webUrl,
        size: data.size,
        name: data.name
      };
    }
    `;
  }
}

export const onedrive = new OneDriveService();
export default onedrive;
