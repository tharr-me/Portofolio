class ExpansionBentGrid {
    constructor() {
        this.container = document.getElementById('container');
        this.canvas = document.getElementById('gridCanvas');
        this.cursor = document.getElementById('cursor');
        this.ctx = this.canvas.getContext('2d');
        
        // Mouse state - no smoothing for instant response
        this.mouseX = 0;
        this.mouseY = 0;
        this.isHovering = false;
        this.hasMoved = false;
        this.bendingEnabled = false;
        this.bendingTimeout = null;
        
        // Grid configuration
        this.gridSize = 55;
        this.expansionRadius = 80;
        this.expansionStrength = 30;
        
        // Hide cursor by default
        this.cursor.style.opacity = '0';
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        
        // Set initial position to center
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.updateCursorPosition();
        this.drawExpansionGrid();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }
    
    setupEventListeners() {
        // Only add mouse events if not on mobile
        if (window.innerWidth > 768) {
            this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
            this.container.addEventListener('mouseenter', () => this.onMouseEnter());
            this.container.addEventListener('mouseleave', () => this.onMouseLeave());
        }
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        // Direct assignment for instant response
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
        
        this.updateCursorPosition();
        
        // Show cursor on first movement
        if (!this.hasMoved) {
            this.hasMoved = true;
            this.cursor.style.opacity = '1';
            // Start bending after 500ms delay
            this.bendingTimeout = setTimeout(() => {
                this.bendingEnabled = true;
            }, 500);
        }
        
        this.drawExpansionGrid();
    }
    
    onMouseEnter() {
        this.isHovering = true;
        this.cursor.style.opacity = '1';
    }
    
    onMouseLeave() {
        this.isHovering = false;
        this.cursor.style.opacity = '0';
        // Reset bending when leaving
        this.hasMoved = false;
        this.bendingEnabled = false;
        if (this.bendingTimeout) {
            clearTimeout(this.bendingTimeout);
        }
        this.drawExpansionGrid();
    }
    
    updateCursorPosition() {
        // Direct positioning for instant response
        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';
    }
    
    drawExpansionGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Use a darker grid color for both modes
        let gridColor = 'rgba(40, 40, 40, 0.9)';
        if (document.body.classList.contains('light-mode')) {
            gridColor = 'rgba(60, 90, 120, 0.8)';
        }
        this.ctx.strokeStyle = gridColor;
        this.ctx.lineWidth = 0.9;

        // Draw vertical lines with expansion effect
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            
            for (let y = 0; y <= this.canvas.height; y += 2) {
                const distance = Math.sqrt((x - this.mouseX) ** 2 + (y - this.mouseY) ** 2);
                let offsetX = x;
                
                if (distance < this.expansionRadius && this.bendingEnabled) {
                    // Expansion effect: push lines away from cursor
                    const expansionFactor = (1 - distance / this.expansionRadius) * this.expansionStrength;
                    const directionX = (x - this.mouseX) / distance;
                    offsetX = x + directionX * expansionFactor;
                }
                
                if (y === 0) {
                    this.ctx.moveTo(offsetX, y);
                } else {
                    this.ctx.lineTo(offsetX, y);
                }
            }
            
            this.ctx.stroke();
        }

        // Draw horizontal lines with expansion effect
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            
            for (let x = 0; x <= this.canvas.width; x += 2) {
                const distance = Math.sqrt((x - this.mouseX) ** 2 + (y - this.mouseY) ** 2);
                let offsetY = y;
                
                if (distance < this.expansionRadius && this.bendingEnabled) {
                    // Expansion effect: push lines away from cursor
                    const expansionFactor = (1 - distance / this.expansionRadius) * this.expansionStrength;
                    const directionY = (y - this.mouseY) / distance;
                    offsetY = y + directionY * expansionFactor;
                }
                
                if (x === 0) {
                    this.ctx.moveTo(x, offsetY);
                } else {
                    this.ctx.lineTo(x, offsetY);
                }
            }
            
            this.ctx.stroke();
        }
    }
}

function typeTextWithCursor({
    elementId,
    text,
    delay = 70,
    cursor,
    afterType,
    backspace = false,
    afterBackspace = null
}) {
    const el = document.getElementById(elementId);
    let i = backspace ? text.length : 0;
    function type() {
        if (!backspace && i <= text.length) {
            el.textContent = text.slice(0, i);
            // Move cursor to the end of the text node
            if (cursor.parentNode !== el.parentNode) {
                if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                el.parentNode.appendChild(cursor);
            }
            i++;
            setTimeout(type, delay);
        } else if (backspace && i >= 0) {
            el.textContent = text.slice(0, i);
            if (cursor.parentNode !== el.parentNode) {
                if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                el.parentNode.appendChild(cursor);
            }
            i--;
            setTimeout(type, delay);
        } else if (afterType && !backspace) {
            afterType();
        } else if (afterBackspace && backspace) {
            afterBackspace();
        }
    }
    type();
}

// Initialize the expansion bent grid
document.addEventListener('DOMContentLoaded', () => {
    const welcomeTyping = document.getElementById('welcome-typing');
    const portfolioTyping = document.getElementById('portfolio-typing');
    const cursor = document.getElementById('typing-cursor');
    if (welcomeTyping && portfolioTyping && cursor) {
        cursor.style.display = 'inline-block';
        // Step 1: Type 'Welcome'
        typeTextWithCursor({
            elementId: 'welcome-typing',
            text: 'Welcome',
            delay: 120,
            cursor,
            afterType: () => {
                // Step 2: Move cursor to portfolio line and type 'to my portfolio'
                if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                portfolioTyping.parentNode.appendChild(cursor);
                typeTextWithCursor({
                    elementId: 'portfolio-typing',
                    text: 'to my portfolio',
                    delay: 70,
                    cursor,
                    afterType: () => {
                        setTimeout(() => {
                            // Step 3: Backspace 'to my portfolio'
                            typeTextWithCursor({
                                elementId: 'portfolio-typing',
                                text: 'to my portfolio',
                                delay: 40,
                                cursor,
                                backspace: true,
                                afterBackspace: () => {
                                    // Step 4: Move cursor to Welcome and backspace 'Welcome'
                                    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                                    welcomeTyping.parentNode.appendChild(cursor);
                                    typeTextWithCursor({
                                        elementId: 'welcome-typing',
                                        text: 'Welcome',
                                        delay: 40,
                                        cursor,
                                        backspace: true,
                                        afterBackspace: () => {
                                            // Step 5: Type 'Hello, World!'
                                            typeTextWithCursor({
                                                elementId: 'welcome-typing',
                                                text: 'Hello World!',
                                                delay: 70,
                                                cursor,
                                                afterType: () => {
                                                    setTimeout(() => {
                                                        // Step 6: Move cursor to portfolio line and type 'loops, logic, and learning'
                                                        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                                                        portfolioTyping.parentNode.appendChild(cursor);
                                                        typeTextWithCursor({
                                                            elementId: 'portfolio-typing',
                                                            text: 'loops, logic, and learning',
                                                            delay: 70,
                                                            cursor,
                                                            afterType: () => {
                                                                cursor.style.display = 'inline-block';
                                                            }
                                                        });
                                                    }, 1200);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }, 1200);
                    }
                });
            }
        });
    }
    
    // Add CV download functionality
    const downloadCVButton = document.getElementById('downloadCV');
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'assets/Akilan Tharmikan CV.pdf';
            link.download = 'Akilan_Tharmikan_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Add View Projects scroll functionality
    const viewProjectsButton = document.getElementById('viewProjects');
    if (viewProjectsButton) {
        viewProjectsButton.addEventListener('click', () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Initialize collapsible text functionality
    initializeCollapsibleText();
    
    // Initialize scroll to top functionality
    initializeScrollToTop();
    
    // Initialize theme toggle functionality
    initializeThemeToggle();
    
    // Initialize fun quirky features
    initializeQuirkyFeatures();
    
    new ExpansionBentGrid();
});

// Collapsible Text Functionality
function initializeCollapsibleText() {
    const toggleButtons = document.querySelectorAll('.collapse-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const collapsibleContainer = this.closest('.collapsible-text');
            const textElement = collapsibleContainer.querySelector('p');
            
            if (collapsibleContainer.classList.contains('expanded')) {
                // Collapse
                collapsibleContainer.classList.remove('expanded');
                this.classList.remove('expanded');
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
                
                // Smooth collapse animation
                textElement.style.maxHeight = '3.6em';
            } else {
                // Expand
                collapsibleContainer.classList.add('expanded');
                this.classList.add('expanded');
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                
                // Smooth expand animation
                textElement.style.maxHeight = '20em';
            }
        });
    });
    
    // Auto-collapse on window resize to mobile
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 600) {
                // Reset all collapsible elements on desktop
                const collapsibleContainers = document.querySelectorAll('.collapsible-text');
                const toggleButtons = document.querySelectorAll('.collapse-toggle');
                
                collapsibleContainers.forEach(container => {
                    container.classList.remove('expanded');
                });
                
                toggleButtons.forEach(button => {
                    button.classList.remove('expanded');
                    button.innerHTML = '<i class="fas fa-chevron-down"></i>';
                });
            }
        }, 100);
    });
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    const themeToggleButton = document.getElementById('themeToggle');
    
    if (!scrollToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('show');
            // Move theme toggle up when scroll button appears
            if (themeToggleButton) {
                themeToggleButton.classList.add('move-up');
            }
        } else {
            scrollToTopButton.classList.remove('show');
            // Move theme toggle back to original position when scroll button hides
            if (themeToggleButton) {
                themeToggleButton.classList.remove('move-up');
            }
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add keyboard support (Space or Enter key)
    scrollToTopButton.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isDarkMode = savedTheme === 'dark';
    
    // Apply initial theme
    if (!isDarkMode) {
        document.body.classList.add('light-mode');
        updateThemeIcon('light');
    } else {
        updateThemeIcon('dark');
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = !document.body.classList.contains('light-mode');
        
        if (isCurrentlyDark) {
            // Switch to light mode
            document.body.classList.add('light-mode');
            updateThemeIcon('light');
            localStorage.setItem('theme', 'light');
            showNotification('☀️ Switched to Light Mode', 'info');
        } else {
            // Switch to dark mode
            document.body.classList.remove('light-mode');
            updateThemeIcon('dark');
            localStorage.setItem('theme', 'dark');
            showNotification('🌙 Switched to Dark Mode', 'info');
        }
    });
    
    // Add keyboard support (T key for theme toggle)
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 't' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

// Update theme icon based on current mode
function updateThemeIcon(mode) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (mode === 'light') {
        icon.className = 'fas fa-sun';
        icon.style.color = '#f39c12';
    } else {
        icon.className = 'fas fa-moon';
        icon.style.color = '#ffffff';
    }
}

// Fun Quirky Features
function initializeQuirkyFeatures() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateKonamiEasterEgg();
            konamiCode = [];
        }
    });
    
    // Secret Click Counter
    let secretClicks = 0;
    const secretThreshold = 7;
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-item') || e.target.classList.contains('project-card')) {
            secretClicks++;
            if (secretClicks === secretThreshold) {
                showSecretMessage();
                secretClicks = 0;
            }
        }
    });
    
    // Random Fun Facts
    showRandomFunFacts();
}

// Konami Code Easter Egg
function activateKonamiEasterEgg() {
    const container = document.querySelector('.container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    let colorIndex = 0;
    
    // Create rainbow effect
    const rainbowInterval = setInterval(() => {
        container.style.background = `radial-gradient(circle at 50% 50%, ${colors[colorIndex]}20 0%, #0a0a0a 100%)`;
        colorIndex = (colorIndex + 1) % colors.length;
    }, 200);
    
    // Show easter egg message
    showNotification('🎮 Konami Code Activated! 🌈', 'success');
    
    // Reset after 5 seconds
    setTimeout(() => {
        clearInterval(rainbowInterval);
        container.style.background = 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)';
    }, 5000);
}

// Secret Click Message
function showSecretMessage() {
    const messages = [
        '🎉 You found the secret! You\'re awesome!',
        '🌟 Secret achievement unlocked: Persistent Clicker!',
        '🎯 Wow, you really like clicking things!',
        '🚀 You\'ve discovered the hidden click counter!',
        '💫 Secret message: Keep exploring!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'info');
}

// Random Fun Facts
function showRandomFunFacts() {
    const funFacts = [
        '💡 Did you know? The first computer bug was an actual bug!',
        '🎮 Fun fact: The first video game was created in 1958!',
        '🚀 Space fact: There\'s a computer on the moon!',
        '🎨 Design tip: The best designs are invisible!',
        '⚡ Tech fact: The internet is older than you think!',
        '🎪 Fun fact: This portfolio has secret features!',
        '🌟 Did you know? You can find easter eggs here!',
        '🎯 Pro tip: Try clicking things multiple times!'
    ];
    
    // Show a random fact every 30 seconds
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 30 seconds
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            showNotification(randomFact, 'fun');
        }
    }, 30000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;

    // Theme-aware glassmorphism styles
    let background = 'linear-gradient(135deg, rgba(30,30,40,0.7) 0%, rgba(30,30,40,0.5) 100%)';
    let border = '1px solid rgba(255,255,255,0.18)';
    let color = 'white';
    let boxShadow = '0px 0px 20px rgba(0,0,0,0.18)';
    let blur = 'blur(12px)';

    if (document.body.classList.contains('light-mode')) {
        background = 'linear-gradient(135deg, rgba(0,150,255,0.13) 0%, rgba(255,255,255,0.7) 100%)';
        border = '1.5px solid rgba(0,150,255,0.18)';
        color = '#1a4a6b';
        boxShadow = '0px 0px 20px rgba(0,150,255,0.10)';
        blur = 'blur(14px)';
    }

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${background};
        border: ${border};
        border-radius: 18px;
        padding: 1em 1.7em;
        color: ${color};
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
        z-index: 10000;
        backdrop-filter: ${blur};
        box-shadow: ${boxShadow};
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(.4,2,.6,1);
        max-width: 340px;
        word-wrap: break-word;
        opacity: 0.98;
        letter-spacing: 0.01em;
    `;

    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'rgba(76, 175, 80, 0.4)';
        notification.style.boxShadow = '0px 0px 20px rgba(76, 175, 80, 0.15)';
    } else if (type === 'fun') {
        notification.style.borderColor = 'rgba(0, 150, 255, 0.4)';
        notification.style.boxShadow = '0px 0px 20px rgba(0, 150, 255, 0.15)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);