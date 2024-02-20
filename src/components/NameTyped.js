import React, { useEffect } from 'react';
import Typed from 'typed.js';

const NameTyped = () => {
    useEffect(() => {
        const typed = new Typed("#my-id", {
            strings: ["Weather Application"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            startDelay: 500,
            showCursor: true,
            loop: true
        });
        return () => {
            typed.destroy(); // Clean up Typed instance when component unmounts
        };
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <div>
            <span id="my-id"></span>
        </div>
    );
}

export default NameTyped;
