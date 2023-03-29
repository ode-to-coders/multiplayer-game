import { ButtonGroup } from '@mui/material';

type StyledGroup = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledGroup = (props: StyledGroup) => (
  <ButtonGroup
    sx={{
      marginTop: '1.5rem',
    }}
    {...props}>
    {props.children}
  </ButtonGroup>
);
