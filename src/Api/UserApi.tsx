import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

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

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await axios.post(`${API_BASE_URL}/api/my/user`, user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response) {
        throw new Error("Failed to create user");
      }

      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine: string;
  city: string;
  country: string;
  pinCode: number;
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await axios.put(
        `${API_BASE_URL}/api/my/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        throw new Error("Failed to create user");
      }

      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("Profile Updated Successfully!", toastInfo as object);
  }

  if (error) {
    toast.error(error.toString(), toastInfo as object);
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};

export const useGetUserInfo = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserInfoRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const user = await axios.get(`${API_BASE_URL}/api/my/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!user) {
        throw new Error("Failed to fetch user information");
      }

      return user.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getUserInfoRequest);

  if (error) {
    toast.error(error.toString(), toastInfo as object);
  }
  return { currentUser, isLoading };
};
