"use client";

export function MacHero() {
  const macProducts = [
    {
      name: "MacBook Air",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <path d="M6 12h28v14H6z" />
          <path d="M4 27h32l-2 2H6z" />
        </svg>
      ),
      href: "/mac/macbook-air",
    },
    {
      name: "MacBook Pro",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <path d="M5 11h30v16H5z" />
          <path d="M3 28h34l-2 2H5z" />
        </svg>
      ),
      href: "/mac/macbook-pro",
    },
    {
      name: "iMac",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="8" y="6" width="24" height="18" rx="1" />
          <path d="M19 24h2v4h6v2H13v-2h6z" />
        </svg>
      ),
      href: "/mac/imac",
    },
    {
      name: "Mac mini",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="10" y="16" width="20" height="8" rx="1" />
          <circle cx="14" cy="20" r="0.5" fill="white" />
        </svg>
      ),
      href: "/mac/mac-mini",
    },
    {
      name: "Mac Studio",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="12" y="14" width="16" height="12" rx="1" />
          <circle cx="16" cy="20" r="0.5" fill="white" />
        </svg>
      ),
      href: "/mac/mac-studio",
    },
    {
      name: "Mac Pro",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="13" y="8" width="14" height="20" rx="2" />
          <path d="M15 10h10M15 13h10M15 16h10M15 19h10M15 22h10M15 25h10" stroke="white" strokeWidth="0.5" />
        </svg>
      ),
      href: "/mac/mac-pro",
    },
    {
      name: "Help Me Choose",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="8" y="10" width="10" height="8" rx="1" />
          <rect x="22" y="10" width="10" height="8" rx="1" />
          <rect x="8" y="22" width="10" height="8" rx="1" />
          <rect x="22" y="22" width="10" height="8" rx="1" />
        </svg>
      ),
      href: "/mac/compare",
    },
    {
      name: "Compare",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="6" y="12" width="12" height="16" rx="1" />
          <rect x="22" y="12" width="12" height="16" rx="1" />
        </svg>
      ),
      href: "/mac/compare",
    },
    {
      name: "Displays",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="4" y="8" width="14" height="11" rx="1" />
          <rect x="22" y="8" width="14" height="11" rx="1" />
          <path d="M10 19h2v3h-2zM28 19h2v3h-2z" />
        </svg>
      ),
      href: "/mac/displays",
    },
    {
      name: "Accessories",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="20" cy="15" r="6" />
          <path d="M14 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
      href: "/mac/accessories",
    },
    {
      name: "Tahoe",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <text x="20" y="24" fontSize="10" textAnchor="middle" fill="currentColor">OS</text>
        </svg>
      ),
      href: "/mac/tahoe",
    },
    {
      name: "Shop Mac",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 40 40" fill="currentColor">
          <rect x="8" y="10" width="8" height="6" rx="0.5" />
          <rect x="18" y="10" width="8" height="6" rx="0.5" />
          <rect x="28" y="10" width="4" height="6" rx="0.5" />
          <rect x="8" y="18" width="12" height="6" rx="0.5" />
          <rect x="22" y="18" width="10" height="6" rx="0.5" />
          <rect x="8" y="26" width="6" height="4" rx="0.5" />
          <rect x="16" y="26" width="8" height="4" rx="0.5" />
          <rect x="26" y="26" width="6" height="4" rx="0.5" />
        </svg>
      ),
      href: "/mac/shop",
    },
  ];

  return (
    <section className="relative bg-white">
      {/* Products Navigation */}
      <div className="max-w-screen-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-8 overflow-x-auto">
          {macProducts.map((product) => (
            <a
              key={product.name}
              href={product.href}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="text-[#1d1d1f] transition-transform group-hover:scale-110">
                {product.icon}
              </div>
              <span className="text-xs text-[#1d1d1f] text-center whitespace-nowrap">
                {product.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Valentine's Day Message */}
      <div className="bg-[#f5f5f7] py-3 px-4 text-center">
        <p className="text-sm text-[#1d1d1f]">
          There's still time to get Valentine's Day gifts they'll love.{' '}
          <a href="/valentines" className="text-[#0066cc] hover:underline">
            Shop &rsaquo;
          </a>
        </p>
      </div>
    </section>
  );
}