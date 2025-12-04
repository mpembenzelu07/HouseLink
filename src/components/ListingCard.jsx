import React from 'react';

const ListingCard = ({ listing }) => {
  return (
    <div className="rounded-2xl shadow p-3 bg-white">
      <img
        src={listing.image}
        alt={listing.title}
        className="rounded-xl mb-3"
      />
      <h3 className="text-lg font-semibold">{listing.title}</h3>
      <p className="text-gray-600">{listing.location}</p>
      <p className="font-bold text-xl">{listing.price} TZS</p>
    </div>
  );
};

export default ListingCard;
