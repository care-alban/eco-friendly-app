import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    /* TODO: change margin top dynamically */

    <Box sx={{ display: 'flex', marginTop: '-8.625rem' }}>
      <CircularProgress
        size={76}
        sx={{
          position: 'absolute',
          top: '51%',
          left: '51%',
          transform: `translate(-50%, -50%)`,
          color: 'primary.main',
          opacity: 0.5,
        }}
      />
      <CircularProgress
        size={96}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          color: 'secondary.main',
        }}
      />
    </Box>
  );
}
