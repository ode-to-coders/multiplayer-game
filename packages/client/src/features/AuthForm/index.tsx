import { Link } from "react-router-dom";
import { FormButton } from "shared/ui/FormButton";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { PAGES } from "app/lib/routes.types";
import { ERROR_MESSAGES, FIELDS_VALIDATE_MAP, FieldsValidateMap } from "shared/const/validate";

import s from "./index.module.scss";

interface IValues {
    login: string;
    password: string;
}

export const AuthForm = () => {

    const [isFocused, setIsFocused] = useState([false, '']);
    const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});

    const arrInputsData = [
        {type: "text", placeholder: "Логин", label: "Логин", name: "login", required: true},
        {type: "password", placeholder: "Пароль", label: "Пароль", name: "password", required: true}
    ]

    const navigate = useNavigate();

    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm({
        mode: 'onSubmit'
    })

    const onSubmit = (data: Record<string, string>) => {
        if (Object.keys(errors).length === 0) {
            console.log(data);
            // ЗДЕСЬ БУДЕТ ЗАПРОС НА АВТОРИЗАЦИЮ
            const resAuth = true;
            if (resAuth) {
                setTimeout(() => {
                    console.log(`привет, Username!`);

                    navigate('/game')

                }, 1000);
            } else {
                alert('что-то пошло не так, попробуйте еще раз')
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={s.myForm}>
            <h2>Вход</h2>
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
                            onFocus={() => setIsFocused([true, input.name])}
                            onBlur={(e) => {
                                setIsFocused([false, input.name]);
                                e.target.value 
                                    ? setIsEmpty({...isEmpty, [input.name]: false })
                                    : setIsEmpty({...isEmpty, [input.name]: true })
                            }}
                        />
                    </div>
                    <div className={s.msg}>
                        {errors[input.name] && ERROR_MESSAGES[input.name as keyof IValues]}
                    </div>
                </div>
            )}
            <FormButton type="submit" style={{marginTop: 'auto'}}>Авторизоваться</FormButton>
            <Link to={PAGES.registration} style={{marginTop: 5}}>Нет аккаунта?</Link>
        </form>
    )
}
