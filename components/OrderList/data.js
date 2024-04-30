// Fake Data
export const orders = [
  {
    id: 1,
    userId: 1,
    orderNumber: "Bilgisayar",
    invoiceNumber: "INV456",
    date: "22 Nisan 2021",
    status: "Tamamlanan",
    total: "100₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 2,
    userId: 2,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2021",
    status: "Beklemede",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 3,
    userId: 3,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Başarısız olan",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 4,
    userId: 4,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "İptal edilen",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 5,
    userId: 5,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Ödeme bekleniyor",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 6,
    userId: 6,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Tamamlanan",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 7,
    userId: 7,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Beklemede",
    total: "80₺",
    actions: (
      <div className="flex">
        <button>Duzenle</button> <button>Sil</button>
      </div>
    ),
  },
  {
    id: 8,
    userId: 8,
    orderNumber: "Telefon",
    invoiceNumber: "INV457",
    date: "23 Nisan 2024",
    status: "Hazırlanıyor",
    total: "80₺",
    actions: (
      <div className="flex gap-2">
        <button>Duzenle</button> <button>Sil</button>
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
