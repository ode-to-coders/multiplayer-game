import { Grid, GridProps, StyledEngineProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type StyledGridItemProps = {
  extendсlass?: string;
} & GridProps;

export const StyledGridItem: FC<
  PropsWithChildren<StyledGridItemProps>
> = props => (
  <StyledEngineProvider injectFirst>
    <Grid className={props.extendсlass} {...props}>
      {props.children}
    </Grid>
  </StyledEngineProvider>
);
