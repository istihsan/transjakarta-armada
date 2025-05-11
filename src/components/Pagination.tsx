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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 bg-white p-4 rounded-xl shadow">
        <div className="text-sm text-gray-800">
          Menampilkan{" "}
          <strong className="text-gray-900">
            {totalItems === 0 ? 0 : startIndex + 1}–{endIndex}
          </strong>{" "}
          dari <strong className="text-gray-900">{totalItems}</strong>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-800">
            Data per halaman:
          </label>
          <div className="relative w-[160px]">
            <select
              className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-blue-400"
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
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              ▼
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>

        <span className="text-sm text-gray-800 font-medium">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-sm hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage >= totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
