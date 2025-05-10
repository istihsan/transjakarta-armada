import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalItems: number;
  onPageDataChange?: (startIndex: number, endIndex: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  onPageDataChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  useEffect(() => {
    onPageDataChange?.(startIndex, endIndex);
  }, [currentPage, itemsPerPage, totalItems]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 text-sm">
      <div>
        Menampilkan{" "}
        <strong>
          {totalItems === 0 ? 0 : startIndex + 1}–{endIndex}
        </strong>{" "}
        dari <strong>{totalItems}</strong> Data
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Data per halaman:</label>
        <select
          className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={itemsPerPage}
          onChange={e => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 bg-gray-200 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Halaman <strong>{currentPage}</strong> dari{" "}
          <strong>{totalPages}</strong>
        </span>

        <button
          className="px-3 py-1.5 bg-gray-200 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
