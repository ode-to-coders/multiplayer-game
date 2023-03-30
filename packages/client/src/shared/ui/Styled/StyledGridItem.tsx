import { Grid } from '@mui/material';

type StyledGridItem = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledGridItem = (props: StyledGridItem) => (
  <Grid
    sx={{
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </Grid>
);
