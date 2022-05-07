import axios from "axios";
import {geturl, api_with_auth_get, api_with_auth_post, getParam} from "./api";

export function twitter_authenticate() {
  let oauth_token = getParam("oauth_token");
  let oauth_verifier = getParam("oauth_verifier");
  let url = geturl() + "/api/token";
  axios.post(url, {
    oauth_token: oauth_token,
    oauth_verifier: oauth_verifier
  }).then(response => {
    let access_token = response.data.access_token;
    let refresh_token = response.data.refresh_token;
    window.localStorage.setItem("access_token", access_token);
    window.localStorage.setItem("refresh_token", refresh_token);
    window.location.href = "/";
  }).catch(error => {
    console.log(error.response);
    window.alert("error");
    window.location.href = "/";
  });
}

export function twitter_logout() {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
  window.location.href = "/";
}

export async function twitter_get_user_name() {
  let url = geturl() + "/api/get_user_name";
  return (await api_with_auth_get(url)).data;
}

export async function twitter_get_profile_image_url() {
  let url = geturl() + "/api/get_profile_image_url";
  return (await api_with_auth_get(url)).data;
}

export async function twitter_generate_url() {
  let url = geturl() + "/api/generate_url";
  let twi_url = (await axios.get(url)).data;
  window.location.href = twi_url;
}