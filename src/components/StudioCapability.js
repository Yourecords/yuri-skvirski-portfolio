/**
 * Studio Capability Component
 * Focus on infrastructure, technical workflows, crew leadership, and studio engineering.
 */

export function renderStudioCapability(data) {
  const { studioCapability } = data;

  const paragraphsHtml = studioCapability.paragraphs
    .map(p => `<p>${p}</p>`)
    .join('');

  const capabilitiesHtml = studioCapability.capabilities
    .map(cap => `<li class="capability-item">${cap}</li>`)
    .join('');

  return `
    <section class="section" id="studio" aria-label="Studio Capabilities">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Infrastructure & Systems</div>
          <h2 class="section-title">${studioCapability.title}</h2>
        </header>

        <div class="studio-capability-grid">
          <!-- Left: Narrative & Capability Matrix -->
          <div class="studio-capability-text">
            ${paragraphsHtml}

            <ul class="capabilities-list" aria-label="Production Capabilities">
              ${capabilitiesHtml}
            </ul>
          </div>

          <!-- Right: Documentary BTS Photography -->
          <div class="studio-capability-media">
            <div class="cinematic-frame">
              <img 
                src="${studioCapability.media.image}" 
                alt="Yuri Skvirski reviewing live multicamera production on studio floor monitor" 
                loading="lazy"
                width="1200"
                height="800"
              />
            </div>
            <div class="dev-spec-panel">
              <div class="dev-spec-badge">Documentary Image Guidance</div>
              <p>${studioCapability.media.devGuidance}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
