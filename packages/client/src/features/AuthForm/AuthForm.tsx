import React from "react";

import { MyButton } from "../../shared/ui/button";
import { MyInput } from "../../shared/ui/input";

import { randomID } from "../../shared/lib/utils/randomID";

import { IInputData } from "../../shared/types/d";

import c from "./AuthForm.module.scss";

export const AuthForm = () => {
    function handlerSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(
            'логин ', formData.get("login"),
            '\nпароль ', formData.get("password")
        )
    }

    const arrInputsData: IInputData[] = [
        {type: "text", placeholder: "Логин", label: "Логин", name: "login"},
        {type: "password", placeholder: "Пароль", label: "Пароль", name: "password"}
    ]
    
    return (
        <form onSubmit={handlerSubmit} className={c.myForm}>
            <h2>Вход</h2>
            {arrInputsData.map(input =>
                <MyInput 
                    key={randomID(6)}
                    type={input.type}
                    placeholder={input.placeholder}
                    label={input.label}
                    name={input.name}
                />
            )}
            <MyButton type="submit" style={{marginTop: 'auto'}}>Авторизоваться</MyButton>
            <a href="/" style={{marginTop: 10}}>Нет аккаунта?</a>            
        </form>
    )
}
