import { Box } from '@mui/material';

type StyledBox = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledBox = (props: StyledBox) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 455,
      bgcolor: 'var(--color-layout)',
      boxShadow: 0.14,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '0.75rem',
      color: 'var(--color-primary)',
    }}
    {...props}
    >
    {props.children}
  </Box>
);
