'use client'

import { useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="bg-white">
        <nav className="flex justify-between p-4 items-center w-[92%] m-auto">
          <div>
            <p className="text-xl font-bold">DealDome</p>
          </div>
          <div className={`md:static absolute ${menuOpen ? 'top-[11%] left-0 transition-6000' : 'top-[-100%]'} md:min-h-fit bg-white min-h-[50vh] md:w-auto w-full flex items-center px-5 border md:border-none transition-all duration-300`}>
            <ul className="flex md:flex-row flex-col transition md:items-center md:gap-[2vw] gap-8">
              <li>
                <Link className="hover:text-gray-500" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" href="">Products</Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" href="/dashboard">Dashboard</Link>
              </li>
            </ul>
           
          </div>
          <div className="flex items-center">
            <button className="py-2 px-5 hover:text-gray-500 font-medium text-gray-700 rounded-full"> 
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </button>
            <button className="md:hidden ml-4 w-8" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✖️' : '☰'}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
