import { useEffect, useState } from 'react';

const useTypewriter = (phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
    const [text, setText] = useState('');

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = typingSpeed;
        let timer;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                setText(currentPhrase.substring(0, charIndex - 1));
                charIndex--;
                typeSpeed = deletingSpeed;
            } else {
                setText(currentPhrase.substring(0, charIndex + 1));
                charIndex++;
                typeSpeed = typingSpeed;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = pauseTime;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            timer = setTimeout(type, typeSpeed);
        };

        timer = setTimeout(type, 100);

        return () => clearTimeout(timer);
    }, [phrases, typingSpeed, deletingSpeed, pauseTime]);

    return text;
};

export default useTypewriter;
