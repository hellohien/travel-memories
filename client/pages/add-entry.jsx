import React from 'react';
import PageTitle from '../components/page-title';
import MemoryForm from '../components/memory-form';
import MemoryMap from '../components/memory-map';

export default class AddEntry extends React.Component {
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
    const addressArray = place.address_components;
    const placeName = addressArray[0].long_name;
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
      <PageTitle title="Enter a Travel Memory" titleDescription="and see it plot on the map!"/>
        <MemoryForm
        onSubmit={this.handleSubmit}
        autocompleteInput={this.onPlaceSelected}
        handleChange={this.handleChange}
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