import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Banner from './Banner';

function Footer() {
  return (
    <footer>
      <Box sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="body2" color="primary" align="center">
          <span>{'Copyright © '}</span>
          <Link color="inherit" href="/">
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
