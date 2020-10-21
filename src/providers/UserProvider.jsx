import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
        console.log("UserProvider.jsx component --> onAuthStateChanged")
        const user = await generateUserDocument(userAuth);
        console.log("UserProvider.jsx component (user) --> ", user)
      this.setState({ user });
    });
  };


  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;