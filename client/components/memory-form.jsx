import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class MemoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
    };
    this.notify = this.notify.bind(this);
  }

  notify() {
    toast.success('Entry submitted successfully', {
      position: 'top-center',
      toastId: this.state.id,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
    this.setState({ id: this.state.id + 1 });
  }

  render() {
    const { onSubmit, handleChange } = this.props;
    const { placeVisited, date, favoriteMoments, isSubmitted } = this.props;
    return (
      <>
        <form id="form" onSubmit={onSubmit}>
          <div className="row column-full">
            <label htmlFor="placeVisited">Place visited:</label>
            <Autocomplete
              id="placeVisited"
              placeholder="Enter a location"
              value={placeVisited}
              name="placeVisited"
              onChange={handleChange}
              apiKey={'AIzaSyCOMIu6UeiRMCLPu4VHGcVv89lFkRV-mgI'}
              onPlaceSelected={place => {
                this.props.autocompleteInput(place);
              }}
              types={['(regions)']}
              onFocus={event => {
                event.target.setAttribute('autocomplete', 'off');
              }}
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="date">Date: </label>
            <input
              value={date}
              onChange={handleChange}
              id="date"
              type="date"
              name="date"
              required
            />
          </div>
          <div className="row column-full">
            <label htmlFor="favoriteMoments">Favorite moments:</label>
            <input
              value={favoriteMoments}
              onChange={handleChange}
              id="favoriteMoments"
              type="text"
              name="favoriteMoments"
              maxLength="80"
              autoComplete="off"
              />
          </div>
          <div className="row column-full submit-button-wrapper">
                <button onClick={this.notify}>Submit</button>
          </div>
        </form>
        {isSubmitted
          ? <ToastContainer />
          : null
        }
      </>
    );
  }
}
