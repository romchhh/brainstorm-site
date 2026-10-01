'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { composeStatDisplay, parseStatValue } from '@/lib/statValue';

type Props = {
  value: string;
  className?: string;
  durationMs?: number;
};

export default function CountUpStat({ value, className, durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(() => composeStatDisplay(0, parsed));

  useEffect(() => {
    setDisplay(composeStatDisplay(0, parsed));
  }, [value]);

  useEffect(() => {
    const node = ref.current;
    if (!node || parsed.target <= 0) {
      setDisplay(value);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    let observer: IntersectionObserver | null = null;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(composeStatDisplay(parsed.target * eased, parsed));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer?.disconnect();
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(node);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, parsed.target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
