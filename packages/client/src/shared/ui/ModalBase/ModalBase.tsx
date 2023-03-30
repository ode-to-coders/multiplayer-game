import React, { FC, PropsWithChildren } from 'react';
import { Modal } from '@mui/material';

import { StyledBox, StyledDescribe } from '../Styled';

type ModalBaseProps = {
  title: string;
};

export const ModalBase: FC<PropsWithChildren<ModalBaseProps>> = props => {
  const { title, children } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledBox>
        <StyledDescribe>{title}</StyledDescribe>
        {children}
      </StyledBox>
    </Modal>
  );
};
