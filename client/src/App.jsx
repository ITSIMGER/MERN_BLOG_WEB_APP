import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";

import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";


const App = () => {
    const { user } = useContext(Context);
return (
    <>
    <Router>
    <Topbar />

        <Routes>
        <Route exact path="/" element={<Home/>} />
         <Route exact path="/posts" element={<Home/>} />
         <Route exact path="/register" element={user ? <Home />  :  <Register />} />
         <Route exact path="/login" element={user ? <Home />  :  <Login/>} />
         <Route exact path="/write" element={user ? <Write />  :  <Login />} />
         <Route exact path="/settings" element={user ? <Settings/>  :  <Login/>} />
         <Route exact path="/post/:id" element={<Single/>} />
        </Routes>
               
</Router>
      </>
  );
}

export default App;
