import React, { useState } from "react";

const OrderListTable = ({ orders }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedOrderCheckboxes, setSelectedOrderCheckboxes] = useState({});

  const handleSelectAllCheckboxChange = (event) => {
    const { checked } = event.target;
    setSelectAllChecked(checked);
    const updatedSelectedOrderCheckboxes = {};
    orders.forEach((order) => {
      updatedSelectedOrderCheckboxes[order.id] = checked;
    });
    setSelectedOrderCheckboxes(updatedSelectedOrderCheckboxes);
  };

  // checkbox ile seci olan siparisleri goster
  const logSelectedOrders = () => {
    const selectedOrders = orders.filter(
      (order) => selectedOrderCheckboxes[order.id]
    );
    // console.log("Seçilen Siparişler:", selectedOrders);
  };
  logSelectedOrders();
  const handleSingleCheckboxChange = (orderId) => {
    setSelectedOrderCheckboxes((prevSelectedOrderCheckboxes) => ({
      ...prevSelectedOrderCheckboxes,
      [orderId]: !prevSelectedOrderCheckboxes[orderId],
    }));
  };

  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllCheckboxChange}
              />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Sipariş
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Fatura Numarası
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Tarih
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Durum
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Toplam
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium"
            >
              Eylemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
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
              <td className="px-6 py-4 whitespace-nowrap">
                {order.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
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
