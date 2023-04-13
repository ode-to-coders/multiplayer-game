import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { yupSchemaRoomForm as schema } from 'shared/const/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { MuiMemoInputBase } from '../../shared/ui/MuiMemoInputBase';
import { StyledButton } from '../../shared/ui/Styled';

import styles from './index.module.scss';
import { PAGES } from '../../app/lib/routes.types';

export function RoomForm() {
  const [isFocused, setIsFocused] = useState([false, '']);
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});

  const navigate = useNavigate();

  const arrInputsData = useMemo(
    () => [
      {
        type: 'text',
        placeholder: 'Название',
        label: 'Название',
        name: 'name',
      },
      {
        type: 'text',
        placeholder: 'Количество игроков (2-6)',
        label: 'Количество игроков (2-6)',
        name: 'count',
      },
      {
        type: 'password',
        placeholder: 'Пароль',
        label: 'Пароль',
        name: 'password',
      },
    ],
    []
  );

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

  const onSubmit = (data: Record<string, string>) => {
    // Добавление комнаты в БД + обновление списка комнат (созданная - наверху)
    console.log(data);
    const res = { name: 'Room1' };
    if (res) {
      setTimeout(() => {
        console.log(`привет, вы создали комнату с названием ${res.name}!`);
        // Переход к странице комнаты (с уникальным id, по которому можно подключиться)
        navigate(PAGES.START_GAME);
      }, 1000);
    } else {
      alert('что-то пошло не так, попробуйте еще раз');
    }
  };

  return (
    <form
      autoComplete="off"
      className={styles.myForm}
      onSubmit={handleSubmit(onSubmit)}>
      {arrInputsData.map(input => (
        <div key={input.name}>
          <div className={styles.myInputWrap}>
            <label
              htmlFor={input.name}
              className={cn(styles.myInputLabel, {
                [styles.myInputLabelAnimation]:
                  (isFocused[0] && isFocused[1] === input.name) ||
                  (input.name in isEmpty && !isEmpty[input.name]),
              })}>
              {input.label}
            </label>
            <MuiMemoInputBase
              id={input.name}
              type={input.type}
              className={styles.muiInput}
              inputProps={{
                className: styles.muiInputBase,
              }}
              {...register(input.name)}
              placeholder={
                isFocused[0] && isFocused[1] === input.name
                  ? ''
                  : input.placeholder
              }
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
      <StyledButton type="submit">Создать</StyledButton>
    </form>
  );
}
