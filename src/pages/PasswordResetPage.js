import { useState, dispatch } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Layout from '../components/Layout';

import { onInputChange, onPasswordUpdate } from '../actions/userActions';

/* styles */
const paperStyle = {
  padding: '2rem',
  height: '100%',
  width: '100%',
  maxWidth: '380px',
  margin: '1.4rem auto',
};
const TextFieldStyle = { margin: '0.5rem 0' };
const btnstyle = { margin: '1rem 0' };

export default function PasswordResetPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [error, setError] = useState(false); // password confirm

  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);

  /* link field to state */
  const changeField = (e) => {
    dispatch(onInputChange(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (password !== passwordConfirm) {
      setError(true);
      return;
    }
    dispatch(onPasswordUpdate(token));
    navigate('/connexion', { replace: true });
  };

  return (
    <Layout>
      <Container sx={{ flexGrow: 1 }}>
        <Grid align="center">
          <Avatar>
            <AppRegistrationIcon />
          </Avatar>
          <Typography variant="h5" component="h1" color="inherit" mt={2}>
            Réinitialiser votre mot de passe
          </Typography>
        </Grid>
        <Paper elevation={10} sx={paperStyle}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <AddPassword onChange={changeField} value={password} />
            <PasswordConfirm
              onChange={changeField}
              value={passwordConfirm}
              error={error}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={btnstyle}
              fullWidth
            >
              Suivant
            </Button>
          </form>
          <Typography
            variant="subtitle1"
            component="p"
            color="inherit"
            sx={{ textAlign: 'center' }}
          >
            Si vous ne souhaitez plus réinitialiser votre mot de passe, ignorez
            cette page et retourner à la page d'accueil.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
}

function AddPassword({ onChange, value }) {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        name="password"
        onChange={onChange}
        value={value}
        type="password"
        label="Mot de passe"
        placeholder="Mot de passe"
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
    </Box>
  );
}

AddPassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function PasswordConfirm({ onChange, value, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={TextFieldStyle}>
      <TextField
        error={error}
        name="passwordConfirm"
        onChange={onChange}
        value={value}
        type={showPassword ? 'text' : 'password'}
        label="Confirmation"
        placeholder="Mot de passe"
        variant="outlined"
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error && (
        <FormHelperText
          error={error}
          id="component-helper-text"
          sx={{ margin: '0.5rem 0' }}
        >
          Les mots de passe ne correspondent pas.
        </FormHelperText>
      )}
    </Box>
  );
}

PasswordConfirm.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
};

PasswordConfirm.defaultProps = {
  error: false,
};
