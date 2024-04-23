const OrderListTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium "
            >
              <input type="checkbox" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium "
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
              className="px-6 py-3 text-left text-base font-medium  "
            >
              Tarih
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium "
            >
              Durum
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium "
            >
              Toplam
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium "
            >
              Eylemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.checkbox}</td>
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
