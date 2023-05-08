import { Button, ButtonProps, StyledEngineProvider } from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

type StyledButtonProps = {
  extendсlass?: string;
} & ButtonProps;

export const StyledButton: FC<PropsWithChildren<StyledButtonProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Button className={cn(styles.button, props.extendсlass)} {...props}>
      {props.children}
    </Button>
  </StyledEngineProvider>
);
