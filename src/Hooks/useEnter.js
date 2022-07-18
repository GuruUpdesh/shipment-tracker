import React, { useEffect } from 'react';

// react hook for when enter key is pressed
const useEnter = (onEnter, dependencies=[]) => {
    useEffect(() => {
        const handleEnter = (event) => {
            if (event.keyCode === 13) 
                onEnter();
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, dependencies);
}

export default useEnter