import { useState } from 'react';
import './TerminalButton.css';

const TerminalButton = ({ onToggle }) => {
    return (
        <button 
            className="terminal-button" 
            onClick={onToggle}
            aria-label="Toggle terminal"
        >
            <i className="fas fa-terminal"></i>
        </button>
    );
};

export default TerminalButton;
