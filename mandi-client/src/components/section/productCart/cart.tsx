import React from 'react'

const Cart = ({product}: any) => (
    <div className='cart'>
    <img
    className='w-full h-full object-cover rounded-md'
    src="https://storefront.saleor.io/_next/image?url=https%3A%2F%2Fstorefront1.saleor.cloud%2Fmedia%2Fthumbnails%2Fproducts%2Fsaleor-grey-hoodie_thumbnail_1024.webp&w=640&q=75" alt="" />
  <div className='flex w-full justify-between bg-white p-2'>
     <h2>
     {product.title}
   </h2>
   <p>$ {product.price}</p>
  </div>
    </div>
)

export default Cart