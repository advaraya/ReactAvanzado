/* NPM modules */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withSnackbar } from 'notistack';
/* Material UI */
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
/* Own modules */
import Layout from '../Layout/Layout';
import NodepopAPI from '../../services/NodepopAPI';
import { withUserContext } from '../../context/UserContext';
import { compose } from '../../utils/Compose';
/* Assets */
import imagePhoto from '../../assets/images/photo.png';
/* CSS */
import './AdvertEdit.css';
import Advert from '../../models/Advert';

const defaultAdvert = {
  name: '',
  type: '',
  tags: [],
  price: 0,
  description: '',
  photo: '',
};

/**
 * Main App
 */
class AdvertEdit extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      photoTemp: '',
      openModal: false,
      tags: [],
      advert: defaultAdvert,
      loading: false,
      error: false,
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // Chequeo sesion del contexto, si no existe redirijo a register
    // Obtengo los tags y luego el anuncio si estoy en edicion
    this.getTags().then(() => {
      if (this.isEditMode()) {
        this.getAdvert();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.isEditMode(prevProps) && !this.isEditMode()) {
      this.setState({
        photoTemp: '',
        openModal: false,
        advert: defaultAdvert,
      });
    }
    if (!this.isEditMode(prevProps) && this.isEditMode()) {
      this.getAdvert();
    }
  }

  /**
   * Render
   */
  render() {
    const {
      match: { params },
    } = this.props;
    const { advert, tags, openModal, photoTemp, error } = this.state;
    const editMode = this.isEditMode();
    if (error) return <Redirect to="/notfound" />;
    return (
      <Layout
        sectionTitle={editMode ? 'Editar anuncio' : 'Crear nuevo anuncio'}
      >
        <form
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
          className="AdvertEdit__Form"
        >
          <button
            type="button"
            className="AdvertEdit_Picture"
            onClick={this.handleSwitchOpen}
          >
            <img src={advert.photo || imagePhoto} alt="dummy_photo" />
          </button>
          <FormControl fullWidth className="AdvertEdit__FormControl">
            <InputLabel shrink htmlFor="type">
              Nombre
            </InputLabel>
            <Input
              name="name"
              value={advert.name}
              onChange={this.handleChange}
              type="text"
              required
            />
          </FormControl>
          <FormControl fullWidth className="AdvertEdit__FormControl">
            <InputLabel shrink htmlFor="type">
              Tipo
            </InputLabel>
            <Select
              name="type"
              onChange={this.handleChange}
              className="SearchPanel__Type"
              value={advert.type}
              displayEmpty
            >
              <MenuItem key="buy" value="buy">
                <Chip
                  size="small"
                  label="buy"
                  className="Ad__Tag Ad__Tag--small Ad__Tag--buy"
                />
              </MenuItem>
              <MenuItem key="sell" value="sell">
                <Chip
                  size="small"
                  label="sell"
                  className="Ad__Tag Ad__Tag--small Ad__Tag--sell"
                />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="AdvertEdit__FormControl">
            <InputLabel shrink htmlFor="tags">
              Tags
            </InputLabel>
            <Select
              multiple
              name="tags"
              value={advert.tags || ''}
              onChange={this.handleChangeMultiple}
              renderValue={() => (
                <div>
                  {advert.tags.map(value => (
                    <Chip
                      key={value}
                      size="small"
                      label={value}
                      className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                    />
                  ))}
                </div>
              )}
            >
              {tags &&
                tags.map((value, key) => {
                  return (
                    <MenuItem key={key} value={value}>
                      <Chip
                        key={key}
                        size="small"
                        label={value}
                        className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                      />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl fullWidth className="AdvertEdit__FormControl">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              name="price"
              type="number"
              value={advert.price}
              onChange={this.handleChangeNumber}
              endAdornment={<InputAdornment position="start">€</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth className="AdvertEdit__FormControl">
            <TextField
              name="description"
              label="Descripción"
              value={advert.description}
              onChange={this.handleChange}
              multiline
              rows={2}
              helperText="Introduce una descripción para el anuncio"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <div className="AdvertEdit__Footer">
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              className="ButtonWallakeep ButtonWallakeep__Green"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              startIcon={<CancelIcon />}
              component={Link}
              to={params && params.id ? `/advert/${params.id}` : '/'}
            >
              Cancel
            </Button>
          </div>
        </form>
        <Dialog open={openModal} className="AdvertEdit__Modal">
          <DialogTitle className="Modal_Title">URL de la imagen</DialogTitle>
          <DialogContent className="Modal__Content">
            <DialogContentText>
              La API de nodepop no admite carga de imagenes locales por el
              momento. Por favor, indique la URL a la imagen que desea añadir al
              anuncio
            </DialogContentText>
            <TextField
              autoFocus
              name="photoTemp"
              value={photoTemp}
              onChange={ev => {
                this.setState({ photoTemp: ev.target.value });
              }}
              margin="dense"
              label="URL Imagen"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions className="Modal__Actions">
            <Button
              onClick={this.handleChangePhoto}
              variant="contained"
              startIcon={<CheckIcon />}
              className="ButtonWallakeep ButtonWallakeep__Green"
            >
              Aceptar
            </Button>
            <Button
              onClick={this.handleSwitchOpen}
              variant="contained"
              startIcon={<CancelIcon />}
              color="secondary"
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    );
  }

  isEditMode = props => {
    const {
      match: { params },
    } = props || this.props;
    return !!params.id;
  };

  getTags = async () => {
    const { session } = this.props;
    const { getTags } = NodepopAPI(session.apiUrl);
    const tags = await getTags();
    this.setState({ tags });
  };

  getAdvert = () => {
    const {
      session,
      match: { params },
    } = this.props;

    const { getAdvert } = NodepopAPI(session.apiUrl);
    this.setState({ loading: true }, () => {
      getAdvert(params.id)
        .then(res => {
          this.setState({
            loading: false,
            advert: res,
          });
        })
        .catch(() =>
          this.setState({
            loading: false,
            error: true,
          }),
        );
    });
  };

  /**
   * Cambio en un input tipo texto
   */
  handleChange = ({ target }) => {
    const { advert } = this.state;
    advert[target.name] = target.value;
    this.setState({
      advert,
    });
  };

  /**
   * Cambio en un input tipo number
   */
  handleChangeNumber = ({ target }) => {
    const { advert } = this.state;
    advert[target.name] = parseFloat(target.value);
    if (advert[target.name]) {
      this.setState({
        advert,
      });
    }
  };

  /**
   * Selectores de tipo multiple choice
   */
  handleChangeMultiple = ({ target }) => {
    // Obtengo el estado, actualizo los tags seleccionados
    const { advert } = this.state;
    advert.tags = target.value;
    // Actualizo el estado
    this.setState({ advert });
  };

  /**
   * Manejador del submit del formulario
   */
  handleSubmit = ev => {
    const { session, enqueueSnackbar, history } = this.props;
    ev.preventDefault();
    const { postAdvert, editAdvert } = NodepopAPI(session.apiUrl);
    // Creo un anuncio con los datos del estado si es válido
    const advert = new Advert(this.state.advert);
    if (advert.isValid()) {
      if (this.isEditMode()) {
        // PUT
        editAdvert(advert)
          .then(res => {
            enqueueSnackbar('OK. Anuncio editado con exito.', {
              variant: 'success',
            });
            history.push(`/advert/${res._id}`);
          })
          .catch(error =>
            enqueueSnackbar('Error editando anuncio.', {
              variant: 'error',
            }),
          );
      } else {
        // POST
        postAdvert(advert)
          .then(res => {
            enqueueSnackbar('OK. Anuncio creado con exito.', {
              variant: 'success',
            });
            history.push(`/advert/${res._id}`);
          })
          .catch(error => {
            enqueueSnackbar('Error creando anuncio.', {
              variant: 'error',
            });
          });
      }
    } else {
      // El anuncio no es completo. Error
      enqueueSnackbar('Los datos del anuncio no están completos', {
        variant: 'error',
      });
    }
  };

  /**
   * Handle open modal
   */
  handleSwitchOpen = () => {
    this.setState(({ advert, openModal }) => ({
      photoTemp: advert.photo,
      openModal: !openModal,
    }));
  };

  /**
   * Hanle close modal
   */
  handleChangePhoto = () => {
    // Actualizo la imagen y cierro el modal
    if (this.state.photoTemp) {
      this.setState(state => {
        const { advert, photoTemp } = state;
        advert.photo = photoTemp;
        return {
          advert,
          openModal: false,
        };
      });
    } else {
      this.props.enqueueSnackbar('Debe indicar una URL a una imagen primero', {
        variant: 'error',
      });
    }
  };

  renderValue = () => {
    const { advert } = this.state;
    if (advert.tags) {
      return (
        <div>
          {advert.tags.map(value => (
            <Chip
              key={value}
              size="small"
              label={value}
              className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
            />
          ))}
        </div>
      );
    }
    return <div />;
  };
}

export default compose(withUserContext, withSnackbar)(AdvertEdit);
