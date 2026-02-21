import { useEffect, useState, useRef } from "react";

export const useScrollReveal = (options) => {
 
    const {
        thereshold = 0.1,
        rootMargin = '0px',

    } = options;

    const [isRevealed, setIsRevealed] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: thereshold,
                rootMargin: rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [thereshold, rootMargin]);
    
    return [ref, isRevealed];
};