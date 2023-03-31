import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import style from './index.module.scss';

type StyledDescribeProps = {
  [key: string]: string | number | null;
};

export const StyledDescribe: FC<
  PropsWithChildren<StyledDescribeProps>
> = props => (
  <Typography className={style.describe} {...props}>
    {props.children}
  </Typography>
);
