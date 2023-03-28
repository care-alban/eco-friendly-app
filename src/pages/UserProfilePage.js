import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Typography,
  Grid,
  Link,
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

  console.log(advices);

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
            <Link component={RouterLink} to="/">
              Changer d'avatar
            </Link>
          </StyledBadge>
          <StyleRow>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" component="h5">
                Pseudo
              </Typography>
              <Typography variant="body1" component="p">
                {nickname}
              </Typography>
            </Box>
            <Link component={RouterLink} to="/">
              Modifier
            </Link>
          </StyleRow>
          <StyleRow>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" component="h5">
                Email
              </Typography>
              <Typography variant="body1" component="p">
                {email}
              </Typography>
            </Box>
            <Link component={RouterLink} to="/">
              Modifier
            </Link>
          </StyleRow>
          <StyleRow>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" component="h5">
                Nom et Prénom
              </Typography>
              <Typography variant="body1" component="p">
                {firstname} {lastname}
              </Typography>
            </Box>
            <Link component={RouterLink} to="/">
              Modifier
            </Link>
          </StyleRow>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ position: 'relative', padding: '1rem', paddingTop: '3rem' }}
        >
          <Link component={RouterLink} to="/">
            Changer de mot de passe
          </Link>
          <Box
            backgroundColor={amber[50]}
            borderRadius={4}
            border={1}
            borderColor={amber[500]}
            mt={2}
            p={2}
          >
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="secondary"
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
    </Layout>
  );
}
