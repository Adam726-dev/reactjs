import React, { useMemo, useState, useContext, Suspense } from 'react';
import ProductCart from './ProductCart';
import styles from '../../styles/ProductList.module.css';
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import useProducts from '../hooks/useProducts';
import Lazy from '../utils/Lazy';

const ProductList = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [sortState, setSortState] = useState('asc');
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(Infinity); 
    const { cart } = useContext(CartContext);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const toggleAddProduct = () => {
        setShowAddProduct(!showAddProduct);
    };

    const { data: products, error, isLoading } = useProducts();

    const filteredAndSortedProducts = useMemo(() => {
        if (!products) return [];
        let filteredProducts = products;

        filteredProducts = filteredProducts.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );

        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            );
        }

        if (searchTerm.trim() !== '') {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        const sortedProducts = [...filteredProducts];
        switch (sortState) {
            case 'asc':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'desc':
                return sortedProducts.sort((a, b) => b.price - a.price);
            default:
                return sortedProducts;
        }


    }, [products, sortState, minPrice, maxPrice, selectedCategory, searchTerm]);


    const categories = useMemo(() => {
        if (!products) return [];
        const uniqueCategories = []
        for (const product of products) {
        if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
        }
        }
        return ["all", ...uniqueCategories];
        }, [products]);

    if (error) return <div>Błąd</div>;
    if (isLoading) return <div>Pobieranie...</div>;

    return (
        <div className={styles.container}>
            <h1>Lista produktów</h1>
            <button onClick={toggleAddProduct} className="bg-gray-200 mt-3 px-4 py-2 text-black rounded shadow-xl">
                Dodaj Produkt
            </button>
            {showAddProduct && <AddProduct />}
            <div className="filters mt-4">
                <input
                    type="number"
                    placeholder="Cena minimalna"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="bg-gray-100 p-3 rounded mr-2 shadow-l"
                />
                <input
                    type="number"
                    placeholder="Cena maksymalna"
                    value={maxPrice === Infinity ? '' : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
                    className="bg-gray-100 p-3 rounded shadow-l"
                />
            
            <select
                className="bg-gray-100 m-2 mt-3 p-3 rounded mb-4 shadow-l"
                value={sortState}
                onChange={(e) => {
                    setSortState(e.target.value);
                }}
            >
                <option value="none">Nie sortuj</option>
                <option value="asc">Sortuj rosnąco</option>
                <option value="desc">Sortuj malejąco</option>
            </select>
            <select
            value = {selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 m-2 mt-3 p-3 rounded mb-4 shadow-l">
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category === 'all' ? 'Wszystkie kategorie' : category}
                    </option>
                ))}
            </select></div>
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-gray-100 m-2 mt-3 p-3 rounded mb-4" placeholder="Wyszukaj" type="text" />

            
            <Suspense fallback={<Lazy />}>
                {filteredAndSortedProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <ProductCart product={product} />
                    </Link>
                ))}
            </Suspense>
        </div>
    );
};

export default ProductList;