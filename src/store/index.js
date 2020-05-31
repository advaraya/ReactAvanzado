//Creamos el store, enlaza acciones con reducers, guarda el estado de la app
//Permite el acceso al estado con store.getState()
//Permite despachar acciones con store.dispatch(action)
//Registra y mantiene subscripciones con store.subscribe()

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { anuncios, usuario } from './reducers';

const reducer = combineReducers({
  anucios: anuncios,
  usuario: usuario,
});

export function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools());
  return store;
}
