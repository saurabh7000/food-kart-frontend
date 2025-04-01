import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MenuItem } from "../types";

type Props = {
  menu: MenuItem;
  restaurantId: string;
  quantity: number;
  udpateQuantity: (id: string, menuId: string, change: number) => void;
};

const MenuCards = ({ menu, restaurantId, quantity, udpateQuantity }: Props) => {
  return (
    <Box className="border-2 border-slate-400 my-3 p-3 rounded-md bg-slate-50 shadow-md">
      <Grid className="grid grid-cols-[70%,30%] w-full px-5">
        <Flex direction="column" gap="4">
          <Text size="5">{menu.name}</Text>
          <Text size="3"> ₹ {menu.price}</Text>
        </Flex>
        <Flex align="center" justify="end" gap="3" className="text-green-500">
          {quantity <= 0 ? (
            <>
              <Text
                className="text-lg font-bold cursor-pointer"
                onClick={() => udpateQuantity(restaurantId, menu._id, 1)}
              >
                ADD
              </Text>
            </>
          ) : (
            <>
              <RiSubtractFill
                className="text-xl font-bold cursor-pointer"
                onClick={() => udpateQuantity(restaurantId, menu._id, -1)}
              />
              <Text className="text-xl">{quantity}</Text>
              <IoMdAdd
                className="text-xl font-bold cursor-pointer"
                onClick={() => udpateQuantity(restaurantId, menu._id, 1)}
              />
            </>
          )}
        </Flex>
      </Grid>
    </Box>
  );
};

export default MenuCards;
