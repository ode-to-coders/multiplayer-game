export type FieldsValidateMap = {
    first_name: RegExp;
    second_name: RegExp;
    login: RegExp;
    email: RegExp;
    password: RegExp;
    phone: RegExp;
    message: RegExp;
}

export const FIELDS_VALIDATE_MAP: FieldsValidateMap = {
    first_name: /^[A-ZА-ЯЁ][-a-zа-яё]*$/,
    second_name: /^[A-ZА-ЯЁ][-a-zа-яё]*$/,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    email: /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/,
    phone: /^(\+?\d{10,15})$/,
    message: /\S+/
}

export const ERROR_MESSAGES: Record<string, string> = {
    first_name: 'Заглавная + прописные: а-я a-z -',
    second_name: 'Заглавная + прописные: а-я a-z -',
    login: '3-20 символов: A-Z 0-9',
    email: 'Не соответствует формату ***@***.***',
    password: '8-40 символов, хотя бы одна заглавная и цифра',
    password_repeat: 'пароли не совпадают',
    phone: '10-15 цифр, можно начать с "+"',
    message: 'Пустая строка'
}
