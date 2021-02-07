import {
    Button,
    FormControl,
    Input, InputLabel,
    makeStyles,
    MenuItem,
    Select, TextField,
    Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { GENERAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CatalogApi } from 'shared/api/catalogApi';
import { Color } from 'shared/styles/color';
import Container from '@material-ui/core/Container';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Grid from '@material-ui/core/Grid';
import { ProgressBar } from 'components/common/progressBar';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { storage } from 'backend/Firebase';
import { UserConsumer } from 'components/auth/authContext';

export const generateSelector = (label, selectorValues, value) => {
    const { KEY, VALUE } = label;
    const defaultValue = value ? value : '';
    return <>
        {generatorInputText(KEY)}
        <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
            <FormControl variant='outlined' className={classes.form}>
                <InputLabel ref={inputLabel} id={`${VALUE}-label`}>{VALUE}</InputLabel>
                <Controller
                    name={VALUE}
                    control={control}
                    defaultValue={defaultValue}
                    as={
                        <Select
                            label={VALUE}
                            labelId={VALUE}
                            labelWidth={labelWidth}
                            inputProps={{ name: VALUE }}
                        >
                            {menuItemNone}
                            {selectorValues.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                        </Select>
                    }
                />
            </FormControl>
        </Grid>
    </>;
};