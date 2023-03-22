import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { getAllCategories } from '../actions/commonActions';

// const pages = ['Maison', 'Santé', 'Bien-être', 'Alimentation'];
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

export default function Navbar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (categories.length === 0) dispatch(getAllCategories());
  }, [categories]);

  return (
    <>
      <AppBar position="relative">
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
                <UserMenu />
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
      <AppBar position="sticky">
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
            <Link component={RouterLink} to="/" color="inherit" sx={link}>
              Actualité
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                component={RouterLink}
                to={`/categories/${category.slug}`}
                color="inherit"
                sx={link}
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
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '100%',
          },
        }}
      >
        <MenuItem onClick={handleCloseNavMenu}>
          <Link
            component={RouterLink}
            to="/"
            textAlign="center"
            sx={{ textDecoration: 'none' }}
            color="inherit"
          >
            Actualité
          </Link>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} onClick={handleCloseNavMenu}>
            <Link
              component={RouterLink}
              to={`/categories/${category.slug}`}
              textAlign="center"
              sx={{ textDecoration: 'none' }}
              color="inherit"
            >
              {category.name}
            </Link>
          </MenuItem>
        ))}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
          }}
        >
          {user ? (
            <UserMenu />
          ) : (
            <>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  component={RouterLink}
                  to="/connexion"
                  textAlign="center"
                  sx={{ textDecoration: 'none' }}
                  color="inherit"
                >
                  S'identifier
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  component={RouterLink}
                  to="/inscription"
                  textAlign="center"
                  sx={{ textDecoration: 'none' }}
                  color="inherit"
                >
                  S'inscrire
                </Link>
              </MenuItem>
            </>
          )}
        </Box>
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
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{ p: 0, display: { xs: 'none', md: 'block' } }}
      >
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
