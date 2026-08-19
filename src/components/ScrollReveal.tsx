'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!revealNodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealNodes.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    revealNodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

