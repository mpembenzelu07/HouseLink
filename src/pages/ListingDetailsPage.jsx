import React from 'react';
import { useParams } from 'react-router-dom';

const ListingDetailsPage = () => {
  const { id } = useParams();

  // For MVP, we’ll use mock data
  const listing = {
    id,
    title: 'Bedsitter in Sinza',
    location: 'Sinza',
    price: 120000,
    image: 'https://placehold.co/600x400',
    description: 'A cozy bedsitter in Sinza, near shops and transport. Fully furnished.',
  };

  return (
    <div className="p-5 max-w-3xl mx-auto space-y-4">
      <img src={listing.image} alt={listing.title} className="rounded-xl w-full" />
      <h2 className="text-3xl font-bold">{listing.title}</h2>
      <p className="text-gray-600">{listing.location}</p>
      <p className="text-xl font-bold">{listing.price} TZS</p>
      <p className="mt-3">{listing.description}</p>
      <button className="mt-5 w-full p-3 bg-green-600 text-white rounded-xl">
        Contact via WhatsApp
      </button>
    </div>
  );
};

export default ListingDetailsPage;
