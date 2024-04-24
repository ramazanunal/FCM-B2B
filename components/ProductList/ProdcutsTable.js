import React from 'react'
import { products } from './data'
import { FaImage } from "react-icons/fa6";


function ProdcutsTable({filteredProducts}) {
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
            className="px-6 py-3 text-left text-base font-medium"
          >
           İsim
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium  "
          >
            Stok Kodu
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-base font-medium "
          >
            Fiyat
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
        {filteredProducts.map((product) => (
          <tr key={product.id} >
            <td className="px-6 py-4 whitespace-nowrap">{product.checkbox}</td>
            <td className="px-6 py-4 whitespace-nowrap">
             <img src= {product.imgPath} className='w-12' alt="" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {product.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{product.stok}</td>
            <td className="px-6 py-4 whitespace-nowrap">₺{product.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.category.mainCategory} ({product.category.subCategory})</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.date.productAdditionDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{product.date.lastUpdateDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ProdcutsTable