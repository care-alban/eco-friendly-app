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
  return (
    <Layout>
      <Section id="articles">
        <Typography variant="h4" component="h2" color="t-primary">
          A la une
        </Typography>
        <Grid container sx={{ paddingTop: 4 }}>
          <FeaturedArticle />
          <FeaturedArticles />
          <InShort />
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
        <RecentArticles />
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

function FeaturedArticle() {
  return (
    <Grid item xs={6} sx={{ paddingRight: 4 }}>
      <LargeCard>
        <Chip label="Bien-être" variant="outlined" color="secondary" />
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
          sx={{ paddingY: 4, paddingX: 0 }}
        />
        <CardMedia
          component="img"
          height="400"
          image="https://picsum.photos/400/200"
          alt="Paella dish"
        />
        <CardContent sx={{ overflow: 'hidden', padding: 0 }}>
          <Typography variant="body2" color="text.secondary" marginTop={2}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <Typography variant="body2" color="text.secondary" marginTop={2}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </LargeCard>
    </Grid>
  );
}

function FeaturedArticles() {
  return (
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
      <MediumCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </MediumCard>
      <MediumCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </MediumCard>
    </Grid>
  );
}

function InShort() {
  return (
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
      <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </SmallCard>
      <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </SmallCard>
      <SmallCard sx={{ border: 'none', boxShadow: 'none', marginBottom: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </SmallCard>
    </Grid>
  );
}

function RecentArticles() {
  return (
    <Grid container sx={{ paddingTop: 4 }}>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingRight: 3 }}
      >
        <MediumCard>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </MediumCard>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingX: 3 }}
      >
        <MediumCard>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </MediumCard>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ borderRight: 1, borderColor: 'divider', paddingX: 3 }}
      >
        <MediumCard>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </MediumCard>
      </Grid>
      <Grid item xs={3} sx={{ paddingLeft: 3 }}>
        <MediumCard>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/200/100"
            alt="green iguana"
          />
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </MediumCard>
      </Grid>
    </Grid>
  );
}

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
