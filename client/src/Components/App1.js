import ImageSlider from "./ImageSlider";
import React from "react";
const App1 = () => {
  const slides = [
    { url: "https://st.depositphotos.com/1028979/4049/i/600/depositphotos_40493159-stock-photo-doctor-working-with-healthcare-icons.jpg"},
    { url: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg"},
    { url: "https://imageio.forbes.com/specials-images/imageserve/5dbb4182d85e3000078fddae/0x0.jpg?format=jpg&width=1200" },
    { url: "https://blog.ipleaders.in/wp-content/uploads/2018/02/BV-Acharya-3.jpg"},
    { url: "https://thumbs.dreamstime.com/b/double-exposure-smart-medical-doctor-working-abstract-operating-room-as-concept-43622592.jpg" },
  ];
  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "auto",
  };
  return (
    <div>
      <h1 className="text-bold">Medical Health Record</h1>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default App1;