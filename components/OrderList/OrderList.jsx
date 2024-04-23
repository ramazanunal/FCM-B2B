"use client";
import React, { useState } from "react";
import OrderListTable from "./OrderListTable";
import OrderFilters from "./OrderFilters";

const OrderList = () => {
  const orders = [
    {
      id: 1,
      checkbox: <input type="checkbox" />,
      orderNumber: "ORD123",
      invoiceNumber: "INV456",
      date: "22 Nisan 2024",
      status: "Tamamlanan",
      total: "100₺",
      actions: <button>Edit</button>,
    },
    {
      id: 2,
      checkbox: <input type="checkbox" />,
      orderNumber: "ORD124",
      invoiceNumber: "INV457",
      date: "23 Nisan 2024",
      status: "Beklemede",
      total: "80₺",
      actions: <button>Edit</button>,
    },
  ];

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const [selectedStatus, setSelectedStatus] = useState("Tümü");

  function filterStatus(status) {
    setSelectedStatus(status);
    if (status === "Tümü") {
      setFilteredOrders(orders);
    } else {
      const filteredOrders = orders.filter((item) => item.status === status);
      setFilteredOrders(filteredOrders);
    }
  }

  const statuses = [
    { name: "Tümü", count: orders.length },
    { name: "Beklemede", count: statusCounts["Beklemede"] || 0 },
    { name: "Hazırlanıyor", count: statusCounts["Hazırlanıyor"] || 0 },
    { name: "Ödeme Bekleniyor", count: statusCounts["Ödeme Bekleniyor"] || 0 },
    { name: "Tamamlanan", count: statusCounts["Tamamlanan"] || 0 },
    { name: "İptal Edilen", count: statusCounts["İptal Edilen"] || 0 },
    { name: "Başarısız Olan", count: statusCounts["Başarısız Olan"] || 0 },
  ];

  return (
    <>
      <div className=" justify-between flex  ">
        <div className="flex gap-2">
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
            <input type="text" className="p-2 border rounded-md" />
            <button
              className="p-2 border border-LightBlue rounded-md"
              type="submit"
            >
              Siparişleri Ara
            </button>
          </form>
        </div>
      </div>
      <OrderFilters />
      <OrderListTable orders={filteredOrders} />
    </>
  );
};

export default OrderList;
