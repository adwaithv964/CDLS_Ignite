import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-[#00D2AA] hover:bg-teal-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp
                        size={24}
                        className="transition-transform duration-300 group-hover:-translate-y-1"
                    />
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;
