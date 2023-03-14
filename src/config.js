export default {
  env: 'dev', // 'dev' or 'prod'
  basePath: '/eco-friendly-app',
  apiURL: 'https://eco-friendly.fr/api',
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
      contrastText: '#000',
    },
    neutral: {
      main: '#f5f5f5',
      contrastText: '#000',
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
