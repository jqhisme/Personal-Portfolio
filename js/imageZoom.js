function initImageZoom() {
    const img = document.getElementById('profile-image');
    const leftPanel = document.querySelector('.about-me-container .left');
    const figure = document.querySelector('figure.right');

    if (!img || !leftPanel || !figure) return;

    const ZOOM = 2.5;

    const lens = document.createElement('div');
    lens.id = 'zoom-lens';
    figure.appendChild(lens);

    const overlay = document.createElement('div');
    overlay.id = 'zoom-overlay';
    leftPanel.appendChild(overlay);

    function update(e) {
        const imgRect  = img.getBoundingClientRect();
        const leftRect = leftPanel.getBoundingClientRect();
        const figRect  = figure.getBoundingClientRect();

        const mx = e.clientX - imgRect.left;
        const my = e.clientY - imgRect.top;

        // Lens preserves image aspect ratio
        const lensW = leftRect.width / ZOOM;
        const lensH = lensW * (imgRect.height / imgRect.width);

        // Clamp lens centre within image bounds
        const cx = Math.max(lensW / 2, Math.min(mx, imgRect.width  - lensW / 2));
        const cy = Math.max(lensH / 2, Math.min(my, imgRect.height - lensH / 2));

        // Image may not start at figure top-left (flex-end pushes it down/right),
        // so offset the lens by the image's position within the figure
        const imgOffsetX = imgRect.left - figRect.left;
        const imgOffsetY = imgRect.top  - figRect.top;

        lens.style.left   = (imgOffsetX + cx - lensW / 2) + 'px';
        lens.style.top    = (imgOffsetY + cy - lensH / 2) + 'px';
        lens.style.width  = lensW + 'px';
        lens.style.height = lensH + 'px';

        // Overlay: full left panel width, height preserves image aspect ratio, centred vertically
        const overlayW = leftRect.width;
        const overlayH = overlayW * (imgRect.height / imgRect.width);

        overlay.style.width  = overlayW + 'px';
        overlay.style.height = overlayH + 'px';
        //overlay.style.top    = ((leftRect.height - overlayH) / 2) + 'px';
        overlay.style.top    = '0'
        overlay.style.left   = '0';

        // Scale full image by ZOOM, offset so lens centre maps to overlay centre
        const bgW = imgRect.width  * ZOOM;
        const bgH = imgRect.height * ZOOM;
        const bgX = cx * ZOOM - overlayW / 2;
        const bgY = cy * ZOOM - overlayH / 2;

        overlay.style.backgroundImage    = `url('${img.src}')`;
        overlay.style.backgroundSize     = `${bgW}px ${bgH}px`;
        overlay.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }

    img.addEventListener('mouseenter', () => {
        lens.style.display    = 'block';
        overlay.style.display = 'block';
        img.style.cursor = 'pointer';
    });

    img.addEventListener('mousemove', update);

    img.addEventListener('mouseleave', () => {
        lens.style.display    = 'none';
        overlay.style.display = 'none';
        img.style.cursor = 'default';
    });
}

initImageZoom();
