'use client'

import { useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';

const Create = () => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/records', { title, description, start });
      alert('Record created successfully');
      setTitle('');
      setStart('');
      setDescription('');
    } catch (error) {
      console.error('Error creating record:', error);
      alert('Failed to create record');
    }
  };

  return (
   <div className='flex '>
    <div className="w-[30%]">
    <Sidebar />
    </div>
    <div className="container mt-10 mx-auto p-4 ml-11 w-[50%]">
      <h1 className="text-2xl font-bold mb-4">Create Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
    </div>
   </div>
  );
};

export default Create;
