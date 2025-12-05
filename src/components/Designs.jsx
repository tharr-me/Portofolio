import { useState, useEffect, useRef } from 'react';

const Designs = () => {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const fetchDesigns = async () => {
            try {
                const response = await fetch('/designs.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch designs');
                }
                const data = await response.json();
                // Handle both direct array and object with designs property
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

    useEffect(() => {
        if (!loading && designs.length > 0) {
            // Re-trigger scroll reveal observer if needed, 
            // but since we are in React, we might want to handle animations differently.
            // For now, let's just let the parent's observer handle it if we add the class.
            const observerOptions = {
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, observerOptions);

            const items = document.querySelectorAll('.design-item');
            items.forEach(el => observer.observe(el));

            return () => observer.disconnect();
        }
    }, [loading, designs]);

    if (loading) return <p>Loading designs...</p>;
    if (error) return <p>{error}</p>;
    if (designs.length === 0) return <p>No designs found.</p>;

    return (
        <div className="design-grid hidden" id="design-grid" ref={gridRef}>
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
