/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {
  MediumCard,
  LargeCard,
  Layout,
  Loader,
  Quiz,
  Section,
  SmallCard,
} from '../components';

import AdvicesMediumCard from '../components/Cards/AdvicesMediumCard';
import TruncateContent from '../components/TruncateContent';

import { getQuizQuestion } from '../actions/commonActions';
import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';

export default function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);
  const featuredArticle = articles[0];
  const featuredArticles = articles.slice(1, 3);
  const inShortArticles = articles.slice(3, 6);
  const recentArticles = articles.slice(6, 18);
  const advices = useSelector((state) => state.advices.list);
  const last4Advices = advices.slice(0, 4);
  const quiz = useSelector((state) => state.common.quiz);

  useEffect(() => {
    if (articles.length < 10)
      dispatch(
        getArticles([
          { name: 'limit', value: 10 },
          { name: 'sorttype', value: 'created_at' },
          { name: 'order', value: 'desc' },
        ]),
      );
    if (advices.length < 4)
      dispatch(
        getAdvices([
          { name: 'limit', value: 4 },
          { name: 'sorttype', value: 'created_at' },
          { name: 'order', value: 'desc' },
        ]),
      );
    /* load random quiz question */
    dispatch(getQuizQuestion());
  }, [articles, advices]);

  if (!articles.length > 0 || !advices.length > 0 || !quiz.length > 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Section id="featured-articles">
        <Typography variant="h4" component="h2" color="inherit">
          A la une
        </Typography>
        <Grid container sx={{ paddingY: 4 }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              paddingRight: { xs: 0, md: 6, lg: 8 },
              marginBottom: { xs: 4, md: 0 },
            }}
          >
            <FeaturedArticle article={featuredArticle} />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              paddingLeft: { xs: 0, md: 6, lg: 8 },
              borderLeft: { xs: 'none', md: 1 },
              borderColor: { xs: 'none', md: 'divider' },
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="inherit"
              sx={{
                marginBottom: 4,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              en vedette
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                justifyContent: 'space-between',
              }}
            >
              {featuredArticles.map((article) => (
                <FeaturedArticles key={article.id} article={article} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Section>
      <Section id="short-articles">
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2"
            color="neutral.main"
            sx={{
              marginBottom: 2,
              paddingBottom: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            en bref
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 4,
            }}
          >
            {inShortArticles.map((article) => (
              <Grid
                item
                xs={12}
                md={4}
                key={article.id}
                sx={{
                  position: 'relative',
                }}
              >
                <InShortArticles article={article} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
      <Section id="recent">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h2">
            Articles récents
          </Typography>
          <Link color="inherit" component={RouterLink} to="/articles">
            <Typography variant="body2" component="span">
              Voir tous les articles &nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={2} sx={{ paddingTop: 4 }}>
          {recentArticles.map((article) => (
            <RecentArticles key={article.id} article={article} />
          ))}
        </Grid>
      </Section>
      <Box
        component="section"
        id="quizz"
        sx={{
          paddingY: '2rem',
          minWidth: '100vw',
          marginLeft: 'calc((100vw - 100%) / -2)',
          backgroundColor: 'primary.light',
        }}
      >
        <Quiz quiz={quiz[0]} />
      </Box>
      <section id="advices">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginY: '2rem',
          }}
        >
          <Typography variant="h4" component="h2">
            Conseils récents
          </Typography>
          <Link color="inherit" component={RouterLink} to="/conseils">
            <Typography variant="body2" component="span">
              Voir tous les conseils &nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={2}>
          {last4Advices.map((advice) => (
            <Grid item xs={12} md={6} key={`${advice.id}`}>
              <AdvicesMediumCard advice={advice} />
            </Grid>
          ))}
        </Grid>
      </section>
    </Layout>
  );
}

function FeaturedArticle({ article }) {
  const { id, title, picture, content, category, created_at, slug } = article;
  return (
    <LargeCard
      sx={{
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <Chip
        label={category.name}
        variant="outlined"
        sx={{
          backgroundColor: 'secondary.light',
          color: 'white',
          borderColor: 'secondary.light',
        }}
      />
      <CardHeader
        title={title}
        subheader={created_at}
        sx={{ paddingY: 4, paddingX: 0 }}
      />
      <CardMedia
        component="img"
        height="400"
        image={picture}
        alt={title}
        sx={{ borderRadius: '0.375rem' }}
      />
      <CardContent sx={{ overflow: 'hidden', padding: 0 }}>
        <TruncateContent lines={9}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </TruncateContent>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          marginTop: 2,
          justifyContent: { xs: 'center', md: 'flex-end' },
        }}
      >
        <Button
          color="secondary"
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginRight: 2 }}
        >
          Partager
        </Button>
        <Button
          component={RouterLink}
          to={`/articles/${id}/${slug}`}
          color="secondary"
          size="small"
          variant="outlined"
        >
          En savoir plus
        </Button>
      </CardActions>
    </LargeCard>
  );
}

FeaturedArticle.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    picture: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    created_at: PropTypes.string,
    slug: PropTypes.string,
  }),
};

FeaturedArticle.defaultProps = {
  article: {
    title: '',
    picture: '',
    content: '',
    category: {
      name: '',
    },
    created_at: '',
    slug: '',
  },
};

function FeaturedArticles({ article }) {
  const { id, title, picture, content, category, slug } = article;

  return (
    <MediumCard
      sx={{
        border: 'none',
        boxShadow: 'none',
        marginBottom: 2,
        maxWidth: { xs: '100%', sm: '50%', md: '100%' },
        '&:fisrt-child': {
          marginRight: { xs: 0, sm: 2, md: 0 },
        },
        '&:last-child': {
          marginLeft: { xs: 0, sm: 2, md: 0 },
        },
      }}
    >
      <CardActionArea LinkComponent={RouterLink} to={`/articles/${id}/${slug}`}>
        <CardMedia component="img" height="200" image={picture} alt={title} />
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: 'secondary.light',
            marginTop: '0.375rem',
          }}
        >
          {category.name}
        </Typography>
        <CardContent sx={{ padding: '0' }}>
          <TruncateContent lines={2}>
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              sx={{ minHeight: { md: '4rem' } }}
            >
              {title}
            </Typography>
          </TruncateContent>
          <TruncateContent lines={3}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </TruncateContent>
        </CardContent>
      </CardActionArea>
    </MediumCard>
  );
}

FeaturedArticles.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    picture: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
};

FeaturedArticles.defaultProps = {
  article: {
    title: '',
    picture: '',
    content: '',
    category: {
      name: '',
    },
    slug: '',
  },
};

function InShortArticles({ article }) {
  const { id, title, content, category, slug } = article;

  return (
    <>
      <Chip
        label={category.name}
        variant="outlined"
        color="neutral"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translateX(50%)',
          backgroundColor: 'secondary.light',
          zIndex: 1,
        }}
      />
      <SmallCard
        sx={{
          position: 'relative',
          marginBottom: 2,
          padding: '0.725rem',
          borderRadius: 2,
          border: '1px solid #fff',
          backgroundColor: 'secondary.light',
          color: 'secondary.contrastText',
          boxShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 180,
          }}
        >
          <TruncateContent lines={2}>
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              sx={{ minHeight: { md: '4rem' } }}
            >
              {title}
            </Typography>
          </TruncateContent>
          <TruncateContent lines={3}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </TruncateContent>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              marginRight: 2,
              '@media (max-width: 1024px)': { display: 'none' },
            }}
          >
            Partager
          </Button>
          <Button
            component={RouterLink}
            to={`/articles/${id}/${slug}`}
            color="primary"
            size="small"
            variant="contained"
          >
            En savoir plus
          </Button>
        </CardActions>
      </SmallCard>
    </>
  );
}

InShortArticles.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
};

InShortArticles.defaultProps = {
  article: {
    title: '',
    content: '',
    category: {
      name: '',
    },
    slug: '',
  },
};

function RecentArticles({ article }) {
  const { id, title, picture, content, category, slug } = article;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <MediumCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardActionArea
          LinkComponent={RouterLink}
          to={`/articles/${id}/${slug}`}
        >
          <CardMedia component="img" height="200" image={picture} alt={title} />
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'secondary.light',
              marginTop: '0.375rem',
            }}
          >
            {category.name}
          </Typography>
          <CardContent sx={{ padding: '0' }}>
            <TruncateContent lines={2}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                sx={{ minHeight: { md: '4rem' } }}
              >
                {title}
              </Typography>
            </TruncateContent>
            <TruncateContent lines={3}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </TruncateContent>
          </CardContent>
        </CardActionArea>
      </MediumCard>
    </Grid>
  );
}

RecentArticles.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    picture: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    slug: PropTypes.string,
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
    slug: '',
  },
};
