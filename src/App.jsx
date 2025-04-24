import react from 'react'
import Header from './components/Header'
import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm'
import AddProduct from './components/product/AddProduct'

function App() {
  const mockUsers = {
    name: 'John Doe'
  }
  return (
    <>
      {/* <LoginForm />
      <RegisterForm /> */}
      <Header user={mockUsers} />
      {/* <AddProduct /> */}
    </>
  )
}

export default App
