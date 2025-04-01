import { Flex, Tabs } from "@radix-ui/themes";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../Api/MyRestaurantApi";
import RestaurantAtiveOrder from "../components/RestaurantAtiveOrder";
import MetaData from "../components/MetaData";

const MyRestuarantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <>
    <MetaData title="My Restaurant"/>
    <Tabs.Root defaultValue="orders" className="m-2 w-[100%]">
      
      <Tabs.List>
        <Tabs.Trigger
          value="orders"
          className="text-xl font-semibold cursor-pointer"
        >
          Orders
        </Tabs.Trigger>
        <Tabs.Trigger
          value="manage-restaurant"
          className="text-xl font-semibold cursor-pointer"
        >
          Manage Restaurant
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="orders">
        <RestaurantAtiveOrder />
      </Tabs.Content>
      <Tabs.Content value="manage-restaurant">
        <Flex
          align="center"
          justify="center"
          width="100%"
          className="p-4 md:p-20"
        >
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </Flex>
      </Tabs.Content>
    </Tabs.Root>
    </>
  );
};

export default MyRestuarantPage;
