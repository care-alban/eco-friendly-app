import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import MediumCard from '../components/Cards/MediumCard';
import Hero from '../components/Hero';

import Layout from '../components/Layout';
import Loader from '../components/Loader';

import { getArticle } from '../actions/articlesActions';

export default function ArticlePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const articles = useSelector((state) => state.articles.list);
  const recentArticles = articles.slice(1, 5);
  const article = useSelector((state) => state.articles.article);

  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  if (Object.keys(article).length === 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        image={article.picture}
        category={article.category}
        title={article.title}
        subtitle={article.category.tagline}
        author={article.author.nickname}
      />
      <Container maxWidth="md">
        <Box
          sx={{
            marginBottom: 8,
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            maxItems={3}
            marginTop={2}
            paddingBottom={2}
            borderBottom={1}
            borderColor="divider"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
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
      <Box
        component="section"
        sx={{
          backgroundColor: 'var(--color-secondary-light)',
          minWidth: '100vw',
          padding: '2rem 2rem 0',
          color: 'var(--color-neutral-main)',
          marginLeft: 'calc((100vw - 100%) / -2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
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
        <Grid container spacing={4}>
          {recentArticles.map((recentArticle) => (
            <RecentArticles key={recentArticle.id} article={recentArticle} />
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

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
    <Grid item xs={12} sm={6} md={3}>
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
