import Dosa from "../assets/SliderImages/Dosa.jpg";
import Biryani from "../assets/SliderImages/Biryani.jpg";
import Chicken from "../assets/SliderImages/Chicken.jpg";
import Samosa from "../assets/SliderImages/Samosa.jpg";
import Thali from "../assets/SliderImages/Thali.jpg";
import Carousal from "./Carousal";
import { Box } from "@radix-ui/themes";

const images = [Dosa, Biryani, Chicken, Samosa, Thali];

const HomePageImage: React.FC = () => {
  return (
    <Box>
      <Carousal autoSlide={true}>
        {images.map((image, index) => (
          <img key={index} src={image} alt="image" />
        ))}
      </Carousal>
    </Box>
  );
};

export default HomePageImage;
