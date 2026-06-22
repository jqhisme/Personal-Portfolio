(function () {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.35" result="noise" numOctaves="3" stitchTiles="stitch"/>
      <feDiffuseLighting in="noise" lighting-color="#c9bca8" surfaceScale="3"  diffuseConstant="0.6">
        <feDistantLight azimuth="45" elevation="60"/>
      </feDiffuseLighting>
    </filter>
    <rect width="100%" height="100%" filter="url(#roughpaper)"/>
  </svg>`;

  const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);
  const style = document.createElement('style');
  style.textContent = `body::before { background-image: url("${uri}"); background-size: cover; }`;
  document.head.appendChild(style);
})();
