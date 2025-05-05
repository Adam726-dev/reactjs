import React, { useContext } from 'react';
import '../styles/Header.css';
import ProductList from './product/ProductList';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const Header = ({user}) => {
    return (
        <div>
            <Navbar user={user} />
            <ProductList />
        </div>
    );
}

export default Header;
