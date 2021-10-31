import React from "react";
import StarIcon from "@material-ui/icons/Star";

function StarRating({ value }) {
  if (!value) {
    return (
      <span
        style={{
          fontSize: "11px",
          fontWeight: "400",
          lineHeight: "18px",
          letterSpacing: "0px",
          color: "#767E86",
        }}
      >
        Unrated
      </span>
    );
  }
  return (
    <>
      {[...Array(5)].map((el, idx) => {
        if (idx < value) {
          return (
            <StarIcon
              key={idx}
              style={{
                color: "black",
                fontSize: "14px",
                height: "14px",
              }}
            />
          );
        } else {
          return (
            <StarIcon
              key={idx}
              style={{
                color: "black",
                opacity: "0.4",
                fontSize: "14px",
                height: "14px",
              }}
            />
          );
        }
      })}
    </>
  );
}

export default StarRating;
