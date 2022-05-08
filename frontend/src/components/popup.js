import React, {useState, useEffect} from "react";
import { Button, Divider, CircularProgress } from "@mui/material";
import { geturl } from "../libs/api";
import axios from "axios";


export function Popup(props) {
  const comment = props.comment;
  const [user, setUser] = useState(null);
  const [fixed_form, setFixedForm] = useState(null);

  useEffect(() => {
    const api_endpoint_user = geturl() + `/api/user/${comment.user_id}`;
    const api_endpoint_fixed_form = geturl() + `/api/fixed_form/${comment.fixed_form_id}`;
    axios.get(api_endpoint_user).then((res) => {
      setUser(res.data);
    });
    axios.get(api_endpoint_fixed_form).then((res) => {
      setFixedForm(res.data);
    });
  }, []);

  if (user == null || fixed_form == null) {
    return (
      <div className={"popup-" + comment.popup_id}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <div className={"popup-" + comment.popup_id}>
          <p>{user.name}</p>
          <Divider light />
          <p>{fixed_form.content.replace("{Place}", comment.fixed_form_content1).replace("{Free}", comment.fixed_form_content2)}</p>
        </div>
      </>
    );
  }
}