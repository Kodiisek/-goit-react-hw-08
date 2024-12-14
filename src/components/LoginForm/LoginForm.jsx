import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
    dispatch(logIn(values))
      .unwrap()
      .then((data) => {
        console.log('Login successful');
        localStorage.setItem('token', data.token);
        resetForm();
      })
      .catch((error) => {
        setStatus({ error: error.message || 'Login failed' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className={css.form} autoComplete="off">
          {status?.error && <div className={css.error}>{status.error}</div>}

          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>

          <button type="submit" className={css.button} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
