/* NPM modules */
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
/* Material UI */
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* Own modules */
import { withUserContext } from '../../context/UserContext';
/* Assets */
import imageLogo from '../../assets/images/logo2.png';
import imageAvatar from '../../assets/images/user.png';
/* CSS */
import './NavBar.css';

/**
 * Componente NavBar
 */
const NavBar = ({ session, clearSession, name }) => {
  const [state, setState] = useState({
    anchorUserMenu: null,
  });

  /**
   * Cierra el submenu
   */
  const handleClose = () => {
    setState({ anchorUserMenu: null });
  };

  /**
   * Abre el menu
   */
  const handleMenu = (event) => {
    setState({ anchorUserMenu: event.currentTarget });
  };
  /**
   * Render del componente
   */
  return (
    <AppBar title="Wallakeep" position="static" className="NavBar">
      <Container>
        <Toolbar className="NavBar__Toolbar">
          <Link to="/" className="NavBar__Brand">
            <img src={imageLogo} alt="logo" className="NavBar__Brand" />
          </Link>
          {session.name && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-NavBar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className="NavBar__User"
              >
                <Avatar className="Avatar" alt={name} src={imageAvatar} />
                <span className="NavBar__User--hiddenXS">{session.name}</span>
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                className="NavBar__Menu"
                id="menu-navbar"
                anchorEl={state.anchorUserMenu}
                keepMounted
                open={state.anchorUserMenu ? true : false}
                onClose={handleClose}
              >
                <MenuItem
                  className="NavBar__MenuItem"
                  component={Link}
                  to="/advert/create"
                  onClick={handleClose}
                >
                  <ListItemIcon className="NavBar__MenuItemIcon">
                    <PostAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    className="NavBar__MenuItemText"
                    primary="Añádir anuncio"
                  />
                </MenuItem>
                <MenuItem
                  className="NavBar__MenuItem"
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  <ListItemIcon className="NavBar__MenuItemIcon">
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    className="NavBar__MenuItemText"
                    primary="Perfil"
                  />
                </MenuItem>
                <MenuItem
                  className="NavBar__MenuItem"
                  onClick={() => clearSession()}
                  to="/register"
                  component={Link}
                >
                  <ListItemIcon className="NavBar__MenuItemIcon">
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    className="NavBar__MenuItemText"
                    primary="Desconectar"
                  />
                </MenuItem>
              </Menu>
            </div>
          )}
          {!session && (
            <div>
              <IconButton color="inherit" className="NavBar__User">
                <AccountCircleIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withUserContext(NavBar);
