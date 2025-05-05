import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';

const ShoppingCart = () => {
  const { cart, removeProduct, clearCart } = useContext(CartContext);

  useEffect(() => {
    console.log('ShoppingCart cart state:', cart);
  }, [cart]);

  if (cart.length === 0) {
    return <div className=' w-100vw m-10 flex align-center'>Twój koszyk jest pusty.</div>;
  }

  const totalSum = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="overflow-hidden p-4 w-screen h-full flex flex-col items-center justify-center ">
      <h1 className='mt-5 mb-4'>Twój koszyk</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id} className="flex justify-between items-center border-b py-2">
            <div>
              <strong>{product.title || product.name}</strong> - ${product.price.toFixed(2)}
            </div>
            <button
              onClick={() => removeProduct(product.id)}
              className="bg-red-500 text-black px-2 py-1 rounded ml-2"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
      <span className="font-bold mt-4 block">Suma: ${totalSum.toFixed(2)}</span>
      <button
        onClick={clearCart}
        className="mt-4 bg-gray-700 text-black px-4 py-2 rounded"
      >
        Wyczyść koszyk
      </button>
    </div>
  );
};

export default ShoppingCart;
