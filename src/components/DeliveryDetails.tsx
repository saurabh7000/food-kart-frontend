import { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useGetUserInfo } from "../Api/UserApi";
import { finalCart } from "../types";
import { useNavigate } from "react-router-dom";
import { useCreateCheckOuteSession } from "../Api/OrderApi";
import Loading from "./Loading";

interface FormData {
  name: string;
  addressLine: string;
  city: string;
  country: string;
  pinCode: number;
}

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const { currentUser ,isLoading: userInfoLoading} = useGetUserInfo();
  const { createCheckoutSession, isLoading } = useCreateCheckOuteSession();
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    addressLine: "",
    city: "",
    country: "",
    pinCode: 0,
  });

  const cartData: finalCart[] = JSON.parse(
    sessionStorage.getItem("finalCart") || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartData.length <= 0) {
      navigate("/checkout");
      return;
    }

    const checkoutData = {
      cartItems: cartData,
      deliveryDetails: {
        email: email as string,
        name: formData.name,
        addressLine: formData.addressLine,
        city: formData.city,
        country: formData.country,
        pincode: formData.pinCode,
      },
    };

    const url = await createCheckoutSession(checkoutData);
    if (!url) {
      navigate("/checkout");
      return;
    }
    window.location.href = url;
  };

  useEffect(() => {
    if (currentUser) {
      if (email !== currentUser.email) {
        setEmail(currentUser.email || "");
      }

      setFormData((prevData) => {
        if (!prevData.name) {
          return {
            name: currentUser.name || "",
            addressLine: currentUser.address || "",
            city: currentUser.city || "",
            country: currentUser.country || "",
            pinCode: currentUser.pinCode || 0,
          };
        }
        return prevData;
      });
    }
  }, [currentUser, email]);

  if (isLoading || userInfoLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        align="start"
        className="space-y-8 p-10 w-[90vw] bg-gray-100 rounded-xl"
      >
        <Flex direction="column" gap="2" align="start" justify="center">
          <Text size="7">User Delivery Details</Text>
          <Text size="3">view and edit user information here</Text>
        </Flex>
        <div className="flex flex-col w-[100%]">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="mt-1 p-2  border rounded-md"
          />
        </div>
        <div className="flex flex-col w-[100%]">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-5 w-[100%]">
          <div className="flex flex-col w-[100%] md:w-[50%]">
            <label
              htmlFor="addressLine"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line
            </label>
            <input
              type="text"
              id="addressLine"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex flex-col w-[100%] md:w-[50%]">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-5 w-[100%]">
          <div className="flex flex-col w-[100%] md:w-[50%]">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex flex-col w-[100%] md:w-[50%]">
            <label
              htmlFor="pinCode"
              className="block text-sm font-medium text-gray-700"
            >
              Pin Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              placeholder="xxx-xxx"
              value={formData.pinCode}
              onChange={handleChange}
              required
              pattern="\d{6}"
              title="Pincode must be a 6-digit number"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-800 text-white text-lg rounded-lg p-2 w-fit"
          >
            Place Order
          </button>
        </div>
      </Flex>
    </form>
  );
};

export default DeliveryDetails;
