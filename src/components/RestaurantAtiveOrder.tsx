import { Flex, Text } from "@radix-ui/themes";
import Loading from "./Loading";
import RestaurantOrderItemCard from "./RestaurantOrderItemCard";
import { useGetMyRestaurantOrders } from "../Api/MyRestaurantApi";
import EmptyResponse from "./EmptyResponse";

const RestaurantAtiveOrder = () => {
  const { orders, isLoading } = useGetMyRestaurantOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyResponse message="No Active Orders" />
    );
  }

  return (
    <Flex
      direction="column"
      align="start"
      justify="center"
      className="p-3 my-3 w-full"
    >
      <Flex className="text-lg font-semibold p-2 m-2 bg-gray-100 w-max rounded-md">
        <Text>Active orders</Text>
      </Flex>
      <Flex direction="column" className="m-2 p-3 w-full rounded-md">
        {orders.length > 0 &&
          orders.map((order) => (
            <RestaurantOrderItemCard key={order._id} order={order} />
          ))}
      </Flex>
    </Flex>
  );
};

export default RestaurantAtiveOrder;
