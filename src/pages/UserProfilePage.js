import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
import TruncateContent from '../components/TruncateContent';

import {
  userOnInputChange,
  onGetAdvices,
  onSettingsUpdate,
  onEmailUpdate,
  onEmailVerification,
  onDeleteAccount,
  onLogOut,
} from '../actions/userActions';

import {
  toggleShowAdviceForm,
  toDeleteAdvice,
} from '../actions/advicesActions';

import { getAvatars, clearMessages } from '../actions/commonActions';

import { hasKey } from '../utils';

/* styles */
const StyledBadge = styled(Badge)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '5%',
  transform: 'translateY(calc(-50% - 1rem))',
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
  zIndex: 1,
}));

const StyleRow = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
}));

const BpIcon = styled('span')(() => ({
  position: 'absolute',
  display: 'block',
  top: '16px',
  left: '-24px',
  width: 32,
  height: 32,
  textAlign: 'center',
  lineHeight: '32px',
  zIndex: 10,
}));

const BpCheckedIcon = styled(BpIcon)({
  '&:before': {
    display: 'block',
    content: '"✓"',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: amber[100],
  },
  'input:hover ~ &': {
    borderRadius: '50%',
    backgroundColor: amber[100],
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarSelectShow, setAvatarSelectShow] = useState(false);
  const [open, setOpen] = useState(false);
  const avatars = useSelector((state) => state.common.avatars);
  const advicesList = useSelector((state) => state.advices.list);
  const advices = useSelector((state) => state.user.advices);
  const isLoaded = useSelector((state) => state.user.isLoaded);
  const isUpdated = useSelector((state) => state.user.isUpdated);
  const avatar = useSelector((state) => state.user.avatar);
  const nickname = useSelector((state) => state.user.nickname);
  const email = useSelector((state) => state.user.email);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);
  const user = useSelector((state) => state.user.data);
  const errors = useSelector((state) => state.user.messages.error);

  /* link field to state */
  const changeField = (e) => {
    dispatch(clearMessages());
    dispatch(userOnInputChange(e.target.value, e.target.name));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    if (email !== user.email) {
      dispatch(onEmailUpdate());
      return;
    }
    dispatch(onSettingsUpdate());
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(onEmailVerification());
  };

  const handleDialogRemoveAccount = (e) => {
    e.preventDefault();
    setOpen(false);
    dispatch(onDeleteAccount());
    navigate('/', { replace: false });
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(onLogOut());
      navigate('/enregistrement', { replace: true });
    }
  }, [isUpdated]);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initializeFields = () => {
    dispatch(clearMessages());
    dispatch(userOnInputChange(user.avatar, 'avatar'));
    dispatch(userOnInputChange(user.nickname, 'nickname'));
    dispatch(userOnInputChange(user.email, 'email'));
    dispatch(userOnInputChange(user.firstname, 'firstname'));
    dispatch(userOnInputChange(user.lastname, 'lastname'));
  };

  useEffect(() => {
    dispatch(clearMessages());
    dispatch(getAvatars());
  }, []);

  useEffect(() => {
    dispatch(onGetAdvices());
  }, [advicesList]);

  useEffect(() => {
    dispatch(clearMessages());
    initializeFields();
  }, [user]);

  if (!isLoaded) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid
        marginTop={10}
        container
        sx={{ border: 1, borderColor: 'divider', borderRadius: 4 }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: 'relative', padding: '1rem', paddingTop: '3rem' }}
        >
          <form noValidate autoComplete="off" onSubmit={handleUpdateSubmit}>
            <StyledBadge
              overlap="circular"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={`avatar de ${nickname}`}
                src={avatar}
                sx={{
                  width: '6rem',
                  height: '6rem',
                  mr: 2,
                  border: 2,
                  borderColor: 'neutral.main',
                }}
              />
              {avatarSelectShow && (
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'contents',
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="avatar-group-label"
                      name="avatar"
                      sx={{ flexDirection: 'row' }}
                      onChange={changeField}
                      value={avatar}
                    >
                      {avatars.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.picture}
                          control={<BpRadio />}
                          labelPlacement="bottom"
                          label={
                            <Avatar
                              alt={item.name}
                              src={item.picture}
                              sx={{ width: 80, height: 80 }}
                            />
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              <Button
                variant="text"
                color="primary"
                name="avatar"
                onClick={() => setAvatarSelectShow(!avatarSelectShow)}
              >
                {avatarSelectShow ? 'Valider' : "Changer d'avatar"}
              </Button>
            </StyledBadge>
            <StyleRow>
              <TextField
                error={
                  errors &&
                  hasKey(errors, 'nickname') &&
                  errors.nickname.length > 0
                }
                helperText={
                  errors &&
                  hasKey(errors, 'nickname') &&
                  errors.nickname.length > 0 &&
                  errors.nickname.map((err) => err)
                }
                name="nickname"
                type="nickname"
                label="Pseudo"
                placeholder="Pseudo"
                variant="outlined"
                value={nickname}
                sx={{ flexGrow: 1 }}
                onChange={changeField}
              />
            </StyleRow>
            <StyleRow>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  error={
                    errors &&
                    hasKey(errors, 'lastname') &&
                    errors.lastname.length > 0
                  }
                  helperText={
                    errors &&
                    hasKey(errors, 'lastname') &&
                    errors.lastname.length > 0 &&
                    errors.lastname.map((err) => err)
                  }
                  name="lastname"
                  type="lastname"
                  label="Nom de famille"
                  placeholder="Nom de famille"
                  variant="outlined"
                  value={lastname}
                  sx={{
                    flexGrow: '1',
                    mr: 1,
                  }}
                  onChange={changeField}
                />
                <TextField
                  error={
                    errors &&
                    hasKey(errors, 'firstname') &&
                    errors.firstname.length > 0
                  }
                  helperText={
                    errors &&
                    hasKey(errors, 'firstname') &&
                    errors.firstname.length > 0 &&
                    errors.firstname.map((err) => err)
                  }
                  name="firstname"
                  type="firstname"
                  label="Prénom"
                  placeholder="Prénom"
                  variant="outlined"
                  value={firstname}
                  sx={{
                    flexGrow: '1',
                    ml: 1,
                  }}
                  onChange={changeField}
                />
              </Box>
            </StyleRow>
            <StyleRow>
              <TextField
                error={
                  errors && hasKey(errors, 'email') && errors.email.length > 0
                }
                helperText={
                  errors && hasKey(errors, 'email') && errors.email.length > 0
                    ? errors.email.map((err) => err)
                    : 'Un nouvel email de confirmation vous sera envoyé après soumission.'
                }
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                value={email}
                sx={{ flexGrow: 1 }}
                onChange={changeField}
              />
            </StyleRow>
            <Stack
              spacing={2}
              direction="row"
              marginTop={2}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                name="nickname"
              >
                Mettre à jour
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                name="cancel"
                ml={2}
                onClick={initializeFields}
              >
                Réinitialiser
              </Button>
            </Stack>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: 'relative', padding: '1rem', paddingTop: '3rem' }}
        >
          <Button
            variant="contained"
            color="primary"
            name="password"
            onClick={handlePasswordUpdate}
          >
            Changer de mot de passe
          </Button>
          <Box
            backgroundColor={amber[50]}
            borderRadius={4}
            border={1}
            borderColor={amber[500]}
            mt={2}
            p={2}
          >
            <Button
              variant="contained"
              color="secondary"
              name="delete-account"
              onClick={handleDialogClickOpen}
              sx={{ marginBottom: 2 }}
            >
              Supprimer mon compte
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Etes-vous sûr de vouloir supprimer votre compte ?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Cette action est irréversible. Vous perdrez toutes vos données
                  et ne pourrez plus ni vous connecter, ni créer, ni modifier ou
                  supprimer de conseils.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleDialogRemoveAccount} autoFocus>
                  Supprimer mon compte
                </Button>
              </DialogActions>
            </Dialog>
            <Typography variant="body1" component="p" color="secondary">
              Attention, cette action est irréversible.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {advices && (
        <>
          {advices.length > 0 ? (
            <Typography variant="h5" component="h4" my={4}>
              {`Félicitations ! Vous avez déjà créé ${advices.length} conseil(s)`}
            </Typography>
          ) : (
            <>
              <Typography variant="h5" component="h4" my={4}>
                Vous n'avez pas encore créé de conseils.
              </Typography>
              <Typography variant="body1" component="p" color="primary">
                Pour créer un premier conseil, il vous suffit de cliquer sur le
                bouton 'plus' dans la barre de navigation ou sur le lien
                'Ajouter un conseil' dans le menu.
              </Typography>
            </>
          )}
          <Grid container spacing={2}>
            {advices.map((advice) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${advice.id}`}>
                <AdvicesMediumCard advice={advice} user={user} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}

function AdvicesMediumCard({ advice }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAdvice = () => {
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
          <CardActions
            sx={{
              float: 'right',
              padding: 0,
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
          </CardActions>
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
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body2"
            component="h6"
            sx={{
              color: 'white',
              borderRadius: '0.375rem',
              padding: '0 0.375rem',
              ...(advice.status
                ? { backgroundColor: 'primary.light' }
                : { backgroundColor: 'secondary.light' }),
            }}
          >
            {advice.status ? 'publié' : 'En attente'}
          </Typography>
          <Button
            component={RouterLink}
            to={`/conseils/${advice.id}/${advice.slug}`}
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
      avatar: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
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
      avatar: '',
    },
    created_at: '',
    updated_at: '',
  },
  user: {
    id: null,
  },
};
