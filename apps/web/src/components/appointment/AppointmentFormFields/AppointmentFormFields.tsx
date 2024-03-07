import React, { FC } from "react";
import { Button, FormControlLabel, Grid, MenuItem } from "@mui/material";
import FieldWrap from "../../FieldWrap";
import FormikDateTimePicker from "../../Formik/FormikDateTimePicker/FormikDateTimePicker";
import FormikTextField from "../../Formik/FormikTextField/FormikTextField";
import FormikSelect from "../../Formik/FormikSelect/FormikSelect";
import FormikCheckbox from "../../Formik/FormikCheckbox";
import useAppointmentFormQueries from "../../../hooks/useAppointmentFormQueries";
import { useFormikContext } from "formik";

const AppointmentFormFields: FC = () => {
    const {
        clientsData,
        clientsError,
        clientsLoading,
        mastersData,
        mastersError,
        mastersLoading,
        proceduresData,
        proceduresError,
        proceduresLoading,
    } = useAppointmentFormQueries();

    const { dirty } = useFormikContext();

    return (
        <>
            <Grid display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <FieldWrap>
                    <FormikDateTimePicker fullWidth name="date" label="Дата" />
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        name="master"
                        fullWidth
                        label="Мастер"
                        select
                        disabled={mastersLoading}
                        error={!!mastersError}
                    >
                        {mastersData?.masters?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        )) ?? <div />}
                    </FormikTextField>
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        name="client"
                        fullWidth
                        label="Клиент"
                        select
                        disabled={clientsLoading}
                        error={!!clientsError}
                    >
                        {clientsData?.clients?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {`${option.firstName} ${option.lastName}`}
                            </MenuItem>
                        )) ?? <div />}
                    </FormikTextField>
                </FieldWrap>
                <FieldWrap>
                    <FormikSelect
                        name="procedures"
                        fullWidth
                        label="Процедуры"
                        disabled={
                            proceduresLoading ||
                            !proceduresData?.procedureByMaster?.length
                        }
                        error={!!proceduresError}
                        multiple
                        options={proceduresData?.procedureByMaster ?? []}
                    />
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        fullWidth
                        name="price"
                        type="number"
                        label="Цена"
                    />
                </FieldWrap>
                <Grid
                    sx={{
                        gridColumn: "span 12",
                    }}
                >
                    <FormikTextField
                        name="complaints"
                        fullWidth
                        label="Жалобы"
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid
                    sx={{
                        gridColumn: "span 12",
                    }}
                >
                    <FormikTextField
                        name="results"
                        fullWidth
                        label="Результат"
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid
                    sx={{
                        gridColumn: "span 12",
                    }}
                >
                    <FormikTextField
                        name="comments"
                        fullWidth
                        label="Дополнительные комментарии"
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>
            <Grid
                sx={{
                    marginTop: 2,
                }}
            >
                <FormControlLabel
                    control={<FormikCheckbox name="withCoating" />}
                    label="С покрытием"
                />
            </Grid>
            <Grid
                display="flex"
                justifyContent="space-between"
                sx={{
                    marginTop: 4,
                }}
            >
                <Button disabled={!dirty} type="reset">
                    Сбросить
                </Button>
                <Button disabled={!dirty} type="submit" variant="contained">
                    Сохранить
                </Button>
            </Grid>
        </>
    );
};

export default AppointmentFormFields;
