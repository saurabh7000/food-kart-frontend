import { useAuth0 } from "@auth0/auth0-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost">
          <HamburgerMenuIcon className="h-auto w-7 text-orange-500 hover:cursor-pointer " />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="space-y-3 flex-1 align-middle justify-center p-3 w-fit h-auto bg-white rounded-lg"
        >
          {isAuthenticated ? (
            <>
              <DropdownMenu.Item>
                <Flex
                  align="center"
                  className="text-orange-600 text-lg font-bold hover:cursor-pointer hover:text-orange-500"
                >
                  <AvatarIcon width="2rem" height="2rem" />
                  <Text ml="2">{user?.email}</Text>
                </Flex>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="border-2 border-gray-200" />
              <DropdownMenu.Item>
                <Link to="/order-status">
                  <Text className="p-2 text-orange-600 text-lg font-bold hover:text-orange-500">
                    Order Status
                  </Text>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Link to="/cart">
                  <Text className="p-2 text-orange-600 text-lg font-bold hover:text-orange-500">
                    My Cart
                  </Text>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="border-2 border-gray-200" />
              <DropdownMenu.Item>
                <Button
                  variant="solid"
                  color="amber"
                  className="p-2 w-44 font-bold  rounded hover:cursor-pointer"
                  onClick={() => navigate("/my-restaurant")}
                >
                  My Restaurant
                </Button>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="border-2 border-gray-200" />
              <DropdownMenu.Item>
                <Button
                  variant="solid"
                  color="amber"
                  className="p-2 w-44 font-bold  rounded hover:cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Button>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="border-2 border-gray-200" />
              <DropdownMenu.Item>
                <Button
                  variant="solid"
                  color="tomato"
                  className="p-2 w-44 font-bold rounded hover:cursor-pointer"
                  onClick={() => logout()}
                >
                  Log Out
                </Button>
              </DropdownMenu.Item>
            </>
          ) : (
            <>
              <DropdownMenu.Item>
                <Text>Welcome to Food Kart !</Text>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Button
                  variant="solid"
                  color="orange"
                  className="p-3  w-full font-bold rounded hover:cursor-pointer"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </Button>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default MobileNav;
