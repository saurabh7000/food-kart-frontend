import { Flex } from "@radix-ui/themes";
import DeliveryDetails from "../components/DeliveryDetails";
import MetaData from "../components/MetaData";

const CheckoutPage = () => {
  return (
    <Flex align="center" justify="center" width="100vw" className="p-4 md:p-20">
      <MetaData title="Checkout" />
      <DeliveryDetails />
    </Flex>
  );
};

export default CheckoutPage;
