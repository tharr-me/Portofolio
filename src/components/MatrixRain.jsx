import { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
        const charArray = chars.split('');
        
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        let animationId;
        let isVisible = false;

        const draw = () => {
            if (!isVisible) return;

            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const toggleMatrix = () => {
            isVisible = document.body.classList.contains('matrix-mode');
            if (isVisible) {
                draw();
            } else {
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        const observer = new MutationObserver(toggleMatrix);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="matrix-rain" />;
};

export default MatrixRain;
