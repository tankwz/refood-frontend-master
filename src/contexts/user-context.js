/** @format */

const { useState, useContext } = require("react");
const { createContext } = require("react");

const UserContext = createContext();

function UserProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const values = [userInfo, setUserInfo];
  return (
    <UserContext.Provider value={values} {...props}></UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (typeof context === "undefined")
    throw new Error("useUser must be used within UserProvider");
  return context;
}

export { useUser, UserProvider };
