import { useEffect, useState } from "react";
import {Hub, Auth} from "aws-amplify";

function UserAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
        default:
          break;
      }
    });

    getUser().then((userData) => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  return (
    <div>
      {user ? (
        <div onClick={() => Auth.signOut()}>Sign Out</div>
      ) : (
        <div onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
          Sign In with Google
        </div>
      )}
    </div>
  );
}

export default UserAuth;
