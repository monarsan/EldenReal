import React, {useState, useEffect} from "react";
import Map from "./components/map";
import Header from "./components/header";
import { AddCommentDialog } from "./components/dialog";
import { is_authenticated } from "./libs/twitter";

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    is_authenticated().then((res) => {
      setLogin(res);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="map-container">
        <Map 
          size={ { width: "100%", height: "100%" } }
          center={ { lat: -34.397, lng: 150.644 } }
        />
      </div>
      <AddCommentDialog login={login}/>
    </>
  );
};

export default App;