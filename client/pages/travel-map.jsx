import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default class TravelMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 47.7511,
        longitude: 120.7401,
        width: '80vw',
        height: '50vh',
        zoom: 1
      },
      selectedPlace: null,
      setSelectedPlace: null
    };
  }

  render() {
    const memories = this.props.memories;
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoiaG5ndXkxNzkiLCJhIjoiY2twMnFzYWN4MDU5OTJ4cWxhM3E2eGx3ayJ9.KPU6AqAdzJw80HNFYpe2Cg'}
          mapStyle="mapbox://styles/hnguy179/ckp8w87hp09u317o0irqictao"
          onViewportChange={viewport => this.setState({ viewport })}
        >
        {this.props.memories.map((location, index) => (
          <Marker
            key={memories[index].memoryId}
            latitude={parseInt(memories[index].lat)}
            longitude={parseInt(this.props.memories[index].long)}>
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
