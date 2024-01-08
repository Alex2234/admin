import { useEffect, useState } from "react";
import styles from "./table.module.css";
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { FaSort, FaChevronDown, FaSearch } from "react-icons/fa";

const Table = ({ columns, data }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const totalRows = data.length;
  const firstRowOnPage = pageIndex * pageSize + 1;
  const lastRowOnPage = Math.min((pageIndex + 1) * pageSize, totalRows);

  const taskName = columnFilters.find((f) => f.id === "name")?.value || "";

  const onFilterChange = (id, value) => {
    setPageIndex(0);
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  };

  return (
    <Box>
      <Box>
        <InputGroup size="sm" maxW="12rem">
          <InputLeftElement pointerEvents="none">
            <FaSearch />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Искать домен"
            borderRadius={5}
            bg="#2e2b3f"
            borderColor="#424242"
            mb={5}
            value={taskName}
            onChange={(e) => onFilterChange("name", e.target.value)}
            _hover={{
              background: "#2e2b3f",
              border: "2px",
              borderColor: "#3182ce",
            }}
          />
        </InputGroup>
      </Box>
      <Box w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Box ml={2}>
                    <FaSort onClick={header.column.getToggleSortingHandler()} />
                  </Box>
                )}
                {
                  {
                    asc: "🔼",
                    desc: "🔽",
                  }[header.column.getIsSorted()]
                }
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        <Box className={styles.rows}>
          {table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td" w={cell.column.getSize()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box m={2} display="flex" columnGap={5} alignItems="center">
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            color="#fff"
            onClick={() => setPageIndex((prev) => prev - 1)}
            isDisabled={!table.getCanPreviousPage()}
            _hover={{ color: "#2e2b3f", background: "#fff" }}>
            {"<"}
          </Button>
          <Button
            color="#fff"
            onClick={() => setPageIndex((prev) => prev + 1)}
            isDisabled={!table.getCanNextPage()}
            _hover={{ color: "#2e2b3f", background: "#fff" }}>
            {">"}
          </Button>
        </ButtonGroup>
        <Text mb={2} mt={2}>
          {firstRowOnPage} - {lastRowOnPage} из {totalRows}
        </Text>
        <Menu>
          <>
            <MenuButton
              bg="#2e2b3f"
              textColor="#fff"
              border="1px"
              borderColor="#fff"
              size="sm"
              as={Button}
              rightIcon={<FaChevronDown />}
              _hover={{ color: "#2e2b3f", background: "#fff" }}>
              {pageSize}
            </MenuButton>
            <MenuList bg="#2e2b3f" textColor="#fff">
              {[20, 50, 100, 500].map((item, index) => (
                <MenuItem
                    key={index}
                  bg="#2e2b3f"
                  textColor="#fff"
                  onClick={() => setPageSize(item)}
                  _hover={{ color: "#2e2b3f", background: "#fff" }}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </>
        </Menu>
      </Box>
    </Box>
  );
};

export default Table;
