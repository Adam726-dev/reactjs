import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm'
import ProductDetails from './components/product/ProductDetails'
import ShoppingCart from './components/product/ShoppingCart'
import { useParams } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/header" element={<Header user={user} />} />
        <Route path="/product/:id" element={<ProductDetailsWrapper />} />
        <Route path="/cart" element={
            <ShoppingCart />} 
          />
        <Route path="*" element={<Navigate to="/header" replace />} />
      </Routes>
    </Router>
  )
}

const ProductDetailsWrapper = () => {
  const { id } = useParams()
  return <ProductDetails productId={id} />
}

const AppWrapper = () => (
  <AuthProvider>
    <CartProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CartProvider>
  </AuthProvider>
)

export default AppWrapper
