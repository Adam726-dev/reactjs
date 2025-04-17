import React from 'react';
import '../styles/Header.css';
import ProductList from './product/ProductList';

const Header = ({user}) => {
    
    return (
        <div className='header p-5' > 
            <h2>Sklep internetowy</h2>
            {/* <p>{user.name}</p> */}
            <ProductList />
        </div>
    );
}

export default Header;
