import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TruncateContent from '../TruncateContent';

import {
  toggleShowAdviceForm,
  toDeleteAdvice,
} from '../../actions/advicesActions';

export default function AdvicesMediumCard({ advice }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  /* Get the state of the form */
  const isShow = useSelector((state) => state.advices.showAdviceForm);

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
    /* TODO: add a confirmation modal */
    dispatch(toDeleteAdvice(advice.id));
  };

  return (
    <Card
      sx={{
        boder: 1,
        maxWidth: { xs: '100%', md: '100%' },
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 320,
        }}
      >
        <Box>
          {user && user.id === advice.contributor.id && (
            <CardActions
              sx={{
                float: 'right',
                padding: 0,
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
            </CardActions>
          )}
          <TruncateContent lines={2}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ minHeight: { md: '4rem' } }}
            >
              {advice.title}
            </Typography>
          </TruncateContent>
          {advice.contributor && (
            <Typography variant="body2" color="text.secondary" component="h6">
              Proposé par{' '}
              {user && user.id === advice.contributor.id
                ? 'vous'
                : advice.contributor.nickname}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" component="span">
            {advice.updated_at
              ? `Mis à jour le ${new Date(
                  advice.updated_at,
                ).toLocaleDateString()}`
              : `Publié le ${new Date(advice.created_at).toLocaleDateString()}`}
          </Typography>
        </Box>
        <TruncateContent lines={3}>
          <div dangerouslySetInnerHTML={{ __html: advice.content }} />
        </TruncateContent>
        <CardActions
          sx={{
            display: 'flex',
            marginTop: 2,
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
          <Button
            component={RouterLink}
            to={`/conseils/${advice.slug}`}
            color="secondary"
            size="small"
            variant="outlined"
          >
            En savoir plus
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

AdvicesMediumCard.propTypes = {
  advice: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    picture: PropTypes.string,
    contributor: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
};

AdvicesMediumCard.defaultProps = {
  advice: {
    picture: null,
    contributor: {
      id: null,
      nickname: '',
    },
    created_at: '',
    updated_at: '',
  },
  user: {
    id: null,
  },
};
