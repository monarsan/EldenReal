import React, {useState, useEffect} from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { useGoogleMap } from "@react-google-maps/api";
import { geturl } from "../libs/api";
import axios from "axios";
import { Popup } from "./popup";
import {Box, CircularProgress} from "@mui/material";
import { PosMarker } from "./marker";
import { key, map_id } from "../env";

function Map(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
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
          <Comments />
          <PosMarker />
        </GoogleMap>
      </LoadScript>
    );
  } else {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
        <CircularProgress />
      </Box>
    );
  }
}

function Comments(props) {
  const map = useGoogleMap();
  const [comments, setComments] = useState([]);
  const [lastcalled, setLastCalled] = useState(0);

  const getComments = async () => {
    if (map) {
      setLastCalled( (oldcalled) => {
        if (oldcalled < Date.now() - 250) {
          const bounds = map.getBounds();
          if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            const api_endpoint = geturl() + `/api/comment/neighborhood/?top=${ne.lat()}&right=${ne.lng()}&bottom=${sw.lat()}&left=${sw.lng()}`;
            axios.get(api_endpoint).then((res) => {
              setComments(res.data);
              console.log(res.data);
            }).catch((err) => {
              console.log(err);
            });
          }
          return Date.now();
        }
        return oldcalled;
      });
    }
  };

  useEffect(() => {
    if (map) {
      map.addListener("bounds_changed", (event) => {
        getComments();
      });
    }
  }, []);

  return (
    comments.map((comment) => {
      return (
        <OverlayView
          key={comment.id}
          position={{ lat: comment.lat, lng: comment.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Popup comment={comment} />
        </OverlayView>
      );
    })
  );
}

export default React.memo(Map); 