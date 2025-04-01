import { Flex, Text } from "@radix-ui/themes";
import { myOrderCartItem, OrderStatus } from "../types";
import OrderedItemCard from "./OrderedItemCard";

type Props = {
  cartItem: myOrderCartItem[];
  createdAt: string;
  status: OrderStatus;
  total: number;
};
const MyOrders = ({ cartItem, createdAt, status, total }: Props) => {
  console.log(total);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="p-3 m-2 border-2 rounded-md"
    >
      <Text className="text-2xl font-semibold text-start">Orders</Text>
      {cartItem &&
        cartItem.map((item) => (
          <OrderedItemCard
            key={item.menuItemId}
            item={item}
            createdAt={createdAt}
            status={status}
          />
        ))}
      {total && (
        <Text className="text-2xl font-semibold"> Total :- {total}</Text>
      )}
    </Flex>
  );
};

export default MyOrders;
