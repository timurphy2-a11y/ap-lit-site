(function () {
  'use strict';

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const ensureLiveRegion = (root, initialText) => {
    let live = root.querySelector('[data-listening-live], [aria-live]');
    if (!live) {
      live = document.createElement('p');
      live.className = 'sr-only';
      live.dataset.listeningLive = '';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      root.appendChild(live);
    }
    if (initialText) live.textContent = initialText;
    return live;
  };

  const wire = ({ root, audio, paint, peers = [], status = null, initialStatus = '' }) => {
    if (!root || !audio || typeof paint !== 'function') {
      throw new Error('ListeningVisual.wire requires root, audio, and paint.');
    }

    const live = ensureLiveRegion(root, initialStatus);
    let frame = 0;
    const updateLiveStatus = () => {
      if (typeof status !== 'function') return;
      const next = status(audio.currentTime || 0, audio.duration);
      if (next && next !== live.textContent) {
        live.textContent = next;
      }
    };

    const render = () => {
      paint();
      updateLiveStatus();
    };

    const stopAnimation = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = () => {
      render();
      if (!audio.paused && !mediaQuery.matches) frame = requestAnimationFrame(animate);
    };

    const start = () => {
      peers.filter(other => other && other !== audio).forEach(other => other.pause());
      stopAnimation();
      render();
      if (!mediaQuery.matches) frame = requestAnimationFrame(animate);
    };

    audio.addEventListener('play', start);
    audio.addEventListener('pause', () => {
      stopAnimation();
      render();
    });
    ['timeupdate', 'seeked', 'loadedmetadata', 'ended'].forEach(event => {
      audio.addEventListener(event, render);
    });
    mediaQuery.addEventListener('change', () => {
      stopAnimation();
      render();
      if (!mediaQuery.matches && !audio.paused) frame = requestAnimationFrame(animate);
    });

    render();
    return { render, stop: stopAnimation };
  };

  window.ListeningVisual = Object.freeze({ wire });
})();
