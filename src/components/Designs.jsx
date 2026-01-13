import { useState, useEffect, useRef } from 'react';

const Designs = () => {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDesigns = async () => {
            try {
                const response = await fetch('/designs.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch designs');
                }
                const data = await response.json();
                const designsList = Array.isArray(data) ? data : data.designs;
                setDesigns(designsList || []);
            } catch (err) {
                console.error('Error loading designs:', err);
                setError('Failed to load designs.');
            } finally {
                setLoading(false);
            }
        };

        fetchDesigns();
    }, []);

    if (loading) return <p>Loading designs...</p>;
    if (error) return <p>{error}</p>;
    if (designs.length === 0) return <p>No designs found.</p>;

    return (
        <div className="design-grid hidden" id="design-grid">
            {designs.map((design, index) => (
                <div key={index} className="design-item hidden">
                    <img src={design.image} alt={design.title} loading="lazy" />
                    <div className="design-overlay">
                        <div className="design-title">{design.title}</div>
                        <div className="design-category">{design.category}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Designs;
