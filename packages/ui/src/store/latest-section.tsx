"use client";

import { useState } from "react";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  bgColor: string;
  textColor: string;
  badge?: string;
}

export function LatestProducts() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      title: "iPhone 17 Pro",
      subtitle: "All out Pro.",
      price: "From $1099 or $45.79/mo. for 24 mo.§",
      image: "https://ipowerresale.com/cdn/shop/files/media_1518d48e-4dd2-499f-a6bb-de7de77de06e_1946x.png?v=1766096985",
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      id: 2,
      title: 'MacBook Pro 14"',
      subtitle: "Supercharged by M5.",
      price: "From $1599 or $133.25/mo. for 12 mo.§",
      image: "https://www.moarmouz.com/cdn/shop/products/3_55ddc2cf-0a81-4b3f-9253-454bae358c1e-902531.png?v=1749057801&width=1080",
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      id: 3,
      title: "Apple Watch Black Unity Braided Solo Loop",
      subtitle: "Inspired by the power of connection.",
      price: "From $99 or $8.25/mo. for 12 mo.§",
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGXE4ref_VW_34FR+watch-case-46-aluminum-jetblack-nc-s11_VW_34FR+watch-face-46-bhm-braided-s10_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=QzFPQmMwY2lIN0Zha3FHdGJDd3Rib1JsZGI2R3Y1VHh2WlJISmkwcGQ0Vk9NU1VZS1dIdzdkNjZzejNRdFdUZy8xbCtuVHZDSE15QWNIRjhJS1laOXBhcWI2YWlzMEdFUnhUR1VkUWp5TEhuZVpsdVl6cG9sYkM5UWlIeEJKcmZCSnUyaUFTTkwzcU9MVU5FaUVSQy9WWG5DL3A4d3pIcTE0S1ZGY25HVUpJOWhtcU4vOUszZmdkclNmKzRpMEswK3ZEdDhCNTlldHV1OEwyR2FRbkJVQQ",
      bgColor: "bg-black",
      textColor: "text-white",
      badge: "SPECIAL-EDITION BAND",
    },
    {
      id: 4,
      title: "Apple Watch Series 11",
      subtitle: "The ultimate way to watch your health.",
      price: "From $399 or $33.25/mo. for 12 mo.§",
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXM23ref_FV99_VW_34FR+watch-case-46-aluminum-spacegray-cell-s11_VW_34FR+watch-face-46-aluminum-spacegray-s11_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=TnVrdDZWRlZzTURKbHFqOGh0dGpVRW5TeWJ6QW43NUFnQ2V4cmRFc1VnWmlQU0Rqc3FXZ3ZYMmhqV2ErcFBKUlhtVmYyUHFqOUNTcmJjV1J3aGhxNUVkWE5mbUVNaDZkVG5EQjNZYk8rd0NxL1Z3eWtxYXU0N3NJYU8wQzhVc25TQng5SGxaV0RKeTYwcURqYnpPdGJYaHZVcVNxS1QrYk44Vm1VTUFRQXZyaXBIL2E5bmxJNzNXcDM1U0hrRXk1VDlhem1kMUliRzZZVnlxdW5jNXRCZzhrSWpVWnR4OVZBYUNLR1FybTR4TQ",
      bgColor: "bg-[#f5f5f7]",
      textColor: "text-black",
    },
    {
      id: 5,
      title: "AirTag 4",
      subtitle: "The most findable airtag yet",
      price: "From $29",
      image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airtag-4pack-select-202601_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&.v=QVI2eUgvdU1qT1VRdEZUOXVUVHgrZWFJR25SaHJPZStyQUE0RFNWYVNlbTU2Wmo3TEJrNlp6M2ErQTZBYVppTDNZYVExQ25DL2t0RlhMV3g1Sy9raCtMSVNna1FUN0MrUUt6RWZtdVlMemhuMU9BZXZDZlFoMkQrRm9RMzZBT24",
      bgColor: "bg-[#f5f5f7]",
      textColor: "text-black",
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-scroll');
    if (container) {
      const scrollAmount = 400;
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-white py-12 px-4">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f]">
            <span className="text-[#ff375f]">The latest.</span> All-new and lovable.
          </h2>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Products Container */}
          <div
            id="products-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-[340px] ${product.bgColor} rounded-3xl overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]`}
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Badge */}
                  {product.badge && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-orange-500 tracking-wider">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Product Info */}
                  <div className={`mb-4 ${product.textColor}`}>
                    <h3 className="text-2xl font-semibold mb-1">
                      {product.title}
                    </h3>
                    <p className="text-lg mb-2">
                      {product.subtitle}
                    </p>
                    <p className="text-sm opacity-80">
                      {product.price}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div className="mt-auto flex items-end justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full max-w-[280px] h-auto object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}