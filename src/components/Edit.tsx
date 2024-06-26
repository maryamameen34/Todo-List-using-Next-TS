'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';



import Link from 'next/link';
interface Record {
  title: string;
  description: string;
}

const Edit = () => {
  const [record, setRecord] = useState<Record>({ title: '', description: '' });
  //useRouter intead of useParams because useParams doesn't work in next js
  const router = useRouter();
  // The useRouter hook returns a router object that contains the query property. This query property is an object where each key corresponds to a dynamic segment of the route.We destructure id from it as our need
  const { id } = router.query;

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        if (typeof id === 'string') {
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
        alert("property updated successfully")
        // Redirect to another page after successful update
        router.push('/dashboard/allrecords'); 
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='mb-6'>
        <Link href="/dashboard" className='font-bold  text-indigo-700 hover:text-indigo-500 text-lg'>Dashboard</Link>
      </div>
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
