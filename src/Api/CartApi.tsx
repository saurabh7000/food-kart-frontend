import { useAuth0 } from "@auth0/auth0-react";
import { cartItems, deleteItem, myCartOrders } from "../types";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
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

export const useCreateUpdateCart = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUpdateCartRequest = async (myOrderCart: cartItems[]) => {
    const accessToken = await getAccessTokenSilently();

    const cartData = await axios.post(
      `${API_BASE_URL}/api/my/cart-items`,
      { myOrderCart },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!cartData) {
      throw new Error("Failed to create or update cart orders");
    }

    return cartData.data;
  };

  const {
    mutate: cartOderItems,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(createUpdateCartRequest);

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
  }, [isSuccess, error, reset]);

  return { cartOderItems, isLoading };
};

export const useMyCartOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const myCartOrdersRequest = async (): Promise<myCartOrders> => {
    const accessToken = await getAccessTokenSilently();

    const myCartOrdersInfo = await axios.get(
      `${API_BASE_URL}/api/my/cart-items`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return myCartOrdersInfo.data;
  };
  const { data: myCartOrders, isLoading } = useQuery(
    "myCartOrder",
    myCartOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { myCartOrders, isLoading };
};

export const useDeleteMyCartItem =  () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteMyCartItemRequest = async (deleteItem: deleteItem) => {
    const accessToken = await getAccessTokenSilently();

    const myCartOrder = await axios.post(
      `${API_BASE_URL}/api/my/cart-items/${deleteItem.cartId}/${deleteItem.itemToDelete}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!myCartOrder?.data) {
      throw new Error("Something went wrong. Please try again!");
    }

    return myCartOrder.data;
  };

  const {
    mutate: deleteItem,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(deleteMyCartItemRequest);

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
  }, [isSuccess, error]);

  return { deleteItem, isLoading, isSuccess, error, reset };
};
