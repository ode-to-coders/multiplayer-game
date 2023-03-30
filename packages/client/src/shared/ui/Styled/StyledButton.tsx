import { Button } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledButtonProps = {
  [key: string]: unknown;
};

export const StyledButton: FC<PropsWithChildren<StyledButtonProps>> = props => (
  <Button className={style.button}
    {...props}>
    {props.children}
  </Button>
);
