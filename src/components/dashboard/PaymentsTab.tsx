import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { colors } from "../../theme/gradients";

interface PaymentRowProps {
    label:  string;
    meta:   string;
    status: string;
}

function PaymentRow({ label, meta, status }: PaymentRowProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3, borderRadius: 3, bgcolor: "background.default",
                border: `1px solid ${colors.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                transition: "all 0.3s ease",
                "&:hover": { borderColor: "primary.main", boxShadow: `0 4px 16px ${colors.primaryAlpha10}` },
            }}
        >
            <Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 0.5 }}>
                    <Typography fontWeight={800} sx={{ fontSize: "16px" }}>{label}</Typography>
                    <Chip label={status} color="success" size="small" />
                </Box>
                <Typography color="text.secondary" sx={{ fontSize: "14px" }}>{meta}</Typography>
            </Box>
            <Button variant="outlined" sx={{ borderRadius: 2, px: 3 }}>Descarcă PDF</Button>
        </Paper>
    );
}

export default function PaymentsTab() {
    return (
        <Stack spacing={4}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>Arhivă Plăți & Facturi</Typography>
            <Stack spacing={2.5}>
                <PaymentRow label="Chirie Apartament #442" meta="850 EUR • Februarie 2026 • Mun. Chișinău" status="Succes" />
                <PaymentRow label="Chirie Apartament #119" meta="420 EUR • Ianuarie 2026 • Str. Pușkin 12"  status="Succes" />
            </Stack>
        </Stack>
    );
}