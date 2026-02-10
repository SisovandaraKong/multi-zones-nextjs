"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  type: 'heart' | 'dot' | 'ribbon';
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export function ValentineHero() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate random floating elements
    const colors = ['#FF6B9D', '#C77DFF', '#FF5C5C', '#E01E84', '#FF8FA3'];
    const generated: FloatingElement[] = [];

    for (let i = 0; i < 30; i++) {
      const type = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'dot' : 'ribbon') : 'heart';
      generated.push({
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type === 'dot' ? 6 + Math.random() * 8 : 20 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)]!,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      });
    }

    setElements(generated);
  }, []);

  return (
    <section className="relative min-h-[700px] bg-[#f5f5f7] overflow-hidden flex items-center justify-center">
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {elements.map((el) => (
          <div
            key={el.id}
            className="absolute animate-float"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            {el.type === 'heart' && (
              <svg
                width={el.size}
                height={el.size}
                viewBox="0 0 24 24"
                fill={el.color}
                opacity="0.8"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {el.type === 'dot' && (
              <div
                className="rounded-full"
                style={{
                  width: el.size,
                  height: el.size,
                  backgroundColor: el.color,
                  opacity: 0.6,
                }}
              />
            )}
            {el.type === 'ribbon' && (
              <svg
                width={el.size}
                height={el.size}
                viewBox="0 0 24 24"
                fill={el.color}
                opacity="0.7"
              >
                <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6zM2 12l6-4v8l-6-4zm20 0l-6 4V8l6 4z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Main Gift Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          className="animate-pulse-slow"
        >
          {/* Gift Box */}
          <g opacity="0.9">
            {/* Box body */}
            <path
              d="M60 120h160v120H60z"
              fill="url(#gift-gradient)"
              stroke="#FF5C5C"
              strokeWidth="4"
            />
            {/* Ribbon vertical */}
            <rect x="130" y="100" width="20" height="140" fill="#E01E84" />
            {/* Ribbon horizontal */}
            <rect x="50" y="130" width="180" height="20" fill="#FF6B9D" />
            {/* Bow */}
            <circle cx="100" cy="110" r="25" fill="#C77DFF" opacity="0.8" />
            <circle cx="180" cy="110" r="25" fill="#FF8FA3" opacity="0.8" />
            <circle cx="140" cy="100" r="20" fill="#FF5C5C" />
            {/* Decorative hearts on box */}
            <path
              d="M100 180l-3-2.7C88 169 80 162 80 153c0-5 4-9 9-9 3 0 6 1.5 8 4 2-2.5 5-4 8-4 5 0 9 4 9 9 0 9-8 16-17 24.3l-3 2.7z"
              fill="#FFB3C1"
              opacity="0.6"
            />
            <path
              d="M180 200l-3-2.7C168 189 160 182 160 173c0-5 4-9 9-9 3 0 6 1.5 8 4 2-2.5 5-4 8-4 5 0 9 4 9 9 0 9-8 16-17 24.3l-3 2.7z"
              fill="#FFB3C1"
              opacity="0.6"
            />
          </g>
          
          <defs>
            <linearGradient id="gift-gradient" x1="60" y1="120" x2="220" y2="240">
              <stop offset="0%" stopColor="#FF8FA3" />
              <stop offset="100%" stopColor="#C77DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mb-100">
        <h1 className="text-6xl md:text-7xl font-semibold mb-4 text-gray-900">
          Valentine's Day
        </h1>
        <p className="text-xl md:text-2xl text-[#1d1d1f] mb-4">
          There's still time to get gifts they'll love.
        </p>
        <a
          href="/store"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          Shop
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}