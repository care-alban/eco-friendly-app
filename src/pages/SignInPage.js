import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from '../components/Layout';

import { userOnInputChange, onSignIn } from '../actions/userActions';

const paperStyle = {
  padding: '2rem',
  height: '100%',
  width: '100%',
  maxWidth: '380px',
  margin: '1.4rem auto',
};
const TextFieldStyle = { margin: '0.5rem 0' };
const btnstyle = { margin: '1rem 0' };
const linkStyle = { textDecoration: 'none' };

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isLogged = useSelector((state) => state.user.isLogged);
  const error = useSelector((state) => state.user.messages.error);

  /* link field to state */
  const changeField = (e) => {
    dispatch(userOnInputChange(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(onSignIn(email, password));
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged]);

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
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              name="email"
              onChange={changeField}
              value={email}
              type="email"
              label="email"
              placeholder="Email"
              variant="outlined"
              fullWidth
              required
              sx={TextFieldStyle}
            />
            <TextField
              name="password"
              onChange={changeField}
              value={password}
              type="password"
              label="Mot de passe"
              placeholder="Mot de passe"
              variant="outlined"
              fullWidth
              required
            />
            {error && <FormHelperText>{error}</FormHelperText>}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={btnstyle}
              fullWidth
            >
              S'identifier
            </Button>
          </form>
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
