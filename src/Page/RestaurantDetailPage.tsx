import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../Api/RestaurantApi";
import { AspectRatio, Flex, Separator, Text } from "@radix-ui/themes";
import CuisineList from "../components/CuisineList";
import MenuItems from "../components/MenuItems";
import Loading from "../components/Loading";
const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading || !restaurant) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gap="9" m="1rem" className="w-full">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <Flex
        direction="column"
        gap="3"
        className="border-2 border-slate-400 rounded-lg p-5"
      >
        <Text size="8">{restaurant.restaurantName}</Text>
        <Separator size="4" />
        <CuisineList cuisines={restaurant.cuisines} />
      </Flex>
      <Flex
        direction="column"
        gap="3"
        className="border-2 border-slate-400 rounded-lg p-5"
      >
        <Text size="8">Menu Items</Text>
        <Separator size="4" />
        <MenuItems
          restaurantId={restaurant._id}
          menuItems={restaurant.menuItems}
        />
      </Flex>
    </Flex>
  );
};

export default RestaurantDetailPage;
