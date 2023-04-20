import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { MouseEventHandler, useCallback } from 'react';

import { useLogoutMutation } from '@/app/store/api/auth/authApi';

import { PAGES } from 'app/lib/routes.types';

import { arrHelpingData } from './helpingData';

import s from './index.module.scss';

type Props = {
  profileData: IProfileData;
};

export const ProfileMain = ({ profileData }: Props) => {
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  const handleExit: MouseEventHandler<HTMLAnchorElement> = useCallback(e => {
    e.preventDefault();
    logout();

    navigate(PAGES.SIGNIN);
  }, []);

  return (
    <div className={s.wrap}>
      <div className={s.wrapUserData}>
        {arrHelpingData.map(item => (
          <div key={item.name} className={s.wrapLabelValue}>
            <span className={s.label}>{item.label}</span>
            <span className={s.value}>
              {profileData[item.name as keyof IProfileData]}
            </span>
          </div>
        ))}
      </div>
      <div className={s.wrapLinks}>
        <Link to={PAGES.EDIT_PROFILE} className="">
          Изменить данные
        </Link>
        <Link to={PAGES.EDIT_PASSWORD} className="">
          Изменить пароль
        </Link>
        <Link to={PAGES.MAIN} onClick={handleExit} className="">
          Выйти
        </Link>
      </div>
    </div>
  );
};
