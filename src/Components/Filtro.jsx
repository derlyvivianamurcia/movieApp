import React from "react";
import '../Style/App.css';
export default function Filtro(props) {
  return (
    <>
     <div className="App">
         <div className="row">
        <div className="col">
          <form>
            <div className="form-group">
              <br />
              <input
                onChange={props.OnchangeFiltro}
                className="form-control"
                type="text"
                placeholder="Buscar película"
              />
            </div>
          </form>
        </div>
      </div>
        </div>
    </>
  );
}