// import { useState } from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ListProduct from './components/ListProduct';
import { RootState } from "./store/AuthStore";
import { useSelector } from "react-redux";


function App() {

  // const [refreshList, setRefreshList] = useState(false);

  const userId = useSelector((state:RootState)=> state.auth.userId)
  console.log(userId)

  return (
    <>
      <Router>
        <Routes>
          <Route
          path='/login'
          element={userId ? <Navigate to='/'/> : <Login/>}
          />
          <Route
          path='/signup'
          element = {userId ? <Navigate to="/"/>:<Signup/>}
          />
          <Route
            path="/"
            element={ 
              userId ? (
                <>
                <ListProduct/>
                </>
              ) : (

                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
