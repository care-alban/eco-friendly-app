import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import GroupsIcon from '@mui/icons-material/Groups';
import { Hero, Layout, Loader, SearchBar } from '../components';
import MediumCard from '../components/Cards/MediumCard';

import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';
import { searchBarOnChange } from '../actions/commonActions';
import { randomlyMixSeveralArrays } from '../utils/index';

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
      /**
       * Get all the articles and all the advices of the category
       * TODO: add a limit number and get the articles and advices on scroll
       * */
      dispatch(getArticles(params));
      dispatch(getAdvices(params));
    }
  }, [category]);

  const [allArticlesAndAdvices, setAllArticlesAndAdvices] = useState([]);
  const articles = useSelector((state) => state.articles.list);
  const advices = useSelector((state) => state.advices.list);

  /* Mix the articles and advices and filter them by category */
  useEffect(() => {
    if (articles.length > 0 && advices.length > 0) {
      setAllArticlesAndAdvices(
        randomlyMixSeveralArrays([articles, advices], 0, 0).filter(
          (item) => item.category.id === category.id,
        ),
      );
    }
  }, [articles, advices, category]);

  /* Truncate the content of the card */
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

  if (!category || !allArticlesAndAdvices.length > 0) {
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
      <Box sx={{ flexGrow: 1, marginY: 2, marginX: 0 }}>
        <SearchBar list={allArticlesAndAdvices} keys={['title', 'content']} />
      </Box>
      <section>
        <Grid container spacing={2}>
          {allArticlesAndAdvices.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.title}`}>
              <MediumCard
                sx={{
                  boder: 1,
                  maxWidth: { xs: '100%', md: '100%' },
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                }}
              >
                <CardActionArea
                  LinkComponent={RouterLink}
                  to={`/articles/${item.slug}`}
                >
                  {item.picture ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.picture}
                      alt={item.title}
                    />
                  ) : (
                    <CardMedia
                      height="200"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 200,
                      }}
                    >
                      <GroupsIcon
                        sx={{
                          fontSize: 72,
                        }}
                      />
                      <Typography variant="h6" component="h6" marginTop="-1rem">
                        {item.contributor.nickname}
                      </Typography>
                    </CardMedia>
                  )}
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
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="h6"
                        >
                          Redigé par {item.author.nickname}
                        </Typography>
                      )}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        {item.updated_at
                          ? `Mis à jour le ${new Date(
                              item.updated_at,
                            ).toLocaleDateString()}`
                          : `Publié le ${new Date(
                              item.created_at,
                            ).toLocaleDateString()}`}
                      </Typography>
                    </Box>
                    <TruncateContent
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </CardContent>
                </CardActionArea>
              </MediumCard>
            </Grid>
          ))}
        </Grid>
      </section>
    </Layout>
  );
}
