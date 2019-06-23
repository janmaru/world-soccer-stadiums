import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import './Map.css'

export class Map extends Component {
    static displayName = Map.name;

    constructor(props) {
        super(props);

        MapboxGl.accessToken = "pk.eyJ1IjoiamFubWFydSIsImEiOiJjaW5hMm05bmcwMDBtdzdseXhwM2E0ZWIzIn0.SCC8rQzLuE6PYDoEncrqHQ";// process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

        this.state = {
            stadiums: [],
            loading: false,
            lng: 5,
            lat: 34,
            zoom: 1.5,
            pitch: 45,
            bearing: -17.6
        };

        fetch('api/v1/stadium')
            .then(response => response.json())
            .then(data => {
                this.setState({ stadiums: data, loading: false });
            }); 
    }

   
    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
                <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div className='Map' ref={(x) => { this.container = x }}>
                </div>
            </div>
        )
    }
}
