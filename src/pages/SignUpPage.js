import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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

import { onInputChange, onSignUp } from '../actions/userActions';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false); // password confirm
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const passwordConfirm = useSelector((state) => state.user.passwordConfirm);
  const nickname = useSelector((state) => state.user.nickname);
  const isRegistered = useSelector((state) => state.user.isRegistered);

  /* link field to state */
  const changeField = (e) => {
    dispatch(onInputChange(e.target.value, e.target.name));
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
            <AddEmail onChange={changeField} value={email} />
            <AddPassword onChange={changeField} value={password} />
            <PasswordConfirm
              onChange={changeField}
              value={passwordConfirm}
              error={error}
            />
            <AddNickname onChange={changeField} value={nickname} />
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

function AddEmail({ onChange, value }) {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        name="email"
        onChange={onChange}
        value={value}
        type="email"
        label="email"
        placeholder="Email"
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

AddEmail.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

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
        label="Confirmation du mot de passe"
        placeholder="Confirmer votre mot de passe"
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

function AddNickname({ onChange, value }) {
  return (
    <Box sx={TextFieldStyle}>
      <TextField
        name="nickname"
        onChange={onChange}
        value={value}
        type="text"
        label="Pseudo"
        placeholder="Choisir votre pseudo"
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

AddNickname.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
