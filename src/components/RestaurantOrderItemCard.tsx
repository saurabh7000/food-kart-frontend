import { Flex, Grid, Text } from "@radix-ui/themes";
import { Content, Item, Select, Trigger, Value } from "@radix-ui/react-select";
import { Order, OrderStatus } from "../types";
import {
  useGetMyRestaurant,
  useUpdateMyRestaurantOrder,
} from "../Api/MyRestaurantApi";
import Loading from "./Loading";
import { ORDER_STATUS } from "../config/order-status-config";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};
const RestaurantOrderItemCard = ({ order }: Props) => {
  const { restaurant, isLoading } = useGetMyRestaurant();
  const { updateRestaurantStatus, isLoading: updateLaoding } =
    useUpdateMyRestaurantOrder();

  const [status, setStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      restaurantId: restaurant?._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const getTime = () => {
    const date = new Date(order.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const paddedMinute = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinute}`;
  };

  if (isLoading || updateLaoding) {
    return <Loading />;
  }

  if (!restaurant) {
    return (
      <div>
        <h1>No Restaurant</h1>
      </div>
    );
  }

  const cartItem = order.cartItems.filter(
    (item) => restaurant._id.toString() === item.restaurant.toString()
  );

  if (cartItem.length <= 0) return <></>;

  return (
    <Flex direction="column" className="w-full my-2 border-2 rounded-lg">
      <Grid className=" grid-cols-1 md:grid-cols-3 p-2 m-2 bg-gray-100 rounded-lg">
        <Flex direction="column" justify="center">
          <Flex className="p-2 rounded-lg">
            <Text className="font-semibold">Customer Name</Text>
            <Text>: {order.deliveryDetails.name}</Text>
          </Flex>
          <Flex className="p-2">
            <Text className="font-semibold"> Delivery Address</Text>
            <Flex direction="column" gap="2" className="ml-2">
              <Text>: {order.deliveryDetails.addressLine}</Text>
              <Text>
                {order.deliveryDetails.city},{order.deliveryDetails.country},
                {order.deliveryDetails.pincode}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Text className="font-semibold">Time :</Text>
          <Text> {getTime()}</Text>
        </Flex>
        {order.totalAmount && (
          <Flex>
            <Text className="font-bold">Total Price</Text>
            <Text>: ₹ {order.totalAmount}</Text>
          </Flex>
        )}
      </Grid>
      <Flex direction="column" gap="2" className="m-2 border-y-2">
        <Grid
          columns="2"
          className="m-2 p-2 text-center font-semibold border-2 bg-gray-100 rounded-lg"
        >
          <Text>Cuisines Name</Text>
          <Text>Quantity</Text>
        </Grid>
        {cartItem &&
          cartItem.length > 0 &&
          cartItem.map((item) => (
            <Grid
              key={item.menuItemId}
              columns="2"
              align="center"
              className="rounded-lg p-2 m-2 text-center border-2 bg-gray-100"
            >
              <Text className="text-start">{item.name}</Text>
              <Text>{item.quantity}</Text>
            </Grid>
          ))}
      </Flex>
      <Flex direction="column" gap="2" className="m-2">
        <label htmlFor="status"> What is the status of this order ?</label>
        <Select
          value={status}
          disabled={isLoading}
          onValueChange={(value) => handleStatusChange(value as OrderStatus)}
        >
          <Trigger
            id="status"
            className="text-lg border-2 w-[19.5rem] text-center rounded-lg p-1 m-2 bg-gray-100"
          >
            {ORDER_STATUS.map(
              (stat) =>
                stat.value === status && (
                  <Value key={stat.value}>{stat.label}</Value>
                )
            )}
          </Trigger>
          <Content position="popper" className="border-2 w-max">
            {ORDER_STATUS.map((status) => (
              <Item
                key={status.value}
                value={status.value}
                className="cursor-pointer text-lg bg-gray-100 px-2 border-2"
              >
                {status.label}
              </Item>
            ))}
          </Content>
        </Select>
      </Flex>
    </Flex>
  );
};

export default RestaurantOrderItemCard;
