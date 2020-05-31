// Los reducers nos dicen como cambia el estado en respuesta a las acciones enviadas al store
import * as TYPES from './types';
import * as ACTIONS from './actions';

const initialAnuncios = {
  listaAnuncios: [],
  filtros: {
    /*
    name: 'Pepe',
    price: '0-10',
    type:'venta/compra',
    tags:['tag1', 'tag2'...]
    */
  },
};

const initialUsuario = {
  datos: {
    username: '',
    token: '',
    active: false,
  },
};

export function anuncios(state = initialAnuncios, action) {
  switch (action.type) {
    case TYPES.SET_ADS:
      return {
        ...state,
        listaAnuncios: [...action.listOfAds],
      };
    case TYPES.CREATE_AD:
      return {
        ...state,
        listaAnuncios: [...state.listaAnuncios, action.newAd],
      };
    case TYPES.EDIT_AD:
      return {
        ...state,
        listaAnuncios: state.listaAnuncios.map((esteAnuncio) => {
          if (esteAnuncio.id === action.adChanged.id) {
            return action.adChanged;
          }
        }),
      };

    case TYPES.SET_FILTER:
      return {
        ...state,
        filtros: action.filter,
      };

    default:
      return state;
  }
}

export function usuario(state = initialUsuario, action) {
  switch (action.type) {
    case TYPES.USER_LOGIN:
      return {
        ...state,
        datos: {
          username: action.username,
          token: action.tokenSession,
          active: true,
        },
      };
    case TYPES.REGISTERED_USER:
      var nuevoDatos = { ...state.datos };
      if (nuevoDatos.token === action.tokenSession) {
        nuevoDatos.active = true;
      } else {
        nuevoDatos.active = false;
      }
      return {
        ...state,
        datos: nuevoDatos,
      };
    case TYPES.USER_LOGOUT:
      return {
        ...state,
        datos: initialUsuario,
      };

    default:
      return state;
  }
}
