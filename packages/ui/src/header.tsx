"use client";

import { Search, User, LogOut, UserCircle } from "lucide-react";
import { AppleLogo } from "./components/icon/AppleLogo";
import { BagIcon } from "./components/icon/BagIcon";
import { useEffect, useState } from "react";

interface AppleHeaderProps {
  zones?: { name: string; href: string }[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    logout: {
      title: string;
      url: string;
    };
  };
}

interface ProfileData {
  username: string;
  email: string;
  fullName: string;
  profileImage: string;
}

export function Header({ zones, auth }: AppleHeaderProps) {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const defaultAuth = {
    login: {
      title: "Login",
      url: "/oauth2/authorization/itp-frontbff",
    },
    logout: {
      title: "Logout",
      url: "/logout",
    },
  };

  const authConfig = auth || defaultAuth;

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

  useEffect(() => {
    async function checkAuthAndFetchProfile() {
      try {
        const response = await fetch("/auth/me", { credentials: "include" });
        
        if (response.ok) {
          const data = await response.json();
          setIsAuthed(true);
          setProfile(data);
        } else {
          setIsAuthed(false);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthed(false);
        setProfile(null);
      } finally {
        setLoadingAuth(false);
      }
    }

    checkAuthAndFetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!profile?.fullName) return "U";
    const names = profile.fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0]?.[0] ?? ''}${names[names.length - 1]?.[0] ?? ''}`.toUpperCase();
    }
    return profile.fullName.substring(0, 2).toUpperCase();
  };

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

          {/* Auth Section */}
          {!loadingAuth && (
            <>
              {!isAuthed ? (
                <a 
                  href={authConfig.login.url}
                  className="hover:opacity-70 transition-opacity flex items-center"
                  aria-label="Login"
                >
                  <User className="w-[14px] h-[44px]" />
                </a>
              ) : (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="hover:opacity-70 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-xs font-semibold text-gray-800"
                    aria-label="Profile"
                    title={profile?.fullName}
                  >
                    {profile?.profileImage ? (
                      <img 
                        src={profile.profileImage} 
                        alt={profile.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials()
                    )}
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 text-sm">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">{profile?.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
                      </div>
                      <a 
                        href="/profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                      </a>
                      <div className="border-t border-gray-200 mt-1 pt-1">
                        <a
                          href={authConfig.logout.url}
                          className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors text-red-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>{authConfig.logout.title}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

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