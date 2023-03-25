import React, { FC } from "react";

import c from './MyButton.module.scss';

export const MyButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button {...props} className={c.myBtn}>
            {children}
        </button>
    );
};
