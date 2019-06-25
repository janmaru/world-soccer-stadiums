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
            minZoom: 1.5
        };

    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new MapboxGl.Map({
            container: this.container,
            style: 'mapbox://styles/janmaru/cjwy1o6ft3wlj1cn30b02hgg4',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        // inspect a cluster on click
        map.on('click', 'clusters', function (e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
            var clusterId = features[0].properties.cluster_id;
            map.getSource('stadiums').getClusterExpansionZoom(clusterId, function (err, zoom) {
                if (err)
                    return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });

        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });

        // When a click event occurs on a feature in the markers layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'unclustered-point', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
            var title = e.features[0].properties.title;

            var html = title + " (" + description + ")";

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new MapboxGl.Popup()
                .setLngLat(coordinates)
                .setHTML(html)
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'markers', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'markers', function () {
            map.getCanvas().style.cursor = '';
        });

        window.addEventListener("resize", function (event) {
            map.resize();
        })

        fetch('api/v1/geo')
            .then(response => response.json())
            .then(data => this.setState({ stadiums: data }, () => {
                map.on('load', function () {
                    // Add a new source from our GeoJSON data and set the 'cluster' option to true. GL-JS will add the point_count property to your source data.
                    map.addSource("stadiums", {
                        type: "geojson",
                        // Point to GeoJSON data.
                        data: data,
                        cluster: true,
                        clusterMaxZoom: 14, // Max zoom to cluster points on
                        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                    });

                    map.addLayer({
                        id: "clusters",
                        type: "circle",
                        source: "stadiums",
                        filter: ["has", "point_count"],
                        paint: {
                            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                            // with three steps to implement three types of circles:
                            //   * Blue, 20px circles when point count is less than 100
                            //   * Yellow, 30px circles when point count is between 100 and 750
                            //   * Pink, 40px circles when point count is greater than or equal to 750
                            "circle-color": [
                                "step",
                                ["get", "point_count"],
                                "#51bbd6",
                                100,
                                "#f1f075",
                                750,
                                "#f28cb1"
                            ],
                            "circle-radius": [
                                "step",
                                ["get", "point_count"],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    map.addLayer({
                        id: "cluster-count",
                        type: "symbol",
                        source: "stadiums",
                        filter: ["has", "point_count"],
                        layout: {
                            "text-field": "{point_count_abbreviated}",
                            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                            "text-size": 12
                        }
                    });


                    map.addLayer({
                        'id': "unclustered-point",// name of the layer 
                        'type': "symbol",
                        'source': "stadiums",
                        'filter': ["!", ["has", "point_count"]],
                        'layout': {
                            "icon-image": "stadium-15",
                            "text-field": "{title}",
                            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            "text-offset": [0, 0.6],
                            "text-anchor": "top",
                            "icon-allow-overlap": false,
                            "icon-size": 2 //this is a multiplier applied to the standard size. So if you want it half the size put ".5"
                        },
                        "paint": {
                            "text-color": "#800000",
                            "text-halo-color": "#fff",
                            "text-halo-width": 2
                        }
                    });
 
                });
            }));
    }

    render() {
        const { lng, lat, zoom } = this.state;
        return (
            <div>
                <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div className='Map' id='map' ref={(x) => { this.container = x }}>
                </div>
            </div>
        )
    }
}
