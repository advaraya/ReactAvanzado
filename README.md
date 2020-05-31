# Practica del módulo de fundamentos react

Wallakeep - React Frontend for the Nodepop API (https://github.com/IsmaelB83/keepcoding-backend-node)

## Componente refactorizado para que use hooks --> NavBar

### Contents

- [Introducción](#INTRODUCCION)
- [Instalación y ejecución](#INSTALACIÓN-Y-EJECUCIÓN)
  - [Descarga](#Descarga)
  - [Instalación](#Inicialización-de-base-de-datos)
  - [Ejecución](#Ejecución)
  - [Configuración](#Configuración)
- [Guía de uso](#GUÍA-DE-USO)
  - [Registro](#Registro)
  - [Home](#Home)
  - [Create Advert](#Create-Advert)
  - [Edit Advert](#Edit-Advert)
  - [Perfil de Usuario](#Perfil-de-Usuario)

### INTRODUCCION

Este proyecto proporciona una SPA escrita en react para trabajar sobre la funcionalidad ofrecida por la API de Nodepop (https://github.com/IsmaelB83/keepcoding-backend-node). Se puede utilizar como
punto de partida (muy básico) de una tienda online de anuncios (tipo wallapop). Algunas funcionalidades pendientes de implementar serían por ejemplo: autenticación contra la API mediante JWT, redux,
creación de cuentas, reseteo de contraseñas, funcionalidades de red social, comentarios, likes sobre anuncios, votaciones, cesta de la compra, etc.

En este documento se detalla el modo de utilización del frontal en REACT. Para documentación detallada de la API puedes utilizar el repo siguiente https://github.com/IsmaelB83/keepcoding-backend-node

### INSTALACIÓN Y EJECUCIÓN

## Descarga

Para descargar este repositorio:

```
\downloads\git clone https://github.com/IsmaelB83/keepcoding-react-wallakeep   (o bien con ssh)
\downloads\git clone git@github.com:IsmaelB83/keepcoding-react-wallakeep.git
```

**NOTA IMPORTANTE**: Adicionalmente recuerda descargar el repo de la API, y arrancar la aplicación antes de intentar arrancar el frontal react. En caso contrario la aplicación REACT no podrá conectar a la API.

## Instalación de modulos

Utiliza npm install para instalar todas las dependencias de la aplicación

```
\downloads\keepcoding-react-wallakeep\npm install
```

## Ejecución

Para arrancar la aplicación react utilizaremos npm start (esta aplicación utiliza create-react-app):

```
\downloads\keepcoding-react-wallakeep\npm start
```

## Configuración

En el fichero ubicado en /src/config.js puedes configurar varios parámetros importantes para la aplicación, como son la **url de la API de Nodepop** a la que va a puntar el frontal (por defecto espera que esté a la escucha en el localhost puerto 3001), y el **número máximo de anuncios** que queremos ver en el grid de anuncios del home (por pagina).

```js
const config = {
  API_URL: 'http://localhost:3001/apiv1',
  MAX_ADVERTS_GRID: 20,
};
```

De todas formas esos dos parámetros hardcodeados en el fichero Config.js, son sólo importantes para la primera ejecución de un usuario. Una vez logueado en la aplicación, es posible modificar estos parámetros (así como el nombre, apellido y tag por defecto), en el perfil del usuario. [Perfil de Usuario](#Perfil-de-Usuario).

### GUÍA DE USO

## Registro

Al arrancar la aplicación lo primero que se observa es una pantalla de registro. En ella debemos ingresar nuestro nombre y apellidos, así como seleccionar una categoría de anuncios. Esta categoría será utilizará en el home para filtrado por defecto de los anuncios a visualizar (esto es modificable posteriormente en los filtros de búsqueda). Además mediante el checkbox de "remember me" conseguiremos que la información se almacene en la local storage. Así la próxima vez que accedamos, la app nos redirigirá directamente la home (posteriormente podemos borrar nuestra info de sesión)

Por último pulsamos en el botón de "LOGIN" para acceder a la APP.

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/register.jpg).

Si el componente detecta que no hay conectividad con la API nos mostrará un mensaje de error, y no será posible continuar. Se ha añadido un cuarto campo, para poder indicar antes del login, en que **URL se encuentra a la escucha la API de nodepop**. Esto no tendría mucho sentido en una aplicación productiva. Pero se ha habilitado en esta aplicación para poder probarla bien desde heroku.

En caso de querer conectar contra otra url API, una vez indicada la nueva URL hay que pulsar en el botón "TEST API" para reconectar, y así obtener el listado de tags para poder continuar con el registro.

## Home

La pantalla principal permite realizar diversos filtrados de búsqueda: nombre (anuncios que inician por el texto indicado), de un tipo concreto (venta/compra), con el tag indicado, y entre el rango de precio indicado (mayor que, menor que, o entre dos precios concretos). Adicionalmente este listado presenta funcionalidad de paginación. Mostrando unicamente los resultados indicados en el fichero Config.MAX_ADVERTS_GRID (Ver sección de configuración: [Configuración](#Configuración)).

La búsqueda se realiza en tiempo real, a medida que el usuario modifica los parámetros de busqueda (nombre, etc.). La única excepción a esto son los campos de precio. En ese caso, sólo cuando el usuario pulse en el botón de buscar (SEARCH) se ejeutará la búsqueda. O bien cuando el campo precio pase a tener un valor en blanco (en ese momento la búsqueda se dispara de forma automática para excluir el filtrado por precio).

**Nota sobre la paginación:** la app proporciona funcionalidad de paginación, pero realmente dado que la API no presenta paginación de forma nativa. En cada llamada a la API se están trayendo todos los anuncios. Lo cual no es eficiente.

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/home_1.jpg).

Además podemos acceder al detalle de cada uno de los anuncios concretos pulsando sobre el nombre del anuncio, sobre el icono del "ojo" o sobre el icono del "lapicero" (modo editar). De esta forma accederemos a las vistas encargadas de mostrarnos el detalle de un anuncio conreto:

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/home_2.jpg).

Las opciones adicionales a nivel de usuario como: añadir nuevo anuncio, desconectar o volver al perfil de usuario, se encuentran en el submenu de usuario en la barra de navegación. Esquina superior derecha:

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/usermenu.jpg).

## Create Advert

Para acceder a la opción de crear un nuevo anuncio, debemos buscar la opción dentro del submenu de usuario (esquina superior derecha de la barra de navegación). También está accesible esta sección desde el footer de la aplicación.

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/usermenu_2.jpg).

En la vista de reación podemos interactuar con la API para crear anuncios nuevos. En el formulario deberemos indicar los siguientes campos obligatorios: nombre, tipo (compra/venta), tags (uno o varios de los existentes), precio y descripción. Adicionalmente podremos asociar una imagen al anuncio:

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/home_3.jpg).

Para gestionar el campo **imagen**, lo que he hecho es crear un botón, en el que al pulsarlo aparacerá un modal donde podremos indicar la URL a la imagen que queremos asociar. El hecho de no poder cargar imagenes desde local es una limitación impuesta por la API, dado que actualmente no permite gestionar carga de imagenes en el PUT/POST. Por esta raźon lo que indicamos en este punto es una URL a una imagen ya accesible en internet. El botón previsualizará la imagen seleccionada una vez indiquemos la URL en el modal

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/home_4.jpg).

**Nota:** actualmente el formulario de creación/edición de anuncios tiene una limitación, y es que NO podemos asociar nuevos TAGS (no existentes ya en la BBDD) a los anuncios creados. Esto es una limitación a mejorar en nuevas versiones (la limitación esta derivada del componente Select que se ha utilizado de Material UI).

## Edit Advert

Para acceder a la opción de editar un nuevo anuncio, debemos pulsar en el botón del "lapicero" dentro de la card de un anuncio en el listado principal:

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/home_2.jpg).

La app nos llevará al componente de edición, que funciona de forma similar a lo vist en el punto anterior de creación

## Perfil de Usuario

Una vez logueado en la aplicación, es posible modificar la configuración de sesión: **nombre**, **apellido**, **tag** por defecto, así como la **URL de Nodepop (API)** y el número de **anuncios máximo** que queremos ver por página en el home. Para acceder al perfil del usuario hay que hacer click en la opcion del menú de usuario que indica "Perfil":

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/usermenu_3.jpg).

El formulario para modificar el perfil de usuario es el siguiente. Desde aquí también podemos hacer un reset completo de nuestra sesión tanto en el contexto, como en el local storage:

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-react-wallakeep/master/src/assets/images/readme/profile.jpg).
