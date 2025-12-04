import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import ListingsPage from './pages/ListingsPage';
import UploadListingPage from './pages/UploadListingPage';
import ListingDetailsPage from './pages/ListingDetailsPage';

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <div className="py-6">
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/upload" element={<UploadListingPage />} />
          <Route path="/listing/:id" element={<ListingDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
