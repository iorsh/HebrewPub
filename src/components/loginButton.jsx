import React, { useEffect } from "react";
import { Login, Logout, UserExpert } from "grommet-icons";
import { Button } from "grommet";
import { useSelector, useDispatch } from "react-redux";

import { setMyServerURL, clearToken } from "../features/toots/allTootSlice";

export const LoginButton = () => {
  const dispatch = useDispatch();
  const loginCode = useSelector((state) => state.allToots.loginToken);

  return loginCode ? (
    <Button icon={<Logout />} onClick={() => dispatch(clearToken())} />
  ) : (
    <Button icon={<Login />} onClick={() => loginFunc()} />
  );
};

const loginFunc = async () => {
  const appURL = `${window.location.protocol}//${window.location.host}`;
  let domain = new URL(appURL);
  domain = domain.hostname.replace("heb.", "").replace("fedivri.", "");
  // const myServerURL = `${window.location.protocol}//${domain}`;
  const myServerURL = "https://kishkush.net";

  const appID = await genID(appURL, myServerURL);
  if (appID) {
    console.log(appID);

    const appData = {server_url : myServerURL,
      client_id : appID.client_id,
      client_secret : appID.client_secret,
      redirect_uri : appID.redirect_uri };
    // Set my URL in state
    setMyServerURL(appData);
    localStorage.setItem("appData", JSON.stringify(appData));

    login(appID, myServerURL);
  } else console.error(`Cannot generate app ID on server ${myServerURL}`);
};

const genID = async (appURL, myServerURL) => {
  const formData = new FormData();

  formData.append("client_name", "פדעברי: הפדיברס העברי");
  formData.append("redirect_uris", appURL);
  formData.append("website", appURL);

  const response = await fetch(
    `${myServerURL}/api/v1/apps`,
    {
      method: "POST",
      body: formData,
    }
  );

  const appID = await response.json();
  localStorage.setItem("appID", appID);
  return appID;
};

const login = (appID, myServerURL) => {
  const response_type = "code";
  const client_id = appID.client_id;
  const redirect_uri = appID.redirect_uri;

  const hrefTarget = `${myServerURL}/oauth/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  window.location.replace(hrefTarget);
};

export const genToken = async (appData, code, myServerURL) => {
  const formData = new FormData();

  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("client_id", appData.client_id);
  formData.append("client_secret", appData.client_secret);
  formData.append("redirect_uri", appData.redirect_uri);

  const response = await fetch(
    `${myServerURL}/oauth/token`,
    {
      method: "POST",
      body: formData,
    }
  );

  const tokenData = await response.json();
  console.log("status", response.status);
  if (response.status == 200) {
    const tt = await tokenData.access_token;
    console.log("TOKEN!!!", tt);
    localStorage.setItem("TOKEN", tt);
    return tt;
  } else {
    return null;
  }
};
