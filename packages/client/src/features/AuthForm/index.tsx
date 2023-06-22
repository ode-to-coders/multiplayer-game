import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { StyledButton } from '../../shared/ui/Styled';
import { MuiMemoInputBase } from '../../shared/ui/MuiMemoInputBase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { useSignInMutation } from '../../app/store/api/auth/authApi';
import { yupSchemaSigninForm as schema } from '../../shared/const/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { PAGES } from '../../app/lib/routes.types';

import styles from './index.module.scss';

export const AuthForm = (props: PropsWithChildren) => {
  const [isFocused, setIsFocused] = useState([false, '']);
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});

  const [signIn] = useSignInMutation();

  const arrInputsData = useMemo(
    () => [
      { type: 'text', placeholder: 'Логин', label: 'Логин', name: 'login' },
      {
        type: 'password',
        placeholder: 'Пароль',
        label: 'Пароль',
        name: 'password',
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
    mode: 'onSubmit',
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

  const onSubmit = async (data: { login: string; password: string }) => {
    const response = await signIn(data);
    const isError = 'error' in response;

    if (!isError) {
      navigate(PAGES.MAIN);
    } else {
      alert('что-то пошло не так, попробуйте еще раз');
    }
  };

  // TODO типизация
  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      autoComplete="off"
      className={styles.myForm}>
      <h2 className={styles.head}>Вход</h2>
      {arrInputsData.map(input => (
        <div key={input.name}>
          <div className={styles.myInputWrap}>
            <label
              htmlFor={input.name}
              className={classNames(styles.myInputLabel, {
                [styles.myInputLabelAnimation]:
                  (isFocused[0] && isFocused[1] === input.name) ||
                  (input.name in isEmpty && !isEmpty[input.name]),
              })}>
              {input.label}
            </label>
            <MuiMemoInputBase
              id={input.name}
              className={styles.muiInput}
              type={input.type}
              inputProps={{ className: styles.muiInputBase }}
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
          <div className={styles.msg}>
            {errors[input.name]?.message &&
              (errors[input.name]?.message as string)}
          </div>
        </div>
      ))}
      <StyledButton type="submit" extendсlass={styles.btnSubmit}>
        Авторизоваться
      </StyledButton>
      {props.children}
      <Link to={PAGES.REGISTRATION} className={styles.link}>
        Нет аккаунта?
      </Link>
    </form>
  );
};
