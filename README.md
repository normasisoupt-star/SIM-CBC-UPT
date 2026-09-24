# SIM-CBC | Sistema de Información y Monitoreo de las Condiciones Básicas de Calidad - UPT

Este repositorio contiene la aplicación web completa del **SIM-CBC** para su integración en portales web y plataformas como **Wix**.

---

## 🚀 Guía de Integración con Wix

### Opción A: Alojamiento en GitHub Pages + Embedding en Wix (Recomendado)

1. **Subir a GitHub:**
   - Crea un nuevo repositorio público en [GitHub.com](https://github.com/new) con el nombre `sim-cbc-upt`.
   - Sube todos los archivos de esta carpeta al repositorio.

2. **Activar GitHub Pages:**
   - Ve a **Settings (Configuración)** > **Pages** en tu repositorio de GitHub.
   - En **Source**, selecciona `Deploy from a branch` y elige la rama `main` (o `master`) / `/root`.
   - Haz clic en **Save**. Obtendrás tu URL pública en HTTPS: `https://<tu-usuario>.github.io/sim-cbc-upt/`.

3. **Incrustar en Wix:**
   - Entra al editor de tu sitio web en **Wix**.
   - Haz clic en **(+) Agregar elementos** > **Código incrustado** > **Incrustar un sitio / HTML Embed**.
   - Selecciona **Dirección web (URL)** y pega la URL de GitHub Pages: `https://<tu-usuario>.github.io/sim-cbc-upt/`.
   - Ajusta el tamaño del marco al 100% de ancho y alto deseado. ¡Listo!

---

### Opción B: Integración Directa con Wix Studio / Wix Velo

1. En **Wix Studio**, activa el **Modo Desarrollador (Velo)**.
2. Selecciona **Conectar con GitHub** en el panel de herramientas de código de Wix.
3. Autoriza el acceso a tu repositorio y vincula la rama `main`.
4. Los cambios que hagas en el código de tu interfaz se sincronizarán automáticamente con tu sitio de Wix.

---

## 🛠️ Estructura del Proyecto

* `index.html` - Punto de entrada principal de la aplicación.
* `app.js` - Controlador principal y enrutador SPA.
* `index.css` - Estilos globales, tema oscuro y tarjetas KPI.
* `pages/` - Módulos de la interfaz (Evidencias, Malla Curricular, Acreditación, Encuestas, etc.).
* `components/` - Componentes reutilizables (Sidebar, Navbar, Modales, Tablas).
* `services/` - Capa de datos y conexión con la API backend.
* `sigeca_db.json` - Base de datos consolidada de evidencias e indicadores SUNEDU.
