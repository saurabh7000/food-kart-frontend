import { AspectRatio, Text } from "@radix-ui/themes";
import { Controller, FieldError, useFormContext } from "react-hook-form";

const ImageSection = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col">
        <Text size="7">Image</Text>
        <Text size="2" color="gray">
          Add an image that will be displayed on your restaurant listing in the
          search results.
        </Text>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              alt="Restaurant image"
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <Controller
          control={control}
          name="imageFile"
          render={({ field }) => (
            <div className="bg-white md:w-[50%]">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          )}
        />
        {errors.imageFile && (
          <p className="text-red-500 text-sm">
            {(errors.imageFile as FieldError)?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
