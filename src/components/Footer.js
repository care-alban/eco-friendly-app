import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <footer>
      <Box sx={{ flexGrow: 1, paddingY: 2 }}>
        <Typography variant="body2" color="primary" align="center">
          <span>{'Copyright © '}</span>
          <Link color="inherit" href="/">
            Eco-Friendly
          </Link>
          <span> {new Date().getFullYear()}.</span>
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
