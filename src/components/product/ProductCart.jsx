import React, { useState } from 'react';
import ProductDetails from './ProductDetails';

const ProductCart = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false);

    const detailsProduct = () => {
        setShowDetails(!showDetails); 
    };

    return (
        <div>
            <div key={product.id} className="md:flex md:justify-between md:items-center p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <img src={product.image} width="50px" alt={product.title} />
                    <span>{product.title} ${product.price.toFixed(2)}</span>
                </div>
                <button onClick={detailsProduct} className="bg-cyan-500 px-4 py-2 text-black rounded">
                    Szczegóły
                </button>
            </div>
            {showDetails && <ProductDetails product={product} />} 
        </div>
    );
};

export default ProductCart;