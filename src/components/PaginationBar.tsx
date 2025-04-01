import Pagination from "@mui/material/Pagination";
import { Flex } from "@radix-ui/themes";
import React from "react";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationBar = ({ page, pages, onPageChange }: Props) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    event.preventDefault();
    onPageChange(newPage);
  };

  return (
    <Flex align="center" justify="center">
      <Pagination
        count={pages}
        page={page}
        shape="rounded"
        color="primary"
        size="large"
        onChange={handlePageChange}
      />
    </Flex>
  );
};

export default PaginationBar;
