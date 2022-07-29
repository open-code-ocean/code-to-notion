import React, { useEffect } from 'react';
import '../../assets/styles/tailwind.css';
import './Options.css';
import { MemoryRouter } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify';
import Connect from "./pages/notion/connect";
import PrivateRoutes from "./pages/PrivateRoutes";
import Auth from "./services/auth"
export default function Options() {
  useEffect(() => {
    Auth.getCurrentUser().then((res) => {
      console.log("user is logged in")
    }

    ).catch(err => {

    });
  }, [])

  return (
    <>

      <MemoryRouter>
        <div className="bg-white">
          <div>
            <h1 className="text-center text-xl">Code To Notion</h1>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/verify">Verify</Link>
            <Link to="/connect">Connect Notion</Link>
          </div>

          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Connect />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
        </div>
      </MemoryRouter>
      <ToastContainer />
    </>
  );
}
