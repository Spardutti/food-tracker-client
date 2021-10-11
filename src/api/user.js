const urlDev = "http://localhost:5000";

/* export const getUser = async (userId) => {
  const response = await fetch(urlDev + "/user/getuser/" + userId);
  const data = await response.json();
  return data;
}; */

/* NEW USER LOCAL LOGIN */
export const newLocalUser = async (username, password, confirmPassword) => {
  const response = await fetch(urlDev + "/user/newLocalUser", {
    method: "POST",
    body: {
      username,
      password,
      confirmPassword,
    },
  });

  const data = await response.json();
  return { data, status: response.status };
};
