import { ModalBase } from "shared/ui";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { FormButton } from "shared/ui/FormButton";

import { useMemo, useState } from "react";

import { profileConfig } from "./profileConfig"

import s from "./index.module.scss";

import emptyAvatar from './avatar.png';

type Props = {
  page: string;
}

export const Profile = ({ page }: Props) => {

  //----------АВАТАР--------------
  const [urlAva, setUrlAva] = useState(emptyAvatar);
  
  const avatar = useMemo(() => {
    return <Avatar src={urlAva ?? emptyAvatar} className={s.ava} />;
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

  const [textSelectFile, setTextSelectFile] = useState<JSX.Element | string>(<>Выберите файл на<br/> компьютере</>)
  
  const handleSetTextSelectFile = () => {    
    const inputWithAva = document.getElementById('inputAvatar') as HTMLInputElement;
    
    if (inputWithAva?.files?.length && inputWithAva.files.length > 0) {
      const file = inputWithAva?.files[0];
      setTextSelectFile(file.name);
    }
  }
  //----------------------------- 
  
  //--------УСТАНОВКА ЗАГРУЖЕННОГО АВАТАРА------
  const handleClickButtonSetAvatar = () => {

    const inputWithAva = document.getElementById('inputAvatar') as HTMLInputElement;

    if (inputWithAva?.files?.length && inputWithAva.files.length > 0) {

      const file = inputWithAva?.files[0];
      setUrlAva(URL.createObjectURL(file));

      handleCloseModal();
    }
  }
  //-----------------------------------

  return (
    <div className={s.wrap}>
      <div className={s.wrapData}>
        
        <div className={s.wrapAva}>
          {avatar}
          {profileConfig[page].hoverAvatar &&
            <div 
              className={s.hoverAva}
              onClick={handleOpenModal}
            >
            </div>}
        </div>
        
        <div className={s.wrapData__text}>
          {profileConfig[page].component}
        </div>

      </div>
      <Link to={profileConfig[page].linkBack} className={s.linkBack}>Назад</Link>
      {showModal &&
        <ModalBase title="Загрузите файл" setOpenCback={setShowModal}>
          <div className={s.modalWrap}>
            <label className={s.inputFileWrap}>
              <input
                className={s.inputFile}
                type="file" 
                id="inputAvatar"
                onChange={handleSetTextSelectFile} />
              <span className={s.inputFileText}>{textSelectFile}</span>
            </label>
            
            <FormButton className={s.modalButton} onClick={handleClickButtonSetAvatar}>Поменять</FormButton>
          </div>
        </ModalBase>
      }
    </div>
  )
}
