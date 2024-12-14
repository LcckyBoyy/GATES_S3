import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import Loading from "../Loading";

function Categories() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/Category?inventoryId=${InventoryId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        const formattedCategories = data.map((category) => ({
          id: category.categoryId,
          name: category.name,
          description: category.description,
        }));

        setCategories(formattedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [InventoryId]);

  // Prepare columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: categories,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, categories.length);

  // Generate page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, pageIndex - halfVisiblePages);
    let endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loading
          count={4}
          size="w-6 h-6"
          baseColor="bg-white/30"
          activeColor="bg-white"
        />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="text-base font-semibold">Categories</h1>
      <h1 className="text-gray-400 font-semibold text-xs mb-4">List</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16 p-3">
        <div className="flex items-center justify-between max-md:p-1 p-4 gap-2 bg-white border-b-[1px]">
          <div className="flex items-center border rounded-md px-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search categories..."
              className="py-2 outline-none"
            />
          </div>
          <button
            onClick={() => navigate(`/manage/${InventoryId}/categories/new`)}
            className="bg-[#dfffea] text-[#31c653] p-2 gap-2 rounded-md flex items-center hover:bg-[#17c653] hover:text-white transition"
          >
            Add <FiPlus />
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table {...getTableProps()} className="min-w-full">
            <thead className="bg-white border-b-[1px]">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-3 text-left cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        {column.render("Header")}
                        <span className="ml-2">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaChevronDown className="text-xs" />
                            ) : (
                              <FaChevronUp className="text-xs" />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/manage/${InventoryId}/categories/${row.original.id}/edit`
                      )
                    }
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-3">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3">
          <div className="text-gray-600 text-sm mb-2 md:mb-0">
            Showing {startIndex} to {endIndex} of {categories.length} records
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="border rounded-md py-2 px-2 mr-4 text-sm"
            >
              {[5, 10, 20, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="p-2 border rounded disabled:opacity-50 text-sm"
            >
              First
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="p-2 border rounded disabled:opacity-50 text-sm"
            >
              <FaChevronLeft />
            </button>

            {generatePageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => gotoPage(pageNumber)}
                className={`p-2 border rounded text-sm ${
                  pageIndex === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {pageNumber + 1}
              </button>
            ))}

            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="p-2 border rounded disabled:opacity-50 text-sm"
            >
              <FaChevronRight />
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="p-2 border rounded disabled:opacity-50 text-sm"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;