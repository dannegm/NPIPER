import { css } from 'styled-components';

const breakpoints = {
    mobile: 640,
    tablet: 920,
    desktop: 1280,
};

Object.entries(breakpoints).forEach(([key, breakpoint]) => {
    breakpoints[key] = (styles) => css`
        @media only screen and (max-width: ${breakpoint}px) {
            ${styles}
        }
    `;
});

export { breakpoints };
