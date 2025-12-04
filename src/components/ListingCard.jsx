import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing.id}`}>
      <div className="rounded-2xl shadow p-3 bg-white hover:shadow-lg transition">
        <img
          src={listing.image}
          alt={listing.title}
          className="rounded-xl mb-3 w-full"
        />
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-gray-600">{listing.location}</p>
        <p className="font-bold text-xl">{listing.price} TZS</p>
      </div>
    </Link>
  );
};

export default ListingCard;
