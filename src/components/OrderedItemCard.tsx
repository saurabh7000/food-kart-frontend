import { Flex, Text } from "@radix-ui/themes";
import { myOrderCartItem, OrderStatus } from "../types";

type Props = {
  item: myOrderCartItem;
  createdAt: string;
  status: OrderStatus;
};

const OrderedItemCard = ({ item, createdAt, status }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(createdAt);

    created.setMinutes(created.getMinutes() + item.estimatedDeliveryTime);

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Flex
      direction="column"
      justify="center"
      className="m-5 p-3 px-5 border-1 gap-1 border-black bg-gray-100 rounded-md w-full"
    >
      <Flex justify="between" className="text-lg">
        <Text> Order Status: {status}</Text>
        <Text>Expected by: {getExpectedDelivery()}</Text>
      </Flex>
      <Text size="5">Cuisine Name :- {item.name}</Text>
      <Text size="5">Quantity :- {item.quantity}</Text>
      <Text size="5">Restaurant Name :- {item.restaurantName}</Text>
    </Flex>
  );
};

export default OrderedItemCard;
