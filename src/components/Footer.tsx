import Logo from "../assets/logo.png";
import { Flex, Text } from "@radix-ui/themes";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Flex
      align="center"
      gap="5"
      className="justify-between p-3 bg-orange-100 border-2 border-gray-400"
    >
      <Flex>
        <Link to="/">
          <img src={Logo} alt="logo" className="w-36 rounded-xl" />
        </Link>
      </Flex>
      <Flex direction="column" gap="3">
        <Text size="5">Join Us </Text>
        <Flex align="center" justify="start" gap="2">
          <Link to="https://www.x.com/">
            <FaSquareXTwitter className="w-10 h-10 hover:cursor-pointer" />
          </Link>
          <Link to="https://www.linkedin.com/">
            <FaLinkedin className="w-10 h-10 hover:cursor-pointer" />
          </Link>
          <Link to="https://www.instagram.com/">
            <FaSquareInstagram className="w-10 h-10 hover:cursor-pointer" />
          </Link>
        </Flex>
        <Text>Privacy Policy</Text>
        <Text>Terms & Conditions</Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
