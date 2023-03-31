import { TableCell } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledTableCellProps = {
  [key: string]: string | number | JSX.Element | JSX.Element[] | null;
};

export const StyledTableCell: FC<
  PropsWithChildren<StyledTableCellProps>
> = props => (
  <TableCell className={style.tableCell} {...props}>
    {props.children}
  </TableCell>
);
