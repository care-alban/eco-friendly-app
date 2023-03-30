import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  // FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
import AdvicesMediumCard from '../components/Cards/AdvicesMediumCard';

import {
  userOnInputChange,
  onGetAdvices,
  onSettingsUpdate,
  onEmailUpdate,
  onEmailVerification,
  onDeleteAccount,
  onLogOut,
  clearMessages,
} from '../actions/userActions';

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

const listAvatars = [
  {
    name: 'Ours',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/ours.png',
  },
  {
    name: 'Mésange bleue',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/mesange-bleue.png',
  },
  {
    name: 'Chevreuil',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/chevreuil.png',
  },
  {
    name: 'Grenouille',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/grenouille.png',
  },
  {
    name: 'Renard',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/renard.png',
  },
  {
    name: 'Lièvre',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/lievre.png',
  },
  {
    name: 'Papillon',
    url: 'https://cdn.eco-friendly.fr/assets/img/avatars/papillon.png',
  },
];

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarSelectShow, setAvatarSelectShow] = useState(false);
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    if (errors && errors.email.length > 0) {
      console.log(errors.email);
    }
  }, [email]);

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
    dispatch(userOnInputChange(user.avatar, 'avatar'));
    dispatch(userOnInputChange(user.nickname, 'nickname'));
    dispatch(userOnInputChange(user.email, 'email'));
    dispatch(userOnInputChange(user.firstname, 'firstname'));
    dispatch(userOnInputChange(user.lastname, 'lastname'));
  };

  useEffect(() => {
    dispatch(clearMessages());
    dispatch(onGetAdvices());
  }, []);

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
                      {listAvatars.map((itemAvatar) => (
                        <FormControlLabel
                          key={itemAvatar.name}
                          value={itemAvatar.url}
                          control={<BpRadio />}
                          labelPlacement="bottom"
                          label={
                            <Avatar
                              alt={itemAvatar.name}
                              src={itemAvatar.url}
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
                error={errors && errors.nickname.length > 0}
                helperText={
                  errors &&
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
              {/* <FormHelperText>

              </FormHelperText> */}
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
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                value={email}
                sx={{ flexGrow: 1 }}
                onChange={changeField}
                helperText="Un nouvel email de confirmation vous sera envoyé après soumission."
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
                <AdvicesMediumCard advice={advice} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}
