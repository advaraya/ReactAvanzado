/* NPM modules */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';
/* Material UI */
import Layout from '../Layout/Layout';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
/* Own modules */
import { withUserContext } from '../../context/UserContext';
import Session from '../../models/Session';
import { compose } from '../../utils/Compose';
/* Assets */
import imagePhoto from '../../assets/images/user.png';
/* CSS */
import './Profile.css';

/**
 * Main App
 */
class Profile extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    const { session } = props;
    this.state = {
      name: session.name,
      surname: session.surname,
      maxAdverts: session.maxAdverts,
    };
  }

  /**
   * Render
   */
  render() {
    const { name, surname, maxAdverts } = this.state;
    return (
      <Layout sectionTitle="Perfil de usuario">
        <form
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
          className="Profile__Form"
        >
          <div className="Profile_Picture">
            <img src={imagePhoto} alt="user_avatar" />
          </div>
          <FormControl fullWidth className="Profile__FormControl">
            <InputLabel shrink htmlFor="type">
              Nombre
            </InputLabel>
            <Input
              name="name"
              value={name}
              onChange={this.handleChange}
              type="text"
              required
            />
          </FormControl>
          <FormControl fullWidth className="Profile__FormControl">
            <InputLabel shrink htmlFor="type">
              Apellido
            </InputLabel>
            <Input
              name="surname"
              value={surname}
              onChange={this.handleChange}
              type="text"
              required
            />
          </FormControl>
          <FormControl fullWidth className="Profile__FormControl">
            <InputLabel htmlFor="maxAdverts">
              Anuncios por página (Home)
            </InputLabel>
            <Input
              name="maxAdverts"
              type="number"
              value={maxAdverts}
              onChange={this.handleChange}
              min={1}
              max={20}
            />
          </FormControl>
          <div className="Profile__Footer">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              className="ButtonWallakeep ButtonWallakeep__Green"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={this.handleReset}
              startIcon={<DeleteIcon />}
              to="/register"
              component={Link}
            >
              Borrar
            </Button>
          </div>
        </form>
      </Layout>
    );
  }

  /**
   * Cambio en un input
   */
  handleChange = ({ target }) => {
    const { name, type, checked, value } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  /**
   * Manejador del submit del formulario
   */
  handleSubmit = ev => {
    const { session, setSession, enqueueSnackbar, history } = this.props;
    const { name, surname, maxAdverts } = this.state;
    const parsedMaxAdverts = parseInt(maxAdverts);
    ev.preventDefault();

    if (
      !name ||
      !surname ||
      !Number.isInteger(parsedMaxAdverts) ||
      parsedMaxAdverts <= 0
    ) {
      enqueueSnackbar('Rellene todos los campos del formulario', {
        variant: 'error',
      });
      return;
    }

    // Genero sesión y la guardo en LS
    const newSession = new Session(
      name,
      surname,
      session.apiUrl,
      parsedMaxAdverts,
    );
    setSession(newSession, true, () => {
      history.push('/');
      enqueueSnackbar('Perfil de usuario actualizado correctamente.', {
        variant: 'success',
      });
    });
  };

  /**
   * Borra datos de sesión y desconecta
   */
  handleReset = () => {
    this.props.clearSession();
  };
}

export default compose(withUserContext, withSnackbar)(Profile);
