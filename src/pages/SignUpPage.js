import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import Layout from '../components/Layout';

import { userOnInputChange, onSignUp } from '../actions/userActions';

import { clearMessages } from '../actions/commonActions';

import { hasKey } from '../utils';

const paperStyle = {
  padding: '2rem',
  height: '100%',
  width: '100%',
  maxWidth: '380px',
  margin: '1.4rem auto',
};

const btnstyle = { margin: '1rem 0' };
const linkStyle = { textDecoration: 'none' };

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const nickname = useSelector((state) => state.user.nickname);
  const isRegistered = useSelector((state) => state.user.isRegistered);
  const [error, setError] = useState(false); // password confirm
  const errors = useSelector((state) => state.user.messages.error);

  /* link field to state */
  const changeField = (e) => {
    dispatch(clearMessages());
    dispatch(userOnInputChange(e.target.value, e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (password !== passwordConfirm) {
      setError(true);
      return null;
    }
    return dispatch(onSignUp(email, password, nickname));
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, []);

  useEffect(() => {
    if (isRegistered) {
      navigate('/enregistrement');
    }
  }, [isRegistered]);

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
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <AddEmail onChange={changeField} value={email} errors={errors} />
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
            <AddNickname
              onChange={changeField}
              value={nickname}
              errors={errors}
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

function AddEmail({ onChange, value, errors }) {
  return (
    <TextField
      error={errors && hasKey(errors, 'email') && errors.email.length > 0}
      helperText={
        errors &&
        hasKey(errors, 'email') &&
        errors.email.length > 0 &&
        errors.email.map((err) => err)
      }
      name="email"
      type="email"
      label="email"
      placeholder="Email"
      variant="outlined"
      fullWidth
      required
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      margin="dense"
    />
  );
}

AddEmail.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

AddEmail.defaultProps = {
  errors: {},
};

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

function AddNickname({ onChange, value, errors }) {
  return (
    <TextField
      error={errors && hasKey(errors, 'nickname') && errors.nickname.length > 0}
      helperText={
        errors &&
        hasKey(errors, 'nickname') &&
        errors.nickname.length > 0 &&
        errors.nickname.map((err) => err)
      }
      name="nickname"
      type="text"
      label="Pseudo"
      placeholder="Choisir votre pseudo"
      variant="outlined"
      fullWidth
      required
      onChange={onChange}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CheckIcon />
          </InputAdornment>
        ),
      }}
      margin="dense"
    />
  );
}

AddNickname.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

AddNickname.defaultProps = {
  errors: {},
};
