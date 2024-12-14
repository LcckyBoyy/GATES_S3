import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

function StockMovementHistories() {
  const { Productid, InventoryId } = useParams();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        const response = await fetch(`/StockMovement?productId=${Productid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch stock movements");
        }
        const data = await response.json();
        setHistories(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, [Productid]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ cell }) => (
          <span
            className={
              cell.row.original.movementType === "IN"
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: "Type",
        accessor: "movementType",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              cell.value === "completed"
                ? "bg-green-100 text-green-800"
                : cell.value === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {cell.value}
          </span>
        ),
      },
      {
        Header: "Date",
        accessor: "movementDate",
        Cell: ({ cell }) => (
          <span>
            {cell.value
              ? new Date(cell.value).toLocaleDateString()
              : "Invalid Date"}
          </span>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: histories,
      initialState: { pageSize: 10},
    },
    useSortBy,
    usePagination
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
        Product History
      </h2>

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
                      `/manage/${InventoryId}/stock/${row.original.movementId}/edit?product=${Productid}`
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
      <div className="flex flex-col md:flex-row items-center justify-between p-3">
        <div className="text-gray-600 text-sm mb-2 md:mb-0">
          Showing {state.pageIndex * state.pageSize + 1} to{" "}
          {(state.pageIndex + 1) * state.pageSize > histories.length
            ? histories.length
            : (state.pageIndex + 1) * state.pageSize}{" "}
          of {histories.length} records
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={state.pageSize}
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

          {[...Array(pageCount)].map((_, pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => gotoPage(pageNumber)}
              className={`p-2 border rounded text-sm ${
                state.pageIndex === pageNumber
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
  );
}

export default StockMovementHistories;
