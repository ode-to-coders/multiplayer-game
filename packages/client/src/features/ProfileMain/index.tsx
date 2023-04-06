import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useCallback } from "react";

import { PAGES } from "app/lib/routes.types";

import { arrHelpingData } from "./helpingData";

import s from "./index.module.scss";

type Props = {
  profileData: IProfileData;
}

export const ProfileMain = ({ profileData }: Props) => {   
  
  const navigate = useNavigate();
  
  const handleExit: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();

    console.log("Выход");
    // ЛОГИКА ВЫХОДА
    // все необходимое очистка кеша, хранилища перед выходом

    navigate(PAGES.MAIN)
  }, []);

  return (
    <div className={s.wrap}>
      <div className={s.wrapUserData}>
        {arrHelpingData.map((item) =>
          <div key={item.name} className={s.wrapLabelValue}>
              <span className={s.label}>
                {item.label}
              </span>
              <span className={s.value}>              
                {profileData[item.name as keyof IProfileData]}
              </span>
          </div>
        )}
      </div>
      <div className={s.wrapLinks}>  
        <Link to={PAGES.EDIT_PROFILE} className="">Изменить данные</Link>
        <Link to={PAGES.EDIT_PASSWORD} className="">Изменить пароль</Link>
        <Link to={"/"} onClick={handleExit} className="">Выйти</Link>
      </div>
    </div>
  )
}
