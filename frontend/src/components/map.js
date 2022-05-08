import React, {useState, useEffect} from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useGoogleMap } from '@react-google-maps/api'

const map_id = ["660c68bf4827712e"];
const key = "AIzaSyBZTJ4yuVc6jdJFJoQ6ii3LfmU6Jz3WfQI";

function Map(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }, (err) => {
      console.log(err);
    }, options);
  }, []);
  if (lat && lng) {
    return (
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={props.size}
          center={ { lat: lat, lng: lng } }
          zoom={10}
          options={{ mapId: map_id[0] }}
        >
          <MapContainer />
        </GoogleMap>
      </LoadScript>
    );
  } else {
    return null;
  }
}

function MapContainer(props) {
  const map = useGoogleMap();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    if (map) {
      map.addListener("center_changed", (event) => {
        setLat(map.getCenter().lat());
        setLng(map.getCenter().lng());
      });
    }
  }, [map]);

  useEffect(() => {
    if (lat && lng) {
      console.log(map.getBounds());
    }
  }, [lat, lng]);
  return (
    <></>
  );
}

export default React.memo(Map); 