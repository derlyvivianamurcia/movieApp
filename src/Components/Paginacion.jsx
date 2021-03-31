import React from "react";

export default function Paginacion(props) {

  return (
    <div class="row justify-content-md-center">
      <div className="row">
        <div className="col">
          <button
            className="btn btn-primary mr-3"
            onClick={props.previousPage}
          >
            Atrás
          </button>
          <button className="btn btn-primary" onClick={props.nextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}


