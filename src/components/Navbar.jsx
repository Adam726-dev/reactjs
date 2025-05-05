import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`p-5 m-5 rounded-lg shadow-md flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <div>
                <h2 className="text-xl font-bold">Sklep internetowy</h2>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition duration-300"
                >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                    onClick={() => navigate('/cart')}
                    className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition duration-300"
                >
                    Koszyk
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition duration-300"
                >
                    Wyloguj
                </button>
            </div>
        </div>
    );
};

export default Navbar;