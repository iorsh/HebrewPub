import React, { useEffect } from "react";
import { Login, Logout, UserExpert } from "grommet-icons";
import { Button } from "grommet";
import { useSelector, useDispatch } from "react-redux";

import { setAuthAppData, clearAuthData } from "../features/toots/allTootSlice";

const LoginButton = () => {
  const dispatch = useDispatch();
  const loginCode = useSelector((state) => state.allToots.authUserData);

  // const serverURL = `${window.location.protocol}//${domain}`;
  const serverURL = "https://kishkush.net";

  return loginCode ? (
    <Button icon={<Logout />} onClick={() => dispatch(clearAuthData())} />
  ) : (
    <Button icon={<Login />} onClick={() => loginFunc(dispatch, serverURL)} />
  );  
};

export default LoginButton;

const loginFunc = async (dispatch, serverURL) => {
  // const url = `${window.location.protocol}//${window.location.host}`;
  // let domain = new URL(url);
  // domain = domain.hostname.replace("heb.", "").replace("fedivri.", "");
  const domain = new URL(serverURL).hostname;

  const appID = await genID(serverURL);
  if (appID) {
    console.log("SRV", serverURL, appID);
    const appData = {server_url : serverURL,
                     client_id : appID.client_id,
                     client_secret : appID.client_secret,
                     redirect_uri : appID.redirect_uri };
    console.log("LOGN_FUNC", appData);
    dispatch(setAuthAppData(appData));
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
