import { ButtonGroup } from '@mui/material';

type StyledGroup = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledButtonGroup = (props: StyledGroup) => (
  <ButtonGroup
    sx={{
      marginTop: '1.5rem',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </ButtonGroup>
);
