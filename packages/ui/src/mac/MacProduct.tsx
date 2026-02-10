"use client";

import { useState } from "react";

interface MacProduct {
  id: number;
  name: string;
  chip: string;
  description: string;
  price: string;
  image: string;
  colors: string[];
  category: string[];
}

export function MacProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("All products");

  const products: MacProduct[] = [
    {
      id: 1,
      name: 'MacBook Air 13" and 15"',
      chip: "M4 chip",
      description: "Strikingly thin and fast so you can work, play, or create anywhere.",
      price: "From $999 or $83.25/mo. for 12 mo.‡",
      image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png",
      colors: ["#E8E8ED", "#F5E5D3", "#2C2C2E", "#B8B5AE"],
      category: ["All products", "Laptops"],
    },
    {
      id: 2,
      name: 'MacBook Pro 14" and 16"',
      chip: "M5, M4 Pro, or M4 Max chip",
      description: "The most advanced Mac laptops for demanding workflows.",
      price: "From $1599 or $133.25/mo. for 12 mo.‡",
      image: "https://www.ione.com.kh/wp-content/uploads/2025/07/macbook-pro-14-inch-m4-5-cambodia.png",
      colors: ["#2C2C2E", "#E8E8ED"],
      category: ["All products", "Laptops"],
    },
    {
      id: 3,
      name: "iMac",
      chip: "M4 chip",
      description: "A stunning all-in-one desktop for creativity and productivity.",
      price: "From $1299 or $108.25/mo. for 12 mo.‡",
      image: "https://cdsassets.apple.com/live/7WUAS350/images/imac/imac-24in-2024-two-ports-colors.png",
      colors: ["#4A90E2", "#E85D75", "#F9D45C", "#4ECDC4", "#95E1D3", "#A8DADC", "#B8B5AE"],
      category: ["All products", "Desktops"],
    },
    {
      id: 4,
      name: "Mac mini",
      chip: "M4 or M4 Pro chip",
      description: "The mini-est, most affordable Mac with mighty performance.",
      price: "From $599 or $49.91/mo. for 12 mo.‡",
      image: "https://cdn.krcs.co.uk/media/catalog/category/Macmini_Hero_M4_Hero_1000x1000.png",
      colors: [],
      category: ["All products", "Desktops"],
    },
  ];

  const filters = ["All products", "Laptops", "Desktops", "Displays"];

  const filteredProducts = products.filter((product) =>
    product.category.includes(activeFilter)
  );

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-screen-2xl mx-auto">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] mb-8">
          Mac
        </h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-normal transition-all ${
                activeFilter === filter
                  ? "bg-[#1d1d1f] text-white"
                  : "bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#d2d2d7]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="w-full h-64 mb-6 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Color Dots */}
                {product.colors.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className="w-3 h-3 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                        style={{ backgroundColor: color }}
                        aria-label={`Color option ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Product Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#6e6e73] mb-3">{product.chip}</p>
                  <p className="text-sm text-[#1d1d1f] mb-3 min-h-[40px]">
                    {product.description}
                  </p>
                  <p className="text-sm text-[#1d1d1f] font-normal">
                    {product.price}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={`/mac/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="px-5 py-2 bg-[#0071e3] text-white rounded-full text-sm font-normal hover:bg-[#0077ed] transition-colors"
                  >
                    Learn more
                  </a>
                  <a
                    href={`/shop/buy-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="px-5 py-2 text-[#0066cc] text-sm font-normal hover:underline flex items-center gap-1"
                  >
                    Buy
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Navigation Arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}