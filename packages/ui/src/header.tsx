"use client";

import { Search, User, LogOut, UserCircle, X } from "lucide-react";
import { AppleLogo } from "./components/icon/AppleLogo";
import { BagIcon } from "./components/icon/BagIcon";
import { useEffect, useState, useRef, useMemo } from "react";
import { CartDropdown } from "./cart-dropdown";
import { useAppSelector, useAppDispatch, fetchProfile, clearProfile, clearCart } from "@repo/store";

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

export function Header({ zones, auth }: AppleHeaderProps) {
  const dispatch = useAppDispatch();
  const hasFetchedRef = useRef(false);
  
  // Use RTK selectors for profile state
  const profile = useAppSelector((state) => state.profile.data);
  const isAuthed = useAppSelector((state) => state.profile.isAuthenticated);
  const lastFetch = useAppSelector((state) => state.profile.lastFetch);
  const { totalItems } = useAppSelector((state) => state.cart);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

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

  const handleLogout = () => {
    // Clear all state before logout
    dispatch(clearProfile());
    dispatch(clearCart());
    hasFetchedRef.current = false;
    
    // Navigate to logout endpoint
    window.location.href = authConfig.logout.url;
  };

  useEffect(() => {
    // Only fetch if we haven't already fetched in this session
    if (hasFetchedRef.current) {
      return;
    }

    // If cache is fresh (less than 5 minutes old), don't refetch
    if (lastFetch) {
      const fiveMinutes = 5 * 60 * 1000;
      if (Date.now() - lastFetch < fiveMinutes) {
        hasFetchedRef.current = true;
        return;
      }
    }

    // Fetch profile using RTK thunk
    dispatch(fetchProfile('/auth/me'));
    hasFetchedRef.current = true;
  }, [dispatch, lastFetch]);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  // Preload profile image to prevent flicker
  useEffect(() => {
    if (profile?.profileImage) {
      const img = new Image();
      img.src = profile.profileImage;
    }
  }, [profile?.profileImage]);

  const getInitials = useMemo(() => {
    return () => {
      if (!profile?.fullName) return "U";
      const names = profile.fullName.split(" ");
      if (names.length >= 2) {
        return `${names[0]?.[0] ?? ''}${names[names.length - 1]?.[0] ?? ''}`.toUpperCase();
      }
      return profile.fullName.substring(0, 2).toUpperCase();
    };
  }, [profile?.fullName]);

  // Memoize profile avatar to prevent re-renders
  const ProfileAvatar = useMemo(() => {
    return ({ size = 'w-8 h-8', textSize = 'text-xs' }: { size?: string; textSize?: string }) => (
      <div className={`flex items-center justify-center ${size} rounded-full bg-gray-200 ${textSize} font-semibold text-gray-800`}>
        {profile?.profileImage ? (
          <img 
            key={profile.profileImage}
            src={profile.profileImage} 
            alt={profile.fullName || 'Profile'}
            className="w-full h-full rounded-full object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          getInitials()
        )}
      </div>
    );
  }, [profile?.profileImage, profile?.fullName, getInitials]);

  return (
    <>
      <header className="bg-white backdrop-blur-xl text-[#1d1d1f] sticky top-0 z-50 border-b border-gray-200/50">
        <nav className="max-w-[980px] mx-auto px-5 h-11 flex items-center justify-between text-xs">
          {/* Apple Logo */}
          <a href="/" className="hover:opacity-70 transition-opacity flex items-center flex-shrink-0">
              <AppleLogo className="w-[14px] h-[44px]" />
          </a>
          {/* Navigation Links - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-7 2xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:opacity-70 transition-opacity whitespace-nowrap text-[11px] xl:text-xs"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
            {/* Search Icon - Hidden on small mobile */}
            <button 
              className="hidden sm:block hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search className="w-[14px] h-[44px]" />
            </button>

            {/* Shopping Bag Icon */}
            <button
              onClick={() => setShowCart(true)}
              className="hover:opacity-70 transition-opacity relative"
              aria-label="Shopping Bag"
            >
              <BagIcon className="w-[16px] h-[46px]" />
              {totalItems > 0 && (
                <span className="absolute top-3 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Auth Section - Desktop */}
            {!isAuthed ? (
              <a 
                href={authConfig.login.url}
                className="hidden lg:flex hover:opacity-70 transition-opacity items-center"
                aria-label="Login"
              >
                <User className="w-[14px] h-[44px]" />
              </a>
            ) : (
              <div className="hidden lg:block relative profile-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Profile"
                  title={profile?.fullName}
                >
                  <ProfileAvatar />
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
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors text-red-600 w-full text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>{authConfig.logout.title}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              {showMobileMenu ? (
                <X className="w-[14px] h-[44px]" />
              ) : (
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
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed top-[44px] left-0 right-0 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          showMobileMenu ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxHeight: 'calc(100vh - 44px)', overflowY: 'auto' }}
      >
        <div className="px-5 py-6 space-y-4">
          {/* Search on Mobile (visible only on xs screens) */}
          <div className="sm:hidden pb-4 border-b border-gray-200">
            <button 
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </button>
          </div>

          {/* Profile Section - Mobile */}
          {isAuthed && profile && (
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <ProfileAvatar size="w-10 h-10" textSize="text-sm" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{profile.fullName}</p>
                <p className="text-xs text-gray-500">{profile.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-base font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-100 last:border-0"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons - Mobile */}
          <div className="pt-4 space-y-3 border-t border-gray-200">
            {isAuthed ? (
              <>
                <a 
                  href="/profile"
                  className="flex items-center space-x-2 py-2 text-base text-gray-900 hover:text-gray-600 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Profile</span>
                </a>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-2 py-2 text-base text-red-600 hover:text-red-700 transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{authConfig.logout.title}</span>
                </button>
              </>
            ) : (
              <a 
                href={authConfig.login.url}
                className="flex items-center space-x-2 py-2 text-base text-blue-600 hover:text-blue-700 transition-colors font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                <User className="w-5 h-5" />
                <span>{authConfig.login.title}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cart Dropdown */}
      <CartDropdown isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}