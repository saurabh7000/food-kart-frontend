import { Grid, Flex } from "@radix-ui/themes";
import { itemDetails } from "../types";
import { MdDelete } from "react-icons/md";
import { useDeleteMyCartItem } from "../Api/CartApi";

type Props = {
  cuisine: itemDetails;
  cartId: string;
};

const CartOrderCuisines = ({ cuisine, cartId }: Props) => {
  const { deleteItem } = useDeleteMyCartItem();
  const deleteBtnHandler = () => {
    if (cartId && cuisine._id) {
      deleteItem({
        cartId: cartId as string,
        itemToDelete: cuisine._id as string,
      });
      location.reload();
    }
  };
  return (
    <Grid columns="3" className="w-full border-b-2 text-sm md:text-lg">
      <Flex align="center" justify="center" className="border-r-2 w-full">
        {cuisine.name}
        <MdDelete
          className="ml-7 text-red-500 cursor-pointer"
          onClick={deleteBtnHandler}
        />
      </Flex>
      <Flex align="center" justify="center" className="border-r-2">
        {cuisine.price}
      </Flex>
      <Flex align="center" justify="center">
        {cuisine.quantity}
      </Flex>
    </Grid>
  );
};

export default CartOrderCuisines;
