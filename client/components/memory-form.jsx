import React from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function MemoryForm(props) {
  const { onSubmit, handleChange } = props;
  const { placeVisited, date, favoriteMoments, networkError } = props;
  const errorMessage = (
    networkError
      ? 'Could not submit entry. Please try again later.'
      : null
  );
  return (
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
              props.autocompleteInput(place);
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
            maxLength="75"
            autoComplete="off"
            />
        </div>
        <p className="row column-full error-message">
          {errorMessage}
        </p>
        <div className="row column-full submit-button-wrapper">
          <button aria-label="Center Align">Submit</button>
        </div>
      </form>
  );
}
