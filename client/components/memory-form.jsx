import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MemoryForm(props) {
  const notify = () => {
    toast('Entry submitted successfully', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const { onSubmit, handleChange } = props;
  const { placeVisited, date, favoriteMoments, isSubmitted } = props;
  return (
    <form id="form" onSubmit={onSubmit}>
      <div className="row column-full div1">
        <label htmlFor="placeVisited">Place visited:</label>
        <Autocomplete
          id="placeVisited"
          value={placeVisited}
          placeholder="Enter a location"
          apiKey={'AIzaSyCOMIu6UeiRMCLPu4VHGcVv89lFkRV-mgI'}
          onPlaceSelected={place => {
            props.autocompleteInput(place);
          }}
          onChange={handleChange}
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
          id="date" type="date"
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
        <button onClick={notify}>Submit</button>
      </div>
      {isSubmitted
        ? <ToastContainer/>
        : null}
    </form>
  );
}
