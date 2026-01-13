import { useEffect, useRef } from 'react';

const useCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;

        if (!cursorDot || !cursorOutline) return;

        // Check if device supports hover (not touch device)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;

        const moveCursor = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        };

        const handleMouseEnter = () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        };

        const handleMouseLeave = () => {
            cursorOutline.style.width = '20px';
            cursorOutline.style.height = '20px';
            cursorOutline.style.backgroundColor = 'transparent';
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('.hover-link') || e.target.closest('.hover-card') || e.target.closest('a') || e.target.closest('button')) {
                handleMouseEnter();
            } else {
                handleMouseLeave();
            }
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return { cursorDotRef, cursorOutlineRef };
};

export default useCursor;
