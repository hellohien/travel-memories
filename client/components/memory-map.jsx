import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

export default class MemoryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7749,
        longitude: 122.4194,
        zoom: 0
      },
      selectedLocation: null
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleViewportChange(viewport) {
    this.setState({ viewport });
  }

  handleClose() {
    this.setState({ selectedLocation: null });
  }

  render() {
    const { memories } = this.props;
    const { selectedLocation } = this.state;
    return (
      <div id="map">
        <ReactMapGL
          {...this.state.viewport}
          height='450px'
          width='85%'
          mapboxApiAccessToken={'pk.eyJ1IjoiaG5ndXkxNzkiLCJhIjoiY2twMnFzYWN4MDU5OTJ4cWxhM3E2eGx3ayJ9.KPU6AqAdzJw80HNFYpe2Cg'}
          mapStyle="mapbox://styles/hnguy179/ckp8w87hp09u317o0irqictao"
          onViewportChange={this.handleViewportChange}
        >
        {memories.map(memory => (
          <Marker
            key={memory.memoryId}
            latitude={parseFloat(memory.lat)}
            longitude={parseFloat(memory.long)}
            offsetLeft={-20} offsetTop={-25}
          >
            <button
              aria-label="Center Align"
              onClick={e => {
                e.preventDefault();
                this.setState({ selectedLocation: memory });
              }}
            >
              <i className="fa fa-map-marker"></i>
            </button>
          </Marker>
        ))}
        { selectedLocation
          ? <Popup
              latitude = {parseFloat(selectedLocation.lat)}
              longitude = {parseFloat(selectedLocation.long)}
              onClose = {this.handleClose}
            >
              <div>{selectedLocation.placeVisited}</div>
            </Popup>
          : null
        }
        </ReactMapGL>
      </div>
    );
  }
}
