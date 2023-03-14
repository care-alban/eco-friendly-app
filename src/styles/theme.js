import { createTheme } from '@mui/material/styles';
import config from '../config';

const GlobalTheme = createTheme({
  palette: {
    primary: {
      light: config.colors.primary.light,
      main: config.colors.primary.main,
      dark: config.colors.primary.dark,
      contrastText: config.colors.primary.contrastText,
    },
    secondary: {
      light: config.colors.secondary.light,
      main: config.colors.secondary.main,
      dark: config.colors.secondary.dark,
      contrastText: config.colors.secondary.contrastText,
    },
    neutral: {
      main: config.colors.neutral.main,
      contrastText: config.colors.neutral.contrastText,
    },
  },
});

export default GlobalTheme;
