import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import {
  getAllCategories,
  toggleShowAdviceForm,
} from '../actions/commonActions';

import { onLogOut } from '../actions/userActions';

// const pages = ['Maison', 'Santé', 'Bien-être', 'Alimentation'];
const link = {
  mr: 3,
  fontWeight: 500,
  color: '#000',
  textDecoration: 'none',
  borderBottom: 1,
  textTransform: 'none',
  borderColor: 'transparent',
  fontSize: '1.2rem',
  backgroundColor: 'transparent',
  padding: 0,
  '&:hover': {
    borderColor: 'divider',
    backgroundColor: 'transparent',
  },
  '&:last-child': {
    mr: 0,
  },
};

export default function Navbar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (categories.length === 0) dispatch(getAllCategories());
  }, [categories]);

  return (
    <>
      <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters id="back-to-top">
            <LocalFloristIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Eco-Friendly
            </Typography>
            <MobileNav categories={categories} user={user} />
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
              }}
            >
              <LocalFloristIcon
                sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 500,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                }}
              >
                Eco-Friendly
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {user ? (
                <UserMenu user={user} />
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/connexion"
                    color="inherit"
                    size="small"
                    sx={{ marginRight: '1rem' }}
                  >
                    S'identifier
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/inscription"
                    color="inherit"
                    size="small"
                    variant="outlined"
                  >
                    S'inscrire
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar position="sticky" sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              py: 3,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: 'white',
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ ...link, letterSpacing: '.3rem' }}
            >
              Actualité
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                component={RouterLink}
                to={`/categories/${category.slug}`}
                color="inherit"
                sx={{ ...link, letterSpacing: '.3rem' }}
              >
                {category.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

function MobileNav({ categories, user }) {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleShowAdviceForm = () => {
    dispatch(toggleShowAdviceForm());
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOnLogout = () => {
    dispatch(onLogOut());
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem
          onClick={handleCloseNavMenu}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{ ...link, margin: '0.625rem 0' }}
            color="inherit"
          >
            Actualité
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              component={RouterLink}
              to={`/categories/${category.slug}`}
              sx={{ ...link, margin: '0.625rem 0' }}
              color="inherit"
            >
              {category.name}
            </Link>
          ))}
          {!user ? (
            <>
              <Link
                component={RouterLink}
                to="/connexion"
                sx={{ ...link, margin: '0.625rem 0' }}
                color="inherit"
              >
                S'identifier
              </Link>
              <Link
                component={RouterLink}
                to="/inscription"
                sx={{ ...link, margin: '0.625rem 0' }}
                color="inherit"
              >
                S'inscrire
              </Link>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              <Link
                component={RouterLink}
                to={`/utilisateurs/${user.nickname}`}
                sx={{ ...link, margin: '0.625rem 0' }}
                color="inherit"
              >
                Profil
              </Link>
              <Link
                component={RouterLink}
                to="/tableau-de-bord"
                sx={{ ...link, margin: '0.625rem 0' }}
                color="inherit"
              >
                Tableau de bord
              </Link>
              <Button
                variant="text"
                color="inherit"
                sx={{
                  ...link,
                  margin: '0.625rem 0',
                }}
                onClick={handleShowAdviceForm}
              >
                Ajouter un conseil
              </Button>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  ...link,
                  margin: '0.625rem 0',
                  color: 'secondary.main',
                  border: 1,
                  padding: '0.375rem 1rem',
                  borderRadius: '0.25rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'divider',
                    borderColor: 'none',
                  },
                }}
                onClick={handleOnLogout}
              >
                Déconnexion
              </Link>
            </Box>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
}

MobileNav.propTypes = {
  categories: PropTypes.array.isRequired,
  user: PropTypes.object,
};

MobileNav.defaultProps = {
  user: null,
};

function UserMenu({ user }) {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { nickname, avatar } = user;

  const handleShowAdviceForm = () => {
    dispatch(toggleShowAdviceForm());
  };

  const adviceFormIsOpen = useSelector((state) => state.common.showAdviceForm);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOnLogout = () => {
    dispatch(onLogOut());
  };

  /* style */
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 0, display: 'flex' }}>
      <IconButton
        onClick={handleShowAdviceForm}
        sx={{
          display: { xs: 'none', md: 'block' },
          color: 'common.white',
          mr: 2,
        }}
      >
        {!adviceFormIsOpen ? (
          <AddIcon fontSize="medium" />
        ) : (
          <CloseIcon fontSize="medium" />
        )}
      </IconButton>
      <Button
        variant="outlined"
        onClick={handleOpenUserMenu}
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'flex' },
          minWidth: '15em',
          justifyContent: 'space-between',
          padding: '0.375rem 0.5rem',
        }}
      >
        {/* on left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt={`avatar de ${nickname}`} src={avatar} />
          </StyledBadge>
          <Typography
            component="span"
            sx={{ fontSize: '0.75rem', marginLeft: '0.5rem' }}
          >
            {nickname}
          </Typography>
        </Box>
        {/* on right */}
        {anchorElUser ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
      {/* <IconButton
        onClick={handleOpenUserMenu}
        sx={{ p: 0, display: { xs: 'none', md: 'block' } }}
      >
        <Avatar alt={`avatar de ${nickname}`} src={avatar} />
      </IconButton> */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Link
            component={RouterLink}
            to={`/utilisateurs/${user.nickname}`}
            sx={{ ...link, margin: '0.625rem 0' }}
            color="inherit"
          >
            Profil
          </Link>
          <Link
            component={RouterLink}
            to="/tableau-de-bord"
            sx={{ ...link, margin: '0.625rem 0' }}
            color="inherit"
          >
            Tableau de bord
          </Link>

          <Link
            component={RouterLink}
            to="/"
            sx={{
              ...link,
              margin: '0.625rem 0',
              color: 'secondary.main',
              border: 1,
              padding: '0.375rem 1rem',
              borderRadius: '0.25rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'white',
                backgroundColor: 'divider',
                borderColor: 'none',
              },
            }}
            onClick={handleOnLogout}
          >
            Déconnexion
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
};
