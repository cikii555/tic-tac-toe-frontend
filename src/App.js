
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/registrationForm';
import LoginForm from './components/loginForm';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Logout from './components/logout';
import Game from './components/game';
import Board from './components/board'
import Wait from './components/wait'
class App extends Component {
  state={};
  componentDidMount() {
    const jwt = localStorage.getItem('token')
    if (jwt){
    const user = jwtDecode(jwt)
    this.setState({user})
    }
  }
  render(){
  return (
   <React.Fragment>
    <div>
      <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element = {<RegistrationForm/>}/>
        <Route path="/logout" element = {<Logout/>}/>
        <Route path="/game" element = {<Game/>}/>
        <Route path = "/board" element = {<Board/>}/> 
        <Route path = "/wait" element = {<Wait/>} />
      </Routes>
    </Router>

    
    </div>
   </React.Fragment>
  );
  }
}

export default App;
