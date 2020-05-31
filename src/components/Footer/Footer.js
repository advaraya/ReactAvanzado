/* NPM modules */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* Material UI */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
/* Own modules */
/* Assets */
/* CSS */
import './Footer.css';

/**
 * Component para el footer
 */
export default class Footer extends Component {
  /**
   * Render
   */
  render() {
    return (
      <footer className="Footer">
        <Container>
          <Grid container spacing={3} className="Footer__row">
            <Grid
              item
              xs={12}
              sm={12}
              className="Footer-item links mt-3 mt-lg-0"
            >
              <FooterLinks />
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
}

/**
 * Sección de links del footer
 */
function FooterLinks() {
  return (
    <div className="Footer__section">
      <h2 className="Footer__title">Links</h2>
      <div className="Footer__content Footer__content--center">
        <Link className="Footer__link" to="/register">
          Register
        </Link>
        <Link className="Footer__link" to="/">
          Home
        </Link>
        <Link className="Footer__link" to="/advert/create">
          Crear anuncio
        </Link>
        <a
          className="Footer__link"
          href="https://keepcoding.io/es/nuestros-bootcamps/full-stack-web-bootcamp/"
        >
          Keepcoding Fullstack Bootcamp
        </a>
      </div>
    </div>
  );
}
