import { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { Hero, Layout, Loader, SearchBar } from '../components';
import { MediumCard, AdvicesMediumCard } from '../components/Cards';

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
          {articles.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.title}`}>
              <ArticlesMediumCard item={item} />
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

function ArticlesMediumCard({ item }) {
  /* Truncate the content of the card */
  const TruncateContent = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    hyphens: auto;
  `;

  return (
    <MediumCard
      sx={{
        boder: 1,
        maxWidth: { xs: '100%', md: '100%' },
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
    >
      <CardActionArea LinkComponent={RouterLink} to={`/articles/${item.slug}`}>
        <CardMedia
          component="img"
          height="200"
          image={item.picture}
          alt={item.title}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 280,
          }}
        >
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            {item.author && (
              <Typography variant="body2" color="text.secondary" component="h6">
                Redigé par {item.author.nickname}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" component="span">
              {item.updated_at
                ? `Mis à jour le ${new Date(
                    item.updated_at,
                  ).toLocaleDateString()}`
                : `Publié le ${new Date(item.created_at).toLocaleDateString()}`}
            </Typography>
          </Box>
          <TruncateContent dangerouslySetInnerHTML={{ __html: item.content }} />
        </CardContent>
      </CardActionArea>
    </MediumCard>
  );
}

ArticlesMediumCard.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    picture: PropTypes.string,
    contributor: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      nickname: PropTypes.string,
    }),
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
};

ArticlesMediumCard.defaultProps = {
  item: {
    picture: null,
    contributor: {
      id: null,
      nickname: '',
    },
    author: {
      nickname: '',
    },
    created_at: '',
    updated_at: '',
  },
};
