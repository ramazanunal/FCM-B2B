import DetailedDataTable from "@/components/BillingDataTable/DetailedDataTable";
import Link from "next/link";

const DetailedBillings = () => {
  return (
    <>
      <DetailedDataTable />
      <div className="max-w-[1880px] mx-auto flex items-center justify-center my-5 md:my-10">
        <Link href="/billings">
          <button className="bg-white border-2 border-gray text-NavyBlue px-4 py-2 hover:border-NavyBlue hover:rounded-xl hover:bg-gray-100 transition-all duration-300">
            Tablo Türünü Değiştir
          </button>
        </Link>
      </div>
    </>
  );
};

export default DetailedBillings;
