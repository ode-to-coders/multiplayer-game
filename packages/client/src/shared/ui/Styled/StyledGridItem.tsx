import { Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type StyledGridItemProps = {
  [key: string]: string | number | boolean | JSX.Element[] | JSX.Element | null;
};

export const StyledGridItem: FC<
  PropsWithChildren<StyledGridItemProps>
> = props => <Grid {...props}>{props.children}</Grid>;
