import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import style from './index.module.scss';

type StyledTitleProps = {
  [key: string]: string | number | null;
};

export const StyledTitle: FC<PropsWithChildren<StyledTitleProps>> = props => (
  <Typography className={style.tableTitle} {...props}>
    {props.children}
  </Typography>
);
