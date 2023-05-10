import {
  TableContainer,
  TableContainerProps,
  StyledEngineProvider,
} from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledTableContainerProps = {
  extendсlass?: string;
} & TableContainerProps;

export const StyledTableContainer: FC<
  PropsWithChildren<StyledTableContainerProps>
> = props => (
  <StyledEngineProvider injectFirst>
    <TableContainer
      className={cn(style.tableContainer, props.extendсlass)}
      {...props}>
      {props.children}
    </TableContainer>
  </StyledEngineProvider>
);
