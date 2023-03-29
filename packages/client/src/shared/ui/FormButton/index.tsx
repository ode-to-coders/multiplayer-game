import React, { FC } from "react";

import s from './FormButton.module.scss';

export const FormButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={s.myBtn}>
            {children}
        </button>
    );
};
