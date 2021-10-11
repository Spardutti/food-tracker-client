const urlDev = "http://localhost:5000";
const params = {
  //Authorization: token,
  "Content-Type": "application/json",
};

/* export const getUser = async (userId) => {
  const response = await fetch(urlDev + "/user/getuser/" + userId);
  const data = await response.json();
  return data;
}; */

/* NEW USER LOCAL LOGIN */
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
