import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
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

export default function Hero({ image, category, title, subtitle, author }) {
  return (
    <HeroWrapper
      style={{
        backgroundImage: `url("${image}")`,
        color: 'var(--color-common-white)',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {category && (
          <Typography
            variant="h5"
            component={RouterLink}
            to={`/categories/${category.slug}`}
            color="secondary.light"
            paragraph
            sx={{
              position: 'relative',
              textDecoration: 'none',
            }}
          >
            {category.name}
          </Typography>
        )}
        <Typography
          variant="h2"
          component="h1"
          color="inherit"
          gutterBottom
          textAlign="center"
          sx={{
            position: 'relative',
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h6"
            color="inherit"
            textAlign="center"
            paragraph
            sx={{
              position: 'relative',
            }}
          >
            {subtitle}
          </Typography>
        )}
        {author && (
          <Typography
            variant="h4"
            paragraph
            color="inherit"
            textAlign="center"
            sx={{
              position: 'relative',
            }}
          >
            rédigé par{' '}
            <Typography component="span" variant="h4" color="secondary.main">
              {author}
            </Typography>
          </Typography>
        )}
      </Container>
    </HeroWrapper>
  );
}

Hero.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  author: PropTypes.string,
};

Hero.defaultProps = {
  category: null,
  subtitle: '',
  author: '',
};
