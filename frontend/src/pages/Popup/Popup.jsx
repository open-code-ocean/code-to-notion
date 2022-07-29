import React from 'react';
import { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import LeetCode from './components/LeetCode';
import Setup from './components/Setup';
import './Popup.css';
import { MemoryRouter } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom';
const Popup = () => {
  useEffect(() => {
    chrome.storage.sync.get(['secretKey', 'dbid'], function (result) {
      console.log(result)
    });
  }, []);
  return (
    <MemoryRouter>
      <div className='bg-white'>
        <div>
          <h1 className='text-center text-xl'>Code To Notion</h1>
          <Link to='/'>
            Home
          </Link>
          <Link to='/saga'>
            Saga
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<h1>
            home
          </h1>} />
          <Route path="/saga" element={<h1>
            Saga
          </h1>} />
        </Routes>

      </div>
    </MemoryRouter>
  );
};

export default Popup;
