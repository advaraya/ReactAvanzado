/* NPM modules */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
/* Material UI */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
/* Own modules */
import { withUserContext } from '../../context/UserContext';
import NodepopAPI from '../../services/NodepopAPI';
import Session from '../../models/Session';
import { compose } from '../../utils/Compose';
/* Assets */
import imageLogo from '../../assets/images/logo2.png';
/* CSS */
import './Register.css';

/**
 * Register Form
 */
class Register extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    const { session } = props;
    this.state = {
      error: false,
      name: session.name,
      surname: session.surname,
      isRemember: false,
    };
  }

  /**
   * Render
   */
  render() {
    const { name, surname, isRemember, error } = this.state;
    const { endAdornment } = this.props;
    return (
      <div className="Register">
        <div className="Register__Wrapper">
          <form className="Register__Form" onSubmit={this.handleSubmit}>
            <img
              src={imageLogo}
              className="Register__Logo"
              alt="nodepop-logo"
            />
            <FormControl>
              <Input
                name="name"
                value={name || ''}
                onChange={this.handleChange}
                type="text"
                placeholder="type your name"
                autoComplete="username"
                startAdornment={
                  <InputAdornment position="start" className="InputIcon__Icon">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
                endAdornment={endAdornment}
                required
              />
            </FormControl>
            <FormControl>
              <Input
                name="surname"
                value={surname || ''}
                onChange={this.handleChange}
                type="text"
                placeholder="type your surname"
                startAdornment={
                  <InputAdornment position="start" className="InputIcon__Icon">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
                endAdornment={endAdornment}
                required
              />
            </FormControl>
            <FormControlLabel
              name="isRemember"
              label="remember me"
              control={
                <Checkbox
                  color="primary"
                  checked={isRemember}
                  onChange={this.handleChange}
                />
              }
            />
            <Button
              className="button"
              type="submit"
              variant="contained"
              color="primary"
              disabled={!!error}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  /**
   * Did mount
   */
  componentDidMount() {
    this.checkApiConnection();
  }

  /**
   * Handle onSubmit event
   */
  handleSubmit = async event => {
    const { session, setSession, enqueueSnackbar, history } = this.props;
    const { name, surname, isRemember } = this.state;
    event.preventDefault();

    // Validación básica del formulario
    if (!name || !surname) {
      enqueueSnackbar('Rellene todos los campos del formulario', {
        variant: 'error',
      });
      return;
    }
    // Genero sesión y la guardo en LS si ha seleccionado "remember"
    const newSession = new Session(
      name,
      surname,
      session.apiUrl,
      session.maxAdverts,
    );
    setSession(newSession, isRemember, () => history.push('/'));
  };

  /**
   * Cambio en un input
   */
  handleChange = ({ target }) => {
    const { name, type, checked, value } = target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  checkApiConnection = () => {
    const { session, enqueueSnackbar } = this.props;
    // Recuperar tags de la API para probar la conexion
    const { getTags } = NodepopAPI(session.apiUrl);
    getTags()
      .then(() => {
        // Conectado OK a la API
        this.setState(
          {
            error: false,
          },
          () =>
            enqueueSnackbar('Conectado con éxito a la API', {
              variant: 'success',
            }),
        );
      })
      .catch(() => {
        this.setState(
          {
            error: true,
          },
          () =>
            enqueueSnackbar('Error conectando con la API. Revise la URL.', {
              variant: 'error',
            }),
        );
      });
  };
}

export default compose(withUserContext, withSnackbar)(Register);
