import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
module.exports = {
    function CreateMap(lng, lat, zoom, minZoom) {

    const map = new MapboxGl.Map({
        container: this.container,
        style: 'mapbox://styles/janmaru/cjwy1o6ft3wlj1cn30b02hgg4',
        center: [lng, lat],
        zoom,
        minZoom
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
}

 };