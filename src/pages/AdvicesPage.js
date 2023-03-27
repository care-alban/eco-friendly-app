import { useSelector } from 'react-redux';

import { Box, Button, Grid } from '@mui/material';

import { Hero, Layout, Loader, SearchBar } from '../components';
import { AdvicesMediumCard } from '../components/Cards';

export default function AdvicesPage() {
  const advices = useSelector((state) => state.advices.list);

  if (!advices) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        title="Conseils"
        subtitle="Découvrez tous vos conseils"
        image="https://cdn.eco-friendly.fr/assets/img/misc/advices.webp"
      />
      <Box sx={{ flexGrow: 1, marginY: 2, marginX: 0 }}>
        <SearchBar list={advices} keys={['title', 'content']} />
      </Box>
      <Grid container spacing={2}>
        {advices.map((advice) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${advice.id}`}>
            <AdvicesMediumCard advice={advice} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          marginY: 2,
          marginX: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant="contained">Voir plus de conseils...</Button>
      </Box>
    </Layout>
  );
}
