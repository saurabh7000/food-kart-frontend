import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { checkoutSessionRequest, Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const orders = await axios.get(`${API_BASE_URL}/api/order`, {
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
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

export const useCreateCheckOuteSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessonRequest: checkoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      checkoutSessonRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data) {
      throw new Error("Undable to create checkout session");
    }

    return response.data.url;
  };
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
