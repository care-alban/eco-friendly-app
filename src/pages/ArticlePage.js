import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

import MediumCard from '../components/Cards/MediumCard';

import Layout from '../components/Layout';
import Loader from '../components/Loader';

export default function ArticlePage() {
  const { slug } = useParams();
  const articles = useSelector((state) => state.articles.list);
  const article = articles.find((item) => item.slug === slug);
  const recentArticles = articles.slice(1, 5);

  if (!article) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        category={article.category.name}
        title={article.title}
        author={article.author.nickname}
        image={article.picture}
      />
      <Container maxWidth="md">
        <Box
          sx={{
            marginBottom: 8,
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            paddingBottom={2}
            borderBottom={1}
            borderColor="divider"
          >
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="inherit"
              href="/"
            >
              Accueil
            </Link>
            <Link
              component={RouterLink}
              to="/articles"
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Articles
            </Link>
            <Typography color="primary">{article.title}</Typography>
          </Breadcrumbs>
          <Box paddingBottom={2}>
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="innerHTML"
            />
          </Box>
          <Box paddingBottom={2} display="flex" justifyContent="space-between">
            <Typography color="inherit">
              {article.updated_at
                ? `Mis à jour le ${new Date(
                    article.updated_at,
                  ).toLocaleDateString()}`
                : `Publié le ${new Date(
                    article.created_at,
                  ).toLocaleDateString()}`}
            </Typography>
            <Typography color="inherit">
              par {article.author.nickname}
            </Typography>
          </Box>
        </Box>
      </Container>
      <section
        id="short-articles"
        style={{
          backgroundColor: 'var(--color-secondary-light)',
          minWidth: '100vw',
          marginLeft: 'calc((100vw - 100%) / -2)',
          padding: '2rem 2rem 0',
          color: 'var(--color-neutral-main)',
          marginBottom: '8rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component="h2">
            Articles récents
          </Typography>
          <Link color="inherit" href="/">
            <Typography variant="body2" component="span">
              Voir tous les articles &nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container sx={{ paddingTop: 4 }}>
          {recentArticles.map((recentArticle) => (
            <RecentArticles key={recentArticle.id} article={recentArticle} />
          ))}
        </Grid>
      </section>
    </Layout>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--color-primary-dark);
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
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
    <HeroWrapper style={{ backgroundImage: `url("${image}")` }}>
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
    </HeroWrapper>
  );
}

Hero.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const TruncateContent = styled.div`
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  -webkit-hyphens: auto;
  hyphens: auto;
`;
function RecentArticles({ article }) {
  const { title, picture, content, category } = article;

  return (
    <Grid
      item
      xs={3}
      sx={{
        paddingRight: 2,
        paddingBottom: 3,
      }}
    >
      <MediumCard>
        <CardMedia component="img" height="200" image={picture} alt={title} />
        <CardActionArea>
          <CardContent>
            <Chip label={category.name} variant="outlined" color="primary" />
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </CardActionArea>
      </MediumCard>
    </Grid>
  );
}

RecentArticles.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    picture: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

RecentArticles.defaultProps = {
  article: {
    title: '',
    picture: '',
    content: '',
    category: {
      name: '',
    },
  },
};
