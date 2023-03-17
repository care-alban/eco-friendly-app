import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Layout from '../components/Layout';

import config from '../config';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = useSelector((state) =>
    state.articles.list.find((item) => item.slug === slug),
  );

  console.log(article);

  return (
    <Layout>
      <Hero
        category={article.category.name}
        title={article.title}
        author={article.author.nickname}
        image={article.picture}
      />
      <Container maxWidth="md">
        <Breadcrumbs
          aria-label="breadcrumb"
          paddingY={2}
          borderBottom={1}
          borderColor="divider"
        >
          <Link
            component={RouterLink}
            to={`${config.basePath}`}
            underline="hover"
            color="inherit"
            href="/"
          >
            Accueil
          </Link>
          <Link
            component={RouterLink}
            to={`${config.basePath}/articles`}
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Articles
          </Link>
          <Typography color="primary">{article.title}</Typography>
        </Breadcrumbs>
        <Box paddingTop={2}>
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="innerHTML"
          />
        </Box>
      </Container>
    </Layout>
  );
}

const Section = styled.section`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--color-primary-dark);
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
  }
  @media screen and (min-width: 900px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

function Hero({ category, title, author, image }) {
  return (
    <Section style={{ backgroundImage: `url("${image}")` }}>
      <Container maxWidth="sm">
        <Typography
          variant="subtitle1"
          paragraph
          color="common.white"
          textAlign="center"
          sx={{ mixBlendMode: 'difference' }}
        >
          {category}
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Box textAlign="center" color="common.white">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              position: 'relative',
            }}
          >
            {title}
          </Typography>
        </Box>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            paragraph
            color="common.white"
            textAlign="center"
            sx={{ mixBlendMode: 'difference' }}
          >
            rédigé par {author}
          </Typography>
        </Container>
      </Container>
    </Section>
  );
}

Hero.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
