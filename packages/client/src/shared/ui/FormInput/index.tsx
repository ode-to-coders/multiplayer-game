import React, { FC } from "react";

import { randomID } from "../../lib/utils/randomID";

import c from './FormInput.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; // если указать в пропсах, добавит <label>
}

export const FormInput: FC<IInputProps> = ({label, ...props}) => {
    const id = `id_${randomID(6)}`;

    return (
        <div className={c.myInputWrap}>
            {label && 
                <label htmlFor={id} className={c.myInputLabel}>
                    {label}
                </label>
            }
            <input className={c.myInput} id={id} {...props} />
        </div>
    );
};
