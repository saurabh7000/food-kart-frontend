import { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useGetUserInfo, useUpdateUser } from "../../Api/UserApi";
import Loading from "../../components/Loading";

interface FormData {
  name: string;
  addressLine: string;
  city: string;
  country: string;
  pinCode: number;
}

const UserProfileForm = () => {
  const { updateUser, isLoading:userUpdateLoading } = useUpdateUser();
  const { currentUser, isLoading: currUserLoading } = useGetUserInfo();

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    addressLine: "",
    city: "",
    country: "",
    pinCode: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
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

  if(userUpdateLoading || currUserLoading) {
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        align="start"
        className="space-y-8 p-10 w-[90vw] bg-gray-100 rounded-xl"
      >
        <Text size="7">My Profile</Text>
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
            className="bg-orange-500 hover:bg-orange-800 text-white text text-xl rounded-lg p-2 w-fit"
          >
            Save Changes
          </button>
        </div>
      </Flex>
    </form>
  );
};

export default UserProfileForm;
