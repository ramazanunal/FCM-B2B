import DataTable from "@/components/BillingDataTable/DataTable";
import Link from "next/link";

const Billings = () => {
  return (
    <>
      <DataTable />
      <div className="max-w-[1880px] mx-auto flex items-center justify-center my-5 md:my-10">
        <Link href="/detailed-billings">
          <button className="bg-NavyBlue text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
            Tablo Türünü Değiştir
          </button>
        </Link>
      </div>
    </>
  );
};

export default Billings;
