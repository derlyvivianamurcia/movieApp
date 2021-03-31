import React, { Component } from "react";
import "../Style/App.css";
import axios from "axios";
import { Link } from "react-router-dom";
class DetalleMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_language: "",
      overview: "",
      poster_path: "",
      release_date: "",
      title: "",
      vote_average: "",
      vote_count: "",
      runtime: "",
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;

    console.log("id que llega " + id);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/` +
        id +
        `?api_key=4a48bbc6d73f2ceac252225dfe343a0d`
      )
      .then((response) => {
        console.log(response);
        this.setState({
          original_language: response.data.original_language,
          overview: response.data.overview,
          poster_path:
            `https://image.tmdb.org/t/p/w400` + response.data.poster_path,
          release_date: response.data.release_date,
          title: response.data.title,
          vote_average: response.data.vote_average,
          vote_count: response.data.vote_count,
          runtime: response.data.runtime,
        });
      });
  }

  render() {
    return (
      <div className="container container-detalles">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img
              className="img-fluid"
              style={{ width: "25rem", height: "25rem" }}
              src={this.state.poster_path}
              alt=""
            />
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6">
            <h3>{this.state.title}</h3>
            <br />
            <p>
              <strong>Duración </strong>
              {this.state.runtime} minutos
            </p>
            <p>
              <strong>Visión general </strong>
              {this.state.overview}
            </p>
            <p>
              <strong>Lenguaje </strong>
              {this.state.original_language}
            </p>
            <p>
              <strong>Fecha Lanzamiento </strong>
              {this.state.release_date}
            </p>
            <p>
              <strong>Puntuación </strong>
              {this.state.vote_average}
            </p>
            <p>
              <strong>Total votos </strong>
              {this.state.vote_count}
            </p>

            <div class="row justify-content-md-center">

              <div className="row">
                <div className="col">
                  <Link to="/principal">
                    <button
                      className="btn btn-primary mr-3"
                    >
                      Atras
          </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetalleMovies;
