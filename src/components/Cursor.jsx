import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width:768px)').matches;
    if (isMobile) return;

    let raf;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', move);

    const animate = () => {
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px'; }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + 'px'; ring.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => { dot.current?.classList.add('hover'); ring.current?.classList.add('hover'); };
    const onLeave = () => { dot.current?.classList.remove('hover'); ring.current?.classList.remove('hover'); };
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position:fixed;width:8px;height:8px;
          background:var(--gold);border-radius:50%;
          pointer-events:none;z-index:9999;
          transform:translate(-50%,-50%);
          transition:width .25s,height .25s,background .25s;
        }
        .cursor-ring {
          position:fixed;width:32px;height:32px;
          border:1px solid rgba(201,169,110,0.6);border-radius:50%;
          pointer-events:none;z-index:9998;
          transform:translate(-50%,-50%);
        }
        .cursor-dot.hover{width:16px;height:16px;}
        .cursor-ring.hover{width:48px;height:48px;border-color:var(--gold);}
        @media(max-width:768px){.cursor-dot,.cursor-ring{display:none;}}
        body{cursor:none;}
        @media(max-width:768px){body{cursor:auto;}}
      `}</style>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}
