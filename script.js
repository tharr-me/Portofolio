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
        
        this.ctx.strokeStyle = 'rgba(114, 114, 114, 0.6)';
        this.ctx.lineWidth = 1;

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

function typeText(elementId, text, delay, cursor, afterType) {
    const el = document.getElementById(elementId);
    let i = 0;
    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(type, delay);
        } else if (afterType) {
            afterType();
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
        typeText('welcome-typing', 'Welcome', 120, cursor, () => {
            // Move cursor to portfolio line
            document.querySelector('.Welcome').removeChild(cursor);
            document.querySelector('.tomy').appendChild(cursor);
            typeText('portfolio-typing', 'to my portfolio', 70, cursor, () => {
                // After typing, keep cursor at end of portfolio line
                cursor.style.display = 'inline-block';
            });
        });
    }
    new ExpansionBentGrid();
});