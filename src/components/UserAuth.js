import { useEffect, useState } from "react";
import { Hub, Auth } from "aws-amplify";

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
        <button
          onClick={() => Auth.signOut()}
          className="mx-auto text-center font-bold bg-textSecondary text-neutralPrimary rounded-full py-3 px-4"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => Auth.federatedSignIn({ provider: "Google" })}
          className="inline-flex gap-2 items-center mx-auto text-center font-bold bg-textSecondary text-neutralPrimary rounded-full py-3 px-4"
        >
          <div>Sign In with Google</div>
          <img
            className="w-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png"
          />
        </button>
      )}
    </div>
  );
}

export default UserAuth;
