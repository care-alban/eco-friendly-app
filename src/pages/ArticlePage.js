import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import Hero from '../components/Hero';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
import ArticlesMediumCard from '../components/Cards/ArticlesMediumCard';

import { getArticles, getArticle } from '../actions/articlesActions';

export default function ArticlePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const articles = useSelector((state) => state.articles.list);
  const article = useSelector((state) => state.articles.article);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    dispatch(
      getArticles([
        { name: 'limit', value: 4 },
        { name: 'sorttype', value: 'created_at' },
        { name: 'order', value: 'desc' },
      ]),
    );
    dispatch(getArticle(id));
  }, [id]);

  if (!article || articles.length < 4) {
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
          padding: 4,
          minWidth: '100vw',
          marginLeft: 'calc((100vw - 100%) / -2)',
          backgroundColor: 'var(--color-secondary-light)',
        }}
      >
        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component="h2">
            Articles récents
          </Typography>
          <Link color="inherit" href="/articles">
            <Typography variant="body2" component="span">
              Voir tous les articles &nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={2}>
          {articles.map((recentArticle) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${recentArticle.id}`}>
              <ArticlesMediumCard article={recentArticle} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
