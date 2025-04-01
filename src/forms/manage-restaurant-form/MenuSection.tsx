// import { Button, Flex, Text } from "@radix-ui/themes";
// import {
//   Controller,
//   FieldError,
//   useFieldArray,
//   useFormContext,
// } from "react-hook-form";
// import MenuItemInput from "./MenuItemInput";

// const MenuSection = () => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "menuItems",
//   });

//   return (
//     <Flex gapY="5" direction="column">
//       <Flex direction="column" gap="1">
//         <Text size="7">Menu</Text>
//         <Text size="2" color="gray">
//           Create your menu and give each item a name and price
//         </Text>
//       </Flex>
//       <div>
//         <Controller
//           control={control}
//           name="menuItems"
//           render={() => (
//             <Flex direction="column" gap="2">
//               {fields.map((_, index) => (
//                 <MenuItemInput
//                   index={index}
//                   removeMenuItem={() => remove(index)}
//                 />
//               ))}
//             </Flex>
//           )}
//         />{" "}
//         {errors.cuisines && (
//           <p className="text-red-500 text-sm">
//             {(errors.cuisines as FieldError)?.message}
//           </p>
//         )}
//       </div>

//       <Button
//         type="button"
//         color="orange"
//         size="3"
//         className="max-w-fit hover:cursor-pointer"
//         onClick={() => append({ name: "", price: "" })}
//       >
//         Add Menu Item
//       </Button>
//     </Flex>
//   );
// };

// export default MenuSection;

import { Button, Flex, Text } from "@radix-ui/themes";
import {
  FieldError,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <Flex gapY="5" direction="column">
      <Flex direction="column" gap="1">
        <Text size="7">Menu</Text>
        <Text size="2" color="gray">
          Create your menu and give each item a name and price
        </Text>
      </Flex>

      <div>
        <Flex direction="column" gap="2">
          {fields.map((_, index) => (
            <MenuItemInput
              key={index}
              index={index}
              removeMenuItem={() => remove(index)}
              errors={
                errors.menuItems
                  ? (errors.menuItems as FieldErrors)[index]
                  : undefined
              }
            />
          ))}
        </Flex>

        {errors.menuItems && (
          <p className="text-red-500 text-sm">
            {(errors.menuItems as FieldError)?.message}
          </p>
        )}
      </div>

      <Button
        type="button"
        color="orange"
        size="3"
        className="max-w-fit hover:cursor-pointer"
        onClick={() => append({ name: "", price: "" })}
      >
        Add Menu Item
      </Button>
    </Flex>
  );
};

export default MenuSection;
