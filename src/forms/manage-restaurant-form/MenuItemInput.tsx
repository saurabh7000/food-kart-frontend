// import { Button } from "@radix-ui/themes";
// import { Controller, useFormContext } from "react-hook-form";
// type Props = {
//   index: number;
//   removeMenuItem: () => void;
// };

// const MenuItemInput = ({ index, removeMenuItem }: Props) => {
//   const { control } = useFormContext();
//   return (
//     <div className="flex flex-1 w-fit space-x-5">
//       <Controller
//         control={control}
//         name={`menuItems.${index}.name`}
//         render={({ field }) => (
//           <div className="flex flex-1 flex-col space-y-0">
//             <label className="flex items-center gap-1">Name</label>
//             <input
//               {...field}
//               placeholder="Samosa"
//               className="max-h-fit w-[100%] p-2 rounded-md"
//             />
//           </div>
//         )}
//       />

//       <Controller
//         control={control}
//         name={`menuItems.${index}.price`}
//         render={({ field }) => (
//           <div className="flex flex-1 flex-col space-y-0">
//             <label className="flex items-center gap-1">Price ₹</label>
//             <input
//               {...field}
//               placeholder="30₹"
//               className="max-h-fit w-[100%] p-2 rounded-md"
//             />
//           </div>
//         )}
//       />
//       <Button
//         type="button"
//         color="tomato"
//         size="3"
//         className="mt-[1.40rem] hover:cursor-pointer"
//         onClick={removeMenuItem}
//       >
//         Remove
//       </Button>
//     </div>
//   );
// };

// export default MenuItemInput;

import { Button } from "@radix-ui/themes";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
  errors: any; // Added errors to receive from MenuSection
};

const MenuItemInput = ({ index, removeMenuItem, errors }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-1 w-fit space-x-5">
      {/* Name Input */}
      <Controller
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <div className="flex flex-1 flex-col space-y-0">
            <label className="flex items-center gap-1">Name</label>
            <input
              {...field}
              placeholder="Samosa"
              className="max-h-fit w-[100%] p-2 rounded-md"
            />
            {/* Error message for name */}
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
        )}
      />

      {/* Price Input */}
      <Controller
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <div className="flex flex-1 flex-col space-y-0">
            <label className="flex items-center gap-1">Price ₹</label>
            <input
              {...field}
              placeholder="30₹"
              type="number"
              className="max-h-fit w-[100%] p-2 rounded-md"
            />
            {/* Error message for price */}
            {errors?.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>
        )}
      />

      {/* Remove Button */}
      <Button
        type="button"
        color="tomato"
        size="3"
        className="mt-[1.40rem] hover:cursor-pointer"
        onClick={removeMenuItem}
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
