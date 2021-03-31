import React from "react";
import ReactStarRating from "react-star-ratings-component";


export default function Star() {
  return (

    <ReactStarRating
      numberOfStar={5}
      numberOfSelectedStar={2}
      colorFilledStar="red"
      colorEmptyStar="black"
      starSize="20px"
      spaceBetweenStar="10px"
      disableOnSelect={false}
      onSelectStar={val => {
        console.log(val);
      }}
    />
  );
}

