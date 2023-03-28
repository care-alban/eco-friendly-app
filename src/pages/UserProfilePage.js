import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Badge, Box, Button, Typography, Grid } from '@mui/material';
import { amber } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import Layout from '../components/Layout';
import Loader from '../components/Loader';
import AdvicesMediumCard from '../components/Cards/AdvicesMediumCard';
import FormNickname from '../components/Forms/FormNickname';

import { openModal } from '../actions/commonActions';
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

  /**
   * Retunrs the content of the modal window
   * @param {String} contentName
   * @returns
   */
  const modalContent = (contentName) => {
    switch (contentName) {
      case 'nickname':
        return <FormNickname />;
      default:
        return null;
    }
  };

  const toggleModal = (e) => {
    const { name } = e.target;
    dispatch(openModal(modalContent(name)));
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
            <Button
              variant="text"
              color="primary"
              onClick={toggleModal}
              name="avatar"
            >
              Changer d'avatar
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              onClick={toggleModal}
              name="nickname"
            >
              Modifier
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              onClick={toggleModal}
              name="email"
            >
              Modifier
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              onClick={toggleModal}
              name="fullname"
            >
              Modifier
            </Button>
          </StyleRow>
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
            onClick={toggleModal}
            name="password"
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
              onClick={toggleModal}
              name="delete-account"
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
