import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

export class Map extends Component {
    static displayName = Map.name;
    componentDidMount() {
      MapboxGl.accessToken = 'pk.eyJ1IjoiamFubWFydSIsImEiOiJjaW5hMm05bmcwMDBtdzdseXhwM2E0ZWIzIn0.SCC8rQzLuE6PYDoEncrqHQ';
  
      new MapboxGl.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/light-v9'
      })
    }
  
    render() {
      return (
        <div className='Map' ref={(x) => { this.container = x }}>
        </div>
      )
    }
}
