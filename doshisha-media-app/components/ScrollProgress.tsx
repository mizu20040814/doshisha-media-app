"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div
                className="h-full bg-gradient-to-r from-doshisha-purple-600 to-doshisha-purple-400 transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}