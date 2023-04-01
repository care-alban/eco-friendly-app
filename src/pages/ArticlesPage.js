import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Button, Grid } from '@mui/material';

import { Hero, Layout, Loader, SearchBar } from '../components';
import { ArticlesMediumCard } from '../components/Cards';

import { getArticles } from '../actions/articlesActions';

export default function ArticlesPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  const articlesList = useSelector((state) => state.articles.list);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const params = [{ name: 'page', value: page }];
    dispatch(getArticles(params));
  }, [page]);

  useEffect(() => {
    if (articlesList.length === 0) {
      return;
    }
    setArticles([
      ...articles,
      /* Filter the articles to avoid duplicates */
      ...articlesList.filter(
        (item) => !articles.find((article) => article.id === item.id),
      ),
    ]);
  }, [articlesList]);

  const handlePageChange = () => {
    setPage(page + 1);
  };

  if (articles.length === 0) {
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
        <Button onClick={handlePageChange} variant="contained">
          Voir plus d'articles...
        </Button>
      </Box>
    </Layout>
  );
}
