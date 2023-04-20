import * as yup from 'yup';

export const yupSchemaRegForm = yup.object().shape({
  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .matches(
      /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      'Не соответствует формату email ***@***.***'
    ),
  login: yup
    .string()
    .required('Логин обязателен для заполнения')
    .min(3, 'Не менее 3 символов')
    .matches(/^[a-zA-Z].*$/, 'Должен начинаться с латинской буквы')
    .matches(/^[a-zA-Z0-9]+$/, 'Содержит только латинские буквы и цифры')
    .max(20, 'Максимально количество 20 символов'),
  first_name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .matches(/^[A-ZА-ЯЁ][-a-zа-яё]*$/, 'Заглавная + прописные: а-я a-z -'),
  second_name: yup
    .string()
    .matches(/^([A-ZА-ЯЁ][-a-zа-яё]*)?$/, 'Заглавная + прописные: а-я a-z -'),
  phone: yup
    .string()
    .matches(/^(\+?\d{10,15})?$/, '10-15 цифр, можно начать с "+"'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/(?=.*[A-ZА-Я])/, 'Должна быть хотя бы одна заглавная буква')
    .matches(/(?=.*\d)/, 'Должна быть хотя бы одна цифра')
    .max(50, 'Пароль должен содержать не больше 50 символов'),
  password_repeat: yup
    .string()
    .required(' ')
    .oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
});

export const yupSchemaSigninForm = yup.object().shape({
  login: yup
    .string()
    .required('Введите логин')
    .min(3, 'Логин меньше 3 символов невозможен')
    .matches(/^[a-zA-Z][a-zA-Z0-9]+$/, 'Некорректный логин')
    .max(20, 'Логин больше 20 символов невозможен'),
  password: yup.string().required('Введите пароль'),
});

export const yupSchemaRoomForm = yup.object().shape({
  name: yup
    .string()
    .required('Введите название комнаты')
    .min(3, 'Название меньше 3 символов невозможно')
    .matches(/^[A-ZА-ЯЁa-zа-яё0-9]*$/, 'Некорректное название')
    .max(20, 'Название больше 20 символов невозможно'),
  count: yup
    .string()
    .required('Введите количество игроков')
    .matches(/^[2-6]+$/, 'Количество игроков от 2 до 6'),
  password: yup.string().required('Введите пароль'),
});

export const yupSchemaProfileEditForm = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^([\w-]+@[a-zA-Z]+\.[a-zA-Z]+)?$/,
      'Не соответствует формату email ***@***.***'
    ),
  login: yup
    .string()
    .matches(/^([a-zA-Z].*)?$/, 'Должен начинаться с латинской буквы')
    .matches(/^([a-zA-Z0-9]+)?$/, 'Содержит только латинские буквы и цифры')
    .max(20, 'Максимально количество 20 символов'),
  first_name: yup
    .string()
    .optional()
    .matches(/^([A-ZА-ЯЁ][-a-zа-яё]*)?$/, 'Заглавная + прописные: а-я a-z -'),
  second_name: yup
    .string()
    .matches(/^([A-ZА-ЯЁ][-a-zа-яё]*)?$/, 'Заглавная + прописные: а-я a-z -'),
  display_name: yup.string().max(30, 'Не больше 30'),
  phone: yup
    .string()
    .matches(/^(\+?\d{10,15})?$/, '10-15 цифр, можно начать с "+"'),
});

export const yupSchemaProfileEditPasswordForm = yup.object().shape({
  oldpassword: yup
    .string()
    .required('Введите старый пароль'),
  password: yup
    .string()
    .required('Введите новый пароль')
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/(?=.*[A-ZА-Я])/, 'Должна быть хотя бы одна заглавная буква')
    .matches(/(?=.*\d)/, 'Должна быть хотя бы одна цифра')
    .max(50, 'Пароль должен содержать не больше 50 символов'),
  password_repeat: yup
    .string()
    .required('Повторно введите новый пароль')
    .oneOf([yup.ref('password'), ''], 'Пароли не совпадают'),
});
