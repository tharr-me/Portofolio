import { useEffect, useState } from 'react';
import './FeatureHint.css';

const FeatureHint = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`feature-hint ${isVisible ? 'visible' : ''}`}>
            <i className="fas fa-lightbulb"></i>
            <span>Click the terminal icon to explore commands</span>
        </div>
    );
};

export default FeatureHint;
