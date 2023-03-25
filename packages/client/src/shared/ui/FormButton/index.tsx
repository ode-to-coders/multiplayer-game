import React, { FC } from "react";

import c from './FormButton.module.scss';

export const FormButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={c.myBtn}>
            {children}
        </button>
    );
};
