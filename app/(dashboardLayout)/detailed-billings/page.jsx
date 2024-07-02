import DetailedDataTable from "@/components/BillingDataTable/DetailedDataTable";
import Link from "next/link";

const DetailedBillings = () => {
  return (
    <>
      <DetailedDataTable />
      <div className="max-w-[1880px] mx-auto flex items-center justify-center my-8 md:my-16">
        <Link href="/billings">
          <button className="bg-NavyBlue text-white px-4 py-2 hover:bg-DarkBlue">
            Switch Table Type
          </button>
        </Link>
      </div>
    </>
  );
};

export default DetailedBillings;
