import React, { useState } from 'react';

const UploadListingPage = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Listing submitted! (Mock MVP)');
  };

  return (
    <div className="p-5 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Upload New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Price (TZS)"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-xl"
        >
          Upload Listing
        </button>
      </form>
    </div>
  );
};

export default UploadListingPage;
