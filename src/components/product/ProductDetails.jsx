import React from 'react';

const ProductDetails = ({product}) => {
    return (
        <span className="p-4 mt-2 max-w-3/4">
            <p>Kategoria: {product.category}</p>
            <p>Ocena: {product.rating.rate} z {product.rating.count} opinii</p>
            <p>Opis: {product.description}</p>
        </span>
    );
}

export default ProductDetails;
