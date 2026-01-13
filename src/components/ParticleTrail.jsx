import { useEffect, useState } from 'react';
import './ParticleTrail.css';

const ParticleTrail = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        let particleId = 0;

        const createParticle = (x, y) => {
            const newParticle = {
                id: particleId++,
                x,
                y,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 1000 + 500,
            };

            setParticles(prev => [...prev, newParticle]);

            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== newParticle.id));
            }, newParticle.duration);
        };

        let lastTime = 0;
        const throttleTime = 50; // Create particle every 50ms

        const handleMouseMove = (e) => {
            const currentTime = Date.now();
            if (currentTime - lastTime > throttleTime) {
                createParticle(e.clientX, e.clientY);
                lastTime = currentTime;
            }
        };

        const handleClick = (e) => {
            // Create burst of particles on click
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const angle = (Math.PI * 2 * i) / 8;
                    const distance = 30;
                    createParticle(
                        e.clientX + Math.cos(angle) * distance,
                        e.clientY + Math.sin(angle) * distance
                    );
                }, i * 30);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="particle-trail-container">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="trail-particle"
                    style={{
                        left: `${particle.x}px`,
                        top: `${particle.y}px`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDuration: `${particle.duration}ms`,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleTrail;
