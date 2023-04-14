import {
  Typography,
  TypographyProps,
  StyledEngineProvider,
} from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledDescribeProps = {
  extendClass?: string;
} & TypographyProps;

export const StyledDescribe: FC<PropsWithChildren<StyledDescribeProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Typography className={cn(style.describe, props.extendClass)} {...props}>
      {props.children}
    </Typography>
  </StyledEngineProvider>
);
