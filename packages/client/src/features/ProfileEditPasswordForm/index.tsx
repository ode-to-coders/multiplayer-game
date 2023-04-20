import { FormButton } from 'shared/ui/FormButton';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useChangeUserPasswordMutation } from 'app/store/api/users/usersApi';
import { PAGES } from 'app/lib/routes.types';

import { helpingDataInputs, Props } from './helpingDataInputs';

import styles from './index.module.scss';


export const ProfileEditPasswordForm = ({ profileData }: Props) => {
  const navigate = useNavigate();

  const [changeUserPassword] = useChangeUserPasswordMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfileEditPassword>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IProfileEditPassword) => {
    console.log(data);
    // ------------ API ИЗМЕНИТЬ ДАННЫЕ -------------
    // ЗАПРОС НА ИЗМЕНЕНИЕ ПАРОЛЯ

    const response = await changeUserPassword({
      oldPassword: data.oldpassword,
      newPassword: data.password,
    });

    const isError = 'error' in response;

    if (isError) {
      alert('что-то пошло не так, попробуйте еще раз');
    } else {
      navigate(PAGES.PROFILE);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      className={styles.myForm}>
      {helpingDataInputs.map(input => (
        <div key={input.name} className={styles.wrapLabelInputMsg}>
          <div className={styles.myWrapInput}>
            <label htmlFor={input.name} className={styles.myInputLabel}>
              {input.label}
            </label>
            <input
              className={styles.myInput}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.name)}
            />
          </div>
          {errors[input.name]?.message && (
            <div className={styles.msg}>{errors[input.name]?.message as string}</div>
          )}
        </div>
      ))}
      <FormButton type='submit' className={styles.btnSubmit}>
        Сохранить
      </FormButton>
    </form>
  );
};
