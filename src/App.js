import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeClient from './Client/Home';
import SideBar from './SideNavBar/SideBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        


        <Route path="/*" element={<WithSideBar />} />

      </Routes>
    </Router>
  );
}

function WithSideBar() {
  return (
    <>
      <SideBar />
      /*Comment*/
      <Routes>
      </Routes>
    </>
  );
}

export default App;
