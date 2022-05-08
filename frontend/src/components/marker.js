import React, {useState, useEffect} from "react";
import { Marker } from "@react-google-maps/api";

export function PosMarker(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }, (err) => {
      console.log(err);
    }, options);
  }, []);

  if (lat && lng) {
    return (
      <Marker position={{ lat: lat, lng: lng }} />
    );
  } else {
    return (
      <></>
    );
  }

}