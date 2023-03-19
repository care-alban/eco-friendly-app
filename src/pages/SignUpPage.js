import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import CheckIcon from '@mui/icons-material/Check';
import Layout from '../components/Layout';

const paperStyle = {
  padding: '2rem',
  height: '100%',
  width: '340px',
  margin: '1.4rem auto',
};
const TextFieldStyle = { margin: '1rem 0' };
const btnstyle = { margin: '1rem 0' };
const linkStyle = { textDecoration: 'none' };

export default function SignUpPage() {
  return (
    <Layout>
      <Container sx={{ flexGrow: 1 }}>
        <Grid align="center">
          <Avatar>
            <AppRegistrationIcon />
          </Avatar>
          <h2>S'inscrire</h2>
        </Grid>
        <Paper elevation={10} sx={paperStyle}>
          <AddEmail />
          <AddPassword />
          <AddNickname />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={btnstyle}
            fullWidth
          >
            Suivant
          </Button>
        </Paper>
        <Typography
          variant="subtitle1"
          component="p"
          color="inherit"
          sx={{ textAlign: 'center' }}
        >
          Déja inscrit ?
          <Link
            component={RouterLink}
            to="/connexion"
            color="secondary"
            sx={linkStyle}
          >
            {' '}
            Se connecter
          </Link>
        </Typography>
      </Container>
    </Layout>
  );
}

function AddEmail() {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        label="email"
        placeholder="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

function AddPassword() {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        label="Password"
        placeholder="Mot de passe"
        type="password"
        variant="outlined"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormHelperText id="component-helper-text" sx={{ margin: '0.5rem 0' }}>
        8 caractères minimum dont une majuscule, une minuscule, un chiffre et un
        caractère spécial.
      </FormHelperText>
      <TextField
        label="Confirmation du mot de passe"
        placeholder="Confirmer votre mot de passe"
        type="password"
        variant="outlined"
        fullWidth
        required
      />
    </Box>
  );
}

function AddNickname() {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        label="Pseudo"
        placeholder="Choisir votre pseudo"
        type="text"
        variant="outlined"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CheckIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
