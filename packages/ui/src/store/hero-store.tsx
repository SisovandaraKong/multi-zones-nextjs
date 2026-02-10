"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  type: 'heart' | 'dot' | 'squiggle';
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
}

export function StoreHero() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random floating elements matching Apple's Valentine design
    const generated: FloatingElement[] = [];
    
    for (let i = 0; i < 35; i++) {
      const rand = Math.random();
      const type = rand > 0.6 ? 'heart' : rand > 0.3 ? 'dot' : 'squiggle';
      
      generated.push({
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 40, // Keep them in upper portion
        size: type === 'dot' ? 4 + Math.random() * 6 : 15 + Math.random() * 25,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
      });
    }

    setElements(generated);
  }, []);

  return (
    <section className="relative min-h-[500px] bg-[#f5f5f7] overflow-hidden">
      {/* Top banner */}
      <div className="relative bg-white py-4 px-4 text-center text-sm text-[#1d1d1f] z-20">
        Pay monthly at 0% APR when you choose to check out at Apple with Apple Card Monthly Installments.*{' '}
        <a href="#" className="text-[#0066cc] hover:underline">
          Learn more &rsaquo;
        </a>
      </div>

      {/* Floating Valentine Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {elements.map((el) => (
          <div
            key={el.id}
            className="absolute animate-float-gentle"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
              transform: `rotate(${el.rotation}deg)`,
            }}
          >
            {el.type === 'heart' && (
              <svg
                width={el.size}
                height={el.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff375f"
                strokeWidth="2"
                opacity="0.6"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {el.type === 'dot' && (
              <div
                className="rounded-full bg-[#ff375f]"
                style={{
                  width: el.size,
                  height: el.size,
                  opacity: 0.5,
                }}
              />
            )}
            {el.type === 'squiggle' && (
              <svg
                width={el.size}
                height={el.size}
                viewBox="0 0 40 40"
                fill="none"
                stroke="#ff375f"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.5"
              >
                <path d="M5 20 Q 15 10, 25 20 T 35 20" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative pt-12 pb-8 px-4">
        <div className="max-w-screen-2xl mx-auto">
          {/* Store Title */}
          <h1 className="text-[85px] md:text-[85px] font-semibold mt-20 text-[#ff375f]">
            Store
          </h1>

          {/* Right side text */}
          <div className="text-right mb-8">
            <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-2">
              Find Valentine's Day gifts
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] mb-4">
              in a heartbeat.
            </p>
            <div className="flex flex-col items-end gap-2">
              <a
                href="/specialist"
                className="text-[#0066cc] hover:underline text-base"
              >
                Connect with a Specialist &rsaquo;
              </a>
              <a
                href="/store-locator"
                className="text-[#0066cc] hover:underline text-base"
              >
                Find an Apple Store &rsaquo;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="w-full relative bg-[#f5f5f7] mb-20 z-20">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
            {/* Mac */}
            <a href="/mac" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://help.apple.com/assets/68FBBA193607B5D7D10E93FA/68FBBA1F5B40BB61910BDFBB/en_GB/fada553391da7148a6852ebb08ca2399.png"
                  alt="Mac"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Mac</span>
            </a>

            {/* iPhone */}
            <a href="/iphone" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202409?wid=200&hei=130&fmt=png-alpha&.v=1723857138230"
                  alt="iPhone"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">iPhone</span>
            </a>

            {/* iPad */}
            <a href="/ipad" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-ipad-nav-202405?wid=200&hei=130&fmt=png-alpha&.v=1714168620875"
                  alt="iPad"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">iPad</span>
            </a>

            {/* Apple Watch */}
            <a href="/watch" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202409?wid=200&hei=130&fmt=png-alpha&.v=1724165625838"
                  alt="Apple Watch"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Apple Watch</span>
            </a>

            {/* Apple Vision Pro */}
            <a href="/vision" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-vision-pro-nav-202401?wid=200&hei=130&fmt=png-alpha&.v=1702403595269"
                  alt="Apple Vision Pro"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Apple Vision Pro</span>
            </a>

            {/* AirPods */}
            <a href="/airpods" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airpods-nav-202409?wid=200&hei=130&fmt=png-alpha&.v=1722974321334"
                  alt="AirPods"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">AirPods</span>
            </a>

            {/* AirTag */}
            <a href="/airtag" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=200&hei=130&fmt=png-alpha&.v=1625783380000"
                  alt="AirTag"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">AirTag</span>
            </a>

            {/* Apple TV 4K */}
            <a href="/tv" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-appletv-nav-202210?wid=200&hei=130&fmt=png-alpha&.v=1664628458484"
                  alt="Apple TV 4K"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Apple TV 4K</span>
            </a>

            {/* HomePod */}
            <a href="/homepod" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-homepod-nav-202301?wid=200&hei=130&fmt=png-alpha&.v=1670389216654"
                  alt="HomePod"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">HomePod</span>
            </a>

            {/* Accessories */}
            <a href="/accessories" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-accessories-nav-202409?wid=200&hei=130&fmt=png-alpha&.v=1723738892174"
                  alt="Accessories"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Accessories</span>
            </a>

            {/* Apple Gift Card */}
            <a href="/gift-cards" className="flex flex-col items-center group">
              <div className="w-30 h-30 transition-transform group-hover:scale-110">
                <img
                  src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/giftcard-email-geode-select-2021?wid=600&hei=600&fmt=png-alpha&.v=bUgyM0RTaXJFS1BjZEl0R2ZhY3NWQk9UR2s3SlFFOWM2MGNlbHd1VE9uS0ZWOGd0ZE9RYTMwdzJDckhhbzIydlM0TjRWdzF2UjRGVEY0c3dBQVZ6VFRNNDAxQXNodDdOckZoZ08zRDVGUEk"
                  alt="Apple Gift Card"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-[#1d1d1f]">Apple Gift Card</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-15px) translateX(10px) rotate(5deg);
            opacity: 0.5;
          }
          75% {
            opacity: 0.7;
          }
        }

        .animate-float-gentle {
          animation: float-gentle infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}