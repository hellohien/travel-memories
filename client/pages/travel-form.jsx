import React from 'react';
import Autocomplete from 'react-google-autocomplete';

export default class TravelAddEntry extends React.Component {
  render() {
    const { onSubmit, handleChange } = this.props;
    const { date } = this.props;
    const { favoriteMoments } = this.props;
    return (
      <form id="form" onSubmit={onSubmit}>
        <div className="row column-full div1">
          <label htmlFor="placeVisited">Place visited:</label>
          <Autocomplete
            id="placeVisited"
            placeholder=""
            apiKey={'AIzaSyCOMIu6UeiRMCLPu4VHGcVv89lFkRV-mgI'}
            onPlaceSelected={place => {
              this.props.autocompleteInput(place);
            }}
            types={['(regions)']}
          />
        </div>
        <div className="row column-full">
          <label htmlFor="date">Date: </label>
          <input value={date} onChange={handleChange} id="date" type="date" name="date" required></input>
        </div>
        <div className="row column-full">
          <label htmlFor="favoriteMoments">Favorite moments:</label>
          <input value={favoriteMoments} onChange={handleChange} id="favoriteMoments" type="text" name="favoriteMoments" maxLength="65"></input>
        </div>
        <div className="row column-full submit-button-wrapper">
          <button>Submit</button>
        </div>
      </form>
    );
  }
}
