/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const useEffectDebounced = (handler, dependency = [], time = 300) => {
    const $timer = useRef(null);

    useEffect(() => {
        if ($timer.current != null) {
            clearTimeout($timer.current);
        }

        $timer.current = setTimeout(() => {
            handler();
        }, time);

        return () => {
            clearTimeout($timer.current);
        };
    }, dependency);
};

export default useEffectDebounced;
