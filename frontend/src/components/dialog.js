import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, Fab, DialogActions, Select, MenuItem, DialogContent, FormControl, InputLabel, FormGroup, Box, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { geturl } from "../libs/api";
import axios from "axios";
import { key } from "../env";
import { api_with_auth_post } from "../libs/api";

export function AddCommentDialog(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [open, setOpen] = useState(false);
  const [fixedforms, setFixedForms] = useState([]);
  const [fixedform_id, setFixedFormId] = useState(0);

  const [places, setPlaces] = useState([]);
  const [place_id, setPlaceId] = useState("");
  const nearby_search_endpoint = geturl() + "/api/proxy/nearbysearch";

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  const handleClickOpen = () => {
    navigator.geolocation.getCurrentPosition(getPlaces, (err) => {console.log(err);}, options);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFixedFormChange = (event) => {
    setFixedFormId(event.target.value);
  }

  const handlePlaceChange = (event) => {
    setPlaceId(event.target.value);
  }

  const submit_comment = async () => {
    let place_name = "";
    for (let i = 0; i < places.length; i++) {
      if (places[i].place_id === place_id) {
        place_name = places[i].name;
      }
    }
    let free_content = document.getElementById("free").value;

    const data = {
      lat: lat,
      lng: lng,
      fixed_form_content1: place_name,
      fixed_form_content2: free_content,
      fixed_form_id: fixedform_id,
      popup_id: 1
    };

    api_with_auth_post(geturl() + "/api/comment/create", data).then(
      (res) => {
        console.log(res);
        setOpen(false);
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  const getPlaces = async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setLat(lat);
    setLng(lng);
    const radius = 100;
    const url = `${nearby_search_endpoint}?lat=${lat}&lng=${lng}&radius=${radius}&api_key=${key}`;
    const response = await axios.get(url);
    setPlaces(response.data.results);
  }

  useEffect(() => {
    const endpoint = geturl() + "/api/fixed_form/";
    axios.get(endpoint).then((res) => {
      setFixedForms(res.data);
      setFixedFormId(res.data[0].id);
    }
    ).catch((err) => {
      console.log(err);
    });

  }, []);

  return (
    <>
      <div className="fab-container">
        <Fab color="primary" aria-label="add" onClick={ handleClickOpen }>
          <AddIcon />
        </Fab>
      </div>
      <Dialog open={open} onClose={() => { handleClose; }}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 500}}>
            <FormGroup>
              <Box sx={{ display: "flex", flexDirection: "column", p:2}}>
                <FormControl fullWidth>
                <InputLabel id="fixed_forms_label">Comment</InputLabel>
                  <Select id="fixed_forms" value={ fixedform_id } onChange={handleFixedFormChange} labelId="fixed_forms_label" label="Comment">
                    {
                      fixedforms.map((form) => {
                        return (
                          <MenuItem key={form.id} value={form.id}>{form.content}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", p:2}}>
                <FormControl fullWidth>
                  <InputLabel id="place_id_label">Place</InputLabel>
                  <Select id="places" value={ place_id } onChange={handlePlaceChange} labelId="place_id_label" label="Place">
                    {
                      places.map((place) => {
                        return (
                          <MenuItem key={place.place_id} value={place.place_id}>{place.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", p:2}}>
                <FormControl fullWidth>
                  <TextField id="free" label="Free"></TextField>
                </FormControl>
              </Box>
            </FormGroup>
          </Box>
        </DialogContent>
        { props.login ? ( <></> ) : ( <p>Please login to add comment</p> ) }
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
          { props.login ? (<Button onClick={submit_comment}>SUBMIT</Button>) : ( <></> ) }
        </DialogActions>
      </Dialog>
    </>
  );
}