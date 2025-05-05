import React, {useState, useEffect} from 'react';
import ProductCart from './ProductCart';
import styles from '../../styles/ProductList.module.css';
import useSWR from 'swr';
import {fetcher} from '../utils/fetch';
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom';

const mockProducts = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 200 }
];

const ProductList = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);

    const toggleAddProduct = () => {
        setShowAddProduct(!showAddProduct);
    }

    const {data: products, error, isLoading} = useSWR('https://fakestoreapi.com/products', fetcher)
    if(error) return <div>Błąd</div>
    if(isLoading) return <div>Pobieranie...</div>
    console.log(products)
    return (
        <div className={styles.container}>
            <h1>Product List</h1>
            <button onClick={toggleAddProduct} className="bg-cyan-500 px-4 py-2 text-black rounded">Dodaj Produkt</button>
            {showAddProduct && <AddProduct />}
            {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductCart product={product}/>
                </Link>
            ))}
        </div>
    );
}

export default ProductList;
