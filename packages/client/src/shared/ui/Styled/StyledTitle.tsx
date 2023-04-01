import {
  Typography,
  TypographyProps,
  StyledEngineProvider,
} from '@mui/material';
import cn from 'classnames';

import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledTitleProps = {
  extendClass?: string;
} & TypographyProps;

export const StyledTitle: FC<PropsWithChildren<StyledTitleProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Typography className={cn(style.tableTitle, props.extendClass)} {...props}>
      {props.children}
    </Typography>
  </StyledEngineProvider>
);
