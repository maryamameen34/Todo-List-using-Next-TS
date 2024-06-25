'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Record {
  title: string;
  description: string;
}

const Edit = () => {
  const [record, setRecord] = useState<Record>({ title: '', description: '' });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/api/records/${id}`);
          setRecord(data.data); 
        }
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/records/${id}`, record);
        // Handle successful update as needed
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Record</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={record.title}
            onChange={(e) => setRecord({ ...record, title: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={record.description}
            onChange={(e) => setRecord({ ...record, description: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default Edit;
