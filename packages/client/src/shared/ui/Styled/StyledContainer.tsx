import { Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledContainerProps = {
  [key: string]: unknown;
};

export const StyledContainer: FC<
  PropsWithChildren<StyledContainerProps>
> = props => (
  <Container className={style.container} {...props}>
    {props.children}
  </Container>
);
