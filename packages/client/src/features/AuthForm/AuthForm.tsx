import React, { useState } from "react";

import { FormButton } from "../../shared/ui/FormButton";
import { FormInput } from "../../shared/ui/FormInput";

import { randomID } from "../../shared/lib/utils/randomID";
import { FieldsValidateMap, validateElem } from "../../shared/lib/utils/validate";

import { IInputData } from "../../shared/types/d";

import c from "./AuthForm.module.scss";

export const AuthForm = () => {

    const arrInputsData: IInputData[] = [
        {type: "text", placeholder: "Логин", label: "Логин", name: "login"},
        {type: "password", placeholder: "Пароль", label: "Пароль", name: "password"}
    ]

    // логика валидации, хотя зачем валидация для страницы входа?
    const [messageLogin, setMessageLogin] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handlerSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const login = formData.get("login") as string
        const password = formData.get("password") as string
        if (login !== null && password !== null) {
            const loginValidate = validateElem({key: 'login', val: login})
            const passwordValidate = validateElem({key: 'password', val: password})
            if (!loginValidate[0]) setMessageLogin(loginValidate[1])
            if (!passwordValidate[0]) setMessagePassword(passwordValidate[1])

            if (loginValidate[0] && passwordValidate[0]) console.log('Запрос на авторизацию отправлен...')
                else console.log('валидация не пройдена')
        }
    }
    
    function handlerBlur(e: React.FocusEvent<HTMLInputElement>, key: keyof FieldsValidateMap): void {
        const resValidate = validateElem({
            key, 
            val: e.target.value, 
            eventName: 'blur'
        });
        console.log(resValidate);
        if (!resValidate[0]) key === "login" ? setMessageLogin(resValidate[1]) : setMessagePassword(resValidate[1])
            else key === "login" ? setMessageLogin('') : setMessagePassword('')
    }
    
    return (
        <form onSubmit={handlerSubmit} className={c.myForm}>
            <h2>Вход</h2>
            {arrInputsData.map(input =>
                <div key={randomID(6)}>
                    <FormInput 
                        key={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        onBlur={e => {
                            handlerBlur(e, input.name as keyof FieldsValidateMap);
                            input.name === 'login' ? setLogin(e.currentTarget.value) : setPassword(e.currentTarget.value)
                        }}
                        defaultValue={input.name === "login" ? login : password}
                    />
                    <div key={randomID(6)} className={c.msg}>
                        {input.name === "login" ? messageLogin : messagePassword}
                    </div>
                </div>
            )}
            <FormButton type="submit" style={{marginTop: 'auto'}}>Авторизоваться</FormButton>
            <a href="/" style={{marginTop: 10}}>Нет аккаунта?</a>            
        </form>
    )
}
