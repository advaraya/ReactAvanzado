/* NPM modules */
/* Material UI */
/* Own modules */
/* Assets */
/* CSS */

/**
 * Objeto para trabajar con local storage
 */
const LocalStorage = {
  /**
   * Salvar sesión en local storage
   */
  saveLocalStorage: session => {
    localStorage.setItem('Wallakeep_IBA', JSON.stringify(session));
  },
  /**
   * Recuperar sesión del local storage
   */
  readLocalStorage: () => {
    const session = localStorage.getItem('Wallakeep_IBA');
    return JSON.parse(session);
  },
  /**
   * Clear local storage
   */
  clearLocalStorage: () => {
    localStorage.clear();
  },
};

/**
 * Retorno el objeto
 */
export default LocalStorage;
