/* NPM modules */
import React from 'react';
/* Material UI */
import Container from '@material-ui/core/Container';
/* Own modules */
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
/* Assets */
/* CSS */

export default function Layout({ containerClassName, children, sectionTitle }) {
  return (
    <React.Fragment>
      <header>
        <NavBar />
      </header>
      <Container className={containerClassName}>
        <main className="Main__Section">
          {sectionTitle && (
            <div className="Section__Title">
              <h2>{sectionTitle}</h2>
            </div>
          )}
          {children}
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
