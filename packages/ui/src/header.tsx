"use client";

import { Search } from "lucide-react";
import { AppleLogo } from "./components/icon/AppleLogo";
import { BagIcon } from "./components/icon/BagIcon";


interface AppleHeaderProps {
  zones?: { name: string; href: string }[];
}

export function Header({ zones }: AppleHeaderProps) {
  const defaultZones = [
    { name: 'Store', href: '/store' },
    { name: 'Mac', href: '/mac' },
    { name: 'iPad', href: '/ipad' },
    { name: 'iPhone', href: '/iphone' },
    { name: 'Watch', href: '/watch' },
    { name: 'Vision', href: '/vision' },
    { name: 'AirPods', href: '/airpods' },
    { name: 'TV & Home', href: '/tv-home' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Support', href: '/support' },
  ];

  const navItems = zones || defaultZones;

  return (
    <header className="bg-white backdrop-blur-xl text-[#1d1d1f] sticky top-0 z-50 border-b border-gray-200/50">
      <nav className="max-w-[980px] mx-auto px-5 h-11 flex items-center justify-between text-xs">
        {/* Apple Logo */}
        <a href="/" className="hover:opacity-70 transition-opacity flex items-center">
            <AppleLogo className="w-[14px] h-[44px]" />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Search & Bag Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button 
            className="hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <Search className="w-[14px] h-[44px]" />
          </button>

          {/* Shopping Bag Icon */}
          <a 
            href="/card" 
            className="hover:opacity-70 transition-opacity"
            aria-label="Shopping Bag"
          >
            <BagIcon className="w-[16px] h-[46px]" />
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            <svg 
              className="w-[14px] h-[44px]" 
              viewBox="0 0 14 44" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                d="M11 22c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V22zm-1 13c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V22c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v13zM9.5 16.5c0-1.93-1.57-3.5-3.5-3.5S2.5 14.57 2.5 16.5V19h1v-2.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V19h1v-2.5z"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            <svg 
              className="w-[14px] h-[44px]" 
              viewBox="0 0 14 44" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                d="M1 16h12v1H1v-1zm0 6h12v1H1v-1zm0 6h12v1H1v-1z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}