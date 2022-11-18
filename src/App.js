import React from 'react';
import './App.css';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App"> 
    <Router>
   
<Routes>

<Route exact path="/" element={<HomePage/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/register" element={<Register/>}></Route>
</Routes>
    </Router>
     </div>
  );
}

export default App;
