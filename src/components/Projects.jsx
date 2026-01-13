import { useState, useEffect } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/projects.json');
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (err) {
                console.error('Error loading projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <p>Loading projects...</p>;

    return (
        <div className="project-list">
            {projects.map((project) => (
                <div key={project.id} className="project-item hover-card hidden">
                    <div className="project-info">
                        <h3><i className={project.icon}></i> {project.title}</h3>
                        <p>{project.description}</p>
                        <div className="tech-stack">
                            {project.technologies.map((tech, idx) => (
                                <span key={idx}>
                                    {project.techIcons && project.techIcons[idx] && (
                                        <i className={project.techIcons[idx]}></i>
                                    )}
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-link hover-link"
                        aria-label={`View ${project.title} on GitHub`}
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Projects;
