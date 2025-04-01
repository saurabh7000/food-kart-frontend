import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const client = import.meta.env.VITE_AUTH_CLIENT_ID;
  const redirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !client || !redirectUrl || !audience) {
    throw new Error("unable to initailize auth");
  }

  const onRedirect = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={client}
      authorizationParams={{ redirect_uri: redirectUrl, audience }}
      onRedirectCallback={onRedirect}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderWithNavigate;
