import { Box } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';
import style from './index.module.scss';

type StyledBoxProps = {
  [key: string]:
    | string
    | number
    | boolean
    | JSX.Element[]
    | JSX.Element
    | ReactNode
    | null;
};

export const StyledBox: FC<PropsWithChildren<StyledBoxProps>> = props => (
  <Box className={style.box} {...props}>
    {props.children}
  </Box>
);
