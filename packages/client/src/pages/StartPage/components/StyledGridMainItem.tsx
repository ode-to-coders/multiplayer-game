import { Grid } from '@mui/material';

type StyledGridMainItem = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledGridMainItem = (props: StyledGridMainItem) => (
  <Grid
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    {...props}>
    {props.children}
  </Grid>
);
