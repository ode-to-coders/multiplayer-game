import { ButtonGroup } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledGroupProps = {
  [key: string]: unknown;
};

export const StyledButtonGroup: FC<
  PropsWithChildren<StyledGroupProps>
> = props => (
  <ButtonGroup className={style.buttonGroup} {...props}>
    {props.children}
  </ButtonGroup>
);
