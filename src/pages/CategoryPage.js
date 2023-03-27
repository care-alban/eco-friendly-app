import { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Grid, Typography } from '@mui/material';

import { Hero, Layout, Loader, SearchBar } from '../components';
import { ArticlesMediumCard, AdvicesMediumCard } from '../components/Cards';

import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';
import { searchBarOnChange } from '../actions/commonActions';

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { name } = useParams();

  /* Find the category in a categories array */
  const categories = useSelector((state) => state.common.categories);
  const category = categories.find((item) => item.slug === name);

  /* Clear the search value when the page is loaded */
  useEffect(() => {
    dispatch(searchBarOnChange(''));
  }, []);

  /* Get all the articles and advices of the category */
  useEffect(() => {
    if (category) {
      const params = [
        { name: 'category', value: category.id },
        { name: 'sorttype', value: 'created_at' },
        { name: 'order', value: 'desc' },
      ];
      dispatch(getArticles(params));
      dispatch(getAdvices(params));
    }
  }, [category]);

  const articles = useSelector((state) => state.articles.list).filter(
    (item) => item.category.id === category.id,
  );
  const advices = useSelector((state) => state.advices.list).filter(
    (item) => item.category.id === category.id,
  );

  if (!category) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        image={category.picture}
        title={category.name}
        subtitle={category.tagline}
      />
      <section id="articles">
        <Box sx={{ flexGrow: 1, marginY: 2, marginX: 0 }}>
          <SearchBar list={articles} keys={['title', 'content']} />
        </Box>
        <Typography
          variant="h4"
          component="h2"
          color="inherit"
          sx={{ marginY: 2 }}
        >
          Articles
        </Typography>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${article.id}`}>
              <ArticlesMediumCard article={article} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            flexGrow: 1,
            marginY: 2,
            marginX: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button component={RouterLink} to="/articles" variant="contained">
            Voir plus d'articles...
          </Button>
        </Box>
      </section>
      <section id="advices">
        <Typography
          variant="h4"
          component="h2"
          color="inherit"
          sx={{ marginY: 2 }}
        >
          Conseils
        </Typography>
        <Grid container spacing={2}>
          {advices.map((advice) => (
            <Grid item xs={12} md={6} key={`${advice.id}`}>
              <AdvicesMediumCard advice={advice} />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            flexGrow: 1,
            marginY: 2,
            marginX: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained">Voir plus de conseils...</Button>
        </Box>
      </section>
    </Layout>
  );
}
