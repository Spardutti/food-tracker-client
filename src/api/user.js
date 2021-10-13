import jwt, { decode } from "jsonwebtoken";
const urlDev = "http://localhost:5000";
let token;
let decodedToken;

const params = {
  Authorization: token,
  "Content-Type": "application/json",
};

/* CHECK FOR LOCAL TOKEN */
export const checkLocalToken = () => {
  token = localStorage.getItem("food-token");
  if (token) {
    decodedToken = jwt.decode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if (expiresAt < new Date(Date.now())) {
      localStorage.removeItem("food-token");
    } else return (token = "Bearer " + token);
  } else return null;
};

/* CREATE NEW USER LOCAL  */
export const newLocalUser = async (username, password, confirmPassword) => {
  const response = await fetch(urlDev + "/user/newLocalUser", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      username,
      password,
      confirm: confirmPassword,
    }),
  });

  const data = await response.json();
  return { data, status: response.status };
};

/* LOCAL USER LOGIN */
export const localLogin = async (username, password) => {
  const response = await fetch(urlDev + "/user/localLogin", {
    method: "POST",
    headers: params,
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (response.status === 200) localStorage.setItem("food-token", data.token);

  return { data, status: response.status };
};
