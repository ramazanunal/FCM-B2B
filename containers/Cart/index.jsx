import React from 'react';
import ShoppingCart from '@/components/ShoppingCart';

function CartContainer () {
  return (
    <div className="bg-white">
      {typeof window !== 'undefined' && <ShoppingCart />}
    </div>
  );
};

export default CartContainer;
