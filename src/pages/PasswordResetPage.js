import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Avatar,
  Button,
  Container,
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

import { userOnInputChange, onPasswordUpdate } from '../actions/userActions';

import { clearMessages } from '../actions/commonActions';

import { hasKey } from '../utils';

/* styles */
const paperStyle = {
  padding: '2rem',
  height: '100%',
  width: '100%',
  maxWidth: '380px',
  margin: '1.4rem auto',
};
const btnstyle = { margin: '1rem 0' };

export default function PasswordResetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const isUpdated = useSelector((state) => state.user.isUpdated);
  const [error, setError] = useState(false); // password confirm
  const errors = useSelector((state) => state.user.messages.error);

  /* link field to state */
  const changeField = (e) => {
    dispatch(clearMessages());
    dispatch(userOnInputChange(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    setError(false);
    if (password !== passwordConfirm) {
      setError(true);
      return null;
    }
    return dispatch(onPasswordUpdate(token));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate('/connexion', { replace: true });
    }
  }, [isUpdated]);

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
            <AddPassword
              onChange={changeField}
              value={password}
              errors={errors}
            />
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

function AddPassword({ onChange, value, errors }) {
  return (
    <TextField
      error={errors && hasKey(errors, 'password') && errors.password.length > 0}
      helperText={
        errors && hasKey(errors, 'password') && errors.password.length > 0
          ? errors.password.map((err) => err)
          : '8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial.'
      }
      name="password"
      type="password"
      label="Mot de passe"
      placeholder="Mot de passe"
      variant="outlined"
      fullWidth
      required
      onChange={onChange}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        ),
      }}
      margin="dense"
    />
  );
}

AddPassword.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

AddPassword.defaultProps = {
  errors: {},
};

function PasswordConfirm({ onChange, value, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      error={error}
      helperText={error && 'Les mots de passe ne correspondent pas.'}
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
      margin="dense"
    />
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
