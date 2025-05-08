import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import useProductsId from '../hooks/useProductsId';

const ProductDetails = ({ productId }) => {
    const { data: product, error, isLoading } = useProductsId(productId);

    if (error) return <div>Błąd</div>;
    if (isLoading) return <div>Ładowanie...</div>;
    if (!product) return null;
    
    const [isInCart, setIsInCart] = useState(false); 
    const { addProduct, removeProduct } = useContext(CartContext);

    const handleCartAction = (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (isInCart) {
            const updatedCart = cart.filter((item) => item.id !== product.id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            removeProduct(product.id);
        } else {
            const updatedCart = [...cart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            addProduct(product);
        }

        setIsInCart(!isInCart); 
    };

    return (
        <div className='flex flex-row items-center justify-center m-5 p-5'>
            <img src={product.image} alt={product.title} className="w-1/8 h-1/8" />
            <span className="p-5 mt-5 m-10 max-w-xl">
                <p>Kategoria: {product.category}</p>
                <p>Ocena: {product.rating.rate} z {product.rating.count} opinii</p>
                <p>Opis: {product.description}</p>
            </span>
            {/* <button onClick={() => addProduct(product)}>Dodaj do koszyka</button> */}
            <button
                        onClick={handleCartAction}
                        className={`px-4 py-2 text-black rounded ${isInCart ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {isInCart ? 'Usuń' : 'Dodaj do koszyka'}
                    </button>
        </div>
    );
}

export default ProductDetails;