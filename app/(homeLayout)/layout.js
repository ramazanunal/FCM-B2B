import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';

export default function HomeLayout({ children, session }) {
  return (
    <div className=" flex w-full h-full flex-col items-center bg-[url('https://caliskanari.com/wp-content/uploads/2018/10/clothes-2049536750.jpg.webp')] bg-no-repeat bg-[#6bcdec]">
      <div className='bg-white'>
        <Header />
      </div>
      <div className='bg-white'>{children}</div>
      <div className='bg-white  bottom-0'>
        <Footer />
      </div>
      <Banner />
    </div>
  );
}
