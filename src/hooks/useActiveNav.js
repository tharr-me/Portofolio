import { useEffect } from 'react';

const useActiveNav = (dependencies = []) => {
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').substring(1) === entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => navObserver.observe(section));

        return () => navObserver.disconnect();
    }, dependencies);
};

export default useActiveNav;
