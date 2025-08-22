import { useState } from "react";
import "../styles/Card.css";

export const Card = () => {
  const [flipped, setFlipped] = useState(false);

  const onClicked = () => {
    setFlipped((prev) => !prev);
  };
  return (
    <>
      <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClicked}>
        <div className="card-front card-child"></div>
        <div className="card-back card-child"></div>
      </div>
    </>
  );
};
