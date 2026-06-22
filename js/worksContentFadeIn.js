function animateFadeIn(elements) {
  Array.from(elements).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { el.style.opacity = '1'; }, (i+1) * 60);
  });
}

function animateWorksContent() {
  const children = Array.from(document.querySelector('.works-content')?.children ?? [])
    .filter(el => el.tagName !== 'SCRIPT');
  animateFadeIn(children);
}
