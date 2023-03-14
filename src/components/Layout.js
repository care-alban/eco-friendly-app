import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import styled from 'styled-components';

import globalTheme from '../styles/theme';

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
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl">
        <Main>{children}</Main>
      </Container>
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

  --margin-y: 2rem;
  --margin: calc(var(--margin-y) + var(--navbar-height)) auto
    calc(var(--margin-y) + var(--footer-height));

  margin: var(--margin);
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height));

  @media (min-width: 900px) {
    --navbar-height: 8.625rem;

    min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
  }
`;
