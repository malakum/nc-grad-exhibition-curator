// import { createContext } from "react";
// import { useState } from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

     useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme);
       // console.log('document.body',document.body);
        localStorage.setItem("theme", theme);
    
      }, [theme]);
  
    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn , theme, setTheme }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useTheme() {
  return useContext(UserContext);
}


