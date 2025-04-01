import { Text } from "@radix-ui/themes";
import { Controller, FieldError, useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      <Text size="7">Details</Text>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex flex-col">
          <label className="block text-lg text-gray-700">Restaurant Name</label>
          <Controller
            name="restaurantName"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  className="mt-1 p-2 border w-[100%] rounded-md"
                />
                {errors.restaurantName && (
                  <p className="text-red-500 text-sm">
                    {(errors.restaurantName as FieldError)?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-5 w-[100%]">
          <div className="flex flex-col w-[100%] md:w-[50%] ">
            <label className="block text-lg text-gray-700">City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 p-2 w-[100%] border rounded-md"
                  />
                </div>
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">
                {(errors.city as FieldError)?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-[100%] md:w-[50%]">
            <label className="block text-lg text-gray-700">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="text"
                    className="mt-1 p-2 w-[100%] border rounded-md"
                  />
                </div>
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">
                {(errors.country as FieldError)?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block text-lg text-gray-700">
            Delivery Price &#8377;
          </label>
          <Controller
            name="deliveryPrice"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="number"
                  className="mt-1 p-2 border w-[100%] rounded-md"
                />
              </div>
            )}
          />
          {errors.deliveryPrice && (
            <p className="text-red-500 text-sm">
              {(errors.deliveryPrice as FieldError)?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block text-lg text-gray-700">
            Estimated delivery time (minutes)
          </label>
          <Controller
            name="estimatedDeliveryTime"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="number"
                  className="mt-1 p-2 border w-[100%] rounded-md"
                />
              </div>
            )}
          />
          {errors.estimatedDeliveryTime && (
            <p className="text-red-500 text-sm">
              {(errors.estimatedDeliveryTime as FieldError)?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
