import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
    },
  },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-5 h-screen justify-center items-center">
      <Authenticator>
        {({ user }: any) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
