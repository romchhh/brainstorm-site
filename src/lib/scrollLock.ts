let lockCount = 0;
let scrollY = 0;

function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockScroll() {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount !== 1) return;

  scrollY = window.scrollY;
  const pad = scrollbarWidth();

  document.documentElement.setAttribute('data-scroll-lock', '');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  if (pad > 0) {
    document.body.style.paddingRight = `${pad}px`;
  }
}

export function unlockScroll() {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;

  document.documentElement.removeAttribute('data-scroll-lock');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';

  window.scrollTo(0, scrollY);
}
