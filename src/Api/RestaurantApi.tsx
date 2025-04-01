import axios from "axios";
import { useQuery } from "react-query";
import { Restaurant, RestaurantSearchResponse, SearchState } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const restaurants = await axios.get(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!restaurants) {
      throw new Error("Something went wrong.Please try again!");
    }

    return restaurants.data;
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const restaurant = await axios.get(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!restaurant) {
      throw new Error("Failed to get restaurant.Please try again!");
    }

    return restaurant.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "getRestaurant",
    getRestaurantRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};
