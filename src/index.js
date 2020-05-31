/* NPM modules */
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
/* Own modules */
import { Provider } from 'react-redux';
import App from './components/App/App';
/* Material UI */
/* Assets */
/* CSS */
import './index.css';

import { configureStore } from './store';

const store = configureStore();

console.log(store);

// Forzar el modo producción
const app = (
  <SnackbarProvider maxSnack={2}>
    <App />
  </SnackbarProvider>
);

ReactDOM.render(app, document.getElementById('root'));

/*ReactDOM.render(<Provider store={store}>
<App />
</Provider>,
, document.getElementById('root'));*/
