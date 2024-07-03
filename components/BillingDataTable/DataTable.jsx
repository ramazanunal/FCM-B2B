"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
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

export default function DataTable() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;
  const maxPagesToShow = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/billings`
        );
        if (!response.ok) {
          throw new Error("API hatası: " + response.status);
        }
        const { data } = await response.json();

        // Giriş yapmış kullanıcının CARHARCARKOD'uyla uyumlu olan verileri filtrele
        const filteredData = data.filter(
          (item) => item.CARHARCARKOD === session?.user?.id
        );
        setData(filteredData);
      } catch (error) {
        console.error("Veri çekme hatası: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session]);

  // Fonksiyon: Tablodaki tarihleri sıralamak için
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.CARHARTAR);
      const dateB = new Date(b.CARHARTAR);

      if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
      if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Fonksiyon: Sayfa değişikliği işlemini yönetmek için
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fonksiyon: Filtre değişikliği işlemini yönetmek için
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter);
  };

  // Filtrelenmiş verileri al
  const filteredData = filterType
    ? data.filter((item) => item.CARHARISTIPKOD === filterType)
    : data;

  // Sayfalama yapılan veriyi al
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Toplam borç miktarını hesapla
  const getTotal = (key) => {
    return filteredData.reduce((total, item) => {
      const value = parseFloat(
        item[key].toString().replace(".", "").replace(",", ".")
      );
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  // Toplam borç, alacak ve bakiye miktarlarını hesapla
  const borcTotal = getTotal("CARHARTUTAR") || 0;
  const alacakTotal = 0; // Varsayılan olarak alacak yok kabul ediliyor
  const bakiyeTotal = borcTotal - alacakTotal;

  // Sayfa numaralarını al
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

  // Yükleme durumunu kontrol et
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-NavyBlue animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-NavyBlue animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-NavyBlue animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }

  // Veri yüklendiğinde tabloyu göster
  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-xl md:text-2xl text-blue-500">Faturalar</h1>
            <h1>
              <span className="font-bold">Cari Kodu:</span> {session?.user?.id}
            </h1>
            <h1>
              <span className="font-bold">Cari Unvanı:</span>{" "}
              {session?.user?.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center">
          <button
            className={`border-2 rounded-sm text-[18px] md:p-3 p-1 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            }`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          <button
            className={`border-2 rounded-sm text-[18px] md:p-3 p-1 ml-2 ${
              currentPage === 1
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <span className="border md:px-4 md:py-2 py-1 px-3 rounded-full bg-NavyBlue text-white ml-2">
            {currentPage}
          </span>
          <span className="md:px-2 md:py-2 py-1 px-3 rounded-full mr-2">
            / {totalPages}
          </span>
          <button
            className={`border-2 rounded-sm text-[18px] md:p-3 p-1 mr-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            className={`border-2 rounded-sm text-[18px] md:p-3 p-1 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-300"
                : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
            }`}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      <div className="max-w-[1880px] mx-auto mt-6 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Cari Kodu</TableHead>
              <TableHead>Unvan</TableHead>
              <TableHead
                onClick={handleSort}
                className="cursor-pointer flex items-center py-12 md:py-6"
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
                <TableCell className="font-medium">
                  {item.CARHARCARKOD}
                </TableCell>
                <TableCell>{item.CARHARCARUNVAN}</TableCell>
                <TableCell>
                  {new Date(item.CARHARTAR).toLocaleDateString("tr-TR")}
                </TableCell>
                <TableCell>{item.CARHARISTIPKOD}</TableCell>
                <TableCell>{item.CARHARACIKLAMA1}</TableCell>
                <TableCell>{item.CARHARACIKLAMA}</TableCell>
                <TableCell>
                  {item.CARHARTUTAR.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  {item.CARHARTUTAR.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {item.CARHARTUTAR.toLocaleString("tr-TR", {
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
