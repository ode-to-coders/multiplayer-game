import { useCallback, useState } from 'react';
import cn from 'classnames';
import { yupSchemaRoomForm as schema } from '../../shared/const/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { MuiMemoInputBase } from '../../shared/ui/MuiMemoInputBase';
import { StyledButton } from '../../shared/ui/Styled';
import { IRoomData } from '../../pages/RoomPage/types';
import { arrInputsData } from './helpingData';

import styles from './index.module.scss';

export function RoomForm() {
  const [isFocused, setIsFocused] = useState([false, '']);
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({});
  const [gameId, setGameId] = useState(uuidv4());

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRoomData>({
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

  const onSubmit = (data: IRoomData) => {
    // Добавление комнаты в БД + обновление списка комнат (созданная - наверху)
    if (data) {
      setTimeout(() => {
        console.log(`привет, вы создали комнату с названием ${data.name}!`);
        // Переход к странице комнаты (с уникальным id, по которому можно подключиться)
        if (gameId) {
          navigate(`${gameId}`);
        }
      }, 1000);
    } else {
      // TODO custom notifications
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
          <div className={styles.msg}>{errors[input.name]?.message}</div>
        </div>
      ))}
      <StyledButton type="submit">Создать</StyledButton>
    </form>
  );
}
