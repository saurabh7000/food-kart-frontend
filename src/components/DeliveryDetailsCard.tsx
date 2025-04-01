import { Flex, Text } from "@radix-ui/themes";
import { deliveryDetails } from "../types";

type Props = {
  deliveryDetail: deliveryDetails;
};

const DeliveryDetailsCard = ({ deliveryDetail }: Props) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="start"
      className="bg-gray-100 m-2 px-4 py-2 rounded-lg"
    >
      <Text size="7" className="font-bold mb-2">
        Delivery Details
      </Text>
      <>
        <Text size="5">{deliveryDetail.name},</Text>
        <Text size="5">
          {deliveryDetail.addressLine} , {deliveryDetail.city} ,
        </Text>
        <Text size="5">
          {deliveryDetail.country} , {deliveryDetail.pincode}
        </Text>
      </>
    </Flex>
  );
};

export default DeliveryDetailsCard;
