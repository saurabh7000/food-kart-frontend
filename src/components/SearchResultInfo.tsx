import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <Flex
      direction="column"
      justify="between"
      gap="3"
      className="text-xl font-bold lg:items-center lg:flex-row"
    >
      <Text>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-2 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </Text>
    </Flex>
  );
};

export default SearchResultInfo;
