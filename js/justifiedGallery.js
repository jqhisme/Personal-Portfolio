function tryLoadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function loadSequentialImages(basePath) {
  const images = [];
  let i = 1;
  while (true) {
    const img = await tryLoadImage(`${basePath}/${i}.webp`);
    if (!img) break;
    images.push(img);
    i++;
  }
  return images;
}

function renderJustifiedGallery(container, images, rowHeight, gap) {
  const containerW = container.clientWidth;
  const rows = [];
  let currentRow = [];
  let aspectSum = 0;

  for (const img of images) {
    const aspect = img.naturalWidth / img.naturalHeight;
    currentRow.push({ img, aspect });
    aspectSum += aspect;

    const totalGaps = gap * (currentRow.length - 1);
    const h = (containerW - totalGaps) / aspectSum;

    if (h <= rowHeight) {
      rows.push({ items: [...currentRow], aspectSum, isLast: false });
      currentRow = [];
      aspectSum = 0;
    }
  }

  if (currentRow.length) {
    rows.push({ items: currentRow, aspectSum, isLast: true });
  }

  container.innerHTML = '';

  rows.forEach(({ items, aspectSum, isLast }) => {
    const totalGaps = gap * (items.length - 1);
    const h = isLast ? rowHeight : (containerW - totalGaps) / aspectSum;

    const rowEl = document.createElement('div');
    rowEl.style.cssText = `display:flex; gap:${gap}px; margin-bottom:${gap}px;`;

    items.forEach(({ img, aspect }) => {
      img.style.cssText = `width:${aspect * h}px; height:${h}px; display:block; flex-shrink:0;`;
      rowEl.appendChild(img);
    });

    container.appendChild(rowEl);
  });
}

async function justifiedGallery(container, basePath, { rowHeight = 260, gap = 6 } = {}) {
  const images = await loadSequentialImages(basePath);
  if (images.length) renderJustifiedGallery(container, images, rowHeight, gap);
  return images.length;
}
