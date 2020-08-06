import React, {useEffect, useRef, useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from "@material-ui/core/Button";
import {getFilterMarker} from '../store/actions/map';


const Home = () => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [userPosition, setUserPosition] = useState([0, 0]);
    const [dateValue, setDateValue] = React.useState([1990, 2020]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) =>  {
            const currentPosition = [coords.latitude, coords.longitude];
            setUserPosition(currentPosition)
        });
        console.log(mapRef.current.leafletElement.getBounds())
    }, []);
    const data = useSelector(res => res.map.markers.data, shallowEqual);

    const handleChange = (event, newValue) => {
        setDateValue(newValue);
    };

    const handleSubmit = async () => {
        const bounds = mapRef.current.leafletElement.getBounds();
        const data = {
            topLeft: bounds.getNorthWest(),
            bottomRight: bounds.getSouthEast(),
            date: dateValue
        };
        await dispatch(getFilterMarker(data));
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <>
            <Map center={userPosition} zoom={10} ref={mapRef}>
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
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        max={2020}
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