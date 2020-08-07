import React, {useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {generateRandomMarker} from "../services/MapService";


const useStyles = makeStyles(theme => ({
    leftContainer: {
        marginLeft: 0,
        paddingLeft: 0
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    generateButton: {
        width: '50%',
        height: '15vh'
    },
    paperForm: {
        marginTop: theme.spacing(8),
    }
}));

const CreateMarker = () => {

    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [date, setDate] = useState(new Date());
    const formRef = useRef('form');

    const handlerSubmit = (e) => {
        e.preventDefault();
    };



    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <Grid item xs={6}>
                <div className={classes.paper}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PlaylistAddIcon />}
                        onClick={generateRandomMarker}
                        className={classes.generateButton}
                    >
                        Generate random marker
                    </Button>
                    <div className={classes.paperForm}>
                        <Typography
                            component="h1"
                            variant="h3"
                            align='center'
                        >
                            Create new marker
                        </Typography>
                        <ValidatorForm
                            className={classes.form}
                            onSubmit={handlerSubmit}
                            onError={errors => console.log(errors)}
                            ref={formRef}
                        >
                            <TextValidator
                                label='lat'
                                name='lat'
                                value={lat}
                                onChange={({ target: {value}}) => setLat(value)}
                                validators={['required', 'minNumber:-90', 'maxNumber:90']}
                                errorMessages={['this field is required', 'minimum -90 ', 'maximum 90 ']}
                            />

                            <TextValidator
                                label='lng'
                                name='lng'
                                value={lng}
                                onChange={({ target: {value}}) => setLng(value)}
                                validators={['required', 'minNumber:-180', 'maxNumber:180']}
                                errorMessages={['this field is required', 'minimum -180 ', 'maximum 180 ']}
                            />

                            <TextValidator
                            label='description'
                            name='description'
                            value={description}
                            onChange={({ target: {value}}) => setDescription(value)}
                            validators={['required', 'minStringLength:20', 'maxStringLength:100']}
                            errorMessages={['this field is required', 'minimum 20 characters', 'maximum 100 characters']}
                            />
                            <TextField
                                id="date"
                                label="date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                            </Button>
                        </ValidatorForm>
                    </div>
                </div>
            </Grid>
        </Grid>

    )
};

export default CreateMarker;