// src/components/common/DebouncedTextField.tsx
// TextField care ține state-ul local și sincronizează cu parent doar după ce
// utilizatorul termină de tastat (onBlur) sau apasă Enter.
// Astfel componenta părinte NU se re-randează la fiecare keystroke.

import { useState, useEffect, useCallback } from "react";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

type Props = Omit<TextFieldProps, "value" | "onChange"> & {
    value:    string;
    onChange: (value: string) => void;
};

const DebouncedTextField = ({ value, onChange, onBlur, ...rest }: Props) => {
    const [local, setLocal] = useState(value);

    // Sincronizează dacă valoarea externă se schimbă (ex: reset form)
    useEffect(() => {
        setLocal(value);
    }, [value]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        onChange(local);
        onBlur?.(e);
    }, [local, onChange, onBlur]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onChange(local);
        }
    }, [local, onChange]);

    return (
        <TextField
            {...rest}
            value={local}
            onChange={e => setLocal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        />
    );
};

export default DebouncedTextField;