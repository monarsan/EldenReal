import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const map_id = ["660c68bf4827712e"];
const key = "AIzaSyBZTJ4yuVc6jdJFJoQ6ii3LfmU6Jz3WfQI";

function Map(props) {
  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={props.size}
        center={props.center}
        zoom={10}
        options={{ mapId: map_id[0] }}
      >
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);