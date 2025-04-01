import Header from "../components/Header";
import { Flex } from "@radix-ui/themes";
import Footer from "../components/Footer";
import MetaData from "../components/MetaData";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Flex direction={"column"} className="min-h-screen">
      <MetaData title="Home" />
      <Header />
      <Flex className="flex-grow"> {children}</Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
