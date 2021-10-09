import { useState, useEffect } from "react";
import { getUser } from "../api/user";

export const Recipe = () => {
  const [user, setUser] = useState();

  const getUserInfo = async () => {
    const userInfo = await getUser("6160672c01cc1fe46660531f");
    setUser(userInfo);
  };

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
