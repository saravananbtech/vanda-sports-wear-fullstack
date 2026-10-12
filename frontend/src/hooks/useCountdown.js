import { useEffect, useRef, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

export function useCountdown() {
  const targetRef = useRef(Date.now() + (2 * 86400 + 14 * 3600 + 36 * 60 + 9) * 1000);
  const [time, setTime] = useState({ d: '02', h: '14', m: '36', s: '09' });

  useEffect(() => {
    const tick = () => {
      let diff = Math.max(0, targetRef.current - Date.now());
      const d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      setTime({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
