import React from "react";

import { TextField, Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
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

    const arrInputsData = [
        {type: "email", label: "Почта", name: "email"},
        {type: "text", label: "Логин", name: "login"},
        {type: "text", label: "Имя", name: "first_name"},
        {type: "text", label: "Фамилия", name: "second_name"},
        {type: "phone", label: "Телефон", name: "phone"},
        {type: "password", label: "Пароль", name: "password"},
        {type: "password", label: "Пароль (ещё раз)", name: "password_repeat"},
    ]
    
    return (
        <form autoComplete="off" onSubmit={handlerSubmit} className={c.myForm}>
            <h2>Регистрация</h2>
            {arrInputsData.map(input =>
                <TextField
                    key={randomID(6)}
                    type={input.type}
                    label={input.label}
                    name={input.name}
                    size="small"
                    variant="standard"
                    sx={{ 
                        width: 280, 
                        marginTop: 0.5,
                        
                    }}
                />
            )}
            <Button 
                type="submit"
                variant="contained"
                sx={{ mt: 'auto', width: 280, borderRadius: 2  }}
            >
                Зарегистрироваться
            </Button>
            <Button href="/" style={{marginTop: 10}}>Войти</Button>
        </form>
    )
}
