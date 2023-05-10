import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { Modal } from '@mui/material';

import { StyledBox, StyledDescribe } from '../Styled';

type ModalBaseProps = {
  title: string;
  setOpenCback?: Dispatch<SetStateAction<boolean>>;
};

export const ModalBase: FC<PropsWithChildren<ModalBaseProps>> = props => {
  const { title, children, setOpenCback } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (setOpenCback) setOpenCback(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBox>
        <StyledDescribe>{title}</StyledDescribe>
        {children}
      </StyledBox>
    </Modal>
  );
};
