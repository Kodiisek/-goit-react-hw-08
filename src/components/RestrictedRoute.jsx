import PropTypes from 'prop-types'; // Dodaj import PropTypes
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

/**
 * - If the route is restricted and the user is logged in,
 *  render a <Navigate> to redirectTo
 * - Otherwise render the component
 */
export const RestrictedRoute = ({ element, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};

RestrictedRoute.propTypes = {
  element: PropTypes.element.isRequired,  // Zmieniono 'component' na 'element'
  redirectTo: PropTypes.string, 
};
