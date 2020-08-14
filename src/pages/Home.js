import React, {useEffect, useRef, useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {getFilterMarker} from '../store/actions/map';


const mapFilter = {
    location: [50.0042617, 36.2034271], date: [0, 2020],
};

const Home = () => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [dateValue, setDateValue] = useState(mapFilter.date);
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(({coords}) =>  {
        //     const currentPosition = [coords.latitude, coords.longitude];
        //     setUserPosition(currentPosition)
        // });
        handleChangeViewPort();
    }, []);
    const data = useSelector(res => res.map.markers.data, shallowEqual);
    const cha = useSelector(res => res.user.user, shallowEqual);

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
    console.log(cha);

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
                            {marker.description}
                        </Popup>
                    </Marker>
                ))}
            </Map>
            <div className="bottom-map">
                <div className="bottom-map-slider">
                    <Typography id="range-slider" gutterBottom>
                        Date range
                    </Typography>
                    <Slider
                        value={dateValue}
                        onChange={handleChangeDateSlider}
                        valueLabelDisplay="auto"
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