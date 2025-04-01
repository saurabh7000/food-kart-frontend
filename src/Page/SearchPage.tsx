import { Flex, Grid } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { useSearchRestaurant } from "../Api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import RestaurantCard from "../components/RestaurantCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { SearchState } from "../types";
import PaginationBar from "../components/PaginationBar";
import CuisineFilter from "../components/CuisineFilter";
import SortOptions from "../components/SortOptions";
import MetaData from "../components/MetaData";
import Loading from "../components/Loading";
import EmptyResponse from "../components/EmptyResponse";

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurant(searchState, city);

  const setSortOptions = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!results?.data || !city) {
    return <EmptyResponse message="No Restaurant found." />;
  }

  return (
    <Grid columns="1" gap="5" className="m-8 w-full lg:grid-cols-[250px_1fr]">
      <MetaData title="Restaurants" />
      <div id="cuisines-list">
        <CuisineFilter
          selectedCusines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <Flex id="main-content" direction="column" gap="5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or restauant name"
          onReset={resetSearch}
        />
        <Flex
          direction="column"
          justify="between"
          gap="3"
          className="lg:flex-row"
        >
          <SearchResultInfo
            total={results.pagination.totalRestaurants}
            city={city}
          />
          <SortOptions
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOptions(value)}
          />
        </Flex>

        {results.data.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationBar
          page={results.pagination.page}
          pages={results.pagination.totalPage}
          onPageChange={setPage}
        />
      </Flex>
    </Grid>
  );
};

export default SearchPage;
