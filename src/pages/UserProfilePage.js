import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
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

export default function UserProfilePage() {
  const dispatch = useDispatch();
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

  /* styles */
  const StyledBadge = styled(Badge)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(calc(25%), calc(-50% - 1rem))',
    '& .MuiBadge-badge': {
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const StyleRow = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  }));

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
              <Button variant="text" color="primary" name="avatar">
                Changer d'avatar
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
