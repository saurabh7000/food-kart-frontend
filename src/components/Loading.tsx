import { Flex, Spinner, Text } from "@radix-ui/themes";

const Loading = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-w-full mt-4"
    >
      <Spinner size="3" />
      <Text className="text-2xl m-2">Loading...</Text>
    </Flex>
  );
};

export default Loading;
