import React, { useState } from "react";

import { FormButton } from "../../shared/ui/FormButton";
import { FormInput } from "../../shared/ui/FormInput";

import { randomID } from "../../shared/lib/utils/randomID";
import { FieldsValidateMap, validateElem } from "../../shared/lib/utils/validate";

import { IInputData } from "../../shared/types/d";

import c from "./RegForm.module.scss";

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

    const arrInputsData: IInputData[] = [
        {type: "email", placeholder: "Почта", label: "Почта", name: "email"},
        {type: "text", placeholder: "Логин", label: "Логин", name: "login"},
        {type: "text", placeholder: "Имя", label: "Имя", name: "first_name"},
        {type: "text", placeholder: "Фамилия", label: "Фамилия", name: "second_name"},
        {type: "phone", placeholder: "Телефон", label: "Телефон", name: "phone"},
        {type: "password", placeholder: "Пароль", label: "Пароль", name: "password"},
        {type: "password", placeholder: "Пароль (ещё раз)", label: "Пароль (ещё раз)", name: "password_repeat"},
    ]

        // логика валидации
        const [values, setValues] = useState<IValues>({
            email: '', login: '', first_name: '', second_name: '', phone: '', password: '', password_repeat: ''
        })

        const [messages, setMessages] = useState({
            email: '', login: '', first_name: '', second_name: '', phone: '', password: '', password_repeat: ''
        })
        
        // хук для сверки пароля и повтора пароля
        const [passwordCheck, setPasswordCheck] = useState(['', ''])

        function handlerSubmit(e: React.FormEvent<HTMLFormElement>): void {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            let tempPassCheck = ['', ''];

            formData.forEach((value, key) => {
                if (key === 'password') {
                    tempPassCheck = [value as string, passwordCheck[1]];
                    setPasswordCheck(tempPassCheck)
                }
                if (key === 'password_repeat') {
                    tempPassCheck = [passwordCheck[0], value as string];
                    setPasswordCheck(tempPassCheck)
                }                
                const resValidate = validateElem({
                    key: key as keyof FieldsValidateMap, 
                    val: value as string, 
                    eventName: 'submit', 
                    passwordCheck: tempPassCheck
                });
                console.log(resValidate);              
                if (!resValidate[0]) {
                    setMessages({
                        ...messages,
                        [e.currentTarget.name]: resValidate[1]
                    })
                } else {
                    setMessages({
                        ...messages,
                        [e.currentTarget.name]: ''
                    })
                }
            })
        }
        
        function handlerBlur(e: React.FocusEvent<HTMLInputElement>, key: string): void {
            let tempPassCheck = ['', ''];
            if (key === 'password') {
                tempPassCheck = [e.target.value, passwordCheck[1]];
                setPasswordCheck(tempPassCheck)
            }
            if (key === 'password_repeat') {
                tempPassCheck = [passwordCheck[0], e.target.value];
                setPasswordCheck(tempPassCheck)
            }
            const resValidate = validateElem({
                key: key as keyof FieldsValidateMap, 
                val: e.target.value, 
                eventName: 'blur',
                passwordCheck: tempPassCheck
            });
            console.log(tempPassCheck);
            if (!resValidate[0]) {
                setMessages({
                    ...messages,
                    [e.currentTarget.name]: resValidate[1]
                })
            } else {
                setMessages({
                    ...messages,
                    [e.currentTarget.name]: ''
                })
            }
        }
    
    return (
        <form onSubmit={handlerSubmit} className={c.myForm}>
            <h2>Регистрация</h2>
            {arrInputsData.map(input =>
                <div key={randomID(6)}>
                    <FormInput 
                        key={randomID(6)}
                        type={input.type}
                        placeholder={input.placeholder}
                        label={input.label}
                        name={input.name}
                        onBlur={e => {
                            handlerBlur(e, input.name);
                            setValues({
                                ...values,
                                [input.name]: e.currentTarget.value
                            })
                        }}
                        defaultValue={values[input.name as keyof IValues]}
                    />
                    <div key={randomID(6)} className={c.msg}>
                        {messages[input.name as keyof IValues]}
                    </div>
                </div>
            )}
            <FormButton type="submit" style={{marginTop: 'auto'}}>Зарегистрироваться</FormButton>
            <a href="/" style={{marginTop: 5}}>Войти</a>            
        </form>
    )
}
