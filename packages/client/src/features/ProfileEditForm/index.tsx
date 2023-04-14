import { FormButton } from "shared/ui/FormButton";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupSchemaProfileEditForm as schema } from 'shared/const/validate';
import { yupResolver } from "@hookform/resolvers/yup"
import { PAGES } from "app/lib/routes.types";

import { helpingDataInputs } from "./helpingDataInputs"

import s from "./index.module.scss";

type Props = {
  profileData: IProfileData;
}

export const ProfileEditForm = ({ profileData }: Props) => {

  const navigate = useNavigate();
  
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IProfileData>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });


  const onSubmit = (data: IProfileData) => {
    
    // если какие-то введенные данные новые, то заменяем на них перед запросом
    (Object.keys(data) as Array<keyof IProfileData>).map(key => {   
      if (data[key] !== '') return
      data[key] = profileData[key]
    })
    
    console.log(data);
    // ------------ API ИЗМЕНИТЬ ДАННЫЕ ------------- 
    // ЗДЕСЬ ЗАПРОС НА ИЗМЕНЕНИЕ ДАННЫХ ПРОФИЛЯ
    const resReg = true;
    if (resReg) {                
      setTimeout(() => {
        console.log(`Данные обновлены, ${data.first_name}`);

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
              placeholder={profileData[input.name]}
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
