import { DotIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

type Props = {
  cuisines: string[];
};

const CuisineList = ({ cuisines }: Props) => {
  return (
    <Flex align="center" gap="2" className="flex-wrap">
      {cuisines.map((cuisine) => (
        <Text key={cuisine} className="flex items-center gap-2">
          <DotIcon /> {cuisine}
        </Text>
      ))}
    </Flex>
  );
};

export default CuisineList;
