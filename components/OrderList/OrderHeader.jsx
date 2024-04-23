import Link from "next/link";
import React from "react";

const OrderHeader = ({ orders }) => {
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = [
    { name: "Tümü", count: orders.length },
    { name: "Beklemede", count: statusCounts["Beklemede"] || 0 },
    { name: "Hazırlanıyor", count: statusCounts["Hazırlanıyor"] || 0 },
    { name: "Ödeme Bekleniyor", count: statusCounts["Ödeme Bekleniyor"] || 0 },
    { name: "Tamamlanan", count: statusCounts["Tamamlandı"] || 0 },
    { name: "İptal Edilen", count: statusCounts["İptal Edilen"] || 0 },
    { name: "Başarısız Olan", count: statusCounts["Başarısız Olan"] || 0 },
  ];

  const filterStatus = statuses.filter((status) => status.name === "Beklemede");
  console.log(filterStatus);

  return (
    <div className="flex justify-between font-normal items-center">
      <div className="flex gap-2">
        {statuses.map((status, index) => (
          <React.Fragment key={index}>
            <Link href={`/${status.name}`}>{status.name}</Link>
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
  );
};

export default OrderHeader;
