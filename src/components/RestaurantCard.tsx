import { Link } from "react-router-dom";
import { Restaurant } from "../types";
import { AspectRatio, Flex, Box, Text, Grid } from "@radix-ui/themes";
import { DotIcon } from "@radix-ui/react-icons";
import { FaClock, FaMoneyBillWave } from "react-icons/fa6";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group rounded-lg bg-orange-300 text-gray-700 hover:border-2 hover:border-slate-300"
    >
      <AspectRatio ratio={13 / 8.8}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full object-cover"
        />
      </AspectRatio>
      <Box className="p-2">
        <Text className="text-2xl font-bold tracking-tight mb-2 group-hover:underline ">
          {restaurant.restaurantName}
        </Text>
        <Grid id="card-content" className="md:grid-cols-2  gap-5">
          <Flex wrap="wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <Flex key={index}>
                <Text>{cuisine}</Text>
                {index < restaurant.cuisines.length - 1 && <DotIcon />}
              </Flex>
            ))}
          </Flex>
          <Flex gap="2" direction="column">
            <Flex align="center" gap="1" className="text-green-600">
              <FaClock color="green" />
              {restaurant.estimatedDeliveryTime} mins
            </Flex>
            <Flex align="center" gap="1">
              <FaMoneyBillWave color="green" />
              Delivery from ₹{restaurant.deliveryPrice}
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </Link>
  );
};

export default RestaurantCard;
