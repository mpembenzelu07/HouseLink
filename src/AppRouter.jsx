import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import ListingsPage from './pages/ListingsPage';
import UploadListingPage from './pages/UploadListingPage';

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <div className="py-6">
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/upload" element={<UploadListingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
