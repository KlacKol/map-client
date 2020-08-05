import React, {useEffect} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {getMaps} from '../store/actions/map';

const Home = () => {
    const lat = 50.003619;
    const lng =  36.217595;
    const position = [lat, lng];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMaps())
    }, []);
    const data = useSelector(a => a.map.markers.data, shallowEqual);
    console.log(data);
    return (
        <Map center={position} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data && data.map(mark => (
                <Marker position={[mark.lat, mark.lng]} key={mark._id}>
                    <Popup>
                        {mark.description}
                    </Popup>
                </Marker>
            ))}
        </Map>
    )
};

export default Home;