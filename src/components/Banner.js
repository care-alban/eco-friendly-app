import { Container, Typography } from '@mui/material';

export default function Banner() {
  return (
    <Container maxWidth="xl">
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        textAlign="center"
      >
        Ce site est un travail de fin de formation, il est destiné à la
        démonstration des compétences acquises et n'a pas vocation politique,
        commerciale ou autre. Il ne sera pas mis à jour et son contenu ne sera
        pas modifié.
      </Typography>
    </Container>
  );
}
