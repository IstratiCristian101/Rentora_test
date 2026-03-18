// Pune acest component TEMPORAR în locul întregului return din CreateListing.tsx
// înlocuiește tot JSX-ul cu asta și testează dacă e tot lent

import { useState } from "react";
import { Box, TextField } from "@mui/material";

const TextFieldTest = () => {
    const [val, setVal] = useState("");
    return (
        <Box sx={{ p: 4 }}>
            <TextField
                label="Test izolat"
                value={val}
                onChange={e => setVal(e.target.value)}
                fullWidth
            />
        </Box>
    );
};

export default TextFieldTest;