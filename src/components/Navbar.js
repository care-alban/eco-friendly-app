import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import config from '../config';

// const pages = ['Maison', 'Santé', 'Bien-être', 'Alimentation'];

export default function Navbar() {
  const categories = useSelector((state) => state.common.categories);
  const user = useSelector((state) => state.user.user);
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalFloristIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`${config.basePath}`}
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
          <MobileNav categories={categories} />
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
          {user ? <UserMenu /> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </Container>
      <AppMenu categories={categories} />
    </AppBar>
  );
}

function AppMenu({ categories }) {
  const link = {
    mr: 3,
    fontFamily: 'monospace',
    fontWeight: 500,
    letterSpacing: '.3rem',
    color: '#000',
    textDecoration: 'none',
    borderBottom: 1,
    borderColor: 'transparent',
    '&:hover': {
      borderColor: 'inherit',
    },
    '&:last-child': {
      mr: 0,
    },
  };

  return (
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
        to={`${config.basePath}`}
        color="inherit"
        sx={link}
      >
        Actualité
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          component={RouterLink}
          to={`${config.basePath}/categories/${category.slug}`}
          color="inherit"
          sx={link}
        >
          {category.name}
        </Link>
      ))}
    </Box>
  );
}

AppMenu.propTypes = {
  categories: PropTypes.array.isRequired,
};

function MobileNav({ categories }) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Actualité</Typography>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{category.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

MobileNav.propTypes = {
  categories: PropTypes.array.isRequired,
};

function UserMenu() {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
