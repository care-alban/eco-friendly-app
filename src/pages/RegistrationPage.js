import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';

const registerTextStyle = { margin: '0.5rem 0' };

export default function RegistrationPage() {
  const nickname = useSelector((state) => state.user.registerInfo.nickname);
  const email = useSelector((state) => state.user.registerInfo.email);

  /* display at 404 rather than redirecting the user */
  if (!nickname || !email) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    );
  }

  const image = 'https://cdn.eco-friendly.fr/assets/img/misc/register.png';
  const title = `Merci ${nickname.toUpperCase()} pour votre inscription`;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={image}
              alt="enregistrement"
              sx={{ borderRadius: '0.375rem' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardHeader title={title} />
            <CardContent>
              <Typography variant="body1" sx={registerTextStyle}>
                Nous sommes très heureux de vous compter parmi nous et vous
                souhaitons la bienvenue sur le site{' '}
                <Typography component="span" color="secondary">
                  Eco-Friendly.fr{' '}
                </Typography>
                !
              </Typography>
              <Typography variant="body1" sx={registerTextStyle}>
                Un email vient de vous être envoyé sur l'adresse{' '}
                <span>{email}</span>, vérifiez votre messagerie et finaliser
                votre enregistrement !
              </Typography>
              <Typography variant="body2">
                Vous n'avez pas reçu votre email ? <Button>Renvoyer</Button>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Typography variant="body2" textAlign="center" mt={4}>
          Vous avez déjà un compte ?{' '}
          <Button component={RouterLink} to="/connexion">
            Se connecter
          </Button>
        </Typography>
      </Container>
    </Layout>
  );
}
