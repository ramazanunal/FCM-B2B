// Fake Data
export const orders = [
  {
    id: 1,
    userId: 1,
    orderNumber: "F36458",
    invoiceNumber: "INV456",
    date: "22 Nisan 2021",
    status: "Tamamlanan",
    total: "100₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
  {
    id: 2,
    userId: 2,
    orderNumber: "F36451",
    invoiceNumber: "INV457",
    date: "23 Nisan 2021",
    status: "Beklemede",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
      <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
       <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
    </div>
    ),
  },
  {
    id: 3,
    userId: 3,
    orderNumber: "F36454",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Başarısız olan",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
      <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
       <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
    </div>
    ),
  },
  {
    id: 4,
    userId: 4,
    orderNumber: "F36478",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "İptal edilen",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
  {
    id: 5,
    userId: 5,
    orderNumber: "F36452",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Ödeme bekleniyor",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
  {
    id: 6,
    userId: 6,
    orderNumber: "F36441",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Tamamlanan",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
  {
    id: 7,
    userId: 7,
    orderNumber: "F36465",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Beklemede",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
  {
    id: 8,
    userId: 8,
    orderNumber: "F3646598",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Hazırlanıyor",
    total: "80₺",
    actions: (
      <div className="flex space-x-3">
          <button className="bg-yellow-300 p-2 rounded-2xl hover:bg-yellow-400">Düzenle</button>
           <button className="bg-red-300 p-2 rounded-2xl hover:bg-red-400">Sil</button>
        </div>
    ),
  },
];

// Statü listesi
export const statuses = [
  { name: "Tümü", count: orders.length },
  {
    name: "Beklemede",
    count: orders.filter((order) => order.status === "Beklemede").length,
  },
  {
    name: "Hazırlanıyor",
    count: orders.filter((order) => order.status === "Hazırlanıyor").length,
  },
  {
    name: "Ödeme bekleniyor",
    count: orders.filter((order) => order.status === "Ödeme bekleniyor").length,
  },
  {
    name: "Tamamlanan",
    count: orders.filter((order) => order.status === "Tamamlanan").length,
  },
  {
    name: "İptal edilen",
    count: orders.filter((order) => order.status === "İptal edilen").length,
  },
  {
    name: "Başarısız olan",
    count: orders.filter((order) => order.status === "Başarısız olan").length,
  },
];
