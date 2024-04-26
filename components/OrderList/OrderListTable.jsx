import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

const OrderListTable = ({ orders }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedOrderCheckboxes, setSelectedOrderCheckboxes] = useState({});

  const statusColors = {
    Beklemede: "bg-red-500 text-red-700",
    Hazırlanıyor: "bg-green-200 text-green-800",
    "Ödeme Bekleniyor": "bg-orange-200 text-amber-800",
    Tamamlandı: "bg-slate-400 text-slate-700",
    "İptal Edilen": "bg-gray-200",
    "Başarısız Olan": "bg-gray-300",
  };

  const handleSelectAllCheckboxChange = (event) => {
    const { checked } = event.target;
    setSelectAllChecked(checked);

    const updatedSelectedOrderCheckboxes = {};
    orders.forEach((order) => {
      updatedSelectedOrderCheckboxes[order.id] = checked;
    });
    setSelectedOrderCheckboxes(updatedSelectedOrderCheckboxes);
  };

  const handleSingleCheckboxChange = (orderId) => {
    setSelectedOrderCheckboxes((prevSelectedOrderCheckboxes) => ({
      ...prevSelectedOrderCheckboxes,
      [orderId]: !prevSelectedOrderCheckboxes[orderId],
    }));
  };

  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium">
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllCheckboxChange}
              />
            </th>
            <th className="px-6 py-3 text-left text-base font-medium">
              Sipariş
            </th>
            <th className="px-6 py-3 text-left text-base font-medium">
              Fatura Numarası
            </th>
            <th className="px-6 py-3 text-left text-base font-medium">Tarih</th>
            <th className="px-6 py-3 text-left text-base font-medium">Durum</th>
            <th className="px-6 py-3 text-left text-base font-medium">
              Toplam
            </th>
            <th className="px-6 py-3 text-left text-base font-medium">
              Eylemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`${index % 2 === 1 ? "bg-white" : "bg-gray-50"} `}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedOrderCheckboxes[order.id] || false}
                  onChange={() => handleSingleCheckboxChange(order.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.orderNumber}
              </td>
              <td className="py-4 whitespace-nowrap flex items-center gap-3">
                <BiHide className="hidden" />
                <RxEyeOpen />
                {order.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`inline-block rounded-sm px-2 py-1 ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListTable;
