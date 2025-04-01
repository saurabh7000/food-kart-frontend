import { Flex, Text } from "@radix-ui/themes"
import { Link } from "react-router-dom"

type Props = {
    message:string
}

const EmptyResponse = ({message}: Props) => {
  return (
    <Flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        gap="2"
      >
        <Text className="m-2 text-2xl cursor-pointer">
          {message}
        </Text>
        <Link
          to="/"
          className="border-2 text-2xl bg-orange-500 p-2 text-white rounded-lg"
        >
          Home
        </Link>
      </Flex>
  )
}

export default EmptyResponse