import { useEffect, useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Designs from './components/Designs';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MobileMenu from './components/MobileMenu';
import ParticleTrail from './components/ParticleTrail';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import TerminalButton from './components/TerminalButton';
import MatrixRain from './components/MatrixRain';
import FeatureHint from './components/FeatureHint';
import useCursor from './hooks/useCursor';
import useTypewriter from './hooks/useTypewriter';
import useScrollReveal from './hooks/useScrollReveal';
import useActiveNav from './hooks/useActiveNav';

const TYPEWRITER_PHRASES = [
    "Building digital experiences.",
    "Crafting clean code.",
    "Exploring new technologies.",
    "Minimalist design enthusiast."
];

function App() {
    const [loading, setLoading] = useState(true);
    const [terminalOpen, setTerminalOpen] = useState(false);
    
    // Custom hooks
    const { cursorDotRef, cursorOutlineRef } = useCursor();
    const text = useTypewriter(TYPEWRITER_PHRASES);
    useScrollReveal([loading]);
    useActiveNav([loading]);
    
    // Preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const handleLoad = () => setLoading(false);
        window.addEventListener('load', handleLoad);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

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

            <ParticleTrail />
            <TerminalEasterEgg isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
            <TerminalButton onToggle={() => setTerminalOpen(prev => !prev)} />
            <MatrixRain />
            <FeatureHint />
            <ThreeBackground />

            <div className="content-wrapper">
                <header>
                    <div className="logo"><i className="fas fa-terminal"></i> THARR-ME</div>
                    <MobileMenu />
                    <nav className="desktop-nav">
                        <ul>
                            <li><a href="#home" className="hover-link"><span className="nav-icon"><i className="fas fa-home"></i></span> HOME</a></li>
                            <li><a href="#projects" className="hover-link"><span className="nav-icon"><i className="fas fa-code"></i></span> WORK</a></li>
                            <li><a href="#designs" className="hover-link"><span className="nav-icon"><i className="fas fa-palette"></i></span> DESIGNS</a></li>
                            <li><a href="#contact" className="hover-link"><span className="nav-icon"><i className="fas fa-paper-plane"></i></span> CONTACT</a></li>
                        </ul>
                    </nav>
                </header>

                <section id="home" className="section" aria-labelledby="hero-heading">
                    <div className="hero-content hidden">
                        <p className="mono-tag"><i className="fas fa-code-branch"></i> :: SOFTWARE_ENGINEERING ::</p>
                        <h1 id="hero-heading" className="glitch" data-text="THARMIKAN">THARMIKAN</h1>
                        <div className="terminal-box" role="status" aria-live="polite">
                            <p className="terminal-text"><span className="prompt" aria-hidden="true">&gt;</span> <span id="typewriter">{text}</span><span className="cursor" aria-hidden="true">_</span></p>
                        </div>
                        <div className="cta-group">
                            <a href="#projects" className="btn-minimal hover-link"><i className="fas fa-eye"></i> VIEW WORK</a>
                            <a href="mailto:tharmikan25@icloud.com" className="btn-minimal hover-link"><i className="fas fa-envelope"></i> GET IN TOUCH</a>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section" aria-labelledby="projects-heading">
                    <h2 id="projects-heading" className="section-title hidden"><i className="fas fa-folder-open"></i> :: SELECTED_WORKS</h2>
                    <Projects />
                </section>

                <section id="skills" className="section" aria-labelledby="skills-heading">
                    <h2 id="skills-heading" className="section-title hidden"><i className="fas fa-microchip"></i> :: TECH_STACK</h2>
                    <Skills />
                </section>

                <section id="designs" className="section" aria-labelledby="designs-heading">
                    <h2 id="designs-heading" className="section-title hidden"><i className="fas fa-palette"></i> :: GRAPHIC_DESIGN</h2>
                    <Designs />
                </section>

                <section id="contact" className="section" aria-labelledby="contact-heading">
                    <h2 id="contact-heading" className="section-title hidden"><i className="fas fa-satellite-dish"></i> :: CONTACT</h2>
                    <div className="contact-links hidden">
                        <a href="mailto:tharmikan25@icloud.com" className="contact-big hover-link" aria-label="Email tharmikan25@icloud.com">tharmikan25@icloud.com <i className="fas fa-arrow-right" aria-hidden="true"></i></a>
                        <div className="social-row">
                            <a href="https://github.com/tharr-me" target="_blank" rel="noreferrer" className="hover-link" aria-label="Visit GitHub profile"><i className="fab fa-github" aria-hidden="true"></i> GITHUB</a>
                            <a href="https://www.linkedin.com/in/tharmikan-akilan-5777a52ba" target="_blank" rel="noreferrer" className="hover-link" aria-label="Visit LinkedIn profile"><i className="fab fa-linkedin" aria-hidden="true"></i> LINKEDIN</a>
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
