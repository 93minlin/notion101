import { ANEXOS_CATALOGO } from './anexos_y_resumenes.js';

const anexosTable = document.getElementById('anexosTable');
if (anexosTable) {
  anexosTable.innerHTML = `<table style="width:100%; border-spacing:0;">
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Enlace</th>
      </tr>
    </thead>
    <tbody>
      ${ANEXOS_CATALOGO.map((a) => `
        <tr>
          <td>${a.num}</td>
          <td>${a.nombre}</td>
          <td>${a.descripcion}</td>
          <td><a href="${a.url}" target="_blank">Ver</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>`;
}