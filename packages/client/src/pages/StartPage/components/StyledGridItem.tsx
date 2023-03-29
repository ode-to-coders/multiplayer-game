import { Grid } from '@mui/material';

type StyledGridItem = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledGridItem = (props: StyledGridItem) => (
  <Grid
    sx={{
      marginLeft: '1rem',
      marginTop: '11rem',
    }}
    {...props}>
    {props.children}
  </Grid>
);
