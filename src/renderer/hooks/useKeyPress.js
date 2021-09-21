/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useKeyPress = (target) => {
    const [pressed, setPressed] = useState(false);

    const handlePress = (event) => {
        if (target(event)) {
            setPressed(true);
        }
    };

    const handleRelease = () => {
        setPressed(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', handlePress);
        window.addEventListener('keyup', handleRelease);

        return () => {
            window.removeEventListener('keydown', handlePress);
            window.removeEventListener('keyup', handleRelease);
        };
    }, []);

    return pressed;
};

export default useKeyPress;
