import React from "react";
import OrderHeader from "./OrderHeader";
import OrderFilters from "./OrderFilters";
import OrderListTable from "./OrderListTable";

const OrderList = () => {
  const orders = [
    {
      id: 1,
      checkbox: <input type="checkbox" />,
      orderNumber: "ORD123",
      invoiceNumber: "INV456",
      date: "22 Nisan 2024",
      status: "Tamamlandı",
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

  return (
    <div className="bg-BaseLight text-LightBlue flex flex-col gap-3 pt-3 py-3 px-5 h-screen">
      <OrderHeader orders={orders} />
      <OrderFilters orders={orders} />
      <OrderListTable orders={orders} />
    </div>
  );
};

export default OrderList;
