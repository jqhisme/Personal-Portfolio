// Inject cursor styles
const style = document.createElement('style');
style.textContent = `

  #custom-cursor {
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    /* Grainy gradient: SVG turbulence noise layered under a radial gradient */
    /*
    background:
      radial-gradient(circle, rgba(0, 0, 0, 0.85) 0%,  rgba(48, 48, 48, 0.01) 40%,transparent 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E");
    /* High contrast crushes the soft noise into sharp grain */
    filter: contrast(170%) brightness(500%);
    mix-blend-mode: multiply;
    */
   transition: all 0.2s ease;

  }

  #custom-cursor.cursor--card-hover {
    
}
    #custom-cursor.cursor--other-hover {
    width:150px;
    height: 150px;
      background:
      radial-gradient(circle, rgba(0, 38, 255, 0.85) 0%,  rgba(0, 113, 218, 0.2) 40%,transparent 70%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
}
    
`;
document.head.appendChild(style);

// Inject cursor element
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.prepend(cursor);

// Track mouse
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// Hover state on interactive elements (delegation catches dynamically added cards)
const HOVER_TARGETS = '.project-card';

document.addEventListener('mouseover', e => {
  if (e.target.closest(HOVER_TARGETS)) cursor.classList.add('cursor--card-hover');
});

document.addEventListener('mouseout', e => {
  if (e.target.closest(HOVER_TARGETS)) cursor.classList.remove('cursor--card-hover');
});

const OTHER_HOVER_TARGETS = 'a, button';

document.addEventListener('mouseover', e => {
  if (e.target.closest(OTHER_HOVER_TARGETS) && !cursor.classList.contains('cursor--card-hover')) cursor.classList.add('cursor--other-hover');
});

document.addEventListener('mouseout', e => {
  if (e.target.closest(OTHER_HOVER_TARGETS) && !cursor.classList.contains('cursor--card-hover')) cursor.classList.remove('cursor--other-hover');
});

