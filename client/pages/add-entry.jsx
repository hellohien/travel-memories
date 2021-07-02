import React, { Component } from 'react';
import PageTitle from '../components/page-title';
import MemoryForm from '../components/memory-form';
import MemoryMap from '../components/memory-map';

export default class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeVisited: '',
      date: '',
      favoriteMoments: '',
      lat: '',
      long: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
  }

  onPlaceSelected(place) {
    const placeName = place.formatted_address;
    this.setState({
      placeVisited: placeName,
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng()
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMemory = {
      placeVisited: this.state.placeVisited,
      date: this.state.date,
      favoriteMoments: this.state.favoriteMoments,
      lat: this.state.lat,
      long: this.state.long
    };
    this.props.onSubmit(newMemory);
    this.setState({ placeVisited: '', date: '', favoriteMoments: '' });
  }

  render() {
    return (
      <>
        <PageTitle title="Enter a Travel Memory"/>
        <MemoryForm
          onSubmit={this.handleSubmit}
          autocompleteInput={this.onPlaceSelected}
          handleChange={this.handleChange}
          placeVisited={this.state.placeVisited}
          date={this.state.date}
          favoriteMoments={this.state.favoriteMoments}
        />
        <MemoryMap
          memories={this.props.memories}
        />
      </>
    );
  }
}
