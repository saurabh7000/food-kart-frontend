// import { Checkbox, Flex, Text } from "@radix-ui/themes";
// import { ControllerRenderProps, FieldValues } from "react-hook-form";

// type Props = {
//   cuisine: string;
//   field: ControllerRenderProps<FieldValues, "cuisines">;
// };

// const CuisineCheckBox = ({ cuisine, field }: Props) => {
//   return (
//     <Flex align="center" justify="start" gap="2">
//       <Checkbox
//         checked={field.value.includes(cuisine)}
//         onCheckedChange={(checked) => {
//           if (checked) {
//             field.onChange([...field.value, cuisine]);
//           } else {
//             field.onChange(
//               field.value.filter((value: string) => value !== cuisine)
//             );
//           }
//         }}
//         className="hover:cursor-pointer"
//       />
//       <Text as="label" size="3">
//         {cuisine}
//       </Text>
//     </Flex>
//   );
// };

// export default CuisineCheckBox;

import { Checkbox, Flex, Text } from "@radix-ui/themes";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckBox = ({ cuisine, field }: Props) => {
  return (
    <Flex
      align="center"
      justify="start"
      gap="2"
      className="p-2 w-fit rounded-xl "
    >
      <Checkbox
        id={cuisine}
        checked={field.value?.includes(cuisine)}
        onCheckedChange={(checked) => {
          if (checked) {
            field.onChange([...field.value, cuisine]);
          } else {
            field.onChange(
              field.value.filter((value: string) => value !== cuisine)
            );
          }
        }}
        className="hover:cursor-pointer"
      />
      <Text
        as="label"
        size="3"
        htmlFor={cuisine}
        className="hover:cursor-pointer"
      >
        {cuisine}
      </Text>
    </Flex>
  );
};

export default CuisineCheckBox;
