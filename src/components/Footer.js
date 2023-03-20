import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import Banner from './Banner';

function Footer() {
  return (
    <footer>
      <Box sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="body2" color="primary" align="center">
          <span>{'Copyright © '}</span>
          <Link conmponent={RouterLink} to="/" color="inherit">
            Eco-Friendly
          </Link>
          <span> {new Date().getFullYear()}.</span>
        </Typography>
      </Box>
      <Banner />
    </footer>
  );
}

export default Footer;
