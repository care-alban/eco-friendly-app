import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import Banner from './Banner';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 1 }}
    >
      <Typography variant="body2" color="primary" align="center">
        <span>{'Copyright © '}</span>
        <Link conmponent={RouterLink} to="/">
          Eco-Friendly
        </Link>
        <span> {new Date().getFullYear()} | </span>
        <Link conmponent={RouterLink} to="/mentions-legales">
          Mentions légales
        </Link>
      </Typography>
      <Banner />
    </Box>
  );
}

export default Footer;
