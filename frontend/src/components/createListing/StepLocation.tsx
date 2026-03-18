// src/components/createListing/StepLocation.tsx
import React, { memo }       from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { LocationOn as LocationOnIcon, Add as AddIcon } from "@mui/icons-material";
import { useTranslation }    from "react-i18next";
import Section               from "./Section.tsx";
import DebouncedTextField    from "../common/DebouncedTextField.tsx";
import type { FormState, Errors } from "../../types/CreateListingTypes.ts";
import { colors }            from "../../theme/gradients.ts";

interface Props {
    city:             string;
    region:           string;
    postalCode:       string;
    latitude:         string;
    longitude:        string;
    landmarks:        string[];
    landmarkInput:    string;
    errors:           Errors;
    set:              <K extends keyof FormState>(key: K, value: FormState[K]) => void;
    clearError:       (key: string) => void;
    onAddLandmark:    () => void;
    onRemoveLandmark: (i: number) => void;
}

const icon = <LocationOnIcon sx={{ fontSize: 24 }} />;

const StepLocation = memo(({ city, region, postalCode, latitude, longitude, landmarks, landmarkInput, errors, set, clearError, onAddLandmark, onRemoveLandmark }: Props) => {
    const { t } = useTranslation();
    return (
        <Section icon={icon}
                 title={t("createListing.steps.location.title")}
                 subtitle={t("createListing.steps.location.subtitle")}
                 step={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
                    <DebouncedTextField label={t("components.steps.location.city")} value={city}
                                        onChange={(v) => { set("city", v as any); clearError("city"); }}
                                        error={!!errors.city} helperText={errors.city} />
                    <DebouncedTextField label={t("components.steps.location.region")} value={region}
                                        onChange={(v) => set("region", v as any)}
                                        placeholder={t("components.steps.location.regionPlaceholder")} />
                    <DebouncedTextField label={t("components.steps.location.postal")} value={postalCode}
                                        onChange={(v) => set("postalCode", v as any)}
                                        placeholder={t("components.steps.location.postalPlaceholder")} />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <DebouncedTextField label={t("components.steps.location.lat")} value={latitude} type="number"
                                        onChange={(v) => set("latitude", v as any)}
                                        placeholder={t("components.steps.location.latPlaceholder")}
                                        inputProps={{ onWheel: (e: any) => e.currentTarget.blur() }} />
                    <DebouncedTextField label={t("components.steps.location.lng")} value={longitude} type="number"
                                        onChange={(v) => set("longitude", v as any)}
                                        placeholder={t("components.steps.location.lngPlaceholder")}
                                        inputProps={{ onWheel: (e: any) => e.currentTarget.blur() }} />
                </Box>
                <Box>
                    <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
                        {t("components.steps.location.landmarks")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                        <DebouncedTextField size="small" fullWidth
                                            placeholder={t("components.steps.location.landmarkPlaceholder")}
                                            value={landmarkInput}
                                            onChange={(v) => set("landmarkInput", v as any)}
                                            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); onAddLandmark(); } }} />
                        <Button variant="outlined" onClick={onAddLandmark} sx={{ minWidth: 48, px: 2 }}>
                            <AddIcon />
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {landmarks.map((lm, i) => (
                            <Chip key={i} label={lm} size="small" onDelete={() => onRemoveLandmark(i)}
                                  sx={{ bgcolor: colors.primaryAlpha10, color: colors.primaryDark, fontWeight: 600 }} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Section>
    );
});

StepLocation.displayName = "StepLocation";
export default StepLocation;