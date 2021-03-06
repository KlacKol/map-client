import React, {useEffect, useRef, useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {getFilterMarker} from '../store/actions/map';
import {getUserId} from "../services/LocalStorageService";
import {deleteMarker} from "../services/MapService";


const mapFilter = {
    location: [50.0042617, 36.2034271], date: [0, 2020],
};
let timer;

const Home = () => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [dateValue, setDateValue] = useState(mapFilter.date);
    const data = useSelector(res => res.map.markers.data, shallowEqual);
    const storageUserId = getUserId();

    useEffect(() => {
        handleChangeViewPort();
    }, []);


    const handleChangeDateSlider = (event, newValue) => {
        setDateValue(newValue);
    };

    const handleSubmit = () => {
        mapFilter.date = dateValue;
        handleChangeViewPort();
    };

    const handleChangeViewPort = () => {
        const bounds = mapRef.current.leafletElement.getBounds();
        const data = {
            topLeft: bounds.getNorthWest(),
            bottomRight: bounds.getSouthEast(),
            date: mapFilter.date
        };
        dispatch(getFilterMarker(data));
    };

    const handleDeleteMarker = async (id) => {
        await deleteMarker(id);
        await handleChangeViewPort();
    };

    const handlePlay = () => {
        let i = dateValue[0];
            function f() {
                timer = setTimeout(() => {
                        setDateValue([i, dateValue[1]]);
                        i++;
                        if (i < mapFilter.date[1]) {
                            f();
                        }
                }, 10, 0)
            }
            f();
    };

    const handleStop = () => {
        clearTimeout(timer);
    };

    return (
        <>
            <Map
                center={mapFilter.location}
                zoom={10}
                tap={true}
                ref={mapRef}
                onViewportChanged={handleChangeViewPort}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data && data.map(marker => (
                    <Marker position={[marker.lat, marker.lng]} key={marker._id}>
                        <Popup>
                            <div className="marker-map">
                                {marker.description}
                                {storageUserId && storageUserId === marker.userId ? (
                                    <Button
                                        onClick={() => handleDeleteMarker(marker._id)}
                                        color="secondary"
                                        size="small"
                                        variant="contained"
                                    >delete marker</Button>
                                ) : null}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </Map>
            <div className="bottom-map">
                <div className="bottom-map-slider">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handlePlay}
                    >
                        play
                    </Button>
                    <Button
                        onClick={handleStop}
                        color="primary"
                        variant="contained"
                    >
                        stop
                    </Button>
                    <Typography id="range-slider" gutterBottom>
                        Date range
                    </Typography>
                    <Slider
                        value={dateValue}
                        onChange={handleChangeDateSlider}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        max={new Date().getFullYear()}
                    />
                </div>
                <Button
                color="primary"
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={handleSubmit}
                className="bottom-map-button"
                >
                    Search
                </Button>
            </div>
        </>
    )
};

export default Home;