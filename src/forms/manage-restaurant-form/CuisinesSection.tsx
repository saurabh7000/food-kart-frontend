// import { Grid, Text } from "@radix-ui/themes";
// import { Controller, FieldError, useFormContext } from "react-hook-form";
// import { cuisinesList } from "../../config/restuarant-options-config";
// import CuisineCheckBox from "./CuisineCheckBox";

// const CuisinesSection = () => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();
//   return (
//     <div className="flex flex-1 flex-col space-y-5">
//       <div className="flex flex-col space-y-1">
//         <Text size="7">Cuisines</Text>
//         <Text size="2" color="gray">
//           Select the cuisines that your restuarant serves{" "}
//         </Text>
//       </div>
//       <div className="space-y-2">
//         <Controller
//           control={control}
//           name="cuisines"
//           render={({ field }) => (
//             <Grid className="grid grid-cols-1 gap-2 md:grid-cols-3">
//               {cuisinesList.map((cuisinesItem) => (
//                 <CuisineCheckBox cuisine={cuisinesItem} field={field} />
//               ))}
//             </Grid>
//           )}
//         />
//         {errors.cuisines && (
//           <p className="text-red-500 text-sm">
//             {(errors.cuisines as FieldError)?.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// 721
// export default CuisinesSection;


import { Grid, Text } from "@radix-ui/themes";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import { cuisinesList } from "../../config/restuarant-options-config";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <div className="flex flex-1 flex-col space-y-5">
      <div className="flex flex-col space-y-1">
        <Text size="7">Cuisines</Text>
        <Text size="2" color="gray">
          Select the cuisines that your restaurant serves
        </Text>
      </div>
      <div className="space-y-2">
        <Controller
          control={control}
          name="cuisines"
          render={({ field }) => (
            <Grid className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {cuisinesList.map((cuisinesItem, index) => (
                <CuisineCheckBox
                  key={index} 
                  cuisine={cuisinesItem}
                  field={field}
                />
              ))}
            </Grid>
          )}
        />
        {errors.cuisines && (
          <p className="text-red-500 text-sm">
            {(errors.cuisines as FieldError)?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CuisinesSection;
