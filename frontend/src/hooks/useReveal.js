import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to the returned ref's element and
 * toggles the `in` class (matching .reveal.in in globals.css) once it
 * scrolls into view.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
