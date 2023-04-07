import { FormButton } from "shared/ui/FormButton";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupSchemaProfileEditPasswordForm as schema } from 'shared/const/validate';
import { yupResolver } from "@hookform/resolvers/yup"
import { PAGES } from "app/lib/routes.types";

import { helpingDataInputs } from "./helpingDataInputs";

import s from "./index.module.scss";

type Props = {
  profileData: IProfileData;
}

export const ProfileEditPasswordForm = ({ profileData }: Props) => {   
  
  const navigate = useNavigate();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfileEditPassword>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IProfileEditPassword) => {
    
    console.log(data);
    // ------------ API ИЗМЕНИТЬ ДАННЫЕ ------------- 
    // ЗАПРОС НА ИЗМЕНЕНИЕ ПАРОЛЯ
    const resReg = true;
    if (resReg) {                
      setTimeout(() => {
        console.log(`Добро пожаловать onboard, ${profileData.first_name}`);

        navigate(PAGES.PROFILE)

      }, 1000)
    } else {
      alert('что-то пошло не так, попробуйте еще раз')
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={s.myForm}>
      {helpingDataInputs.map(input =>
        <div key={input.name} className={s.wrapLabelInputMsg}>
          <div className={s.myWrapInput}>    
            <label 
              htmlFor={input.name} 
              className={s.myInputLabel}
            >
              {input.label}
            </label>
            <input
              className={s.myInput}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.name)}
            />
          </div>
          {errors[input.name]?.message && 
            <div className={s.msg}>
              {errors[input.name]?.message as string}
            </div>
          }
        </div>
      )}
      <FormButton type="submit" className={s.btnSubmit}>Сохранить</FormButton>
    </form>
  )
}
