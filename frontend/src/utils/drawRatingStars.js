//==========
// Utility Functions: Draw Vendor Rating Stars
//==========
// Dependencies
import React from "react";

// Function to dynamically draw rating stars based on the rating value
const drawRatingStars = (rating) => {
  if (rating === 0 && rating < 0.5) {
    return React.createElement("p", { className: "m-0" }, "- not rated yet -");
  } else if (rating >= 0.5 && rating < 1) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star-half-stroke" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 1 && rating < 1.5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 1.5 && rating < 2) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star-half-stroke" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 2 && rating < 2.5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 2.5 && rating < 3) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star-half-stroke" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 3 && rating < 3.5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 3.5 && rating < 4) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star-half-stroke" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 4 && rating < 4.5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-regular fa-star" })
    );
  } else if (rating >= 4.5 && rating < 5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star-half-stroke" })
    );
  } else if (rating === 5) {
    return React.createElement(
      "div",
      null,
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" }),
      React.createElement("i", { className: "fa-solid fa-star" })
    );
  }
};

export { drawRatingStars };
