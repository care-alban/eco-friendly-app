import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button, Grid } from '@mui/material';

import { Hero, Layout, Loader, SearchBar } from '../components';
import { ArticlesMediumCard } from '../components/Cards';

import { getArticles } from '../actions/articlesActions';

export default function ArticlesPage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  if (Object.keys(articles).length === 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  return (
    <Layout>
      <Hero
        title="Articles"
        subtitle="Découvrez tous nos articles"
        image="https://cdn.eco-friendly.fr/assets/img/misc/articles.webp"
      />
      <Box sx={{ flexGrow: 1, marginY: 2, marginX: 0 }}>
        <SearchBar list={articles} keys={['title', 'content']} />
      </Box>
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
        <Button variant="contained">Voir plus d'articles...</Button>
      </Box>
    </Layout>
  );
}
