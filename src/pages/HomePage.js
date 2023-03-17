/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SendIcon from '@mui/icons-material/Send';

import Layout from '../components/Layout';
import Section from '../components/Section';
import Quizz from '../components/Quizz';
import LargeCard from '../components/Cards/LargeCard';
import MediumCard from '../components/Cards/MediumCard';
import SmallCard from '../components/Cards/SmallCard';

import config from '../config';

export default function HomePage() {
  const featuredArticle = useSelector((state) => state.articles.list[0]);
  const featuredArticles = useSelector((state) =>
    state.articles.list.slice(1, 3),
  );
  const inShortArticles = useSelector((state) =>
    state.articles.list.slice(3, 6),
  );
  const recentArticles = useSelector((state) =>
    state.articles.list.slice(6, 18),
  );
  const recentAdvices = useSelector((state) => state.advices.list);

  return (
    <Layout>
      <Section id="featured-articles">
        <Typography variant="h4" component="h2" color="t-primary">
          A la une
        </Typography>
        <Grid container sx={{ paddingY: 4 }}>
          <Grid item xs={8} sx={{ paddingRight: 12 }}>
            <FeaturedArticle article={featuredArticle} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              borderLeft: 1,
              borderColor: 'divider',
              paddingX: 12,
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              color="t-primary"
              sx={{
                marginBottom: 4,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              en vedette
            </Typography>
            {featuredArticles.map((article) => (
              <FeaturedArticles key={article.id} article={article} />
            ))}
          </Grid>
        </Grid>
      </Section>
      <Section id="short-articles">
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2"
            color="t-primary"
            sx={{
              marginBottom: 2,
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
              dispalay: 'flex',
              justifyContent: 'space-between',
              paddingTop: 4,
            }}
          >
            {inShortArticles.map((article) => (
              <Grid item xs={4} key={article.id} flex={1}>
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
          {recentArticles.map((article) => (
            <RecentArticles key={article.id} article={article} />
          ))}
        </Grid>
      </Section>
      <Section id="quizz">
        <Quizz />
      </Section>
      <section id="advices">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h2">
            Conseils récents
          </Typography>
          <Link color="inherit" href="/">
            <Typography variant="body2" component="span">
              Voir tous les conseils &nbsp;
            </Typography>
            <Typography variant="body2" component="span">
              &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container sx={{ paddingTop: 4 }}>
          {recentAdvices.map((advice) => (
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
    <LargeCard>
      <Chip label={category.name} variant="outlined" color="secondary" />
      <CardHeader
        title={title}
        subheader={created_at}
        sx={{ paddingY: 4, paddingX: 0 }}
      />
      <CardMedia component="img" height="400" image={picture} alt={title} />
      <CardContent sx={{ overflow: 'hidden', padding: 0 }}>
        <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
      <CardActions marginTop="3">
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
          to={`${config.basePath}/articles/${slug}`}
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
  const { title, picture, content, category } = article;
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
    <MediumCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={picture} alt={title} />
        <CardContent>
          <Chip label={category.name} variant="outlined" color="secondary" />
          <Typography gutterBottom variant="h6" component="div">
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
  },
};

function InShortArticles({ article }) {
  const { title, content, category } = article;
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
    <SmallCard
      sx={{
        border: 'none',
        boxShadow: 'none',
        marginBottom: 2,
        flex: 1,
        borderRadius: 2,
        backgroundColor: 'secondary.light',
        color: 'secondary.contrastText',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Chip label={category.name} variant="outlined" color="neutral" />
        <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
      <CardActions>
        <Button size="small">Partager</Button>
        <Button size="small">En savoir plus</Button>
      </CardActions>
    </SmallCard>
  );
}

InShortArticles.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

InShortArticles.defaultProps = {
  article: {
    title: '',
    content: '',
    category: {
      name: '',
    },
  },
};

function RecentArticles({ article }) {
  const { title, picture, content, category } = article;
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
            <Chip label={category.name} variant="outlined" color="secondary" />
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

function RecentAdvices({ advice }) {
  const { title, content, category } = advice;
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

  return (
    <Grid item xs={3} sx={{ paddingRight: 2, paddingBottom: 3 }}>
      <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Chip label={category.name} variant="outlined" color="secondary" />
          <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
        <CardActions>
          <Button size="small">Partager</Button>
          <Button size="small">En savoir plus</Button>
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
  }),
};

RecentAdvices.defaultProps = {
  advice: {
    title: '',
    content: '',
    category: {
      name: '',
    },
  },
};
