import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class TravelMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7749,
        longitude: 122.4194,
        zoom: 5
      }
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  handleViewportChange(viewport) {
    this.setState({ viewport });
  }

  render() {
    const memories = this.props.memories;
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
        {this.props.memories.map((location, index) => (
          <Marker
            key={memories[index].memoryId}
            latitude={parseFloat(memories[index].lat)}
            longitude={parseFloat(memories[index].long)}
            offsetLeft={-5} offsetTop={-20}
            >
            <div className="marker">
              <i className="fa fa-map-marker"></i>
            </div>
          </Marker>
        ))}
        </ReactMapGL>
      </div>
    );
  }

}
