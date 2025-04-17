import react from 'react'
import Header from './components/Header'

function App() {
  const mockUsers = {
    name: 'John Doe'
  }
  return (
    <>
      <Header user={mockUsers} />
    </>
  )
}

export default App
