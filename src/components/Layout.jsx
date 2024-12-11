import { Suspense } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { AppBar } from './AppBar/AppBar';

export const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
      {/* Pasek nawigacyjny */}
      <AppBar />
      {/* Asynchroniczne ładowanie dzieci */}
      <main style={{ marginTop: '16px' }}>
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      </main>
    </div>
  );
};

// Dodanie PropTypes
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
