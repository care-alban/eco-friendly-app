import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout';

const registerTextStyle = { margin: '0.5rem 0' };

export default function ValidationPage() {
  const image = 'https://cdn.eco-friendly.fr/assets/img/misc/validation.png';
  const title = 'Félicitation ! Votre email a bien été validée.';

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
                Vous pouvez dès à présent après vous être connecté(e) à votre
                compte, partager tous vos conseils sur le site :{' '}
                <Link
                  component={RouterLink}
                  to="/connexion"
                  variant="body1"
                  color="secondary"
                >
                  Eco-Friendly.fr{' '}
                </Link>
              </Typography>
              <Typography variant="body1">
                Pour vous connecter, vous pouvez soit cliquer sur le bouton
                s'identifer dans la barre de navigation, soit cliquer sur le
                lien :{' '}
                <Link component={RouterLink} to="/connexion" variant="body1">
                  C'est parti !
                </Link>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Typography variant="body2" textAlign="center" mt={4}>
          Vous n'avez pas de compte ?{' '}
          <Button component={RouterLink} to="/inscription">
            S'inscrire
          </Button>
        </Typography>
      </Container>
    </Layout>
  );
}
