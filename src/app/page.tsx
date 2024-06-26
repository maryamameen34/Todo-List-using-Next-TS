'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0); // New state to hold total pages

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/records`, {
          params: { page, limit, search },
        });
        setRecords(data.data);
        setTotalPages(data.totalPages); // Set total pages from API response
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchRecords();
  }, [page, limit, search]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 mb-24">
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
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record: any) => (
                <tr key={record._id}>
                  <td className="py-2 px-4 border-b">{record.title}</td>
                  <td className="py-2 px-4 border-b">{record.start}</td>
                  <td className="py-2 px-4 border-b">{record.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            hidden={page === 1}
            className="px-3 py-2 bg-gray-200 text-black rounded-full mr-2 hover:-translate-y-1"
          >
            <GrPrevious />
          </button>
          <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-2 py-2 bg-gray-200 text-black rounded-full mr-2 hover:-translate-y-1"
            >
              <GrNext />
            </button>
         
        </div>
      </div>
    </>
  );
};

export default Home;
