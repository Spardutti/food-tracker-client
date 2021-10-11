const urlDev = "http://localhost:5000";

export const getUser = async (userId) => {
  const response = await fetch(urlDev + "/user/getuser/" + userId);
  const data = await response.json();
  return data;
};
