const RegExp: Record<string, RegExp | string> = {
    first_name: /^[A-ZА-ЯЁ][-a-zа-яё]*$/,
    second_name: /^[A-ZА-ЯЁ][-a-zа-яё]*$/,
    login: /^(?=.*[a-zA-Z])[\w-]{3,20}$/,
    email: /^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/,
    phone: /^(\+?\d{10,15})$/,
    message: /\S+/
}
const MessageIfFalse: Record<string, string> = {
    first_name: 'Заглавная + прописные: а-я a-z -',
    second_name: 'Заглавная + прописные: а-я a-z -',
    login: '3-20 символов: A-Z 0-9',
    email: 'Не соответствует формату ***@***.***',
    password: '8-40 символов, хотя бы одна заглавная и цифра',
    password_repeat: 'пароли не совпадают',
    phone: '10-15 цифр, можно начать с "+"',
    message: 'Пустая строка'
}

export function validateElem (key: string, val: string, eventName = '', passwordCheck: string[] = ['','']): [boolean, string] {
    // если событие blur, то разрешить пока не вводить ничего (пока пользователь думает и заполняет другие поля)
        
    if (eventName === 'blur' && val === '') return [true, 'с поля ввода ушел фокус'];
    
    if (passwordCheck[0] !== passwordCheck[1] && 
    (passwordCheck[0] !== '' && passwordCheck[1] !== '')
    ) return [false, MessageIfFalse.password_repeat];
    
    const res = val.match(RegExp[key]);
    
    if (res !== null) return [true, 'валидация поля пройдена успешно']
    else return [false, MessageIfFalse[key]];
}
