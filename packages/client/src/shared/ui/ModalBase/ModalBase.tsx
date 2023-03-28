import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { style } from './style';

type ModalType = {
  title: string,
  children: any,
}

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
      <Box sx={style.modal}>
        <Typography id="modal-modal-title" sx={style.modalTitle}>
          {title}
        </Typography>
        { children }
      </Box>
    </Modal>
  );
};
