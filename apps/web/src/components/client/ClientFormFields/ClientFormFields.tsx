import React from "react";
import useClientFormQueries from "../../../hooks/useClientFormQueries";
import { FieldArray, useFormikContext } from "formik";
import FieldWrap from "../../FieldWrap";
import {
    Button,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Typography,
} from "@mui/material";
import FormikTextField from "../../Formik/FormikTextField";
import { ClientInput } from "graphql/generated/graphql";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientFormFields = () => {
    const { channelsError, channelsLoading, channelsData } =
        useClientFormQueries();

    const { dirty, values } = useFormikContext<ClientInput>();

    return (
        <>
            <Grid display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <FieldWrap>
                    <FormikTextField name="firstName" fullWidth label="Имя" />
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        name="lastName"
                        fullWidth
                        label="Фамилия"
                    />
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        name="middleName"
                        fullWidth
                        label="Отчество"
                    />
                </FieldWrap>
                <FieldWrap>
                    <FormikTextField
                        name="channel"
                        fullWidth
                        label="Канал связи"
                        select
                        disabled={channelsLoading}
                        error={!!channelsError}
                    >
                        {channelsData?.channels?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        )) ?? <div />}
                    </FormikTextField>
                </FieldWrap>
            </Grid>
            <Divider light sx={{ marginTop: 3, marginBottom: 2 }} />
            <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                color="text.secondary"
            >
                Телефоны:
            </Typography>
            <FieldArray name="phones">
                {({ push, remove }) => (
                    <>
                        <Grid
                            display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gap={2}
                        >
                            {values.phones.map((value, index) => (
                                <FieldWrap>
                                    <FormikTextField
                                        name={`phones.${index}`}
                                        fullWidth
                                        label={`Телефон${
                                            !index ? "" : ` ${index + 1}`
                                        }`}
                                        InputProps={{
                                            endAdornment:
                                                values.phones.length > 1 ? (
                                                    <InputAdornment position="end">
                                                        <IconButton size="small">
                                                            <DeleteIcon
                                                                fontSize="small"
                                                                onClick={() =>
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ) : null,
                                        }}
                                    />
                                </FieldWrap>
                            ))}
                        </Grid>
                        <Button
                            size="small"
                            startIcon={<AddIcCallIcon />}
                            onClick={() => push("")}
                            sx={{ marginTop: 2 }}
                        >
                            Добавить телефон
                        </Button>
                    </>
                )}
            </FieldArray>
            <Divider light sx={{ marginTop: 3, marginBottom: 2 }} />
            <Grid
                display="flex"
                justifyContent="space-between"
                sx={{
                    marginTop: 4,
                }}
            >
                <Button disabled={!dirty} type="reset" variant="outlined">
                    Сбросить
                </Button>
                <Button disabled={!dirty} type="submit" variant="contained">
                    Сохранить
                </Button>
            </Grid>
        </>
    );
};

export default ClientFormFields;
