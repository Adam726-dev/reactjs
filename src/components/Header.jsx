import React from 'react';
import '../styles/Header.css';
import ProductList from './product/ProductList';
import { useNavigate } from 'react-router-dom';

const Header = ({user}) => {
    const navigate = useNavigate();
    return (
        <div className='header p-5' > 
            <h2>Sklep internetowy</h2>
            <p>{user.name}</p>
            <button onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
                window.location.reload()
            }}>Wyloguj</button>
            <ProductList />
        </div>
    );
}

export default Header;
