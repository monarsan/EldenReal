import React from "react";
import Map from "./components/map";
import Header from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <div className="map-container">
        <Map 
          size={ { width: "100%", height: "100%" } }
          center={ { lat: -34.397, lng: 150.644 } }
        />
      </div>
    </>
  );
};

export default App;