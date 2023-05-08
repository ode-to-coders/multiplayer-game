import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { MouseEventHandler, useCallback } from 'react';

import { useLogoutMutation } from '../../app/store/api/auth/authApi';

import { PAGES } from '../../app/lib/routes.types';

import { arrHelpingData } from './helpingData';

import styles from './index.module.scss';

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
    <div className={styles.wrap}>
      <div className={styles.wrapUserData}>
        {arrHelpingData.map(item => (
          <div key={item.name} className={styles.wrapLabelValue}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>
              {profileData[item.name as keyof IProfileData]}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.wrapLinks}>
        <Link to={PAGES.EDIT_PROFILE}>
          Изменить данные
        </Link>
        <Link to={PAGES.EDIT_PASSWORD}>
          Изменить пароль
        </Link>
        <Link to={PAGES.MAIN} onClick={handleExit}>
          Выйти
        </Link>
      </div>
    </div>
  );
};
