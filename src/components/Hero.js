import PropTypes from 'prop-types';
import { Box, Button, Container, Typography } from '@mui/material';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--color-primary-dark);
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.375rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.4;
    background-color: var(--color-common-black);
  }
  @media screen and (min-width: 900px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export default function Hero({
  title,
  tagline,
  image,
  leftBtnText,
  rightBtnText,
}) {
  return (
    <HeroWrapper style={{ backgroundImage: `url("${image}")` }}>
      <Container maxWidth="md">
        <Box textAlign="center" color="common.white">
          <Typography
            variant="h2"
            component="h1"
            color="inherit"
            gutterBottom
            sx={{
              position: 'relative',
            }}
          >
            {title}
          </Typography>
          <Container maxWidth="sm">
            <Typography
              variant="subtitle1"
              paragraph
              color="inherit"
              sx={{
                position: 'relative',
              }}
            >
              {tagline}
            </Typography>
          </Container>
          <Box mt={3}>
            {leftBtnText && (
              <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
                {leftBtnText}
              </Button>
            )}
            {rightBtnText && (
              <Button variant="outlined" color="secondary">
                {rightBtnText}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </HeroWrapper>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  image: PropTypes.string,
  leftBtnText: PropTypes.string,
  rightBtnText: PropTypes.string,
};

Hero.defaultProps = {
  title: 'Lorem ipsum dolor',
  tagline: 'sit amet, consectetur adipiscing elit.',
  image: 'https://picsum.photos/seed/picsum/1024/900',
  leftBtnText: '',
  rightBtnText: '',
};
