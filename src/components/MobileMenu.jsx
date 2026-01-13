import { useState } from 'react';
import './MobileMenu.css';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <button 
                className={`hamburger ${isOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
                    <ul>
                        <li><a href="#home" onClick={closeMenu}><i className="fas fa-home"></i> HOME</a></li>
                        <li><a href="#projects" onClick={closeMenu}><i className="fas fa-code"></i> WORK</a></li>
                        <li><a href="#designs" onClick={closeMenu}><i className="fas fa-palette"></i> DESIGNS</a></li>
                        <li><a href="#contact" onClick={closeMenu}><i className="fas fa-paper-plane"></i> CONTACT</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;
