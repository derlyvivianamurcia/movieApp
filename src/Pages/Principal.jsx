import React from "react";
import "../Style/App.css";
import Header from "../Components/Header.jsx";
import Filtro from "../Components/Filtro.jsx"
import Card from "../Components/Card.jsx";
import Paginacion from "../Components/Paginacion.jsx";
import Footer from "../Components/Footer.jsx"
import axios from "axios";
import { Dropdown } from 'react-bootstrap';


class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      genres: [],
      listadoMovies: [],
      page: 1,
    };
  }

  async componentDidMount(genres) {
    try {
      this.traerPeliculasApi(genres)
        .then(response => response.json())
    } catch (e) {
      this.setState({ loading: false, error: true })
    }
  }
  componentWillMount() {
    this.fetchGenres();
  };
  fetchGenres() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4a48bbc6d73f2ceac252225dfe343a0d&language=en-US')
      .then(response => response.json())
      .then(json => this.setState({ genres: json.genres }));
  };


  traerPeliculasApi() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4a48bbc6d73f2ceac252225dfe343a0d&language=en-US&page=` +
        this.state.page
      )
      .then((resultado) => {
        console.log(resultado);
        this.setState({
          listadoMovies: resultado.data.results,
          page: resultado.data.page,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buscarMovies(buscar) {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=1e2e52c940e7eac822bd4b4a622bb94a&language=en-US&query=` +
        buscar
      )
      .then((resultado) => {
        this.setState({ listadoMovies: resultado.data.results });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeBuscarInput = (e) => {
    const valorParaBuscar = e.target.value;
    console.log(valorParaBuscar);
    this.buscarMovies(valorParaBuscar);
  };

  nextPage = () => {
    console.log(this.state);
    this.setState({ page: this.state.page++ });
    this.traerPeliculasApi();
  };

  previousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page-- });
      this.traerPeliculasApi();
    }
  };
  changeGenre(genres) {
    this.componentDidMount(genres);
  }
  render() {
    const { genres } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <Filtro OnchangeFiltro={this.handleChangeBuscarInput} />
          <div class="row justify-content-md-center">
            <Dropdown key={genres.id}>
              <Dropdown.Toggle variant='danger' id='dropdown-basic'> Géneros </Dropdown.Toggle>
              <Dropdown.Menu> {this.state.genres.map(genre => (
                <Dropdown.Item eventKey={genre.id} key={genre.id} onSelect={genre => this.changeGenre(genre)}> {genre.name} </Dropdown.Item>))}
              </Dropdown.Menu>
            </Dropdown>

          </div>
          <br />
          <div className="row">
            {this.state.listadoMovies.map((movie, index) => {
              return (
                <Card
                  key={index}
                  name={movie.title}
                  vote_average={movie.vote_average}
                  to={`/detalle-movie/${movie.id}`}
                  image={`https://image.tmdb.org/t/p/w400` + movie.poster_path}
                />
              );
            })}
          </div>
          <Paginacion previousPage={this.previousPage} nextPage={this.nextPage} />
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default Principal;
