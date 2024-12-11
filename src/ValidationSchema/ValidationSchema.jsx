import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Imię jest wymagane')
    .min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: Yup.string()
    .email('Niepoprawny format email')
    .required('Email jest wymagany'),
  password: Yup.string()
    .min(6, 'Hasło musi mieć co najmniej 6 znaków')
    .required('Hasło jest wymagane'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same')
    .required('Potwierdzenie hasła jest wymagane'),
});

export default validationSchema;
