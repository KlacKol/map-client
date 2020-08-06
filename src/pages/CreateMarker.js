import React from "react";
import Button from "@material-ui/core/Button";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {generateRandomMarker} from "../services/MapService";

const CreateMarker = () => {

    return (
        <Button
        variant="contained"
        color="default"
        startIcon={<PlaylistAddIcon />}
        onClick={generateRandomMarker}
        >
            Generate random marker
        </Button>
    )
};

export default CreateMarker;