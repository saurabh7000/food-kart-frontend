import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Order, Restaurant, UpdateOrderStatus } from "../types";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const toastInfo = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const restaurantData = await axios.post(
        `${API_BASE_URL}/api/my/restaurant`,
        restaurantFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!restaurantData) {
        throw new Error("Failed to create restaurant");
      }
      return restaurantData.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createMyRestaurantRequest);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Restaurant created successfully", toastInfo as object);
    }

    if (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        toastInfo as object
      );
      reset();
    }
  }, [isSuccess, error, reset, toast]);
  return { createRestaurant, isLoading };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const restaurantData = await axios.get(
        `${API_BASE_URL}/api/my/restaurant`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!restaurantData) {
        throw new Error("Something went wrong.Please try again!");
      }

      return restaurantData.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };
  const { data: restaurant, isLoading } = useQuery(
    "getMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const restaurantData = await axios.put(
        `${API_BASE_URL}/api/my/restaurant`,
        restaurantFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!restaurantData) {
        throw new Error("Failed to create restaurant");
      }
      return restaurantData.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyRestaurantRequest);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Restaurant updated successfully", toastInfo as object);
    }

    if (error) {
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        toastInfo as object
      );
      reset();
    }
  }, [isSuccess, error, reset, toast]);
  return { updateRestaurant, isLoading };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrderRequest = async (
    updateOrderStatus: UpdateOrderStatus
  ) => {
    const accessToken = await getAccessTokenSilently();
    const order = await axios.patch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatus.restaurantId}/${updateOrderStatus.orderId}/status`,
      { status: updateOrderStatus.status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!order) {
      throw new Error("Failed to update status");
    }

    return order.data;
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation(updateMyRestaurantOrderRequest);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order updated successfully", toastInfo as object);
    }

    if (isError) {
      toast.error("Unable to update order", toastInfo as Object);
      reset();
    }
  }, [isSuccess, isError]);

  return { updateRestaurantStatus, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const orders = await axios.get(`${API_BASE_URL}/api/my/restaurant/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!orders) {
      throw new Error("Failed to get orders");
    }

    return orders.data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};
