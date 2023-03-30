import { TableContainer } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledTableContainerProps = {
  [key: string]: unknown;
};

export const StyledTableContainer: FC<
  PropsWithChildren<StyledTableContainerProps>
> = props => (
  <TableContainer className={style.tableContainer} {...props}>
    {props.children}
  </TableContainer>
);
