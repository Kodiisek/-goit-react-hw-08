import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>
        Welcome, {user?.name || 'Guest'}
      </p>
      <button type="button" className={css.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
