import React from "react";

import { MyButton } from "../../shared/ui/button";
import { MyInput } from "../../shared/ui/input";

import { randomID } from "../../shared/lib/utils/randomID";

import { IInputData } from "../../shared/types/d";

import c from "./RegForm.module.scss";

export const RegForm = () => {
    function handlerSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(
            "email ", formData.get("email"), 
            "\nlogin ", formData.get("login"),
            "\nfirst_name ", formData.get("first_name"),
            "\nsecond_name ", formData.get("second_name"),
            "\nphone ", formData.get("phone"),
            "\npassword ", formData.get("password"),
            "\npassword_repeat ", formData.get("password_repeat"),
        )
    }

    const arrInputsData: IInputData[] = [
        {type: "email", placeholder: "Почта", label: "Почта", name: "email"},
        {type: "text", placeholder: "Логин", label: "Логин", name: "login"},
        {type: "text", placeholder: "Имя", label: "Имя", name: "first_name"},
        {type: "text", placeholder: "Фамилия", label: "Фамилия", name: "second_name"},
        {type: "phone", placeholder: "Телефон", label: "Телефон", name: "phone"},
        {type: "password", placeholder: "Пароль", label: "Пароль", name: "password"},
        {type: "password", placeholder: "Пароль (ещё раз)", label: "Пароль (ещё раз)", name: "password_repeat"},
    ]
    
    return (
        <form onSubmit={handlerSubmit} className={c.myForm}>
            <h2>Регистрация</h2>
            {arrInputsData.map(input =>
                <MyInput 
                    key={randomID(6)}
                    type={input.type}
                    placeholder={input.placeholder}
                    label={input.label}
                    name={input.name}
                />
            )}
            <MyButton type="submit" style={{marginTop: 'auto'}}>Зарегистрироваться</MyButton>
            <a href="/" style={{marginTop: 10}}>Войти</a>
            
        </form>
    )
}
