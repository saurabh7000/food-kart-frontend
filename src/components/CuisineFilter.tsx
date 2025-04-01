import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { cuisinesList } from "../config/restuarant-options-config";
import { ChangeEvent } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCusines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
const CuisineFilter = ({
  onChange,
  selectedCusines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleResetFilters = () => onChange([]);

  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCusines, clickedCuisine]
      : selectedCusines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  return (
    <>
      <Flex align="center" justify="between" px="0.5rem">
        <Box className="text-md font-semibold mb-2">Filter by cuisine</Box>
        <Box
          onClick={handleResetFilters}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500 hover:text-blue-600"
        >
          Reset Filters
        </Box>
      </Flex>

      <Flex direction="column" className="space-y-2">
        {cuisinesList
          .slice(0, isExpanded ? cuisinesList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCusines.includes(cuisine);
            return (
              <Flex key={cuisine}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold hover:text-blue-400 hover:border-blue-400 ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-600"
                  }`}
                >
                  {isSelected}
                  {cuisine}
                </label>
              </Flex>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="soft"
          className="cursor-pointer w-fit m-auto bg-white"
        >
          {isExpanded ? (
            <Text className="flex gap-2 items-center justify-center w-full text-sm">
              View less
              <ChevronUpIcon />
            </Text>
          ) : (
            <Text className="flex gap-2 items-center justify-center w-full text-sm">
              View more <ChevronDownIcon />
            </Text>
          )}
        </Button>
      </Flex>
    </>
  );
};

export default CuisineFilter;
