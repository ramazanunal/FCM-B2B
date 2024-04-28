"use client";
import React, { useState, useEffect } from "react";
import OrderListTable from "./OrderListTable";
import { orders, statuses } from "./data";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const OrderList = () => {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [orderDate, setOrderDate] = useState("Tüm Tarihler");
  const [uniqueDates, setUniqueDates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const dates = [...new Set(filteredOrders.map((order) => order.date))];
    setUniqueDates(dates);
  }, [filteredOrders]);

  const filterOrders = (searchValue, status, date) => {
    let filteredOrders = orders;

    if (searchValue) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderNumber.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (status !== "Tümü") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    if (date !== "Tüm Tarihler") {
      filteredOrders = filteredOrders.filter((order) => order.date === date);
    }

    filteredOrders.forEach((order) => {
      if (order.status === "Tamamlanan") {
        order.status = "Tamamlandı";
      } else if (order.status === "İptal edilen") {
        order.status = "İptal edildi";
      } else if (order.status === "Başarısız olan") {
        order.status = "Başarısız";
      }
    });
    setFilteredOrders(filteredOrders);
  };

  // Arama
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    filterOrders(value, selectedStatus, orderDate);
  };

  // status fiiltresi  degisikligini yonetiyor
  const filterStatus = (status) => {
    setSelectedStatus(status);
    filterOrders(searchValue, status, orderDate, uniqueDates);
  };

  const handleChangePage = (direction) => {
    if (direction === "prev" && page > 0) {
      setPage(page - 1);
    } else if (
      direction === "next" &&
      (page + 1) * rowsPerPage < filteredOrders.length
    ) {
      setPage(page + 1);
    }
  };

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <div className="justify-between flex">
        <div className="flex gap-2 text-LightBlue">
          {statuses.map((status, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => filterStatus(status.name)}
                className={
                  selectedStatus === status.name
                    ? "text-BaseDark cursor-pointer"
                    : "cursor-pointer"
                }
              >
                {status.name}
              </span>
              <span className="text-CustomGray">({status.count})</span>
              {index !== statuses.length - 1 && (
                <span className="text-CustomGray">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex">
          <form action="" className="flex gap-2">
            <input
              value={searchValue}
              onChange={handleSearchChange}
              type="text"
              className="p-2 border rounded-md"
            />
            <button
              className="p-2 border border-LightBlue rounded-md"
              type="submit"
            >
              Siparişleri Ara
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center py-3">
        <div className="flex gap-4">
          {/* Filtreleme Seçenekleri */}
          <div className="flex gap-2">
            {/* Toplu İşlemler Select */}

            <select
              className="p-1 border rounded-md text-CustomGray w-64"
              name="filterActions"
            >
              <option hidden>Toplu İşlemler</option>
              <option>Toplu İşlemler</option>
              <option>Çöp kutusuna taşı</option>
              <option>Durumu hazılanıyor olarak değiştir</option>
              <option>Durumu ödeme bekleniyor olarak değiştir</option>
              <option>Durumu tamalandı olarak değiştir</option>
              <option>Durumu iptal edildi olarak değiştir</option>
              <option>PDF Fatura</option>
              <option>PDF Paketleme Fişi</option>
            </select>
            {/* Uygula Butonu */}
            <button className="p-1 border border-LightBlue rounded-md">
              Uygula
            </button>
          </div>

          <div className="flex gap-2">
            {/* Tarihler Select */}
            <select
              className="p-1 border rounded-md text-BaseDark w-54 font-medium"
              name="filterDates"
              onChange={(e) => {
                const selectedDate = e.target.value;
                setOrderDate(selectedDate);
                filterOrders(searchValue, selectedStatus, selectedDate);
              }}
              value={orderDate}
            >
              <option>Tüm Tarihler</option>
              {uniqueDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {/* Kayıtlı Kullanıcılara Göre Filtreleme Select */}
            <select
              className="p-1 border rounded-md text-CustomGray w-80"
              name="filterUsers"
            >
              <option hidden>Kayıtlı Kullanıcılara göre Filtrele</option>
              <option>Kayıtlı Kullanıcılara göre Filtrele</option>
            </select>
            {/* Filtrele Butonu */}
            <button className="p-1 border border-LightBlue rounded-md">
              Filtrele
            </button>
          </div>
        </div>

        {/* Sıralama ve Sayfalama */}
        <div className="flex items-center gap-2 text-DarkBlue">
          <p className="text-CustomGray">{filteredOrders.length} öge</p>

          <MdKeyboardDoubleArrowLeft
            className="border rounded-sm text-[24px] p-1 cursor-pointer"
            onClick={() => handleChangePage("prev")}
          />

          <MdKeyboardArrowLeft
            className={`border rounded-sm text-[24px] p-1 ${
              page === 0 ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => handleChangePage("prev")}
          />

          <span className="border px-4 rounded bg-white">{page + 1}</span>
          <span>/ {Math.ceil(filteredOrders.length / rowsPerPage)}</span>

          <MdKeyboardArrowRight
            className={`border rounded-sm text-[24px] p-1 ${
              (page + 1) * rowsPerPage >= filteredOrders.length
                ? "text-gray-300 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => handleChangePage("next")}
          />

          <MdKeyboardDoubleArrowRight
            className="border rounded-sm text-[24px] p-1 cursor-pointer"
            onClick={() => handleChangePage("next")}
          />
        </div>
      </div>
      <OrderListTable orders={paginatedOrders} />
    </>
  );
};

export default OrderList;
