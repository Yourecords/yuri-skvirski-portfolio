/**
 * DevGuideOverlay Component
 * Provides a floating switch allowing Yuri to toggle development media specifications
 * on and off to evaluate both the clean visitor view and the media-briefing view.
 */

export function renderDevGuideControl() {
  return `
    <aside class="dev-mode-floating-control" aria-label="Development Mode Controls">
      <span>Dev Specs</span>
      <label class="dev-mode-switch" title="Toggle development media asset guidance panels">
        <input type="checkbox" id="dev-mode-toggle" checked />
        <span class="dev-slider"></span>
      </label>
    </aside>
  `;
}

export function initDevGuideControl() {
  const toggle = document.getElementById('dev-mode-toggle');
  if (!toggle) return;

  // Check saved preference or URL param
  const urlParams = new URLSearchParams(window.location.search);
  const paramDev = urlParams.get('dev');

  if (paramDev === 'false' || localStorage.getItem('yuri_dev_specs') === 'hidden') {
    document.body.classList.add('specs-hidden');
    toggle.checked = false;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.remove('specs-hidden');
      localStorage.setItem('yuri_dev_specs', 'visible');
    } else {
      document.body.classList.add('specs-hidden');
      localStorage.setItem('yuri_dev_specs', 'hidden');
    }
  });
}
