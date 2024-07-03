"use client"; // Next.js client modunu kullanıyoruz
import { useState, useEffect, useRef } from "react"; // React hook'ları
import { useSession } from "next-auth/react"; // NextAuth kullanarak oturum yönetimi
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md"; // Sayfalama için ikonlar
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./TableComponents"; // Özel tablo bileşenleri

export default function DetailedDataTable() {
  const { data: session } = useSession(); // Oturum bilgisini almak için kullanılan hook
  const [carharData, setCarharData] = useState([]); // CARHAR verileri için state
  const [fatharData, setFatharData] = useState([]); // FATHAR verileri için state
  const [isLoading, setIsLoading] = useState(true); // Veri yükleniyor durumu için state
  const [sortOrder, setSortOrder] = useState("asc"); // Sıralama düzeni için state
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası için state
  const [filterType, setFilterType] = useState(""); // Filtre tipi için state
  const itemsPerPage = 8; // Sayfa başına gösterilecek öğe sayısı
  const maxPagesToShow = 5; // Gösterilecek maksimum sayfa sayısı
  const isMounted = useRef(true); // Component'in unmount olup olmadığını takip etmek için useRef kullanılıyor

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CARHAR verilerini API'den çekme
        const carharResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/billings`
        );
        if (!carharResponse.ok) {
          throw new Error("API hatası: " + carharResponse.status);
        }
        const { data: carharData } = await carharResponse.json();
        setCarharData(carharData);

        // FATHAR verilerini API'den çekme
        const fatharResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/detailed-billings`
        );
        if (!fatharResponse.ok) {
          throw new Error("API hatası: " + fatharResponse.status);
        }
        const { data: fatharData } = await fatharResponse.json();
        setFatharData(fatharData);
      } catch (error) {
        console.error("Veri çekme hatası: ", error);
      } finally {
        setIsLoading(false); // Veri yükleme tamamlandı
      }
    };

    fetchData(); // Veri çekme işlemini başlat

    return () => {
      isMounted.current = false; // Component unmount olduğunda güncelleme yapma
    };
  }, [session]); // Oturum değiştiğinde yeniden veri çek

  useEffect(() => {
    // Tarihe göre sıralamayı güncelle
    const sortedData = [...fatharData].sort((a, b) => {
      const dateA = new Date(a.FATHARTAR);
      const dateB = new Date(b.FATHARTAR);
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    if (isMounted.current) {
      setFatharData(sortedData); // Sıralanmış veriyi güncelle
    }
  }, [fatharData, sortOrder]); // FATHAR verileri veya sıralama düzeni değiştiğinde güncelle

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Sıralama düzenini değiştir
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Sayfa numarasını güncelle
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterType(selectedFilter); // Filtre tipini güncelle
    setCurrentPage(1); // Filtre değiştiğinde sayfa numarasını sıfırla
  };

  // Filtrelenmiş veriyi al
  const filteredData = filterType
    ? fatharData.filter((item) => item.CARHARISTIPKOD === filterType)
    : fatharData.filter((item) => item.FATHARCARKOD === session?.user?.id); // Oturum açmış kullanıcının ID'sine göre filtrele

  // Sayfalama işlemi için veriyi dilimle
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Belirtilen anahtar için toplam miktarı hesapla
  const getTotal = (key) => {
    return fatharData.reduce((total, item) => {
      const value = parseFloat(
        item[key].toString().replace(".", "").replace(",", ".")
      );
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  // Borç, alacak ve bakiye toplamlarını hesapla
  const borcTotal = getTotal("FATHARTUTAR") || 0;
  const alacakTotal = getTotal("FATHARMIKTAR") || 0;
  const bakiyeTotal = borcTotal - alacakTotal;

  // Veri yükleniyor durumunda yükleme animasyonunu göster
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

  // Sayfa numaralarını oluştur
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    if (currentPage > Math.floor(maxPagesToShow / 2)) {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
    }
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Component'in dönüşü
  return (
    <>
      <div className="max-w-[1880px] mx-auto mt-8 flex flex-col justify-between items-center px-8 gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl text-blue-500">
            Detaylı Faturalar
          </h1>
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

        <div className="flex items-center">
          {/* Sayfalama butonları */}
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

      {/* Detaylı veri tablosu */}
      <div className="max-w-[1880px] mx-auto mt-6 border">
        <Table>
          {/* Tablo başlığı */}
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
              <TableHead>Unvan</TableHead>
              <TableHead>Alacak</TableHead>
              <TableHead className="text-right">Bakiye</TableHead>
            </TableRow>
          </TableHeader>
          {/* Tablo içeriği */}
          <TableBody>
            {paginatedData.map((fatharItem, index) => {
              // İlgili CARHAR verisini bul
              const carharItem = carharData.find(
                (carhar) => carhar.CARHARCARKOD === fatharItem.FATHARCARKOD
              );

              // Tablo satırı oluştur
              return (
                <TableRow key={index}>
                  <TableCell>{fatharItem.FATHARTAR}</TableCell>
                  <TableCell>
                    {carharItem ? carharItem.CARHARISTIPKOD : ""}
                  </TableCell>
                  <TableCell>
                    {carharItem ? carharItem.CARHARACIKLAMA1 : ""}
                  </TableCell>
                  <TableCell>
                    {carharItem ? carharItem.CARHARVADETAR : ""}
                  </TableCell>
                  <TableCell>{fatharItem.FATHARCARKOD}</TableCell>
                  <TableCell>{fatharItem.FATHARSTKCINS}</TableCell>
                  <TableCell>{fatharItem.FATHARMIKTAR}</TableCell>
                  <TableCell>{fatharItem.FATHARFIYAT}</TableCell>
                  <TableCell>{fatharItem.FATHARTUTAR}</TableCell>
                  <TableCell>
                    {carharItem ? carharItem.CARHARCARUNVAN : ""}
                  </TableCell>
                  <TableCell>{fatharItem.FATHARMIKTAR}</TableCell>
                  <TableCell className="text-right">
                    {(
                      fatharItem.FATHARTUTAR - fatharItem.FATHARMIKTAR
                    ).toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {/* Tablo altbilgi */}
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
