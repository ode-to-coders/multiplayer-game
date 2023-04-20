import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { StyledButton } from 'shared/ui/Styled';
import { MuiMemoInputBase } from 'shared/ui/MuiMemoInputBase';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';

import { yupSchemaRegForm as schema } from 'shared/const/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PAGES } from 'app/lib/routes.types';

import s from './index.module.scss';
import { useSignUpMutation } from 'app/store/api/auth/authApi';


export const RegForm = () => {
  const [isFocused, setIsFocused] = useState([false, '']);
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});

  const [signUp] = useSignUpMutation();

  const arrInputsData = useMemo(
    () => [
      { type: 'email', placeholder: 'Почта*', label: 'Почта*', name: 'email' },
      { type: 'text', placeholder: 'Логин*', label: 'Логин*', name: 'login' },
      { type: 'text', placeholder: 'Имя*', label: 'Имя*', name: 'first_name' },
      {
        type: 'text',
        placeholder: 'Фамилия',
        label: 'Фамилия',
        name: 'second_name',
      },
      {
        type: 'phone',
        placeholder: 'Телефон',
        label: 'Телефон',
        name: 'phone',
      },
      {
        type: 'password',
        placeholder: 'Пароль*',
        label: 'Пароль*',
        name: 'password',
      },
      {
        type: 'password',
        placeholder: 'Пароль (ещё раз)*',
        label: 'Пароль* (ещё раз)',
        name: 'password_repeat',
      },
    ],
    []
  );

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleFocusInput = useCallback((inputName: string) => {
    setIsFocused([true, inputName]);
  }, []);

  const handleBlurInput = useCallback(
    (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      inputName: string
    ) => {
      setIsFocused([false, inputName]);
      e.target.value
        ? setIsEmpty({ ...isEmpty, [inputName]: false })
        : setIsEmpty({ ...isEmpty, [inputName]: true });
    },
    [isEmpty]
  );

  const onSubmit = async (data: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const response = await signUp(data);

    const isError = 'error' in response;

    if (!isError) {
      navigate(PAGES.GAME);
    } else {
      //TODO Переделать на CustomNotification
      alert('что-то пошло не так, попробуйте еще раз');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      autoComplete="off"
      className={s.myForm}>
      <h2 className={s.head}>Регистрация</h2>
      {arrInputsData.map(input => (
        <div key={input.name}>
          <div className={s.myInputWrap}>
            <label
              htmlFor={input.name}
              className={classNames(s.myInputLabel, {
                [s.myInputLabelAnimation]:
                  (isFocused[0] && isFocused[1] === input.name) ||
                  (input.name in isEmpty && !isEmpty[input.name]),
              })}>
              {input.label}
            </label>
            <MuiMemoInputBase
              id={input.name}
              className={s.muiInput}
              type={input.type}
              inputProps={{ className: s.muiInputBase }}
              placeholder={
                isFocused[0] && isFocused[1] === input.name
                  ? ''
                  : input.placeholder
              }
              {...register(input.name)}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
            />
          </div>
          <div className={s.msg}>
            {errors[input.name]?.message &&
              (errors[input.name]?.message as string)}
          </div>
        </div>
      ))}
      <StyledButton type="submit" extendClass={s.btnSubmit}>
        Зарегистрироваться
      </StyledButton>
      <Link to={PAGES.SIGNIN} className={s.link}>
        Войти
      </Link>
    </form>
  );
};
