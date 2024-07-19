import React, { Component } from "react";
import './index.css'; 

class Movie extends Component {
  state = {
    movie: "",
    cardData: null,
    fetchImage: ""
  };

  onChangeMovieName = (event) => {
    this.setState({ movie: event.target.value });
  };

  onSubmitFunction = async (event) => {
    event.preventDefault();
    const { movie } = this.state;
    const replaceText = movie.replace(/ /g, '+');
    const apiSearch = `https://openlibrary.org/search.json?title=${replaceText}`;

    try {
      const response = await fetch(apiSearch);
      const data = await response.json();

      if (response.ok) {
        this.setState({ cardData: data.docs[0] }); // Assuming you want the first result
      } else {
        console.error("Failed to fetch movie data");
      }

      const imageUrl = 'https://dog.ceo/api/breeds/image/random';
      const imageFetch = await fetch(imageUrl);
      const imageData = await imageFetch.json();
      if (imageFetch.ok) {
        this.setState({ fetchImage: imageData.message });
      } else {
        console.error("Failed to fetch image");
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  render() {
    const { fetchImage, cardData } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.onSubmitFunction}>
          <input
            type="text"
            onChange={this.onChangeMovieName}
            placeholder="Movie Name"
          />
          <button type="submit">Click Me</button>
        </form>
        {fetchImage && (
          <div className="card-class">
            <img src={fetchImage} alt="Random Dog" />
            {cardData && (
              <div>
                <h2>{cardData.title}</h2>
                <p>{cardData.author_name && cardData.author_name.join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Movie;
