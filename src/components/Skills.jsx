import { useState, useEffect } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch('/skills.json');
                if (!response.ok) throw new Error('Failed to fetch skills');
                const data = await response.json();
                setSkills(data.categories || []);
            } catch (err) {
                console.error('Error loading skills:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return <p>Loading skills...</p>;

    return (
        <div className="skills-grid hidden">
            {skills.map((category, idx) => (
                <div key={idx} className="skill-category">
                    <h3>{category.name}</h3>
                    <div className="skill-tags">
                        {category.skills.map((skill, skillIdx) => (
                            <span key={skillIdx}>{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;
