import { Box, Flex } from "@radix-ui/themes";
import logo from "../assets/logo.png";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      align={"center"}
      className="border-2 border-orange-500 p-2 pr-5  bg-orange-100 justify-between"
    >
      <Flex align={"center"} justify={"center"}>
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 rounded-md" />
        </Link>
      </Flex>
      <Flex gap="3" align="center" justify={"center"} className="md:hidden">
        <MobileNav />
      </Flex>
      <Box className="hidden md:block">
        <MainNav />
      </Box>
    </Flex>
  );
};

export default Header;
