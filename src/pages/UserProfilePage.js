import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Avatar,
  Badge,
  Box,
  Button,
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

import { onGetAdvices } from '../actions/userActions';

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

// Inspired by blueprintjs
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
  const [avatarSelectShow, setAvatarSelectShow] = useState(false);
  const advices = useSelector((state) => state.user.advices);
  const isLoaded = useSelector((state) => state.user.isLoaded);
  const { nickname, email, avatar, firstname, lastname } = useSelector(
    (state) => state.user.data,
  );

  useEffect(() => {
    dispatch(onGetAdvices());
  }, []);

  if (!isLoaded) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit : ', nickname, email, firstname, lastname);
  };

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
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                      aria-labelledby="radio-buttons-group-label"
                      defaultValue={avatar}
                      name="radio-buttons-group"
                      sx={{ flexDirection: 'row' }}
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
                {avatarSelectShow ? 'Annuler' : "Changer d'avatar"}
              </Button>
            </StyledBadge>
            <StyleRow>
              <TextField
                name="nickname"
                type="nickname"
                label="Pseudo"
                placeholder="Pseudo"
                variant="outlined"
                value={nickname}
                sx={{ flexGrow: 1 }}
                // onChange={changeField}
              />
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
                // onChange={changeField}
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
                  name="lastname"
                  type="lastname"
                  label="Nom de famille"
                  placeholder="Nom de famille"
                  variant="outlined"
                  value={firstname}
                  sx={{
                    flexGrow: '1',
                    mr: 1,
                  }}
                  // onChange={changeField}
                />
                <TextField
                  name="firstname"
                  type="firstname"
                  label="Prénom"
                  placeholder="Prénom"
                  variant="outlined"
                  value={lastname}
                  sx={{
                    flexGrow: '1',
                    ml: 1,
                  }}
                  // onChange={changeField}
                />
              </Box>
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
            // onClick={handlePasswordUpdate}
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
              // onClick={handleRemoveAccount}
              sx={{ marginBottom: 2 }}
            >
              Supprimer mon compte
            </Button>
            <Typography variant="body1" component="p" color="secondary">
              Attention, cette action est irréversible.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {advices && (
        <>
          <Typography variant="h4" component="h4" my={4}>
            {advices.length > 0
              ? `Félicitations ! Vous avez déjà créé ${advices.length} conseil(s)`
              : "Vous n'avez pas encore créé de conseils"}
          </Typography>
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
