import { Grid, GridProps, StyledEngineProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type StyledGridItemProps = {
  extendClass?: string;
} & GridProps;

export const StyledGridItem: FC<
  PropsWithChildren<StyledGridItemProps>
> = props => (
  <StyledEngineProvider injectFirst>
    <Grid className={props.extendClass} {...props}>
      {props.children}
    </Grid>
  </StyledEngineProvider>
);
