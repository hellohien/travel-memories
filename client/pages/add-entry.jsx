import React, { Component } from 'react';
import PageTitle from '../components/page-title';
import MemoryForm from '../components/memory-form';
import MemoryMap from '../components/memory-map';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.displayToast = this.displayToast.bind(this);
  }

  onPlaceSelected(place) {
    const addressArray = place.address_components;
    const placeName = addressArray[0].long_name + ', ' + addressArray[2].short_name;
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

  displayToast() {
    toast.configure();
    toast.success('Entry submitted successfully', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: false,
      progress: undefined
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
    this.displayToast();
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
          isSubmitted={this.state.isSubmitted}
        />
        <MemoryMap
          memories={this.props.memories}
        />
    </>
    );
  }
}
