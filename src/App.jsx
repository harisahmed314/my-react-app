
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import { AddProducts } from './pages/AddProduct'



function App() {



  return (
    <>
    
      <Routes>


        <Route path='/' element={<Layout/>}>
          <Route path='/register' element={<RegistrationPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/addproduct' element={<AddProducts/>} />
          
        </Route>

      </Routes>




    </>
  )
}

export default App
