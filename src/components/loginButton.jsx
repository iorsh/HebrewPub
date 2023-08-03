import React, { useEffect } from "react";
import { Login, Logout, UserExpert } from "grommet-icons";
import { Button } from "grommet";
import { useSelector, useDispatch } from "react-redux";

import { setAuthURL, clearAuthData } from "../features/toots/allTootSlice";

const LoginButton = () => {
  const dispatch = useDispatch();
  const loginCode = useSelector((state) => state.allToots.loginToken);

  const serverURL = `${window.location.protocol}//${domain}`;

  return loginCode ? (
    <Button icon={<Logout />} onClick={() => dispatch(clearAuthData())} />
  ) : (
    <Button icon={<Login />} onClick={() => {dispatch(setAuthURL(serverURL)); loginFunc(serverURL)}} />
  );
};

export default LoginButton;

const loginFunc = async (serverURL) => {
  const url = `${window.location.protocol}//${window.location.host}`;
  let domain = new URL(url);
  domain = domain.hostname.replace("heb.", "").replace("fedivri.", "");

  const appID = await genID(serverURL);
  if (appID) {
    login(appID, serverURL);
  } else console.error(`Cannot generate app ID on server ${domain}`);
};

const genID = async (serverURL) => {
  const formData = new FormData();

  formData.append("client_name", "פדעברי: הפדיברס העברי");
  formData.append(
    "redirect_uris",
    `${window.location.protocol}//${window.location.host}`
  );
  formData.append(
    "website",
    `${window.location.protocol}//${window.location.host}`
  );

  const response = await fetch(
    `${serverURL}/api/v1/apps`,
    {
      method: "POST",
      body: formData,
    }
  );

  const appID = await response.json();
  return appID;
};

const login = (appID, serverURL) => {
  const response_type = "code";
  const client_id = appID.client_id;
  const redirect_uri = appID.redirect_uri;

  const hrefTarget = `${serverURL}/oauth/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  window.location.replace(hrefTarget);
};
