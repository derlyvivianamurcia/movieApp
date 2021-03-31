import React from "react";
import "../Style/App.css";
import Header from "../Components/Header.jsx";
import Filtro from "../Components/Filtro.jsx"
import Card from "../Components/Card.jsx";
import Paginacion from "../Components/Paginacion.jsx";
import Footer from "../Components/Footer.jsx"
import axios from "axios";

class Principal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedCheckboxes: [],
      genres: [],
      listadoMovies: [],
      page: 1,
    };
  }

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
    const datoBuscar = e.target.value;
    this.buscarMovies(datoBuscar);
  };

  nextPage = () => {
    this.setState({ page: this.state.page++ });
    this.traerPeliculasApi();
  };

  previousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page-- });
      this.traerPeliculasApi();
    }
  };


  onChange = id => {
    const selectedCheckboxes = this.state.selectedCheckboxes;
    const findIdx = selectedCheckboxes.indexOf(id);
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
      this.fetchGenres(selectedCheckboxes);

    }

    this.setState({
      selectedCheckboxes: selectedCheckboxes
    });
  };
  
  componentDidMount() {
    this.traerPeliculasApi();
    this.fetchGenres();
}

  render() {
    const { selectedCheckboxes } = this.state;
    return (
      <div>
        <Header />
        <div className="container">
          <Filtro OnchangeFiltro={this.handleChangeBuscarInput} />
       
          <div className="App" >
           {this.state.genres.map(genre => (
          <label key={genre.id}>
             {genre.name}
            <input
              type="checkbox"
              onChange={() => this.onChange(genre.name)}
              selected={selectedCheckboxes.includes(genre.id)}
            />
          </label>
        ))}
        <p>Categoría seleccionada: {JSON.stringify(selectedCheckboxes)}</p>
      </div>
                  <br />
          <div className="row">
            {this.state.listadoMovies.map((movie,  index) => {
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
