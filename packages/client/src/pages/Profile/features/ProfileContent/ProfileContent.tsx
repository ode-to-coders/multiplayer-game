import { useMemo, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import { ModalBase } from '../../../../shared/ui';
import { FormButton } from '../../../../shared/ui/FormButton';

import emptyAvatar from './avatar.png';
import s from './index.module.scss';
import { profileConfig } from '../../profileConfig';
import { PAGES } from '../../../../app/lib/routes.types';
import { UserInfoResponse } from '../../../../app/store/api/auth/types';
import { useChangeUserAvatarMutation } from '../../../../app/store/api/users/usersApi';

export const ProfileContent = ({
  page,
  data,
}: {
  page: PAGES;
  data: UserInfoResponse;
}) => {
  const [changeUserAvatar] = useChangeUserAvatarMutation();
  //----------АВАТАР--------------
  const [urlAva, setUrlAva] = useState(emptyAvatar);

  const avatar = useMemo(() => {
    return (
      <Avatar
        src={
          `https://odetocode-league-24.ya-praktikum.tech/api/v2/resources${data.avatar}` ??
          emptyAvatar
        }
        className={s.ava}
      />
    );
  }, [urlAva]);
  //------------------------------

  //-------МОДАЛЬНОЕ ОКНО--------
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const [textSelectFile, setTextSelectFile] = useState<JSX.Element | string>(
    <>
      Выберите файл на
      <br /> компьютере
    </>
  );

  const handleSetTextSelectFile = () => {
    const inputWithAva = document.getElementById(
      'inputAvatar'
    ) as HTMLInputElement;

    if (inputWithAva?.files?.length && inputWithAva.files.length > 0) {
      const file = inputWithAva?.files[0];

      setTextSelectFile(file.name);
    }
  };

  //-----------------------------

  //--------УСТАНОВКА ЗАГРУЖЕННОГО АВАТАРА------
  const handleClickButtonSetAvatar = () => {
    const inputWithAva = document.getElementById(
      'inputAvatar'
    ) as HTMLInputElement;

    if (inputWithAva?.files?.length && inputWithAva.files.length > 0) {
      const formData = new FormData();
      const file = inputWithAva.files?.[0] ?? '';

      formData.append('avatar', file);

      const response = changeUserAvatar(formData);

      if ('error' in response) {
        //TODO поменять на CustomNotification
        alert('Что-то пошло не так');
      } else {
        handleCloseModal();
      }
    }
  };
  //-----------------------------------
  return (
    <>
      <div className={s.wrapLink}>
        <Link to={profileConfig[page].linkBack} className={s.linkBack}>
          Назад
        </Link>
      </div>
      <div className={s.wrapData}>
        <div className={s.wrapAva}>
          {avatar}
          {profileConfig[page].hoverAvatar && (
            <div className={s.hoverAva} onClick={handleOpenModal}></div>
          )}
        </div>

        <div className={s.wrapData__text}>
          {profileConfig[page].getComponent(data)}
        </div>
      </div>

      {showModal && (
        <ModalBase title="Загрузите файл" setOpenCback={setShowModal}>
          <div className={s.modalWrap}>
            <label className={s.inputFileWrap}>
              <input
                className={s.inputFile}
                type="file"
                id="inputAvatar"
                onChange={handleSetTextSelectFile}
              />
              <span className={s.inputFileText}>{textSelectFile}</span>
            </label>

            <FormButton
              className={s.modalButton}
              onClick={handleClickButtonSetAvatar}>
              Поменять
            </FormButton>
          </div>
        </ModalBase>
      )}
    </>
  );
};
