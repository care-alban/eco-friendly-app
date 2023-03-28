import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Loader from '../components/Loader';

import {
  getAdvice,
  toggleShowAdviceForm,
  toDeleteAdvice,
} from '../actions/advicesActions';

export default function AdvicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const advice = useSelector((state) => state.advices.advice);
  const advices = useSelector((state) => state.advices.list);
  const articles = useSelector((state) => state.articles.list);
  const user = useSelector((state) => state.user.data);
  const isShow = useSelector((state) => state.advices.showAdviceForm);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    dispatch(getAdvice(id));
  }, [id]);

  if (Object.keys(advice).length === 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  /**
   * filter the articles and advices by category without the current advice
   * and slice the array to get only 4 items
   */
  const filtered = (list) =>
    list
      .filter((item) => item.category.id === advice.category.id)
      .filter((item) => item.id !== advice.id)
      .slice(0, 4);

  const filteredArticles = filtered(articles);

  const filteredAdvices = filtered(advices);

  const handleShowAdviceForm = () => {
    /* Close and clear the form if is already open */
    if (isShow) {
      dispatch(toggleShowAdviceForm());
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    dispatch(toggleShowAdviceForm(advice));
  };

  const handleDeleteAdvice = () => {
    const { category } = advice;

    /* TODO: add a confirmation modal */
    dispatch(toDeleteAdvice(advice.id));
    navigate(`/categories/${category.slug}`, { replace: true });
  };

  return (
    <Layout>
      <Hero
        image={advice.category.picture}
        category={advice.category}
        title={advice.title}
        author={advice.contributor.nickname}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        maxItems={3}
        marginTop={2}
        paddingBottom={2}
        borderBottom={1}
        borderColor="divider"
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
          href="/"
        >
          Accueil
        </Link>
        <Link
          component={RouterLink}
          to="/conseils"
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          conseils
        </Link>
        <Typography color="primary">{advice.title}</Typography>
      </Breadcrumbs>
      <Grid container spacing={4} marginBottom={4}>
        <Grid item xs={12} md={8}>
          <Box paddingY={2}>
            {user && user.id === advice.contributor.id && (
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton aria-label="delete" onClick={handleDeleteAdvice}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={handleShowAdviceForm}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: advice.content }}
              className="innerHTML"
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="inherit">
              {advice.updated_at
                ? `Mis à jour le ${new Date(
                    advice.updated_at,
                  ).toLocaleDateString()}`
                : `Publié le ${new Date(
                    advice.created_at,
                  ).toLocaleDateString()}`}
            </Typography>
            <Typography color="inherit">
              par {advice.contributor.nickname}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            component="aside"
            sx={{
              backgroundColor: 'var(--color-secondary-light)',
              minWidth: '100%',
              padding: '1rem',
              color: 'var(--color-neutral-main)',
            }}
          >
            <Typography variant="h4" component="h2" color="primary.dark">
              Plus de conseils
            </Typography>
            {filteredAdvices.map((adv) => (
              <CardContent
                key={adv.id}
                sx={{ borderTop: 1, borderColor: 'divider' }}
              >
                <Typography
                  variant="h5"
                  component={RouterLink}
                  to={`/conseils/${adv.id}/${adv.slug}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    ':hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {adv.title}
                </Typography>
                <Typography variant="body2" color="inherit">
                  par {adv.contributor.nickname}
                  {' - '}
                  <Typography component="span" color="inherit">
                    {adv.updated_at
                      ? `Mis à jour le ${new Date(
                          adv.updated_at,
                        ).toLocaleDateString()}`
                      : `Publié le ${new Date(
                          adv.created_at,
                        ).toLocaleDateString()}`}
                  </Typography>
                </Typography>
              </CardContent>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box
        component="section"
        sx={{
          backgroundColor: 'var(--color-primary-main)',
          minWidth: '100vw',
          padding: '2rem 2rem 0',
          color: 'var(--color-neutral-main)',
          marginLeft: 'calc((100vw - 100%) / -2)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4" component="h2" color="inherit">
              Plus d'articles
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
          <Grid container spacing={2} sx={{ paddingTop: 4 }}>
            {filteredArticles.map((article) => (
              <RecentArticles key={article.id} article={article} />
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

function RecentArticles({ article }) {
  const { id, title, category, picture, slug } = article;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          border: 'none',
          boxShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          marginBottom: 2,
        }}
      >
        <CardActionArea component={RouterLink} to={`/articles/${id}/${slug}`}>
          <CardMedia component="img" height="200" image={picture} alt={title} />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '160px',
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

RecentArticles.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    picture: PropTypes.string,
    slug: PropTypes.string,
  }),
};

RecentArticles.defaultProps = {
  article: {
    title: '',
    category: {
      name: '',
    },
    picture: '',
    slug: '',
  },
};
