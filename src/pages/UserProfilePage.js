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

import { getAvatars } from '../actions/commonActions';

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

  /**
   * @name hasKey
   * @description Check if an object has a key
   * @param {object} obj
   * @param {string} key
   * @returns {boolean}
   */
  const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

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
                <AdvicesMediumCard advice={advice} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}
