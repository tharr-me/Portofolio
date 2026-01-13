import { useEffect, useState, useRef } from 'react';
import { askGemini } from '../services/geminiService';
import './TerminalEasterEgg.css';

const TerminalEasterEgg = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([
        { type: 'output', text: 'THARR-AI Terminal v2.0 - Type "help" for commands' },
        { type: 'ai-hint', text: '💡 Use "ai <message>" to chat with THARR-AI' },
    ]);
    const inputRef = useRef(null);
    const historyRef = useRef(null);

    const commands = {
        help: () => [
            'Available commands:',
            '  ai <msg>  - Chat with THARR-AI 🤖',
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
                { type: 'output', text: 'THARR-AI Terminal v2.0 - Type "help" for commands' },
                { type: 'ai-hint', text: '💡 Use "ai <message>" to chat with THARR-AI' },
            ]);
            return null;
        },
        exit: () => {
            onClose();
            return null;
        },
    };

    const handleAICommand = async (message) => {
        if (!message.trim()) {
            return ['Usage: ai <your message>', 'Example: ai tell me about your projects'];
        }
        
        setIsLoading(true);
        setHistory(prev => [...prev, { type: 'ai-thinking', text: '🤖 THARR-AI is thinking...' }]);
        
        try {
            const response = await askGemini(message);
            setHistory(prev => {
                const filtered = prev.filter(h => h.type !== 'ai-thinking');
                return [...filtered, { type: 'ai-response', text: `🤖 ${response}` }];
            });
        } catch (error) {
            setHistory(prev => {
                const filtered = prev.filter(h => h.type !== 'ai-thinking');
                return [...filtered, { type: 'error', text: 'AI connection failed. Try again.' }];
            });
        } finally {
            setIsLoading(false);
        }
        
        return null;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        const lowerInput = trimmedInput.toLowerCase();
        
        if (!trimmedInput || isLoading) return;

        const newHistory = [...history, { type: 'input', text: `> ${trimmedInput}` }];
        setHistory(newHistory);
        setInput('');

        // Check for AI command
        if (lowerInput.startsWith('ai ') || lowerInput === 'ai') {
            const aiMessage = trimmedInput.slice(3).trim();
            await handleAICommand(aiMessage);
            return;
        }

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
                    placeholder={isLoading ? "AI is thinking..." : "Type a command or 'ai <message>'..."}
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isLoading}
                />
            </form>
        </div>
    );
};

export default TerminalEasterEgg;
