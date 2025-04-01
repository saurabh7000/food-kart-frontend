import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@radix-ui/themes";
import UserMenu from "./UserMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <Button
          variant="solid"
          color="orange"
          size="3"
          className="hover:cursor-pointer"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </>
  );
};

export default MainNav;
