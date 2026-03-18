// src/pages/CreateListing.tsx
import { useCallback }    from "react";
import { useNavigate }    from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography, Button, Alert } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from "@mui/icons-material";
import { gradients, colors } from "../theme/gradients.ts";
import { paths }             from "../app/paths.ts";
import { useListingForm }    from "../types/UseListingForm.ts";
import SuccessScreen         from "../components/createListing/SuccessScreen.tsx";
import StepBasicInfo         from "../components/createListing/StepBasicInfo.tsx";
import StepPhotos            from "../components/createListing/StepPhotos.tsx";
import StepLocation          from "../components/createListing/StepLocation.tsx";
import StepFacilities        from "../components/createListing/StepFacilities.tsx";
import StepSpaceInfo         from "../components/createListing/StepSpaceInfo.tsx";
import StepDescription       from "../components/createListing/StepDescription.tsx";

const CreateListing = () => {
    const navigate = useNavigate();
    const { t }    = useTranslation();
    const {
        form, errors, submitted,
        set, clearError, setFacility,
        handleImages, removeImage, addLandmark, removeLandmark,
        submit,
    } = useListingForm();

    // ✅ FIX: callback-urile inline sunt memoizate ca să nu producă referințe noi
    //         la fiecare render — altfel React.memo din copii nu are niciun efect.
    const handleAddImages = useCallback(
        (files: FileList | null) => handleImages(files, form.images.length),
        [handleImages, form.images.length],
    );

    const handleRemoveImage = useCallback(
        (idx: number) => removeImage(idx, form.imagePreviewUrls),
        [removeImage, form.imagePreviewUrls],
    );

    const handleAddLandmark = useCallback(
        () => addLandmark(form.landmarkInput),
        [addLandmark, form.landmarkInput],
    );

    const handleSubmit = useCallback(
        () => submit(() => setTimeout(() => navigate(paths.apartmentDetail(1)), 1500)),
        [submit, navigate],
    );

    if (submitted) return <SuccessScreen />;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 3, md: 5 }, mt: 10 }}>
            <Container maxWidth="md">

                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3, fontWeight: 600 }}>
                    {t("createListing.back")}
                </Button>

                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ background: gradients.primary, p: 1.5, borderRadius: 2, display: "flex", color: "white" }}>
                            <HomeIcon sx={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight={900}>{t("createListing.title")}</Typography>
                            <Typography variant="body2" color="text.secondary">{t("createListing.subtitle")}</Typography>
                        </Box>
                    </Box>
                </Box>

                {Object.keys(errors).length > 0 && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                        {t("createListing.errorsAlert")}
                    </Alert>
                )}

                <StepBasicInfo   form={form} errors={errors} set={set} clearError={clearError} />
                <StepPhotos      form={form} errors={errors}
                                 onAddImages={handleAddImages}
                                 onRemoveImage={handleRemoveImage} />
                <StepLocation    form={form} errors={errors} set={set} clearError={clearError}
                                 onAddLandmark={handleAddLandmark}
                                 onRemoveLandmark={removeLandmark} />
                <StepFacilities  facilities={form.facilities} onToggle={setFacility} />
                <StepSpaceInfo   form={form} set={set} />
                <StepDescription form={form} errors={errors} set={set} clearError={clearError} />

                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mb: 6 }}>
                    <Button variant="outlined" size="large" fullWidth onClick={() => navigate(-1)}
                            sx={{ py: 1.8, borderRadius: 2.5, fontWeight: 700 }}>
                        {t("createListing.cancel")}
                    </Button>
                    <Button variant="contained" size="large" fullWidth onClick={handleSubmit}
                            sx={{ py: 1.8, borderRadius: 2.5, fontWeight: 800, fontSize: 16 }}>
                        {t("createListing.publish")}
                    </Button>
                </Box>

            </Container>
        </Box>
    );
};

export default CreateListing;