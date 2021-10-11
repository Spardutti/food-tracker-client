import { useState, useEffect } from "react";

export const Recipe = () => {
  const [user, setUser] = useState();

  const getUserInfo = async () => {};

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <p>{user && user.username}</p>
      <div>{user && user.fridge[0].name}</div>
    </div>
  );
};
