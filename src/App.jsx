
import RegistrationPage from './pages/RegistrationPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import LoginPage from './pages/LoginPage'
import Account from './pages/Account'



function App() {



  return (
    <>
      <Routes>


        <Route path='/' element={<Layout/>}>
          <Route path='/register' element={<RegistrationPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/account' element={<Account/>}/>
        </Route>

      </Routes>




    </>
  )
}

export default App
