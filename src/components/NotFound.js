import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Link, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          component="h1"
          marginBottom={2}
          textAlign="center"
        >
          Humm... Il semblerait que cette page n'existe pas.
        </Typography>
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 2,
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          }}
          src="https://cdn.eco-friendly.fr/assets/img/misc/404.webp"
          alt="404"
        />
        <Typography variant="h6" component="h2" marginTop={2}>
          Vous pouvez retourner à l'accueil en cliquant sur le logo, ou sur le
          Lien :{' '}
          <Link component={RouterLink} to="/" underline="hover">
            <Typography
              variant="h6"
              component="span"
              marginTop={2}
              color="secondary"
            >
              Retour à l'accueil
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
