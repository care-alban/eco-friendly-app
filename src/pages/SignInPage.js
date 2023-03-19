import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Layout from '../components/Layout';

export default function SignInPage() {
  const paperStyle = {
    padding: '2rem',
    height: '100%',
    width: '340px',
    margin: '1.4rem auto',
  };
  const TextFieldStyle = { margin: '0.5rem 0' };
  const btnstyle = { margin: '1rem 0' };
  const linkStyle = { textDecoration: 'none' };
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid align="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Connexion</h2>
        </Grid>
        <Paper elevation={10} sx={paperStyle}>
          <TextField
            label="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            required
            sx={TextFieldStyle}
          />
          <TextField
            label="Password"
            placeholder="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={btnstyle}
            fullWidth
          >
            S'identifier
          </Button>
          <Typography
            variant="subtitle2"
            component="p"
            color="inherit"
            sx={{ marginBottom: '1rem' }}
          >
            <Link component={RouterLink} to="/email" sx={{ linkStyle }}>
              Mot de passe oublié ?
            </Link>
          </Typography>
        </Paper>
        <Typography
          variant="subtitle1"
          component="p"
          color="inherit"
          sx={{ textAlign: 'center' }}
        >
          Première fois ?
          <Link
            component={RouterLink}
            to="/inscription"
            color="secondary"
            sx={linkStyle}
          >
            {' '}
            S'inscrire
          </Link>
        </Typography>
      </Box>
    </Layout>
  );
}
