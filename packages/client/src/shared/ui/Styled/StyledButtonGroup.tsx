import {
  ButtonGroup,
  ButtonGroupProps,
  StyledEngineProvider,
} from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledGroupProps = {
  extendClass?: string;
} & ButtonGroupProps;

export const StyledButtonGroup: FC<
  PropsWithChildren<StyledGroupProps>
> = props => (
  <StyledEngineProvider injectFirst>
    <ButtonGroup
      className={cn(style.buttonGroup, props.extendClass)}
      {...props}>
      {props.children}
    </ButtonGroup>
  </StyledEngineProvider>
);
