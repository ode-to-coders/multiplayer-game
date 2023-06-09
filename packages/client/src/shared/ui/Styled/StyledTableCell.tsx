import React from 'react';
import { TableCell, TableCellProps, StyledEngineProvider } from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledTableCellProps = {
  extendсlass?: string;
} & TableCellProps;

export const StyledTableCell: FC<PropsWithChildren<StyledTableCellProps>> =
  React.memo(props => (
    <StyledEngineProvider injectFirst>
      <TableCell className={cn(style.tableCell, props.extendсlass)} {...props}>
        {props.children}
      </TableCell>
    </StyledEngineProvider>
  ));
