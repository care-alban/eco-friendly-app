import { css } from 'styled-components';
import config from '../config';

const variables = css`
  :root {
    --color-primary-light: ${config.colors.primary.light};
    --color-primary-main: ${config.colors.primary.main};
    --color-primary-dark: ${config.colors.primary.dark};
    --color-primary-contrastText: ${config.colors.primary.contrastText};

    --color-secondary-light: ${config.colors.secondary.light};
    --color-secondary-main: ${config.colors.secondary.main};
    --color-secondary-dark: ${config.colors.secondary.dark};
    --color-secondary-contrastText: ${config.colors.secondary.contrastText};

    --color-neutral-main: ${config.colors.neutral.main};
    --color-neutral-contrastText: ${config.colors.neutral.contrastText};

    --color-divider: ${config.colors.divider};

    --breakpoint-xs: ${config.breakpoints.xs}px;
    --breakpoint-sm: ${config.breakpoints.sm}px;
    --breakpoint-md: ${config.breakpoints.md}px;
    --breakpoint-lg: ${config.breakpoints.lg}px;
    --breakpoint-xl: ${config.breakpoints.xl}px;
  }
`;

export default variables;
