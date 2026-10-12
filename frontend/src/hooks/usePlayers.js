import { useCallback, useRef, useState } from 'react';

function makeEmptyPlayer(id) {
  return { id, name: '', number: '', jsize: 'M', ssize: 'M', role: '' };
}

export function usePlayers(initialCount = 10) {
  const seqRef = useRef(0);
  const [players, setPlayers] = useState(() =>
    Array.from({ length: initialCount }, () => {
      seqRef.current += 1;
      return makeEmptyPlayer(seqRef.current);
    })
  );

  const addPlayer = useCallback(() => {
    seqRef.current += 1;
    setPlayers((prev) => [...prev, makeEmptyPlayer(seqRef.current)]);
  }, []);

  const removePlayer = useCallback((id) => {
    setPlayers((prev) => (prev.length <= 1 ? prev : prev.filter((p) => p.id !== id)));
  }, []);

  const duplicatePlayer = useCallback((id) => {
    setPlayers((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      seqRef.current += 1;
      const copy = { ...prev[idx], id: seqRef.current };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  }, []);

  const updatePlayer = useCallback((id, field, value) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }, []);

  return { players, addPlayer, removePlayer, duplicatePlayer, updatePlayer };
}
