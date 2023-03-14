import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { GlobalStyle, GlobalTheme } from '../styles';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  /* Automatically positions the scroll bar at the top of the window at each page change */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  return (
    <ThemeProvider theme={GlobalTheme}>
      <GlobalStyle />
      <CssBaseline />
      <Navbar />
      <Main>
        <Container maxWidth="xl">{children}</Container>
      </Main>
      <Footer />
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = styled.main`
  --navbar-height: 4rem;
  --footer-height: 1.25rem;

  --margin: calc(2rem + var(--navbar-height)) auto var(--footer-height);

  margin: var(--margin);
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height));

  @media screen and (min-width: 900px) {
    --navbar-height: 8.625rem;
  }
`;
