//Globals
import 'normalize.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthContext} from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';


//Components
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/Footer';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Location from './pages/Location';
import Donations from './pages/Donations';


function App() {

  const [authState, setAuthState] = useState({
    id: 0,
    name:'',
    surname:'',
    email: '',
    role: '',
    status: false
  });

  useEffect(() => {
    axios.get("http://localhost:3001/users/verify", {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((response) => {
      if(response.data.error)
        setAuthState(
          { 
            id: 0,
            name:'',
            surname:'',
            email: '',
            role: '',
            status: false
          })
      else setAuthState(
        {
          id: response.data.id,
          name: response.data.name,
          surname: response.data.surname,
          email: response.data.email,
          role: response.data.role,
          status: true
        }
      );
    });
  }, []);
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        {authState.status ? (
          authState.role === 'admin' ? (
            <>
              <AdminNavbar />
            </>
          ) : (
            <>
              <Navbar />
            </>
          )
          ) : (
          <>
            <Navbar />
          </>
          )}
        <Routes>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
          <Route exact path= "/" element={<Home/>}/>
          <Route path={`/Profile/${authState.id}`} element={<Profile />}/>
          
          {authState.role === 'admin'  && (
            <>
              <Route path="/Dashboard" element={<Dashboard />}/>
            </>
          )}
          <Route path='/Location' element={<Location/>}/>
          <Route path='/Donations' element={<Donations/>}/>
        </Routes>
      <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
