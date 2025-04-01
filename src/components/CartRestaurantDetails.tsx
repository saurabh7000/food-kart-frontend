import { myCartRestaurant } from "../types";
import { Flex, Grid, Text } from "@radix-ui/themes";
import CartOrderCuisines from "./CartOrderCuisines";
import { MdDelete } from "react-icons/md";
import { useDeleteMyCartItem } from "../Api/CartApi";

type Props = {
  restaurant: myCartRestaurant;

  cartId: string;
};

const CartRestaurantDetails = ({ restaurant, cartId }: Props) => {
  const { deleteItem } = useDeleteMyCartItem();
  const deleteBtnHandler = () => {
    if (cartId && restaurant.restaurantId) {
      deleteItem({
        cartId: cartId as string,
        itemToDelete: restaurant.restaurantId as string,
      });
      location.reload();
    }
  };

  return (
    <Grid columns="3" className="grid-cols-[4fr_1fr_1fr]">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="border-r-2 border-b-2 w-full"
      >
        <Flex align="center" justify="center" className="w-full border-b-2">
          <Text> {restaurant.restaurantName}</Text>
          <MdDelete
            className="ml-7 text-red-500 cursor-pointer"
            onClick={deleteBtnHandler}
          />
        </Flex>
        <Grid columns="3" className="w-full text-sm md:text-lg">
          <Flex
            align="center"
            justify="center"
            className="border-r-2 border-b-2"
          >
            Cuisine
          </Flex>
          <Flex
            align="center"
            justify="center"
            className="border-r-2 border-b-2"
          >
            Price (₹)
          </Flex>
          <Flex align="center" justify="center" className="border-b-2">
            Quantity
          </Flex>
        </Grid>
        {restaurant.menuItems &&
          restaurant.menuItems.map((cuisine) => (
            <CartOrderCuisines
              key={cuisine._id}
              cuisine={cuisine}
              cartId={cartId}
            />
          ))}
      </Flex>
      <Flex align="center" justify="center" className="border-r-2 border-b-2">
        {restaurant.deliveryPrice}
      </Flex>
      <Flex align="center" justify="center" className="border-b-2">
        {restaurant.subTotal}
      </Flex>
    </Grid>
  );
};

export default CartRestaurantDetails;
