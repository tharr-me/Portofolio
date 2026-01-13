import { useEffect } from 'react';

const useScrollReveal = (dependencies = []) => {
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, dependencies);
};

export default useScrollReveal;
