import Logo from "../assets/logo.png";
import { Flex, Text } from "@radix-ui/themes";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";

const Footer = () => {
  return (
    <Flex
      align="center"
      direction="column"
      className="p-3 bg-slate-800 border-2 border-gray-900 w-full text-white"
    >
      <Flex justify="between"  className="w-full gap-y-5 flex-col md:flex-row">
        <Flex align="center" justify="center">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-36 rounded-xl shadow-2xl" />
          </Link>
        </Flex>

        <Flex direction="column" gap="3" className="text-md font-semibold">
          <Text size="5">Contact Us</Text>
          <Flex align="center" gap="2">
          <Link to="https://mail.google.com">
            <IoMail className="w-10 h-10 hover:cursor-pointer" />
          </Link>
          <Text>xyz@gmail.com</Text>
          </Flex>
          <Flex align="center" gap="2">
            <IoIosCall className="w-10 h-10 hover:cursor-pointer" />
            <Text> +91-02389789654</Text>
          </Flex>
        </Flex>

        <Flex direction="column" gap="3" className="text-md font-semibold">
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
      <Flex align="center" justify="center">
        <Text className="text-gray-500 font-bold text-sm">
          Copyrights @2025-26 - All rights reserved
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
