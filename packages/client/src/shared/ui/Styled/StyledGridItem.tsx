import { Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type StyledGridItemProps = {
  [key: string]: unknown;
};

export const StyledGridItem: FC<
  PropsWithChildren<StyledGridItemProps>
> = props => <Grid {...props}>{props.children}</Grid>;
