import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useMyCartOrders } from "../Api/CartApi";
import CartRestaurantDetails from "../components/CartRestaurantDetails";
import { useEffect, useState } from "react";
import { finalCart, finalMenu, myCartOrders } from "../types";
import MetaData from "../components/MetaData";
import Loading from "../components/Loading";
import EmptyResponse from "../components/EmptyResponse";

const CartPage = () => {
  const navigate = useNavigate();
  const { myCartOrders, isLoading } = useMyCartOrders();
  const [myCart, setMyCart] = useState<myCartOrders | null>(
    myCartOrders || null
  );

  const handleCheckoutBtn = () => {
    if (!myCart || !myCart.cartItem) return;

    const cartData: finalCart[] = myCart.cartItem.map((restaurant) => {
      const finalMenuItems: finalMenu[] = restaurant.menuItems.map((menu) => ({
        _id: menu._id.toString(),
        name: menu.name.toString(),
        quantity: menu.quantity,
      }));

      return {
        restaurantId: restaurant.restaurantId.toString(),
        menuItems: finalMenuItems,
      };
    });

    sessionStorage.setItem("finalCart", JSON.stringify(cartData));
    navigate("/checkout");
  };

  useEffect(() => {
    if (myCartOrders) setMyCart(() => myCartOrders);
    if (myCart) {
      setMyCart(() => myCart);
    }
  }, [myCartOrders, myCart]);

  if (isLoading) {
    return <Loading />;
  }

  return myCart ? (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="5"
      className="w-full p-3 py-5 md:p-5"
    >
      <MetaData title="Cart" />

      <Flex direction="column" className="w-full border-2">
        <Grid
          columns="3"
          className="grid-cols-[4fr_1fr_1fr] text-sm md:text-lg font-semibold border-b-2"
        >
          <Flex align="center" justify="center" className="border-r-2">
            Restaurants
          </Flex>
          <Flex align="center" justify="center" className="border-r-2">
            Delivery Price (₹)
          </Flex>
          <Flex align="center" justify="center">
            SubTotal (₹)
          </Flex>
        </Grid>
        {myCart.cartItem &&
          myCart.cartItem.map((restaurant) => (
            <CartRestaurantDetails
              key={restaurant.restaurantId}
              restaurant={restaurant}
              cartId={myCart._id}
            />
          ))}
        <Flex align="center" justify="between" className="w-full font-semibold">
          <Text
            size="5"
            className="flex flex-1 items-center justify-center border-r-2"
          >
            Total
          </Text>
          <Text size="5" className="flex flex-1 items-center justify-center">
            ₹ {myCart.total}
          </Text>
        </Flex>
      </Flex>

      <Button
        color="grass"
        size="4"
        className="cursor-pointer hover:bg-green-800"
        onClick={handleCheckoutBtn}
      >
        Checkout
      </Button>
    </Flex>
  ) : (
    <>
    <MetaData title="Cart" />
   <EmptyResponse message="Your cart is empty." /></>
  );
};

export default CartPage;
