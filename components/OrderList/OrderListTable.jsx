import React, { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { RxEyeOpen } from "react-icons/rx";

const OrderListTable = ({ orders,setSelectedOrders,selectedOrders }) => {


  // statu Renkleri
  const statusColors = {
    "Beklemede": "bg-[#e5e5e5] text-[#80808b]",
    "Hazırlanıyor": "bg-[#c7e1c7] text-[#5d7b45]",
    "Ödeme bekleniyor": "bg-[#f8dda5] text-[#876b17]",
    "Tamamlandı": "bg-[#c7d8e2] text-[#324356]",
    "İptal edildi": "bg-[#e3e5e3] text-[#7a7a7c]",
    "Başarısız": "bg-[#eaa4a4] text-[#762024]",
    "Kargoya Verildi": "bg-LightBlue bg-opacity-40 text-LightBlue",
    
    
  };
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    // Tüm ürünler seçiliyse, seçili ürünleri güncelle
    if (selectAll) {
      setSelectedOrders(orders.map((order) => order));
    } else {
      setSelectedOrders([]);
    }
  }, [selectAll]);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  
  const handleOrderSelect = (order) => {
    // Seçili ürünleri güncelle (ekle veya çıkar)
    if (selectedOrders.some((o) => o.id === order.id)) {
      setSelectedOrders(selectedOrders.filter((o) => o.id !==order.id));
    } else {
      setSelectedOrders([...selectedOrders, order]);
    }
  };
 


  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-NavyBlue text-white ">
          <tr>
            <th className="px-6 py-3  text-left text-xs font-medium">
              <input
                type="checkbox"
                onChange={handleSelectAll} checked={selectAll}
              />
            </th>
            <th className="px-6 py-3 text-left text-base font-medium  ">
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
        <tbody className="bg-white divide-y divide-gray-200 ">
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`${index % 2 === 1 ? "bg-white" : "bg-gray-50"} `}
            >
              <td className="px-6 py-4 whitespace-nowrap">
              <input
              type="checkbox"
              checked={selectedOrders.includes(order)} 
            onChange={() => handleOrderSelect(order)}
              
            />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-LightBlue relative group cursor-pointer ">
                {order.orderNumber}
                <span className="invisible group-hover:visible w-28 bg-LightBlue text-xs text-white text-center rounded-lg p-2 absolute z-10 -mt-1 ml-2">
                  Sipariş Detayı
                </span>
              </td>
              <td className="py-4 whitespace-nowrap flex items-center gap-3">
                <BiHide className="hidden text-LightBlue" />
                <RxEyeOpen className=" text-LightBlue" />
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
              <td className="px-6 py-4 whitespace-nowrap">{order.total}₺</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-3">
                  <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">
                    Düzenle
                  </button>
                  <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListTable;
