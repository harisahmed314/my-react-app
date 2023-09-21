
import RegistrationPage from './pages/RegistrationPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout'



function App() {



  return (
    <>
      <Routes>


        <Route path='/' element={<Layout/>}>
          <Route path='/register' element={<RegistrationPage/>} />
        </Route>

      </Routes>




    </>
  )
}

export default App
