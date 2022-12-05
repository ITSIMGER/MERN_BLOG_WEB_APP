import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
const App = () => {
    const currentUser = false;
return (
    <>
    <Router>
    <Topbar />
         
        <Routes>
         <Route exact path="/" element={<Homepage/>} />
         <Route exact path="/posts" element={<Homepage/>} />
         <Route exact path="/register" element={currentUser ? <Homepage />  :  <Register />} />
         <Route exact path="/login" element={currentUser ? <Homepage />  :  <Login/>} />
         <Route exact path="/write" element={currentUser ? <Write />  :  <Login />} />
         <Route exact path="/settings" element={currentUser ? <Settings/>  :  <Login/>} />
         <Route exact path="/post/:id" element={<Single/>} />
        </Routes>
               
</Router>
      </>
  );
}

export default App;
