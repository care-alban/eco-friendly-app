import { createGlobalStyle } from 'styled-components';
import variables from './variables';

const GlobalStyle = createGlobalStyle`
     ${variables};

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
        width: 100%;
        scroll-behavior: smooth;
    }

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        min-width: 380px;
        background-color: var(--color-neutral-main);
    }

    .innerHTML h2 {
        color: var(--color-secondary-main);
    }

    .innerHTML h3 {
        color: var(--color-secondary-light);
    }

    .innerHTML strong {
        color: var(--color-secondary-dark);
    }
`;

export default GlobalStyle;
