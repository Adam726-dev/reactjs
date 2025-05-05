import React, { useState, useContext, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCart = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isInCart, setIsInCart] = useState(false); 
    const { addProduct, removeProduct } = useContext(CartContext);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.some((item) => item.id === product.id);
        setIsInCart(productInCart);
    }, [product.id]);

    const detailsProduct = () => {
        setShowDetails(!showDetails);
    };

    const handleCartAction = (e) => {
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (isInCart) {
            const updatedCart = cart.filter((item) => item.id !== product.id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            removeProduct(product);
        } else {
            const updatedCart = [...cart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            addProduct(product);
        }

        setIsInCart(!isInCart); 
    };

    return (
        <div>
            <div key={product.id} className="md:flex md:justify-between md:items-center p-4 border-b border-gray-200">
                <div className="flex items-center gap-10">
                    <Link to={`/product/${product.id}`}>
                        <img src={product.image} width="50px" alt={product.title} />
                    </Link>
                    <Link to={`/product/${product.id}`}>
                        <span>{product.title} ${product.price.toFixed(2)}</span>
                    </Link>
                </div>
                <div className="flex gap-10">
                    <button onClick={detailsProduct} className="bg-cyan-500 px-4 py-2 text-black rounded">
                        Szczegóły
                    </button>
                    <button
                        onClick={handleCartAction}
                        className={`px-4 py-2 text-black rounded ${isInCart ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {isInCart ? 'Usuń' : 'Dodaj do koszyka'}
                    </button>
                </div>
            </div>
            {showDetails && <ProductDetails product={product} />}
        </div>
    );
};

export default ProductCart;