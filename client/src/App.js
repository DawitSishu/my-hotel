import './App.css';
//make  user signup to reserve room  || show a dummy payment screen
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

function App() {
  const [loggedIn, SetLoggedIn] = useState(false);
  const handleLogIn = () =>{
      SetLoggedIn(true)
  } 
  const handleLogOut = () =>{
      SetLoggedIn(false)
  } 


  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={!loggedIn ? <Home onLogOut={handleLogOut}/> : <Login onLogIn = {handleLogIn} />}/>
        <Route path='/signup' element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
