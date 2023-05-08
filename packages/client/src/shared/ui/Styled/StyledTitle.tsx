import {
  Typography,
  TypographyProps,
  StyledEngineProvider,
} from '@mui/material';
import cn from 'classnames';

import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledTitleProps = {
  extendсlass?: string;
} & TypographyProps;

export const StyledTitle: FC<PropsWithChildren<StyledTitleProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Typography className={cn(style.tableTitle, props.extendсlass)} {...props}>
      {props.children}
    </Typography>
  </StyledEngineProvider>
);
