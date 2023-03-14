/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Quizz from '../components/Quizz';
import LargeCard from '../components/Cards/LargeCard';
import MediumCard from '../components/Cards/MediumCard';
import SmallCard from '../components/Cards/SmallCard';

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

  return (
    <Layout>
      <Section id="articles">
        <Typography variant="h4" component="h2" color="t-primary">
          A la une
        </Typography>
        <Grid container sx={{ paddingTop: 4 }}>
          <Grid item xs={6} sx={{ paddingRight: 4 }}>
            <FeaturedArticle article={featuredArticle} />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              borderLeft: 1,
              borderColor: 'divider',
              paddingX: 4,
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
          <Grid
            item
            xs={3}
            sx={{
              borderLeft: 1,
              borderColor: 'divider',
              paddingX: 4,
            }}
          >
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
            {inShortArticles.map((article) => (
              <InShortArticles key={article.id} article={article} />
            ))}
          </Grid>
        </Grid>
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
        <RecentAdvices />
      </section>
    </Layout>
  );
}

function FeaturedArticle({ article }) {
  const { title, picture, content, category, created_at } = article;
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
    <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Chip label={category.name} variant="outlined" color="secondary" />
        <TruncateContent dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
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
    <Grid item xs={3} sx={{ paddingRight: 2, paddingBottom: 3 }}>
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

function RecentAdvices() {
  return (
    <Grid container sx={{ paddingTop: 4 }}>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingRight: 3 }}
      >
        <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </SmallCard>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingX: 3 }}
      >
        <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </SmallCard>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingX: 3 }}
      >
        <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </SmallCard>
      </Grid>
      <Grid item xs={3} sx={{ paddingLeft: 3 }}>
        <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </SmallCard>
      </Grid>
    </Grid>
  );
}
