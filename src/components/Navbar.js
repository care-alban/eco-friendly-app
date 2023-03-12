import { useState } from 'react';

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

const pages = ['Maison', 'Santé', 'Bien-être', 'Alimentation'];

function Navbar() {
  const isLogged = false;

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <MobileNav />
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
            {isLogged ? <UserMenu /> : <Button color="inherit">Login</Button>}
          </Toolbar>
        </Container>
        <AppMenu />
      </AppBar>
    </Box>
  );
}

export default Navbar;

function AppMenu() {
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
      <Link color="inherit" href="/" sx={link}>
        Actualité
      </Link>
      {pages.map((page) => (
        <Link key={page} color="inherit" href="/" sx={link}>
          {page}
        </Link>
      ))}
    </Box>
  );
}

function MobileNav() {
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
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

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
