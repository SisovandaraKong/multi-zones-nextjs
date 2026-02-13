"use client";

import { useEffect } from "react";
import { Button } from "@repo/ui/button";
import { useAppSelector, useAppDispatch, fetchFullProfile, type ProfileData } from "@repo/store";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile.data);
  const loading = useAppSelector((state) => state.profile.loading);
  const error = useAppSelector((state) => state.profile.error);
  const isAuthenticated = useAppSelector((state) => state.profile.isAuthenticated);

  useEffect(() => {
    // Fetch full profile if not already loaded
    if (!profile) {
      dispatch(fetchFullProfile());
    }
  }, [dispatch, profile]);

  const getInitials = () => {
    if (!profile) return "U";
    if (profile.givenName && profile.familyName) {
      return `${profile.givenName[0]}${profile.familyName[0]}`.toUpperCase();
    }
    return profile.username?.substring(0, 2).toUpperCase() || "U";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-red-200 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <a href="/oauth2/authorization/itp-frontbff">
              <Button>Sign In</Button>
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Your Profile</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sign in to view and manage your Apple ID and preferences
          </p>
          <a href="/oauth2/authorization/itp-frontbff">
            <Button>Sign In</Button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Image */}
              <div className="relative">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-3xl md:text-4xl font-bold border-4 border-white shadow-lg">
                    {getInitials()}
                  </div>
                )}
              </div>

              {/* Name and Username */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {profile.fullName}
                </h1>
                <p className="text-lg text-gray-600">@{profile.username}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    First Name
                  </label>
                  <p className="text-lg text-gray-900">{profile.givenName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Last Name
                  </label>
                  <p className="text-lg text-gray-900">{profile.familyName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-lg text-gray-900">{profile.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <p className="text-lg text-gray-900">{profile.phoneNumber}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Gender
                  </label>
                  <p className="text-lg text-gray-900 capitalize">{profile.gender}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    User ID
                  </label>
                  <p className="text-sm text-gray-600 font-mono break-all">
                    {profile.uuid}
                  </p>
                </div>
              </div>
            </div>

            {/* Roles & Permissions */}
            {profile.authorities && profile.authorities.length > 0 && (
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Roles & Permissions
                </h2>
                <div className="flex flex-wrap gap-3">
                  {profile.authorities.map((authority, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {authority}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}