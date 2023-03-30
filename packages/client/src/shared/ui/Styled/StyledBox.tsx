import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss'

type StyledBoxProps = {
  [key: string]: unknown;
};

export const StyledBox: FC<PropsWithChildren<StyledBoxProps>> = props => (
  <Box className = {style.box}
    {...props}>
    {props.children}
  </Box>
);
