/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
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
  FormAdvice,
  MediumCard,
  LargeCard,
  Layout,
  Loader,
  Quizz,
  Section,
  SmallCard,
} from '../components';

export default function HomePage() {
  const articles = useSelector((state) => state.articles.list);
  const featuredArticle = articles[0];
  const featuredArticles = articles.slice(1, 3);
  const inShortArticles = articles.slice(3, 6);
  const recentArticles = articles.slice(6, 18);
  const advices = useSelector((state) => state.advices.list);

  if (!articles.length > 0 || !advices.length > 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <FormAdvice />
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
      <Section id="quizz">
        <Quizz />
      </Section>
      <section id="advices">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
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
        <Grid container spacing={2} sx={{ paddingTop: 4 }}>
          {advices.map((advice) => (
            <RecentAdvices key={advice.id} advice={advice} />
          ))}
        </Grid>
      </section>
    </Layout>
  );
}

function FeaturedArticle({ article }) {
  const { title, picture, content, category, created_at, slug } = article;
  const TruncateContent = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    hyphens: auto;
  `;

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
        <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
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
          to={`/articles/${slug}`}
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
  const { title, picture, content, category, slug } = article;
  const TruncateContent = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    hyphens: auto;
    & p {
      margin: 0;
    }
  `;

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
      <CardActionArea LinkComponent={RouterLink} to={`/articles/${slug}`}>
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
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            marginBottom={0}
          >
            {title}
          </Typography>
          <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </CardActionArea>
    </MediumCard>
  );
}

FeaturedArticles.propTypes = {
  article: PropTypes.shape({
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
  const { title, content, category, slug } = article;
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
            minHeight: { xs: 200, md: 230 },
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
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
            to={`/articles/${slug}`}
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
  const { title, picture, content, category, slug } = article;
  const TruncateContent = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    hyphens: auto;
    & p {
      margin: 0;
    }
  `;

  return (
    <Grid item xs={12} sm={6} md={3}>
      <MediumCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardActionArea LinkComponent={RouterLink} to={`/articles/${slug}`}>
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
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              marginBottom={0}
            >
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

function RecentAdvices({ advice }) {
  const { title, content, category, slug } = advice;
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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <SmallCard
        sx={{
          border: 'none',
          boxShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          marginBottom: 2,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 260,
            padding: '2rem 2rem 0',
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: 'secondary.light',
                marginTop: '0.375rem',
              }}
            >
              {category.name}
            </Typography>
          </Box>
          <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '2rem',
          }}
        >
          <Button
            component={RouterLink}
            to={`/conseils/${slug}`}
            color="primary"
            size="small"
            variant="contained"
          >
            En savoir plus
          </Button>
        </CardActions>
      </SmallCard>
    </Grid>
  );
}

RecentAdvices.propTypes = {
  advice: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    slug: PropTypes.string,
  }),
};

RecentAdvices.defaultProps = {
  advice: {
    title: '',
    content: '',
    category: {
      name: '',
    },
    slug: '',
  },
};
