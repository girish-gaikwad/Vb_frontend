import React from "react";

const Popup = ({ closePopup, selectedItem }) => {
  console.log("inside tge popup component", selectedItem);
  return (
    <>
      {/* Gray background overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent gray background
          zIndex: 999, // Below the popup
        }}
        onClick={closePopup} // Close the popup if the background is clicked
      />

      {/* Popup content */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          border: "1px solid #ccc",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000, // Above the gray background
        }}
      >
        <h2>Popup Title</h2>
        <p>{selectedItem.id}</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis
        sunt obcaecati repellendus veritatis. Reiciendis nam maiores architecto
        perspiciatis laboriosam, minus alias atque nemo natus! Deleniti quod
        ullam voluptas praesentium voluptatem aspernatur sequi ut accusamus
        adipisci eligendi eaque natus soluta tempora ex quibusdam libero,
        tenetur accusantium at odit! Eum eaque vel itaque, eveniet quia quis
        consectetur modi explicabo dignissimos impedit nulla non aperiam est
        odio consequuntur doloribus distinctio quasi deleniti unde nihil saepe
        repellendus mollitia ducimus. Consectetur magnam beatae fugit distinctio
        asperiores? Quod, nemo labore error illo eveniet cumque. Debitis eum
        quibusdam corporis totam quidem. Aut corporis culpa ut. Cumque, delectus
        tempore voluptas saepe alias ullam possimus dolor, rem natus deleniti
        libero veritatis ad omnis, earum quis sequi odit nisi corrupti tempora?
        Optio a ipsa repellat magni ad. Corporis beatae minus facilis veritatis
        iusto cum assumenda exercitationem ipsum odio quia quidem nihil, ab,
        incidunt reiciendis nam voluptatem aliquid, animi asperiores.
        <button onClick={closePopup}>Close</button>
      </div>
    </>
  );
};

export default Popup;
