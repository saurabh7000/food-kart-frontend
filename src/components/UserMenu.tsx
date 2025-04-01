import { Button, Flex, Text } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaShoppingCart } from "react-icons/fa";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth0();

  return (
    <Flex align="center" gap="5">
      <Link to="/order-status">
        <Text className="p-2 text-orange-600 text-lg font-bold  hover:cursor-pointer hover:text-orange-500">
          Order Status
        </Text>
      </Link>
      <Link to="/cart">
        <FaShoppingCart className="text-2xl text-orange-600" />
      </Link>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Flex
            align="center"
            className="p-2 text-orange-600 text-lg font-bold hover:cursor-pointer hover:text-orange-500"
          >
            <AvatarIcon width="2rem" height="2rem" />
            <Text ml="2">{user?.email}</Text>
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="space-y-3 flex-1 align-middle justify-center p-3 h-auto bg-white rounded-lg"
          >
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
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>{" "}
    </Flex>
  );
};

export default UserMenu;
