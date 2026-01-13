import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const containerRef = useRef(null);
    const [webGLSupported, setWebGLSupported] = useState(true);

    useEffect(() => {
        // Check WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            setWebGLSupported(false);
            return;
        }

        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        containerRef.current.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15; 
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        const clock = new THREE.Clock();
        let animationId;

        const tick = () => {
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            const elapsedTime = clock.getElapsedTime();

            particlesMesh.rotation.y = .1 * elapsedTime;
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(tick);
        };

        tick();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            
            // Properly dispose all resources
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            renderer.forceContextLoss();
            scene.clear();
        };
    }, []);

    if (!webGLSupported) {
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'radial-gradient(circle at 50% 50%, #0a0a0a, #000000)', opacity: 0.6 }} />
        );
    }

    return <div ref={containerRef} className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.6 }} />;
};

export default ThreeBackground;
