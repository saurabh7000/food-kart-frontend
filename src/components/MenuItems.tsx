import { Flex } from "@radix-ui/themes";
import { cartItems, MenuItem } from "../types";
import MenuCards from "./MenuCards";
import { useEffect, useState } from "react";
import { useCreateUpdateCart } from "../Api/CartApi";

type Props = {
  restaurantId: string;
  menuItems: MenuItem[];
};

const MenuItems = ({ restaurantId, menuItems }: Props) => {
  const { cartOderItems } = useCreateUpdateCart();
  const [cartOrder, setCartOrder] = useState<cartItems[]>([
    {
      restaurantId: restaurantId,
      orderItems: [],
    },
  ]);

  const updateQuantity = (id: string, menuId: string, change: number) => {
    setCartOrder((prevCart) => {
      const restaurant = prevCart.find(
        (restaurant) => restaurant.restaurantId === id
      );

      if (restaurant) {
        const updatedOrderItems = restaurant.orderItems.map((item) => {
          if (item._id === menuId) {
            const newQuantity = Math.max(0, item.quantity + change);
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        if (
          !restaurant.orderItems.some((item) => item._id === menuId) &&
          change > 0
        ) {
          const menuItem = menuItems.find((item) => item._id === menuId);
          if (menuItem) {
            updatedOrderItems.push({
              _id: menuItem._id,
              name: menuItem.name,
              price: menuItem.price,
              quantity: 1,
            });
          }
        }

        return prevCart.map((restaurant) =>
          restaurant.restaurantId === id
            ? { ...restaurant, orderItems: updatedOrderItems }
            : restaurant
        );
      } else {
        const menuItem = menuItems.find((item) => item._id === menuId);
        if (menuItem) {
          const newRestaurant = {
            restaurantId: id,
            orderItems: [
              {
                _id: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
              },
            ],
          };

          return [...prevCart, newRestaurant];
        }
        return prevCart;
      }
    });
  };

  useEffect(() => {
    if (
      cartOrder.length > 0 &&
      cartOrder.some((order) => order.orderItems.length > 0)
    ) {
      cartOderItems(cartOrder);
    }
  }, [cartOrder, cartOderItems]);

  return (
    <Flex direction="column" gap="3">
      {menuItems.map((menu) => (
        <MenuCards
          key={menu._id}
          menu={menu}
          restaurantId={restaurantId}
          quantity={
            cartOrder
              .find((restaurant) => restaurant.restaurantId === restaurantId)
              ?.orderItems.find((item) => item._id === menu._id)?.quantity || 0
          }
          udpateQuantity={updateQuantity}
        />
      ))}
    </Flex>
  );
};

export default MenuItems;
