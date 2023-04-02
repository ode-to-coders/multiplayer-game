import { Button, ButtonProps, StyledEngineProvider } from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledButtonProps = {
  extendClass?: string;
} & ButtonProps;

export const StyledButton: FC<PropsWithChildren<StyledButtonProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Button className={cn(style.button, props.extendClass)} {...props}>
      {props.children}
    </Button>
  </StyledEngineProvider>
);
