import React from 'react';
import Autocomplete from 'react-google-autocomplete';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeVisited: '',
      date: '',
      favoriteMoments: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
  }

  onPlaceSelected(place) {
    const addressArray = place.address_components;
    const placeName = addressArray[0].long_name;
    this.setState({
      placeVisited: placeName
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
      favoriteMoments: this.state.favoriteMoments
    };
    this.props.onSubmit(newMemory);
    this.setState({ placeVisited: '', date: '', favoriteMoments: '' });
  }

  render() {
    const dateValue = this.state.date;
    const favoriteMomentsValue = this.state.favoriteMoments;
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <div className="row column-full div1">
          <label htmlFor="placeVisited">Place visited:</label>
          <Autocomplete
            placeholder=""
            apiKey={'AIzaSyCOMIu6UeiRMCLPu4VHGcVv89lFkRV-mgI'}
            onPlaceSelected={place => {
              this.onPlaceSelected(place);
            }}
            types={['(regions)']}
          />
        </div>
        <div className="row column-full">
          <label htmlFor="date">Date: </label>
          <input value={dateValue} onChange={this.handleChange} type="date" name="date" required></input>
        </div>
        <div className="row column-full">
          <label htmlFor="favoriteMoments">Favorite moments:</label>
          <input value={favoriteMomentsValue} onChange={this.handleChange} type="text" name="favoriteMoments" maxLength="65"></input>
        </div>
        <div className="row column-full submit-button-wrapper">
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default Form;
