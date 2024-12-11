import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types'; 

export default function DocumentTitle({ children }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}

DocumentTitle.propTypes = {
  children: PropTypes.node.isRequired,  
};
