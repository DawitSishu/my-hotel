import './App.css';
//make  user signup to reserve room  || show a dummy payment screen
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import Gallery from './components/Gallery/Gallery';
import Reserve from './components/Reserve/Reserve';
import NotFoundPage from './components/NotFound/NotFound';

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
        <Route exact path="/" element={<Home />}/>
        <Route path='/login' element={<Login onLogIn = {handleLogIn} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/reserve' element={loggedIn ? <Reserve /> : <NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route for unknown routes */}
    </Routes>
    </BrowserRouter>
    // <>
    // <div className="panel" style={{backgroundColor:'yellow', height:'100vh'}}>
    // </div >
    // <div style={{ overflow: 'hidden'}}>
    // <Gallery />
    // </div>
    // </>
    // <Home /> <Login onLogIn = {handleLogIn} />
    // <NavBar />
  );
 
}

export default App;
