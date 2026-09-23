/**
 * About Section Component
 * Director philosophy, leadership perspective, and environmental portrait specification.
 */

export function renderAboutSection(data) {
  const { about } = data;

  const contentHtml = about.content
    .map(p => `<p>${p}</p>`)
    .join('');

  return `
    <section class="section" id="about" aria-label="About Yuri Skvirski">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Director Profile</div>
          <h2 class="section-title">${about.title}</h2>
        </header>

        <div class="about-grid">
          <!-- Editorial Copy Column -->
          <div class="about-content">
            ${contentHtml}
          </div>

          <!-- Environmental Portrait Column -->
          <div class="about-portrait-col">
            <div class="portrait-wrapper">
              <img 
                src="${about.portraitImage}" 
                alt="Environmental portrait placeholder of Yuri Skvirski in a studio environment" 
                loading="lazy"
                width="800"
                height="1000"
              />
            </div>
            
            <div class="dev-spec-panel">
              <div class="dev-spec-badge">Environmental Portrait Brief</div>
              <p>${about.portraitSpec.devGuidance}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
