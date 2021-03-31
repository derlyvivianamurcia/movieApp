import React from "react";
import { Link } from "react-router-dom";
import Star from "./Star.jsx"

export default function Card({ name, image, to, vote_average }) {
  return (
    <div className=" justify-content-center col-lg-4 col-md-6 col-sm-12" >
      <div className="card" style={{ width: "18rem", height: "515px" }}>
        <img
          src={image}
          className="card-img-top img-fluid"
          style={{ width: "18rem", height: "310px" }}
          alt="imagen_card"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p>Nota: {vote_average}</p>
            <Star />           
          <Link to={to} className="btn btn-danger">
            Ver Detalle
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
}

