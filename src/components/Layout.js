import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Fab, Fade, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GlobalStyle, GlobalTheme } from '../styles';
import Navbar from './Navbar';
import Footer from './Footer';
import FormAdvice from './Forms/FormAdvice';

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
};
export default function Layout({ children, ...props }) {
  /* Automatically positions the scroll bar at the top of the window at each page change */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <GlobalStyle />
      <CssBaseline />
      <Navbar />
      <Main>
        <Container maxWidth="xl">
          <FormAdvice />
          {children}
        </Container>
      </Main>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <Footer />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = styled.main`
  --navbar-height: 4rem;
  --footer-height: 4rem;
  --padding-top: 2rem;

  padding-top: var(--padding-top);
  min-height: calc(
    100vh -
      calc(var(--navbar-height) + var(--padding-top) + var(--footer-height))
  );

  @media screen and (min-width: 900px) {
    --navbar-height: 8.625rem;
    --footer-height: 5.15rem;
  }
`;
