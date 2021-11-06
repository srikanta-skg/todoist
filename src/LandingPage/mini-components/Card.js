import React from "react";
import StarRating from "./StarRating";

const Card = ({ title, star, details, text }) => {
  return (
    <div style={{}}>
      <h5>{title}</h5>
      <div>
        {star && <StarRating value={star} />}
        {text && <h4>{text}</h4>}
      </div>
      <h2>{details}</h2>
    </div>
  );
};

export default Card;
