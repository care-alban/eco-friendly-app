export default {
  env: 'prod', // 'dev' or 'prod'
  basePath: '',
  apiURL: 'https://api.eco-friendly.fr/v2',
  colors: {
    primary: {
      light: '#a2cf6e',
      main: '#8bc34a',
      dark: '#618833',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffcf33',
      main: '#ffc400',
      dark: '#b28900',
      contrastText: '#fff',
    },
    neutral: {
      main: '#faf6f6;',
      contrastText: '#000',
    },
    common: {
      white: '#fff',
      black: '#000',
    },
    divider: '#e0e0e0',
    text: {
      primary: '#000',
      secondary: '#757575',
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};
