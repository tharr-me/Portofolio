import { useEffect, useState, useRef } from 'react';
import './TerminalEasterEgg.css';

const TerminalEasterEgg = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', text: 'Terminal v1.0 - Type "help" for commands' },
    ]);
    const inputRef = useRef(null);
    const historyRef = useRef(null);

    const commands = {
        help: () => [
            'Available commands:',
            '  about     - Learn about me',
            '  skills    - View my tech stack',
            '  projects  - List my projects',
            '  contact   - Get contact info',
            '  matrix    - Toggle matrix effect',
            '  clear     - Clear terminal',
            '  exit      - Close terminal',
        ],
        about: () => [
            'THARMIKAN - Full Stack Developer',
            'Passionate about creating digital experiences',
            'Minimalist design enthusiast',
            'Always exploring new technologies',
        ],
        skills: () => [
            'Languages: Python, JavaScript, HTML5, CSS3, Shell',
            'Frameworks: React Native, Node.js, Flutter',
            'Tools: Git, Docker, AWS, Linux, Figma',
        ],
        projects: () => [
            '1. VideoProcessor - Automated video content creation',
            '2. ClothSwap - Clothing exchange platform',
            '3. SwapApi - RESTful API for exchanges',
            '4. Custom ROM Builder - Android automation',
        ],
        contact: () => [
            'Email: tharmikan25@icloud.com',
            'GitHub: github.com/tharr-me',
            'LinkedIn: linkedin.com/in/tharmikan-akilan-5777a52ba',
        ],
        matrix: () => {
            document.body.classList.toggle('matrix-mode');
            return ['Matrix mode toggled'];
        },
        clear: () => {
            setHistory([
                { type: 'output', text: 'Terminal v1.0 - Type "help" for commands' },
            ]);
            return null;
        },
        exit: () => {
            onClose();
            return null;
        },
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        const lowerInput = trimmedInput.toLowerCase();
        
        if (!trimmedInput) return;

        const newHistory = [...history, { type: 'input', text: `> ${trimmedInput}` }];
        setHistory(newHistory);
        setInput('');

        if (commands[lowerInput]) {
            const output = commands[lowerInput]();
            if (output) {
                setHistory(prev => [...prev, ...output.map(line => ({ type: 'output', text: line }))]);
            }
        } else {
            setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${lowerInput}. Type "help" for available commands.` }]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="terminal-easter-egg">
            <div className="terminal-header">
                <div className="terminal-title">
                    <i className="fas fa-terminal"></i> TERMINAL
                </div>
                <button onClick={onClose} className="terminal-close">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="terminal-content" ref={historyRef}>
                {history.map((item, index) => (
                    <div key={index} className={`terminal-line terminal-${item.type}`}>
                        {item.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="terminal-input-wrapper">
                <span className="terminal-prompt">{'>'}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="terminal-input"
                    placeholder="Type a command..."
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
        </div>
    );
};

export default TerminalEasterEgg;
