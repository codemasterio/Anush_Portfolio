'use client';
import { useTrail, animated } from '@react-spring/web';
import { useRef, useCallback, useEffect } from 'react';
import './BlobCursor.css';

// Faster spring configurations for more responsive movement
const fast = { tension: 1800, friction: 35, precision: 0.1 };
const slow = { mass: 5, tension: 300, friction: 40, precision: 0.1 };
const trans = (x: number, y: number) => `translate3d(${Math.round(x)}px,${Math.round(y)}px,0) translate3d(-50%,-50%,0)`;

const BlobCursor = () => {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
    immediate: false, // Ensure animations are used instead of direct updates
  }));

  const ref = useRef<HTMLDivElement>(null);
  
  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  // Throttle the mousemove event for better performance
  const handleMove = (e: MouseEvent | TouchEvent) => {
    requestAnimationFrame(() => {
      const { left, top } = updatePosition();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      api.start({ 
        xy: [clientX - left, clientY - top],
        config: (key) => (key === 'xy' ? (trail.length > 1 ? slow : fast) : {})
      });
    });
  };

  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMove as EventListener);
    document.addEventListener('touchmove', handleMove as EventListener, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMove as EventListener);
      document.removeEventListener('touchmove', handleMove as EventListener);
    };
  }, [handleMove, updatePosition]);

  return (
    <div className="blob-cursor-container">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>
      <div ref={ref} className="blob-cursor">
        {trail.map((props, index) => (
          <animated.div
            key={index}
            className={`blob-layer blob-layer-${index + 1}`}
            style={{
              transform: props.xy.to(trans),
              backgroundColor: index === 0 ? 'rgba(194, 91, 0, 0.9)' : 
                               index === 1 ? 'rgba(239, 126, 12, 0.7)' : 
                               'rgba(253, 186, 116, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlobCursor;
