// Fake Data
const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık"
];
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden +1 ekliyoruz
const currentYear = currentDate.getFullYear();

const formattedDate = `${currentDay} ${months[currentMonth - 1]} ${currentYear}`;



// Statü listesi
export const statuses = [
  "Beklemede",
  "Hazırlanıyor",
  "Ödeme bekleniyor",
  "Tamamlandı",
  "İptal edildi",
  "Başarısız",
  "Kargoya Verildi",
];

export const orders = [
  {
    id: 1,
    userId: 1,
    orderNumber: "F36458",
    invoiceNumber: "INV456",
    date: formattedDate,
    status: statuses[3],
    total: 100,
   
  },
  {
    id: 2,
    userId: 2,
    orderNumber: "F36451",
    invoiceNumber: "INV457",
    date: formattedDate,
    status: statuses[0],
    total: 80,
   
  },
  {
    id: 3,
    userId: 3,
    orderNumber: "F36454",
    invoiceNumber: "INV457",
    date: formattedDate,
    status:statuses[5],
    total: 50,
   
  },
  {
    id: 4,
    userId: 4,
    orderNumber: "F36478",
    invoiceNumber: "INV457",
    date: formattedDate,
    status: statuses[4],
    total:75,
    
  },
  {
    id: 5,
    userId: 5,
    orderNumber: "F36452",
    invoiceNumber: "INV457",
    date: formattedDate,
    status: statuses[2],
    total:15,
    
  },
  {
    id: 6,
    userId: 6,
    orderNumber: "F36441",
    invoiceNumber: "INV457",
    date: formattedDate,
    status: statuses[3],
    total: 66,
    
  },
  {
    id: 7,
    userId: 7,
    orderNumber: "F36465",
    invoiceNumber: "INV457",
    date: formattedDate,
    status:statuses[6],
    total: 25,
    
  },
  {
    id: 8,
    userId: 8,
    orderNumber: "F3646598",
    invoiceNumber: "INV457",
    date: formattedDate,
    status:statuses[1],
    total: 63,
    
  },
];

