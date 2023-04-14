import React, { ReactElement } from 'react';
import cn from 'classnames';

import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import style from './index.module.scss';

export interface IDataLoaderProps<T> {
  isLoading: boolean;
  isError?: boolean;
  noDataMessage?: React.ReactElement | string | null;
  errorMessage?: React.ReactElement | string | null;
  data?: T | null;
  children: (data: T) => React.ReactElement;
}

/**
 * Используется, когда необходимо прокинуть данные в компонент
 * и отследить статусы
 *
 * ПР.: загрузка данных в родительском компоненте и их передача в другой компонент
 */
export const DataLoader = <T extends object>({
  isLoading,
  noDataMessage = 'Нет данных',
  isError,
  errorMessage = 'Ошибка',
  data,
  children,
}: IDataLoaderProps<T>): ReactElement | null => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <div className={cn(style.wrapper, style.messageWrapper)}>
        {errorMessage}
      </div>
    );
  }

  if (!data) {
    return (
      <div className={cn(style.wrapper, style.messageWrapper)}>
        {noDataMessage}
      </div>
    );
  }

  return children(data);
};
