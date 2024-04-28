import React, { useState } from 'react';
import { FaImage } from "react-icons/fa6";
import { PiCaretUpDownFill } from "react-icons/pi";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";




function ProdcutsTable({currentProducts}) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);

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
      <thead className="bg-gray-50 ">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium "
          >
            <input type="checkbox" />
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
            Kategori
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium "
          >
            Ürün Ekleme Tarihi
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
            <td className="px-6 py-4 whitespace-nowrap">{product.checkbox}</td>
            <td className="px-6 py-4 whitespace-nowrap">
             <img src= {product.imgPath} className='w-12' alt="" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {product.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product.stok}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">₺{product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product.category.mainCategory} ({product.category.subCategory})</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product.date.productAdditionDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-BaseDark">{product.date.lastUpdateDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ProdcutsTable