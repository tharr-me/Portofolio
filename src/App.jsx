import { useEffect, useState, useRef } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Designs from './components/Designs';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    
    // --- Preloader Logic ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate load or wait for resources

        const handleLoad = () => setLoading(false);
        window.addEventListener('load', handleLoad);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    // --- Custom Cursor Logic ---
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        const cursorDot = cursorDotRef.current;
        const cursorOutline = cursorOutlineRef.current;

        if (!cursorDot || !cursorOutline) return;

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

        window.addEventListener('mousemove', moveCursor);

        // Hover effects
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

        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // --- Typewriter Logic ---
    const [text, setText] = useState('');
    
    useEffect(() => {
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
        let timer;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                setText(currentPhrase.substring(0, charIndex - 1));
                charIndex--;
                typeSpeed = 50;
            } else {
                setText(currentPhrase.substring(0, charIndex + 1));
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            timer = setTimeout(type, typeSpeed);
        };

        timer = setTimeout(type, 100);

        return () => clearTimeout(timer);
    }, []);

    // --- Scroll Reveal & Active Nav ---
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        // Nav Active State
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

        return () => {
            observer.disconnect();
            navObserver.disconnect();
        };
    }, [loading]);

    return (
        <>
            {loading && (
                <div id="preloader">
                    <div className="loader-text">INITIALIZING...</div>
                    <div className="loader-bar"></div>
                </div>
            )}

            <div className="cursor-dot" ref={cursorDotRef} data-cursor-dot></div>
            <div className="cursor-outline" ref={cursorOutlineRef} data-cursor-outline></div>

            <ThreeBackground />

            <div className="content-wrapper">
                <header>
                    <div className="logo"><i className="fas fa-terminal"></i> THARR-ME</div>
                    <nav>
                        <ul>
                            <li><a href="#home" className="hover-link"><span className="nav-icon"><i className="fas fa-home"></i></span> HOME</a></li>
                            <li><a href="#projects" className="hover-link"><span className="nav-icon"><i className="fas fa-code"></i></span> WORK</a></li>
                            <li><a href="#designs" className="hover-link"><span className="nav-icon"><i className="fas fa-palette"></i></span> DESIGNS</a></li>
                            <li><a href="#contact" className="hover-link"><span className="nav-icon"><i className="fas fa-paper-plane"></i></span> CONTACT</a></li>
                        </ul>
                    </nav>
                </header>

                <section id="home" className="section">
                    <div className="hero-content hidden">
                        <p className="mono-tag"><i className="fas fa-code-branch"></i> :: SOFTWARE_ENGINEERING ::</p>
                        <h1 className="glitch" data-text="THARMIKAN">THARMIKAN</h1>
                        <div className="terminal-box">
                            <p className="terminal-text"><span className="prompt">&gt;</span> <span id="typewriter">{text}</span><span className="cursor">_</span></p>
                        </div>
                        <div className="cta-group">
                            <a href="#projects" className="btn-minimal hover-link"><i className="fas fa-eye"></i> VIEW WORK</a>
                            <a href="mailto:tharmikan25@icloud.com" className="btn-minimal hover-link"><i className="fas fa-envelope"></i> GET IN TOUCH</a>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section">
                    <h2 className="section-title hidden"><i className="fas fa-folder-open"></i> :: SELECTED_WORKS</h2>
                    <div className="project-list">
                        <div className="project-item hover-card hidden">
                            <div className="project-info">
                                <h3><i className="fab fa-youtube"></i> VideoProcessor</h3>
                                <p>Automated video content creation tool.</p>
                                <div className="tech-stack">
                                    <span>Python</span><span>YouTube API</span>
                                </div>
                            </div>
                            <a href="https://github.com/tharr-me/VideoProcessor" target="_blank" rel="noreferrer" className="project-link hover-link"><i className="fab fa-github"></i></a>
                        </div>

                        <div className="project-item hover-card hidden">
                            <div className="project-info">
                                <h3><i className="fas fa-tshirt"></i> ClothSwap</h3>
                                <p>Clothing exchange platform.</p>
                                <div className="tech-stack">
                                    <span><i className="fab fa-python"></i> Python</span><span><i className="fas fa-globe"></i> Web</span>
                                </div>
                            </div>
                            <a href="https://github.com/tharr-me/ClothSwap" target="_blank" rel="noreferrer" className="project-link hover-link"><i className="fab fa-github"></i></a>
                        </div>

                        <div className="project-item hover-card hidden">
                            <div className="project-info">
                                <h3><i className="fas fa-server"></i> SwapApi</h3>
                                <p>RESTful API for exchange platforms.</p>
                                <div className="tech-stack">
                                    <span><i className="fab fa-python"></i> Python</span><span><i className="fas fa-network-wired"></i> REST API</span>
                                </div>
                            </div>
                            <a href="https://github.com/tharr-me/SwapApi" target="_blank" rel="noreferrer" className="project-link hover-link"><i className="fab fa-github"></i></a>
                        </div>

                        <div className="project-item hover-card hidden">
                            <div className="project-info">
                                <h3><i className="fab fa-android"></i> Custom ROM Builder</h3>
                                <p>Android ROM automation tool.</p>
                                <div className="tech-stack">
                                    <span><i className="fas fa-terminal"></i> Shell</span><span><i className="fab fa-android"></i> Android</span>
                                </div>
                            </div>
                            <a href="https://github.com/tharr-me/Custom-Rom-Builder-For-Samsung-Galaxy-SDM439-SDM450" target="_blank" rel="noreferrer" className="project-link hover-link"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </section>

                <section id="skills" className="section">
                    <h2 className="section-title hidden"><i className="fas fa-microchip"></i> :: TECH_STACK</h2>
                    <div className="skills-grid hidden">
                        <div className="skill-category">
                            <h3>LANGUAGES</h3>
                            <div className="skill-tags">
                                <span>Python</span><span>JavaScript</span><span>HTML5</span><span>CSS3</span><span>Shell</span>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>FRAMEWORKS</h3>
                            <div className="skill-tags">
                                <span>React Native</span><span>Node.js</span><span>Flutter</span><span>Ren'Py</span>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>TOOLS</h3>
                            <div className="skill-tags">
                                <span>Git</span><span>Docker</span><span>AWS</span><span>Linux</span><span>Figma</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="designs" className="section">
                    <h2 className="section-title hidden"><i className="fas fa-palette"></i> :: GRAPHIC_DESIGN</h2>
                    <Designs />
                </section>

                <section id="contact" className="section">
                    <h2 className="section-title hidden"><i className="fas fa-satellite-dish"></i> :: CONTACT</h2>
                    <div className="contact-links hidden">
                        <a href="mailto:tharmikan25@icloud.com" className="contact-big hover-link">tharmikan25@icloud.com <i className="fas fa-arrow-right"></i></a>
                        <div className="social-row">
                            <a href="https://github.com/tharr-me" target="_blank" rel="noreferrer" className="hover-link"><i className="fab fa-github"></i> GITHUB</a>
                            <a href="https://www.linkedin.com/in/tharmikan-akilan-5777a52ba" target="_blank" rel="noreferrer" className="hover-link"><i className="fab fa-linkedin"></i> LINKEDIN</a>
                        </div>
                    </div>
                </section>

                <footer>
                    <p>© 2025 THARR-ME. ALL RIGHTS RESERVED.</p>
                </footer>
            </div>
        </>
    );
}

export default App;
