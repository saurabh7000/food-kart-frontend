export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine: string;
  city: string;
  country: string;
  pincode: number;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    totalRestaurants: number;
    totalPage: number;
    page: number;
  };
};

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export type itemDetails = {
  _id: string;
  name: String;
  price: number;
  quantity: number;
};

export type cartItems = {
  restaurantId: string;
  orderItems: itemDetails[];
};

export type myCartOrders = {
  user: string;
  _id:string;
  cartItem: [
    {
      restaurantId: string;
      restaurantName: string;
      deliveryPrice: number;
      subTotal: number;
      menuItems: [itemDetails];
    }
  ];
  total: number;
};

export type myCartRestaurant = {
  restaurantId: string;
  restaurantName: string;
  deliveryPrice: number;
  subTotal: number;
  menuItems: [itemDetails];
};

export type finalCart = {
  restaurantId: string;
  menuItems: finalMenu[];
};

export type finalMenu = {
  _id: string;
  name: string;
  quantity: number;
};

export type deliveryDetails = {
  email: string;
  name: string;
  addressLine: string;
  city: string;
  country: string;
  pincode: number;
};

export type checkoutSessionRequest = {
  cartItems: finalCart[];
  deliveryDetails: deliveryDetails;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
    restaurant: string;
    restaurantName:string;
    estimatedDeliveryTime: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine: string;
    city: string;
    country: string;
    pincode: number;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

export type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export type myOrderCartItem = {
  menuItemId: string;
  name: string;
  quantity: string;
  restaurant: string;
  restaurantName:string;
  estimatedDeliveryTime: number;
};

export type UpdateOrderStatus = {
  orderId: string;
  restaurantId: string;
  status: string;
};

export type deleteItem = {
  cartId: string;
  itemToDelete:string;
}

