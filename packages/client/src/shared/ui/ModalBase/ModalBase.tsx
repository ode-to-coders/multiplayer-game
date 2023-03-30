import React from 'react';
import { Modal } from '@mui/material';

import { StyledBox, StyledDescribe } from '../Styled';

type ModalType = {
  title: string;
  children?: React.ReactNode;
};

export const ModalBase = (props: ModalType) => {
  const { title, children } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <StyledBox>
        <StyledDescribe id="modal-modal-title">
          {title}
        </StyledDescribe>
        {children}
      </StyledBox>
    </Modal>
  );
};
