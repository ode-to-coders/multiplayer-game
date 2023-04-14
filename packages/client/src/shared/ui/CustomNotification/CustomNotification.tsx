import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Portal, Snackbar } from '@mui/material';

import { getIcon } from './lib/helpers';
import style from './index.module.scss';
import { NOTIFICATION_TYPE } from './lib/types';

export interface ICustomNotificationProps {
  timeout?: number;
  isUninitialized: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  successMessage?: string | React.ReactElement;
  errorMessage?: string | React.ReactElement;
  loadingMessage?: string | React.ReactElement;
  autoClose?: boolean;
  onClose?: () => void;
}

export const CustomNotification: React.FC<ICustomNotificationProps> = ({
  timeout = 5000,
  isUninitialized = false,
  isSuccess = false,
  isError = false,
  isLoading = false,
  successMessage = 'Успешно',
  errorMessage = 'Произошла ошибка',
  loadingMessage = 'Загрузка',
  autoClose = true,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');

  const [type, setType] = useState<NOTIFICATION_TYPE>(
    NOTIFICATION_TYPE.WARNING
  );

  useEffect(() => {
    if (isUninitialized) return;

    if (isLoading) {
      setType(NOTIFICATION_TYPE.INFO);
      setMessage(loadingMessage);
    }
    if (isError) {
      setType(NOTIFICATION_TYPE.ERROR);
      setMessage(errorMessage);
    }
    if (isSuccess) {
      setType(NOTIFICATION_TYPE.SUCCESS);
      setMessage(successMessage);
    }

    setOpen(true);
  }, [
    isLoading,
    isError,
    isSuccess,
    errorMessage,
    isUninitialized,
    loadingMessage,
    successMessage,
  ]);

  const handleOnClose = useCallback(() => {
    if (autoClose) {
      onClose && onClose();
      setOpen(false);
    }
  }, [autoClose, onClose]);

  return (
    <Portal>
      <Snackbar
        open={open}
        onClose={handleOnClose}
        ClickAwayListenerProps={{ onClickAway: () => null }}
        autoHideDuration={timeout}
        transitionDuration={200}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <div
          className={cn(style.alert, {
            [style.success]: type === NOTIFICATION_TYPE.SUCCESS,
            [style.error]: type === NOTIFICATION_TYPE.ERROR,
            [style.warning]: type === NOTIFICATION_TYPE.WARNING,
            [style.loading]: type === NOTIFICATION_TYPE.INFO,
          })}>
          <div className={style.icon}>{getIcon(type)}</div>
          {message}
        </div>
      </Snackbar>
    </Portal>
  );
};
