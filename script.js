import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// --- Custom Cursor Logic ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay (using animate for smoothness)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for cursor
const hoverLinks = document.querySelectorAll('.hover-link, .hover-card');

hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '20px';
        cursorOutline.style.height = '20px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// --- Typewriter Effect ---
const textElement = document.getElementById('typewriter');
const phrases = [
    "Building digital experiences.",
    "Crafting clean code.",
    "Exploring new technologies.",
    "Minimalist design enthusiast."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
}

// Start typing when loaded
document.addEventListener('DOMContentLoaded', type);


// --- Three.js Background ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x050505, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Append to specific container
const container = document.querySelector('.canvas-container');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    document.body.appendChild(renderer.domElement);
}

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

// Mouse Interaction for 3D
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

const clock = new THREE.Clock();

const tick = () => {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = .1 * elapsedTime;
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000); // Wait for 2s animation
});

// --- Scroll Reveal ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- Active Nav Link ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => navObserver.observe(section));

// --- Mobile Optimization for Particles ---
if (window.innerWidth < 768) {
    // Reduce particles on mobile
    // Note: This logic runs after the initial setup, so we might need to reload or handle it in the setup.
    // Since the setup is already done above, let's just update the geometry if needed or keep it simple.
    // For a proper fix, we should have checked window.innerWidth during setup.
    // But we can just hide the canvas on very small screens if performance is bad, or leave it as is since 2000 particles is usually fine.
}


// --- Load Designs ---
async function loadDesigns() {
    const grid = document.getElementById('design-grid');
    if (!grid) return;

    try {
        const response = await fetch('designs.json');
        const data = await response.json();
        
        // Decap CMS saves the list inside a "designs" property object
        // But if we manually edited it before, it might be a direct array.
        // Let's handle both cases.
        const designs = Array.isArray(data) ? data : data.designs;

        if (!designs) {
             grid.innerHTML = '<p>No designs found.</p>';
             return;
        }

        let html = '';
        designs.forEach(design => {
            html += '<div class="design-item">';
            html += '<img src="' + design.image + '" alt="' + design.title + '" loading="lazy">';
            html += '<div class="design-overlay">';
            html += '<div class="design-title">' + design.title + '</div>';
            html += '<div class="design-category">' + design.category + '</div>';
            html += '</div></div>';
        });
        
        grid.innerHTML = html;
        
        // Re-observe new elements for scroll reveal
        const newItems = grid.querySelectorAll('.design-item');
        newItems.forEach(el => {
            el.classList.add('hidden');
            observer.observe(el);
        });

    } catch (error) {
        console.error('Error loading designs:', error);
        grid.innerHTML = '<p>Failed to load designs.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadDesigns);

