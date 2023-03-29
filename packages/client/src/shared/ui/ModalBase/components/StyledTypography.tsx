import { Typography } from '@mui/material';

type StyledTypography = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledTypography = (props: StyledTypography) => (
  <Typography
    sx={{
      fontSize: '1rem',
      lineHeight: '1.25rem',
    }}
    {...props}>
    {props.children}
  </Typography>
);
