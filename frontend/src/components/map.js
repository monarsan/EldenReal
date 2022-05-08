import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import displayComment from "./comments";

const map_id = ["660c68bf4827712e"];
const key = "AIzaSyBZTJ4yuVc6jdJFJoQ6ii3LfmU6Jz3WfQI";

function Map(props) {
  var map = new google.maps.Map(document.getElementById("map"), opts);
  var latlng = map.getCenter();
  var lat = latlng.lat();
  var lng = latlng.lng();
  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={props.size}
        center={props.center}
        zoom={10}
        options={{ mapId: map_id[0] }}
        onDragEnd = {()=> console.log(lat)}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map); 