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
      <AspectRatio ratio={16 / 9}>
        <div className="relative w-full h-0 pb-[56.25%]">
          <img
            src={restaurant.imageUrl}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
      </AspectRatio>

      <Box className="p-2">
        <Text className="text-2xl font-bold tracking-tight mb-2 ">
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
