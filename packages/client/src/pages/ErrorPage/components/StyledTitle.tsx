import { Typography } from '@mui/material';

type StyledTitle = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledTitle = (props: StyledTitle) => (
  <Typography
    sx={{
      fontSize: '1rem',
      lineHeight: '1.25rem',
    }}
    {...props}>
    {props.children}
  </Typography>
);
