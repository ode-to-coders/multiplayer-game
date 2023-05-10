import { Box, BoxProps, StyledEngineProvider } from '@mui/material';
import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledBoxProps = {
  extendсlass?: string;
} & BoxProps;

export const StyledBox: FC<PropsWithChildren<StyledBoxProps>> = props => (
  <StyledEngineProvider injectFirst>
    <Box className={cn(style.box, props.extendсlass)} {...props}>
      {props.children}
    </Box>
  </StyledEngineProvider>
);
