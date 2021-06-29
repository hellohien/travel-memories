import React, { Component, lazy, Suspense } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageTitle = lazy(() => import('../components/page-title'));
const MemoryForm = lazy(() => import('../components/memory-form'));
const MemoryMap = lazy(() => import('../components/memory-map'));

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
    <Suspense fallback={<div className="row">Loading...</div>}>
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
    </Suspense>
    );
  }
}
