Created At: 2026-06-16T16:55:30Z
Completed At: 2026-06-16T16:55:30Z
File Path: `file:///C:/Users/GECA/.gemini/antigravity/scratch/sigeca/pages/evidencias.js`
Total Lines: 314
Total Bytes: 13474
Showing lines 1 to 100
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: /* ==========================================================================
2:    SIGECA - PÁGINA DE EVIDENCIAS (Repositorio y Gestión)
3:    ========================================================================== */
4: import { db } from "../services/db.js?v=20260623.5";
5: import { onedrive } from "../services/onedrive.js?v=20260623.5";
6: 
7: export async function renderEvidenciasPage(container, userRole = "admin") {
8:   const [evidencias, indicadores] = await Promise.all([
9:     db.getEvidencias(),
10:     db.getIndicadores()
11:   ]);
12: 
13:   let activeFilter = "todos";
14: 
15:   const drawEvidenciasTable = () => {
16:     const tableBody = container.querySelector("#evidencias-table-body");
17:     if (!tableBody) return;
18: 
19:     const filtered = activeFilter === "todos"
20:       ? evidencias
21:       : evidencias.filter(e => e.indicadorId === activeFilter);
22: 
23:     const isEditable = userRole === "admin" || userRole === "editor";
24: 
25:     if (filtered.length === 0) {
26:       tableBody.innerHTML = `
27:         <tr>
28:           <td colspan="7" style="text-align: center; color: var(--text-400); padding: 3rem 1rem;">
29:             <i data-lucide="folder-archive" style="width: 40px; height: 40px; margin-bottom: 0.5rem; color: var(--text-400);"></i>
30:             <p>No se encontraron evidencias asociadas a este indicador.</p>
31:           </td>
32:         </tr>
33:       `;
34:       if (window.lucide) window.lucide.createIcons();
35:       return;
36:     }
37: 
38:     tableBody.innerHTML = filtered.map(e => {
39:       const ind = indicadores.find(i => i.id === e.indicadorId);
40:       const indCode = ind ? ind.codigo : "N/A";
41:       
42:       let iconColor = "#0078d4";
43:       let icon = "file-text";
44:       if (e.formato === "pdf") { iconColor = "#ea4335"; icon = "file-check"; }
45:       if (e.formato === "word") { iconColor = "#0078d4"; icon = "file-signature"; }
46:       if (e.formato === "excel") { iconColor = "#107c41"; icon = "file-spreadsheet"; }
47: 
48:       const dateObj = new Date(e.fechaSubida);
49:       const formattedDate = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
50: 
51:       return `
52:         <tr>
53:           <td>
54:             <div style="display: flex; align-items: center; gap: 0.75rem;">
55:               <i data-lucide="${icon}" style="color: ${iconColor}; width: 22px; height: 22px; flex-shrink: 0;"></i>
56:               <div style="display: flex; flex-direction: column;">
57:                 <span style="font-weight: 600; color: var(--text-100);">${e.nombre}</span>
58:                 <span style="font-size: 0.75rem; color: var(--text-300);">${e.descripcion}</span>
59:               </div>
60:             </div>
61:           </td>
62:           <td>
63:             <span class="indicator-link-badge" title="${ind ? ind.nombre : ''}">${indCode}</span>
64:           </td>
65:           <td style="font-size: 0.8rem; color: var(--text-300); font-weight: 500;">
66:             ${e.tamano}
67:           </td>
68:           <td style="font-size: 0.8rem; color: var(--text-300);">
69:             ${e.subidoPor}
70:           </td>
71:           <td style="font-size: 0.8rem; color: var(--text-300);">
72:             ${formattedDate}
73:           </td>
74:           <td>
75:             <div style="display: flex; gap: 0.5rem; align-items: center;">
76:               <a href="${e.onedriveUrl}" target="_blank" class="btn btn-secondary" style="padding: 0.35rem 0.5rem; font-size: 0.75rem;" title="Abrir en OneDrive">
77:                 <i data-lucide="external-link" style="width: 14px; height: 14px; color: #0078d4;"></i>
78:               </a>
79:               ${isEditable ? `
80:                 <button class="btn btn-danger btn-delete-evidence" data-id="${e.id}" style="padding: 0.35rem 0.5rem; font-size: 0.75rem;" title="Eliminar Evidencia">
81:                   <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
82:                 </button>
83:               ` : ""}
84:             </div>
85:           </td>
86:         </tr>
87:       `;
88:     }).join("");
89: 
90:     if (window.lucide) window.lucide.createIcons();
91: 
92:     // Eliminar evidencias
93:     if (isEditable) {
94:       const deleteButtons = tableBody.querySelectorAll(".btn-delete-evidence");
95:       deleteButtons.forEach(btn => {
96:         btn.onclick = async () => {
97:           const id = btn.getAttribute("data-id");
98:           const evi = evidencias.find(e => e.id === id);
99:           if (confirm(`¿Está seguro de eliminar la evidencia "${evi.nombre}"? Esto recalculará el avance del indicador en el semáforo.`)) {
100:             await db.deleteEvidencia(id);
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
