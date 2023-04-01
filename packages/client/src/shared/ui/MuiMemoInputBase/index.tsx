import React, { forwardRef, useCallback } from 'react';
import { InputBase, InputBaseProps } from "@mui/material";

interface addProps {
  id: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void
  onFocus: (id: string) => void
}

type MuiMemoProps = addProps & Omit<InputBaseProps, keyof addProps>;

export const MuiMemoInputBase = React.memo(
  forwardRef(({ id, onBlur, onFocus, ...props }: MuiMemoProps, ref) => {
    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur(e, id);
    }, [id, onBlur])

    const handleFocus = useCallback(() => {
      onFocus(id);
    }, [id, onFocus])

    return <InputBase
      onBlur={handleBlur}
      onFocus={handleFocus}
      id={id}
      ref={ref}
      { ...props }
    />
  })
);
