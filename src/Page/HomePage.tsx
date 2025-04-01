import { Flex, Text } from "@radix-ui/themes";
import landingImage from "../assets/landingPageImage.jpg";
import appStore from "../assets/appStore.png";
import playStore from "../assets/playStore.png";
import { Link, useNavigate } from "react-router-dom";
import HomePageImage from "../components/HomePageImage";
import SearchBar, { SearchForm } from "../components/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <Flex direction="column">
      <HomePageImage />
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="8"
        className="space-y-8 mt-14 mb-14 p-2"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="4"
          className="rounded-2xl w-full p-5 shadow-lg  border-solid border-2 "
        >
          <Text size="8" className="text-orange-500  font-bold">
            Cravings Satisfied, Anytime, Anywhere
          </Text>
          <Text size="6">Just a Tap Away !</Text>
          <SearchBar
            onSubmit={handleSearchSubmit}
            placeHolder="Search by city or town"
          />
        </Flex>
        <Flex align="center" gap="7" className="flex-col md:flex-row">
          <Flex>
            <img
              src={landingImage}
              alt="phone"
              className="w-[60rem]  h-[40rem] rounded-lg"
            />
          </Flex>

          <Flex gap="5" direction="column" align="center" justify="center">
            <Text size="5">Download Food Kart App from</Text>
            <Flex gap="3">
              <Link to="https://www.apple.com/in/app-store/">
                <img src={appStore} alt="App Store Logo" className="w-48" />
              </Link>
              <Link to="https://play.google.com/">
                <img src={playStore} alt="Play Store Logo" className="w-48" />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
