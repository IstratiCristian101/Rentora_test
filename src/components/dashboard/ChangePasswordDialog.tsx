import { useState } from "react";
import {
    Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, InputAdornment, Stack, TextField,
} from "@mui/material";
import VisibilityIcon    from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { colors } from "../../theme/gradients";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function ChangePasswordDialog({ open, onClose }: Props) {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew,     setShowNew]     = useState(false);
    const [saved,       setSaved]       = useState(false);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, border: `1px solid ${colors.border}` } }}>
            <DialogTitle sx={{ fontWeight: 900 }}>Schimbă Parola</DialogTitle>
            <DialogContent>
                {saved && <Alert severity="success" sx={{ mb: 2 }}>Parola a fost schimbată! (mock)</Alert>}
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField
                        label="Parola curentă"
                        type={showCurrent ? "text" : "password"}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end">
                                        {showCurrent ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Parola nouă"
                        type={showNew ? "text" : "password"}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                                        {showNew ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField label="Confirmă parola nouă" type="password" fullWidth />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2.5, gap: 1 }}>
                <Button variant="outlined"   onClick={onClose}>Anulează</Button>
                <Button variant="contained"  onClick={() => { setSaved(true); setTimeout(onClose, 1500); }}>Salvează</Button>
            </DialogActions>
        </Dialog>
    );
}