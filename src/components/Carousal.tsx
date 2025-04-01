import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface CarousalProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const Carousal: React.FC<CarousalProps> = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 2000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <Flex
      align="center"
      justify="center"
      overflow="hidden"
      position="relative"
      height="35rem"
    >
      <Flex
        className="transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </Flex>
      <Flex
        position={"absolute"}
        justify={"between"}
        className=" inset-0 items-center  p-4"
      >
        <Button
          color="gray"
          size="1"
          variant="solid"
          className="hover:cursor-pointer hover:bg-white hover:text-black"
          onClick={prev}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          color="gray"
          size="1"
          variant="solid"
          className="hover:cursor-pointer hover:bg-white hover:text-black"
          onClick={next}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
      <Box className="absolute bottom-0 ">
        <Flex className="align-bottom justify-center gap-2">
          {slides.map((_, i) => (
            <Box key={i}
              className={`transition-all w-3 bg-white rounded-lg ${
                curr === i ? "p-2" : "bg-opacity-50"
              } `}
            ></Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Carousal;
