import { Flex } from "@radix-ui/themes";
import { useGetMyOrders } from "../Api/OrderApi";
import DeliveryDetailsCard from "../components/DeliveryDetailsCard";
import Loading from "../components/Loading";
import MyOrders from "../components/MyOrders";
import MetaData from "../components/MetaData";
import EmptyResponse from "../components/EmptyResponse";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return <EmptyResponse message="No order found" />;
  }

  return (
    <Flex direction="column" width="100%">
      <MetaData title="Order Status" />
      {orders.map((order) => (
        <Flex direction="column" width="100%" key={order._id}>
          <Flex
            direction="column"
            className="w-full border-2 p-2 m-2 bg-gray-200 rounded-md"
          >
            <DeliveryDetailsCard deliveryDetail={order.deliveryDetails} />
            <MyOrders
              cartItem={order.cartItems}
              createdAt={order.createdAt}
              status={order.status}
              total={order.totalAmount}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default OrderStatusPage;
