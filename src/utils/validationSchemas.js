import * as Yup from 'yup';

const validationLogin = () => Yup.object({
  email: Yup.string()
    .email('Введите корректный Email')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(12, 'Максимум 12 символов')
    .required('Обязательное поле'),
});

const validationRegister = () => Yup.object({
  name: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(30, 'Максимум 30 символов')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Введите корректный Email')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .max(12, 'Максимум 12 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Должно совпадать с паролем')
    .required('Обязательное поле'),
});

export { validationLogin, validationRegister };
