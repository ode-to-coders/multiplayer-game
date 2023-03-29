import { Link } from "react-router-dom";
import { FormButton } from "shared/ui/FormButton";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { PAGES } from "app/lib/routes.types";
import { FieldsValidateMap, FIELDS_VALIDATE_MAP, ERROR_MESSAGES } from "shared/const/validate";

import s from "./index.module.scss";

interface IValues {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
    password_repeat: string;
}

export const RegForm = () => {    
    
    const [isFocused, setIsFocused] = useState([false, '']);
    const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});
    
    const arrInputsData = [
        {type: "email", placeholder: "Почта*", label: "Почта*", name: "email", required: true},
        {type: "text", placeholder: "Логин*", label: "Логин*", name: "login", required: true},
        {type: "text", placeholder: "Имя*", label: "Имя*", name: "first_name", required: true},
        {type: "text", placeholder: "Фамилия", label: "Фамилия", name: "second_name", required: false},
        {type: "phone", placeholder: "Телефон", label: "Телефон", name: "phone", required: false},
        {type: "password", placeholder: "Пароль*", label: "Пароль*", name: "password", required: true},
        {type: "password", placeholder: "Пароль (ещё раз)", label: "Пароль* (ещё раз)", name: "password_repeat", required: true},
    ]
        
    const navigate = useNavigate();
    
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm({
        mode: 'onChange'
    });

    const password = watch("password");
    const passwordRepeat = watch("password_repeat");

    const onSubmit = (data: Record<string, string>) => {        
        if (password !== passwordRepeat) {
            setError(
                "password_repeat",
                { type: "notMatch", message: "Пароли не совпадают" }
            );
        } else if (Object.keys(errors).length === 0) {
            console.log(data);
            // ЗДЕСЬ БУДЕТ ЗАПРОС НА РЕГИСТРАЦИЮ
            const resReg = true;
            if (resReg) {                
                setTimeout(() => {
                    console.log(`Добро пожаловать onboard, ${data.first_name}`);

                    navigate('/game')

                }, 1000)
            } else {
                alert('что-то пошло не так, попробуйте еще раз')
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={s.myForm}>
            <h2>Регистрация</h2>
            {arrInputsData.map(input =>
                <div key={input.name}>
                    <div className={s.myInputWrap}>    
                        <label 
                            htmlFor={input.name} 
                            className={s.myInputLabel}
                            style={{
                                opacity: (
                                    (isFocused[0] && isFocused[1] === input.name) ||
                                    (input.name in isEmpty && !isEmpty[input.name])) 
                                    ? 1 : 0,
                                transition: 'all .3s ease-in-out'
                            }}
                        >
                            {input.label}
                        </label>
                        <input
                            id={input.name}
                            className={s.myInput}
                            type={input.type}
                            placeholder={(isFocused[0] && isFocused[1] === input.name) ? '' : input.placeholder}
                            {...register(input.name, {
                                pattern: FIELDS_VALIDATE_MAP[input.name as keyof FieldsValidateMap],
                                required: input.required
                            })}
                            onFocus={() => {
                                setIsFocused([true, input.name])
                            }}
                            onBlur={(e) => {
                                setIsFocused([false, input.name]);
                                e.target.value 
                                    ? setIsEmpty({...isEmpty, [input.name]: false })
                                    : setIsEmpty({...isEmpty, [input.name]: true })
                            }}
                        />
                    </div>
                    <div className={s.msg}>
                        {input.name !== 'password_repeat' && errors[input.name] && ERROR_MESSAGES[input.name as keyof IValues]}
                        {input.name === 'password_repeat' && errors[input.name] && ERROR_MESSAGES.password_repeat}
                    </div>
                </div>
            )}
            <FormButton type="submit" style={{marginTop: 'auto'}}>Зарегистрироваться</FormButton>
            <Link to={PAGES.signin} style={{marginTop: 5}}>Войти</Link>
        </form>
    )
}
