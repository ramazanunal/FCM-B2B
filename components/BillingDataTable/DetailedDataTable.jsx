"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./TableComponents";
import Loading from "../Loading";

export default function DetailedDataTable() {
  const { data: session } = useSession();
  const [fatharData, setFatharData] = useState([]);
  const [carharData, setCarharData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchFatharData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/detailed-billings`
        );
        if (!response.ok) {
          throw new Error("API hatası: " + response.status);
        }
        const { data } = await response.json();
        setFatharData(data);
      } catch (error) {
        console.error("FATHAR veri çekme hatası: ", error);
      }
    };

    const fetchCarharData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/billings`
        );
        if (!response.ok) {
          throw new Error("API hatası: " + response.status);
        }
        const { data } = await response.json();
        setCarharData(data);
      } catch (error) {
        console.error("CARHAR veri çekme hatası: ", error);
      }
    };

    Promise.all([fetchFatharData(), fetchCarharData()]).then(() =>
      setIsLoading(false)
    );
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = filterType
    ? fatharData.filter((item) => item.FATHARCARKOD === filterType)
    : fatharData.filter((item) => item.FATHARCARKOD === session?.user?.id);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getTotal = (key) => {
    return fatharData.reduce((total, item) => {
      const value = parseFloat(
        item[key].toString().replace(".", "").replace(",", ".")
      );
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const borcTotal = getTotal("FATHARTUTAR") || 0;
  const alacakTotal = getTotal("FATHARMIKTAR") || 0;
  const bakiyeTotal = borcTotal - alacakTotal;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex items-center gap-4">
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
              <TableHead className="cursor-pointer" onClick={handleSort}>
                Tarih {sortOrder === "asc" ? "↑" : "↓"}
              </TableHead>
              <TableHead>İşlem Cinsi</TableHead>
              <TableHead>Açıklama 1</TableHead>
              <TableHead>Vadesi</TableHead>
              <TableHead>Kodu</TableHead>
              <TableHead>Cinsi</TableHead>
              <TableHead>Miktar</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Borç</TableHead>
              <TableHead>Alacak</TableHead>
              <TableHead className="text-right">Bakiye</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((fatharItem, index) => {
              const matchingCarhar = carharData.find(
                (carharItem) =>
                  carharItem.CARHARCARKOD === fatharItem.FATHARCARKOD &&
                  new Date(carharItem.CARHARTAR).getTime() ===
                    new Date(fatharItem.FATHARTAR).getTime()
              );

              return (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "" : "bg-gray-100"}
                >
                  <TableCell>
                    {new Date(fatharItem.FATHARTAR).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell>
                    {matchingCarhar ? matchingCarhar.CARHARISTIPKOD : ""}
                  </TableCell>
                  <TableCell>
                    {matchingCarhar ? matchingCarhar.CARHARACIKLAMA1 : ""}
                  </TableCell>
                  <TableCell>
                    {matchingCarhar
                      ? new Date(
                          matchingCarhar.CARHARVADETAR
                        ).toLocaleDateString("tr-TR")
                      : ""}
                  </TableCell>
                  <TableCell>{fatharItem.FATHARSTKKOD}</TableCell>
                  <TableCell>{fatharItem.FATHARSTKCINS}</TableCell>
                  <TableCell>{fatharItem.FATHARMIKTAR}</TableCell>
                  <TableCell>
                    {fatharItem.FATHARFIYAT.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    {(
                      fatharItem.FATHARFIYAT * fatharItem.FATHARMIKTAR
                    ).toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>
                    {(
                      fatharItem.FATHARTUTAR - fatharItem.FATHARMIKTAR
                    ).toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {fatharItem.FATHARTUTAR.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="text-right font-bold">
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
