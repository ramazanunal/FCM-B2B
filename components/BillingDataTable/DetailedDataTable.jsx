"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
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

export default function DetailedDataTable() {
  const { data: session } = useSession();
  const [billingData, setBillingData] = useState([]);
  const [userCarBakiye, setUserCarBakiye] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchData() {
      //Eger kullanici bilgisi yoksa data cekilmez
      if (!session?.user?.id) return;

      try {
        //Iki tablodan veri cektigimiz icin promise olarak birlestiriyoruz.
        const [billingResponse, tableCartResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/detailed-billings`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/table-cart`),
        ]);
        //Response ok degilse hata dön
        if (!billingResponse.ok || !tableCartResponse.ok)
          throw new Error("API error");

        const { data: billingData } = await billingResponse.json();
        const { data: tableCartData } = await tableCartResponse.json();

        setBillingData(billingData);

        const userTableCartData = tableCartData.find(
          (item) => item.CARKOD === session?.user?.id
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

  const filteredData = billingData.filter(
    (item) => item.FATHARCARKOD === session?.user?.id
  );

  //Tarih için sorting logic
  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.FATHARTAR);
      const dateB = new Date(b.FATHARTAR);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setBillingData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //Kaç sayfa olduğunu hesaplamak için logic
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  //Eğer herhangi bir veri çekiliyor veya herhangi bir nedenden dolayı loading true oluyorsa Loading componentini dönecek.
  if (isLoading) return <Loading />;

  //Pagination için yazılmış logic.
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

  //Tarih format düzenleme
  function formatDate(dateString) {
    return dateString
      ? new Date(dateString).toLocaleDateString("tr-TR")
      : "N/A";
  }

  //Para format düzenleme
  function formatCurrency(amount) {
    return (
      amount?.toLocaleString("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
      }) || "N/A"
    );
  }

  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-xl md:text-2xl text-blue-500">
            Detaylı Faturalar
          </h1>
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
              <TableHead>Vade Tarihi</TableHead>
              <TableHead>Ürün Kodu</TableHead>
              <TableHead>Ürün Cinsi</TableHead>
              <TableHead>Miktar</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Borç</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "" : "bg-gray-100"}
              >
                <TableCell>{formatDate(item.FATHARTAR)}</TableCell>
                <TableCell>{formatDate(item.null)}</TableCell>
                <TableCell>{item.FATHARSTKKOD}</TableCell>
                <TableCell>{item.FATHARSTKCINS}</TableCell>
                <TableCell>{item.FATHARMIKTAR}</TableCell>
                <TableCell>{formatCurrency(item.FATHARFIYAT)}</TableCell>
                <TableCell>
                  {formatCurrency(item.FATHARFIYAT * item.FATHARMIKTAR)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
