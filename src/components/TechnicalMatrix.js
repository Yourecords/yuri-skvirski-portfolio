/**
 * Technical Matrix Component
 * 4-column balanced domain breakdown: Direction, Production, Technical, Post-production.
 */

export function renderTechnicalMatrix(data) {
  const { technicalMatrix } = data;

  const columnsHtml = technicalMatrix.columns
    .map(col => `
      <div class="matrix-card">
        <h3 class="matrix-category">${col.category}</h3>
        <p class="matrix-skills">${col.skills}</p>
      </div>
    `)
    .join('');

  return `
    <section class="section" id="capabilities" aria-label="Technical Capabilities">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Disciplines</div>
          <h2 class="section-title">${technicalMatrix.title}</h2>
          <p class="section-intro">${technicalMatrix.subtitle}</p>
        </header>

        <div class="matrix-grid">
          ${columnsHtml}
        </div>
      </div>
    </section>
  `;
}
