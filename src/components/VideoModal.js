/**
 * Video Modal Component
 * Accessible, lazy-loaded 16:9 player for showreels, broadcast montages, and video embeds.
 */

export function renderVideoModal() {
  return `
    <div 
      class="video-modal-backdrop" 
      id="video-modal-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-hidden="true" 
      tabindex="-1"
    >
      <div class="video-modal-container">
        <div class="video-modal-header">
          <span class="video-modal-title" id="video-modal-title">Project Video Playback</span>
          <button class="video-modal-close" id="video-modal-close" aria-label="Close video player">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="video-modal-viewport" id="video-modal-viewport">
          <!-- Dynamic content inserted on open -->
        </div>
      </div>
    </div>
  `;
}

export function initVideoModal() {
  const modal = document.getElementById('video-modal-backdrop');
  const modalTitle = document.getElementById('video-modal-title');
  const modalViewport = document.getElementById('video-modal-viewport');
  const closeBtn = document.getElementById('video-modal-close');

  if (!modal || !modalViewport || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalViewport.innerHTML = '';
    document.body.style.overflow = '';
  }

  function openModal(title, contentHtml) {
    modalTitle.textContent = title || 'Video Playback';
    modalViewport.innerHTML = contentHtml;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  // Bind close events
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach triggers
  document.querySelectorAll('.play-action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoType = btn.dataset.videoType;
      const title = btn.dataset.title || 'Video Player';

      if (videoType === 'hero_showreel') {
        const simulatedReelHtml = `
          <div class="simulated-reel-view">
            <div style="margin-bottom: 1.5rem;">
              <span class="tally-indicator" style="font-size: 0.8rem; margin-bottom: 0.75rem;">
                <span class="tally-dot"></span> BROADCAST MASTER PREVIEW
              </span>
              <h3 style="font-size: 1.4rem; margin-top: 0.5rem; color: #fff;">DIRECTOR SHOWREEL (15s SILENT PREVIEW)</h3>
              <p style="color: #9ca3af; font-size: 0.9rem; max-width: 600px; margin: 0.5rem auto;">
                Showcases multi-camera studio direction, camera operation, live control room multiview switching, and lighting design.
              </p>
            </div>
            
            <div style="font-family: monospace; font-size: 1.25rem; color: #e53935; letter-spacing: 2px; margin-bottom: 1rem;">
              TIMECODE: 00:00:14:24 / 00:00:15:00
            </div>

            <div style="display: flex; gap: 1rem; align-items: center;">
              <a href="#contact" class="btn btn-primary" onclick="document.getElementById('video-modal-close').click();">
                INQUIRE FOR FULL REEL
              </a>
            </div>
          </div>
        `;
        openModal('Yuri Skvirski — Production Reel Preview', simulatedReelHtml);
      } else {
        // Embed type (YouTube / Vimeo)
        const embedUrl = btn.dataset.videoUrl;
        if (embedUrl) {
          const iframeHtml = `
            <iframe 
              src="${embedUrl}?autoplay=1&rel=0&modestbranding=1" 
              title="${title}" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          `;
          openModal(title, iframeHtml);
        }
      }
    });
  });

  // Episode cards click trigger
  document.querySelectorAll('.episode-card').forEach(card => {
    card.addEventListener('click', () => {
      const epTitle = card.dataset.title;
      const sampleUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ';
      const iframeHtml = `
        <iframe 
          src="${sampleUrl}?autoplay=1&rel=0" 
          title="${epTitle}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      `;
      openModal(`JNS Studio — ${epTitle}`, iframeHtml);
    });
  });
}
