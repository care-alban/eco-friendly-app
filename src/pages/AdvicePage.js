import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
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
  const [open, setOpen] = useState(false);
  const advice = useSelector((state) => state.advices.advice);
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

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Grid item>
        <Box paddingY={2}>
          {user && user.id === advice.contributor.id && (
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton aria-label="delete" onClick={handleDialogClickOpen}>
                <DeleteIcon />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Etes-vous sûr de vouloir supprimer ce conseil ?
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>Annuler</Button>
                  <Button onClick={handleDeleteAdvice} autoFocus>
                    Supprimer
                  </Button>
                </DialogActions>
              </Dialog>
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
              : `Publié le ${new Date(advice.created_at).toLocaleDateString()}`}
          </Typography>
          <Typography color="inherit">
            par {advice.contributor.nickname}
          </Typography>
        </Box>
      </Grid>
    </Layout>
  );
}
