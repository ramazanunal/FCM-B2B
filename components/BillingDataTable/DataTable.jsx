"use client";

import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./TableComponents";
import { BILLING_DATA } from "@/app/(dashboardLayout)/billings/data";

export default function DataTable() {
  const [data, setData] = useState(BILLING_DATA);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const itemsPerPage = 8;
  const maxPagesToShow = 5;

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const [dayA, monthA, yearA] = a.tarih.split(".");
      const [dayB, monthB, yearB] = b.tarih.split(".");

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
      if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);
  };

  const filteredData = filterType
    ? data.filter((item) => item.islemC === filterType)
    : data;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getTotal = (key) => {
    return filteredData.reduce((total, item) => {
      const value = parseFloat(item[key].replace(".", "").replace(",", "."));
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const borcTotal = getTotal("borc");
  const alacakTotal = getTotal("alacak");
  const bakiyeTotal = borcTotal - alacakTotal;

  const getPageNumbers = () => {
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftOffset = Math.floor(maxPagesToShow / 2);
    const rightOffset = Math.ceil(maxPagesToShow / 2) - 1;

    let startPage = currentPage - leftOffset;
    let endPage = currentPage + rightOffset;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPagesToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxPagesToShow + 1;
    }

    let pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    if (startPage > 1) {
      pages = [1, "...", ...pages];
    }

    if (endPage < totalPages) {
      pages = [...pages, "...", totalPages];
    }

    return pages;
  };

  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl text-LightBlue">Faturalar</h1>
          <div className="flex items-center gap-4">
            <span className="mr-2">İşlem Tipi:</span>
            <select
              className="px-2 py-1 border rounded"
              value={filterType}
              onChange={handleFilterChange}
            >
              <option value="">Tümü</option>
              <option value="Devir">Devir</option>
              <option value="Fatura">Fatura</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${
                currentPage === page
                  ? "bg-NavyBlue text-white"
                  : typeof page === "number"
                  ? "bg-gray-300"
                  : "text-gray-500"
              } rounded`}
              onClick={() => handlePageChange(page)}
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-2 max-w-[1880px] mx-auto px-8 md:items-start">
        <h2>Cari Unvanı: {BILLING_DATA[0].cariUnvani}</h2>
        <h2>Cari Yetkili: {BILLING_DATA[0].cariYetkili}</h2>
      </div>
      <div className="max-w-[1880px] mx-auto mt-6 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Cari Kodu</TableHead>
              <TableHead>Unvan</TableHead>
              <TableHead
                onClick={handleSort}
                className="cursor-pointer flex items-center py-11 md:py-6"
              >
                Tarih
                {sortOrder === "asc" ? (
                  <FaSortUp className="ml-2" />
                ) : sortOrder === "desc" ? (
                  <FaSortDown className="ml-2" />
                ) : (
                  <FaSort className="ml-2" />
                )}
              </TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>Açıklama 1</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Borç</TableHead>
              <TableHead>Alacak</TableHead>
              <TableHead className="text-right">Bakiye</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <TableCell className="font-medium">{item.cariKodu}</TableCell>
                <TableCell>{item.cariUnvani}</TableCell>
                <TableCell>{item.tarih}</TableCell>
                <TableCell>{item.islemC}</TableCell>
                <TableCell>{item.aciklama1}</TableCell>
                <TableCell>{item.aciklama}</TableCell>
                <TableCell>
                  {item.borc.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  {item.alacak.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {item.bakiye.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-right font-bold">
                Toplam:
              </TableCell>
              <TableCell className="font-bold">
                {borcTotal.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="font-bold">
                {alacakTotal.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="text-right font-bold">
                {bakiyeTotal.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
