import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
//import 'mapbox-gl/dist/mapbox-gl.css'

export class Map extends Component {
    static displayName = Map.name;

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 1.5,
            pitch: 45,
            bearing: -17.6 
        };
 
    }

    componentDidMount() {
        const { lng, lat, zoom, pitch, bearing } = this.state;

        MapboxGl.accessToken = "pk.eyJ1IjoiamFubWFydSIsImEiOiJjaW5hMm05bmcwMDBtdzdseXhwM2E0ZWIzIn0.SCC8rQzLuE6PYDoEncrqHQ";// process.env.REACT_APP_MAPBOX_ACCESSTOKEN;

        const map = new MapboxGl.Map({
            container: this.container,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom,
            pitch,
            bearing
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', function () {
            // Add a new source from our GeoJSON data and set the
            // 'cluster' option to true. GL-JS will add the point_count property to your source data.
            map.addSource("stadiums", {
                type: "geojson",
                // Point to GeoJSON data.
                data: 'api/v1/geo',
                cluster: true
            });
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
