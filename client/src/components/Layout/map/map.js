import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import Container from '../../UI/container';

import './map.scss';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiZGlrdXNvciIsImEiOiJja25leWhsYWYxdzY2MnBtcjNkdDRhYWU4In0.pdghOzMOAjtXK2FrRLFRcA';

const Map = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(24.0099813);
    const [lat, setLat] = useState(49.8439957);
    const [zoom, setZoom] = useState(16.5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/dikusor/ckngbl5xc1bka17p3fql8z4wn',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        return () => map.remove();
    }, []);

    return (
        <Container >
            <div>
                <div className="map-container" ref={mapContainer} />
            </div>
        </Container>
    );
};

export default Map;