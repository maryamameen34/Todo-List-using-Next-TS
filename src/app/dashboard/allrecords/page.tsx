"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [records, setRecords] = useState([]);

  const handleDelete = async (record) => {
    const confirmed = window.confirm(`Are you sure you want to delete record with ID ${record._id}?`);

    if (confirmed) {
      try {
        await axios.delete(`/api/records/${record._id}`);
        setRecords(records.filter((r) => r._id !== record._id));
        alert('Record deleted successfully'); // Optional: Show a success message
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete record'); // Optional: Show an error message
      }
    }
  };
  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/records`, {
          params: { page, limit, search },
        });
        setRecords(data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchRecords();
  }, [page, limit, search]);

  return (
    <div className="flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%]">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Records</h1>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  {/* <th className="py-2 px-4 border-b">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {records.map((record: any) => (
                  <tr key={record._id}>
                    <td className="py-2 px-4 border-b">{record.title}</td>
                    <td className="py-2 px-4 border-b">{record.description}</td>
                    <td className="py-2 px-4 border-b">
                      <Link href={`/edit/${record._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                          <CiEdit />
                        </button>
                      </Link>
                      <button
      onClick={() => handleDelete(record)}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      <MdDelete />
    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Pagination */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex p-8 mt-7">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                hidden={page === 1}
                className="px-3 py-2 bg-gray-200 text-black rounded-full mr-2 hover:-translate-y-1"
              >
                <GrFormPrevious />
              </button>
              <span className="px-4 py-2">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-2 bg-gray-200 text-black rounded-full mr-2 hover:-translate-y-1"
              >
                <GrNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
