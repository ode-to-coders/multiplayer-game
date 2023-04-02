import { Container, ContainerProps, StyledEngineProvider } from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledContainerProps = {
  extendClass?: string;
} & ContainerProps;

export const StyledContainer: FC<
  PropsWithChildren<StyledContainerProps>
> = props => (
  <StyledEngineProvider injectFirst>
    <Container className={cn(style.container, props.extendClass)} {...props}>
      {props.children}
    </Container>
  </StyledEngineProvider>
);
