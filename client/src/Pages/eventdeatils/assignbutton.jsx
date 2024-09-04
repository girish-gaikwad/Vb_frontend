import React, { useState } from "react";

const AssignButton = ({ adminasign, item,isDisabled }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    adminasign(item); // Call the passed adminasign function with the item
    console.log("Button clicked and disabled");
  };

  return (
    <div
      style={{
        backgroundColor: isClicked ? "#bebebe" : "#1b75d5",
        color:"white",
        borderRadius:"6px",
        padding: "5px",
        textAlign: "center",
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: "80  px",
         opacity: isDisabled ? "0.6" : "1",
        pointerEvents: isDisabled ? "none" : "auto"
      }}
      onClick={handleClick}
    >
      Assign
    </div>
  );
};

export default AssignButton;
