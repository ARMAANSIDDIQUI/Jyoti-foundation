import { useRef, useState, useEffect } from 'react';

export default function Counter({ value, label, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let startTime;
      const endValue = parseInt(value);
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * endValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, value, duration]);

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}
