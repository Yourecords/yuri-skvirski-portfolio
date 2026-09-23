/**
 * Experience Timeline Component
 * Restrained vertical timeline covering career leadership at JNS and i24NEWS.
 */

export function renderExperienceTimeline(data) {
  const { experience } = data;

  const timelineHtml = experience.timeline
    .map(item => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-period">${item.period}</div>
        <h3 class="timeline-role">${item.role}</h3>
        <div class="timeline-company">${item.company} • ${item.location}</div>
        <p class="timeline-summary">${item.summary}</p>
      </div>
    `)
    .join('');

  return `
    <section class="section" id="experience" aria-label="Career Experience">
      <div class="container">
        <header class="section-header">
          <div class="section-eyebrow">Background</div>
          <h2 class="section-title">${experience.title}</h2>
          <p class="section-intro">${experience.subtitle}</p>
        </header>

        <div class="timeline-container">
          ${timelineHtml}
        </div>

        <div class="cv-download-wrapper">
          <a href="${experience.cvDownload.url}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" download="Yuri_Skvirski_CV.pdf">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            ${experience.cvDownload.label}
          </a>
          <span style="font-size: var(--text-xs); color: var(--text-tertiary);">${experience.cvDownload.note}</span>
        </div>
      </div>
    </section>
  `;
}
