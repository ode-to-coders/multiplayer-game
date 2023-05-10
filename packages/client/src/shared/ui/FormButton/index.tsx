import React, { FC } from 'react';
import classNames from 'classnames';

import s from './FormButton.module.scss';

export const FormButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  React.memo(({ children, className, ...props }) => {
    const mergeClassName = classNames(s.myBtn, className);
    return (
      <button {...props} className={mergeClassName}>
        {children}
      </button>
    );
  });
