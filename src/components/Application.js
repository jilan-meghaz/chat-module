import React, {useContext} from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import Chat from "./Chat";
import PasswordReset from "./PasswordReset";
import {UserContext} from "../providers/UserProvider";


function Application() {
//   const user = null;
    const user = useContext(UserContext);
  console.log("user now is --> ", user)
  return (
        user ?
        <Chat user={user}/>
        // <ProfilePage />
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}
export default Application;