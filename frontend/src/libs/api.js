import axios from "axios";


export function geturl() {
  let url = "";
  url += window.location.protocol;
  url += "//";
  url += window.location.hostname;
  url += ":";
  url += "8080";
  return url;
}

async function refresh_token() {
  let refresh_token = window.localStorage.getItem("refresh_token");
  if (refresh_token === null || refresh_token === "") {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    throw new Error("refresh_token is null");
  }
  let url = geturl() + "/api/refresh";
  try {
    let response = await axios.post(url, {
      refresh_token: refresh_token
    });
    let new_access_token = response.data.access_token;
    let new_refresh_token = response.data.refresh_token;
    window.localStorage.setItem("access_token", new_access_token);
    window.localStorage.setItem("refresh_token", new_refresh_token);
    await new Promise(resolve => setTimeout(resolve, 50));
  } catch (error) {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    throw error;
  }
}

export async function api_with_auth_get(url) {
  let access_token = window.localStorage.getItem("access_token");
  if (access_token == null || access_token === "") {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    throw new Error("access_token is null");
  }
  try {
    let response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + access_token
      }
    });
    return response;
  }
  catch (error) {
    if (error.response.status === 401) {
      try {
        await refresh_token();
      }
      catch (error) {
        throw error;
      }
      return api_with_auth_get(url);
    }
    else {
      throw error;
    }
  }
}

export async function api_with_auth_post(url, data) {
  let access_token = window.localStorage.getItem("access_token");
  if (access_token == null || access_token === "") {
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    throw new Error("access_token is null");
  }
  try {
    let response = await axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + access_token
      }
    });
    return response;
  }
  catch (error) {
    if (error.response.status === 401) {
      try {
        await refresh_token();
      }
      catch (error) {
        throw error;
      }
      return api_with_auth_post(url, data);
    }
    else {
      throw error;
    }
  }
}

export function getParam(name) {
  let url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
