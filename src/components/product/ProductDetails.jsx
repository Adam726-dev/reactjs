import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetch';

const ProductDetails = ({ productId }) => {
    const { data: product, error, isLoading } = useSWR(
        productId ? `https://fakestoreapi.com/products/${productId}` : null,
        fetcher
    );

    if (error) return <div>Błąd</div>;
    if (isLoading) return <div>Ładowanie...</div>;
    if (!product) return null;
    

    return (
        <div className='flex flex-row items-center justify-center m-5 p-5'>
        <img src={product.image} alt={product.title} className="w-1/8 h-1/8" />
        <span className="p-5 mt-2 m-10">
            <p>Kategoria: {product.category}</p>
            <p>Ocena: {product.rating.rate} z {product.rating.count} opinii</p>
            <p>Opis: {product.description}</p>
        </span>
        </div>
    );
}

export default ProductDetails;
