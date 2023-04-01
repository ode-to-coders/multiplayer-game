import classNames from "classnames";

import { Link } from "react-router-dom";
import { FormButton } from "shared/ui/FormButton";
import { MuiMemoInputBase } from "shared/ui/MuiMemoInputBase";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";

import { yupSchemaSigninForm as schema } from "shared/const/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { PAGES } from "app/lib/routes.types";

import s from "./index.module.scss";

export const AuthForm = () => {

  const [isFocused, setIsFocused] = useState([false, '']);
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});

  const arrInputsData = useMemo(() => [
    {type: "text", placeholder: "Логин", label: "Логин", name: "login"},
    {type: "password", placeholder: "Пароль", label: "Пароль", name: "password"}
  ], []);

  const navigate = useNavigate();

  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const handleFocusInput = useCallback((inputName: string) => {
    setIsFocused([true, inputName]);
  }, []);

  const handleBlurInput = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: string) => {
    setIsFocused([false, inputName]);
    e.target.value 
      ? setIsEmpty({...isEmpty, [inputName]: false })
      : setIsEmpty({...isEmpty, [inputName]: true })
  }, [isEmpty]);

  const onSubmit = (data: Record<string, string>) => {
    if (Object.keys(errors).length === 0) {
      
      console.log(data);
      // ЗДЕСЬ БУДЕТ ЗАПРОС НА АВТОРИЗАЦИЮ
      // тест
      const res = {user: 'Детектив'};
      if (res) {
        setTimeout(() => {
          console.log(`привет, ${res.user}!`);

          navigate('/game')

        }, 1000);
      } else {
        alert('что-то пошло не так, попробуйте еще раз')
      }
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={s.myForm}>
      <h2 className={s.head}>Вход</h2>
      {arrInputsData.map(input =>
        <div key={input.name}>
          <div className={s.myInputWrap}>    
            <label 
              htmlFor={input.name}
              className={
                classNames(s.myInputLabel, {
                  [s.myInputLabelAnimation]: 
                    (isFocused[0] && isFocused[1] === input.name) ||
                    (input.name in isEmpty && !isEmpty[input.name]) 
                })
              }
            >
              {input.label}
            </label>
            <MuiMemoInputBase
              id={input.name}
              className={s.muiInput}
              type={input.type}
              inputProps={{ className: s.muiInputBase }}
              placeholder={(isFocused[0] && isFocused[1] === input.name) ? '' : input.placeholder}
              {...register(input.name)}
              onFocus={() => handleFocusInput(input.name)}
              onBlur={(e) => handleBlurInput(e, input.name)}
            />
          </div>
          <div className={s.msg}>
          {errors[input.name]?.message && (errors[input.name]?.message as string)}
          </div>
        </div>
      )}
      <FormButton type="submit" className={s.btnSubmit}>Авторизоваться</FormButton>
      <Link to={PAGES.registration} className={s.link}>Нет аккаунта?</Link>
    </form>
  )
}
