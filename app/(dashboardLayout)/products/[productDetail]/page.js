import ProdcutDetail from '@/components/ProductList/ProdcutDetail'
import React from 'react'
import { products } from '@/components/ProductList/data'

function page({params:{productDetail}}) {
    const product = products.find((product) => product?.id?.toString() === productDetail)
  return (
   <ProdcutDetail product={product}/>
  )
}

export default page