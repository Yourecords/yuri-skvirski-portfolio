/**
 * Hero Component
 * Immediate establishment of seniority, core positioning, and 16:9 cinematic showreel placeholder.
 */

export function renderHero(data) {
  const { hero } = data;

  const subtextHtml = hero.subtext
    .map(p => `<p>${p}</p>`)
    .join('');

  return `
    <section class="hero-section" id="hero" aria-label="Hero Introduction">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <h1 class="hero-headline">${hero.headline}</h1>
            
            <div class="hero-subtext">
              ${subtextHtml}
            </div>

            <div class="hero-actions">
              <a href="${hero.ctaPrimary.href}" class="btn btn-primary">
                ${hero.ctaPrimary.label}
              </a>
              <a href="${hero.ctaSecondary.href}" class="link-subtle">
                ${hero.ctaSecondary.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Cinematic 16:9 Studio Visual Frame -->
          <div class="hero-media-wrapper">
            <div class="cinematic-frame" id="hero-cinematic-frame">
              <img 
                src="${hero.media.posterImage}" 
                alt="Television studio floor during production with broadcast camera and interview desk"
                loading="eager"
                width="1920"
                height="1080"
              />

              <!-- Viewfinder Overlay & Broadcast Tally Marks -->
              <div class="viewfinder-overlay" aria-hidden="true">
                <div class="viewfinder-header">
                  <span class="tally-indicator">
                    <span class="tally-dot"></span>
                    CAM A • LIVE
                  </span>
                  <span>4K UHD • 25.00 FPS</span>
                </div>

                <!-- Center Viewfinder Crosshair -->
                <svg class="viewfinder-crosshair" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5">
                  <line x1="16" y1="0" x2="16" y2="10"/>
                  <line x1="16" y1="22" x2="16" y2="32"/>
                  <line x1="0" y1="16" x2="10" y2="16"/>
                  <line x1="22" y1="16" x2="32" y2="16"/>
                  <circle cx="16" cy="16" r="3"/>
                </svg>

                <div class="viewfinder-footer">
                  <span>SHUTTER 180° • 5600K</span>
                  <span>TC 10:04:12:08</span>
                </div>
              </div>

              <!-- Interactive Reel Preview Trigger Button -->
              <button 
                class="play-action-btn" 
                id="hero-play-trigger"
                data-video-type="hero_showreel"
                data-title="Yuri Skvirski — Production Direction Reel"
                aria-label="Play 15-second production reel preview"
              >
                <svg viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            </div>

            <!-- Unobtrusive Development Specification Box -->
            <div class="dev-spec-panel" role="note">
              <div class="dev-spec-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Media Asset Specification
              </div>
              <p>${hero.media.recommendedSpec}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
