import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import { twitter_generate_url, twitter_authenticate, twitter_get_user_name, twitter_get_profile_image_url, twitter_logout} from "../libs/twitter";
import { getParam } from "../libs/api";

export default function Header() {
  const [userName, setUserName] = React.useState(null);
  const [profileImageUrl, setProfileImageUrl] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (getParam("oauth_token") != "" && getParam("oauth_verifier") != "") {
      twitter_authenticate();
    }

    if (window.localStorage.getItem("access_token") != null) {
      twitter_get_user_name().then(userName => {
        setUserName(userName);
      }).catch(error => {
        console.log(error);
      });

      twitter_get_profile_image_url().then(profileImageUrl => {
        setProfileImageUrl(profileImageUrl);
      }).catch(error => {
        console.log(error);
      });

    }
    
  }, []);

  React.useEffect(() => {
    if (userName != null && profileImageUrl != null) {
      setIsAuthenticated(true);
    }
  }), [userName, profileImageUrl];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontFamily: "Jim Nightshade", color: "#D0B000"}}>
            EldenReal
          </Typography>
          {isAuthenticated ? (
            <>
              <Avatar alt={userName} src={profileImageUrl} />
              <Button color="inherit" onClick={() => {twitter_logout();}}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => {twitter_generate_url();}}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}