import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Mock data for MVP
    setListings([
      {
        id: 1,
        title: 'Bedsitter in Sinza',
        location: 'Sinza',
        price: 120000,
        image: 'https://placehold.co/600x400',
      },
      {
        id: 2,
        title: 'Room in Mbezi',
        location: 'Mbezi',
        price: 80000,
        image: 'https://placehold.co/600x400',
      },
    ]);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Latest Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
