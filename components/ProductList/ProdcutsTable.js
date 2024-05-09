import React, { useState, useEffect } from 'react';
import { FaImage } from "react-icons/fa6";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import ProductModal from './ProductModal';
import Link from 'next/link';




function ProdcutsTable({currentProducts,setSelectedProducts,selectedProducts}) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [productImage, setProductImage] = useState(null)


  const handleOpenModal = (product) => {
    setIsOpenModal(true)
    setProductImage(product)
  }
  const handleSort = (column) => {
    if (sortedColumn === column) {
      // Sıralama sırasını tersine çevir
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Yeni bir sütuna tıklandığında sıralama sırasını varsayılan olarak ayarla
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };
 const [selectAll, setSelectAll] = useState(false);
 
  useEffect(() => {
    // Tüm ürünler seçiliyse, seçili ürünleri güncelle
    if (selectAll) {
      setSelectedProducts(currentProducts.map((product) => product));
    } else {
      setSelectedProducts([]);
    }
  }, [selectAll]);
    // checkbox işlmeleri BAşlangıç

   

  
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
    };
    
  
    const handleProductSelect = (product) => {
      // Seçili ürünleri güncelle (ekle veya çıkar)
      if (selectedProducts.some((p) => p.id === product.id)) {
        setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
      } else {
        setSelectedProducts([...selectedProducts, product]);
      }
    };
    // checkbox işlmeleri Bitiş

  let sortedProducts = [...currentProducts];

  if (sortedColumn === 'name') {
    sortedProducts = [...currentProducts].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }

      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  } else if (sortedColumn === 'price') {
    sortedProducts = [...currentProducts].sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      let comparison = 0;
      if (priceA > priceB) {
        comparison = 1;
      } else if (priceA < priceB) {
        comparison = -1;
      }

      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  }

  return (  
    <div className="overflow-x-auto border">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-NavyBlue text-white ">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium "
          >
            <input type="checkbox"onChange={handleSelectAll} checked={selectAll}  className='w-4 h-4 '/>
          </th>
          <th
            scope="col"
            className="px-10 py-3 text-left text-base font-medium "
          >
            <FaImage />
          </th>
          <th
            scope="col"
            className="px-6 flex items-center cursor-pointer  py-3 text-left text-base font-medium"
            onClick={() => handleSort('name')}
          >
           İsim
           {sortedColumn === 'name' ? (
            <span>
              {sortOrder === 'asc' ? <FaCaretUp/> : <FaCaretDown/>}
            </span>
          ):<PiCaretUpDownFill />}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium  "
          >
            Stok Kodu
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium  "
          >
            Stok Sayısı
          </th>
          <th
            scope="col"
            className="px-6 flex items-center cursor-pointer py-3 text-left text-base font-medium "
            onClick={() => handleSort('price')}
          >
            Fiyat
            {sortedColumn === 'price' ? (
              <span>
                {sortOrder === 'asc' ? <FaCaretUp/> : <FaCaretDown/>}
              </span>
            ):<PiCaretUpDownFill/>}
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium "
          >
            Ders
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium "
          >
            Sınıf
          </th>
        
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium "
          >
            Ürünü Son Güncelleme Tarihi
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedProducts.map((product, index) => (
          <tr key={product.id}  className={`${index % 2 === 1 ? "bg-white" : "bg-gray-50"} `}>
          <td className="px-6 py-4 whitespace-nowrap">
          <input 
            type="checkbox" 
            
            className="w-4 h-4 text-LightBlue focus:bg-LightBlue border-LightBlue rounded-xl focus:ring-LightBlue "
            checked={selectedProducts.includes(product)} 
            onChange={() => handleProductSelect(product)} // Her bir ürünün onay kutusunu seçim işleyicisiyle bağla
          />
        </td>
            <td className="px-6 py-4 whitespace-nowrap" onClick={() => {handleOpenModal(product)}}>
             <img src= {product.imgPath} className='w-20' alt="" />
            </td>
           
             <td className="px-6 py-4 whitespace-nowrap  border">
             <Link href={`/products/${product.id}`} className='cursor-pointer hover:text-[#0284c7]  '>
              {product.name}
              </Link>
            </td>
            
           
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark border">{product.stok}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product.stokCount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">₺{product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product?.category?.subCategory}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product?.category?.mainCategory}</td>
            <td className="px-6 py-4 whitespace-nowrap space-x-10 text-BaseDark">
            <span>{product?.date?.lastUpdateDate}</span>
            <span>
            {product?.stokCount <= 0 && 
              <span className="p-2  rounded-xl text-sm bg-red-400 text-white">Satışa uygun değil</span>
            }
            </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
         { isOpenModal && <ProductModal setIsOpenModal={setIsOpenModal} productImage={productImage} />}
    
  </div>
  )
}

export default ProdcutsTable