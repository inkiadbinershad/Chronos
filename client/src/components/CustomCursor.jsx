import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const animate = useCallback(() => {
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
    if (ringRef.current) {
      ringRef.current.style.left = ringPos.current.x + 'px';
      ringRef.current.style.top = ringPos.current.y + 'px';
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const handleEnter = () => {
      dotRef.current?.parentElement?.classList.add('cursor-hover');
    };
    const handleLeave = () => {
      dotRef.current?.parentElement?.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', handleMove);

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
