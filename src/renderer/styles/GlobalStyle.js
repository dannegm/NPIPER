import { createGlobalStyle } from 'styled-components';
import colors from './colors';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'rsuite/dist/styles/rsuite-default.css';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 16px;
        background: transparent;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }

    body {
        background: transparent !important;
        font-family: Helvetica, Arial, sans-serif;
        color: ${colors.gray};
    }

    a {
        cursor: pointer;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default GlobalStyle;
