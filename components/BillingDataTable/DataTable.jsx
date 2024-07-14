"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./TableComponents";
import Loading from "../Loading";

export default function DataTable() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [userCarBakiye, setUserCarBakiye] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchData() {
      //Eger kullanici bilgisi yoksa data cekilmez
      if (!session?.user?.id) return;

      try {
        //Iki tablodan veri cektigimiz icin promise olarak birlestiriyoruz.
        const [billingResponse, tableCartResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/billings`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/table-cart`),
        ]);
        //Response ok degilse hata dön
        if (!billingResponse.ok || !tableCartResponse.ok)
          throw new Error("API error");

        const { data: billingData } = await billingResponse.json();
        const { data: tableCartData } = await tableCartResponse.json();

        //CARHAR kodu ile giriş yapmış kullanıcının idsini matchleyip verileri filtreliyoruz
        const filteredData = billingData.filter(
          (item) => item.CARHARCARKOD === session.user.id
        );
        setData(filteredData);

        const userTableCartData = tableCartData.find(
          (item) => item.CARKOD === session.user.id
        );
        if (userTableCartData) setUserCarBakiye(userTableCartData.CARBAKIYE);
      } catch (error) {
        console.error("Data fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session?.user?.id]);

  //Tarih icin siralama logic'i
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.CARHARTAR);
      const dateB = new Date(b.CARHARTAR);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //Sayfaları hesaplamak için logic.
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  //Pagination yapmamizi saglayan logic
  function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex items-center">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          icon={<MdKeyboardDoubleArrowLeft />}
        />
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={<MdKeyboardArrowLeft />}
        />
        <span className="border md:px-4 md:py-2 py-1 px-3 rounded-full bg-NavyBlue text-white ml-1">
          {currentPage}
        </span>
        <span className="md:px-2 md:py-2 py-1 px-3 rounded-full mr-1">
          / {totalPages}
        </span>
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={<MdKeyboardArrowRight />}
        />
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          icon={<MdKeyboardDoubleArrowRight />}
        />
      </div>
    );
  }

  function PaginationButton({ onClick, disabled, icon }) {
    return (
      <button
        className={`border-2 rounded-sm text-[18px] mx-1 md:p-3 p-1 ${
          disabled
            ? "cursor-not-allowed text-gray-300"
            : "cursor-pointer hover:bg-gray-200 duration-300 hover:border-NavyBlue hover:rounded-xl"
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </button>
    );
  }

  //Tarih formatlama
  function formatDate(dateString) {
    return dateString
      ? new Date(dateString).toLocaleDateString("tr-TR")
      : "N/A";
  }

  //Para formatlama
  function formatCurrency(amount) {
    return (
      amount?.toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
      }) || "N/A"
    );
  }

  //Eğer herhangi bir veri çekiliyor veya herhangi bir nedenden dolayı loading true oluyorsa Loading componentini dönecek.
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-xl md:text-2xl text-blue-500">Faturalar</h1>
          <h1>
            <span className="font-bold">Cari Kodu:</span> {session?.user?.id}
          </h1>
          <h1>
            <span className="font-bold">Cari Unvanı:</span>{" "}
            {session?.user?.name}
          </h1>
          <h1>
            <span className="font-bold">Bakiye:</span>{" "}
            {formatCurrency(userCarBakiye)}
          </h1>
        </div>
        {/* Pagination yapar. */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="max-w-[1880px] mx-auto mt-6 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={handleSort}
                className="cursor-pointer flex items-center py-12 md:py-6"
              >
                Tarih
                {sortOrder === "asc" ? (
                  <FaSortUp className="ml-2" />
                ) : (
                  <FaSortDown className="ml-2" />
                )}
              </TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>Vade Tarihi</TableHead>
              <TableHead>Açıklama 1</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Borç</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                // Bu satir sutunlarin bir gri bir beyaz olmasini saglar.
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <TableCell>{formatDate(item.CARHARTAR)}</TableCell>
                <TableCell>{item.CARHARISTIPKOD}</TableCell>
                <TableCell>{formatDate(item.CARHARVADETAR)}</TableCell>
                <TableCell>{item.CARHARACIKLAMA1}</TableCell>
                <TableCell>{item.CARHARACIKLAMA}</TableCell>
                <TableCell>{formatCurrency(item.CARHARTUTAR)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
