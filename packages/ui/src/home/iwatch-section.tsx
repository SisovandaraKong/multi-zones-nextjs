"use client";

export function IWatchHero() {
  return (
    <section className="relative min-h-[692px] bg-[#f5f5f7] overflow-hidden flex flex-col items-center justify-start pt-12 pb-0">
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-semibold mb-2 text-[#1d1d1f]">
          WATCH SERIES 11
        </h1>
        <p className="text-xl md:text-2xl text-[#1d1d1f] mb-8">
          The ultimate way to watch you health.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/iphone/learn-more"
            className="inline-block px-6 py-2.5 bg-[#0071e3] text-white rounded-full text-base font-normal hover:bg-[#0077ed] transition-colors"
          >
            Learn more
          </a>
          <a
            href="/iphone/shop"
            className="inline-block px-6 py-2.5 border-2 border-[#0071e3] text-[#0071e3] rounded-full text-base font-normal hover:bg-[#0071e3] hover:text-white transition-colors"
          >
            Buy
          </a>
        </div>
      </div>

<div className="relative w-full max-w-7xl mx-auto px-4 mt-10">
  <img
    src="https://www.indiaistore.com/themes/frontend/custom/images/product/apple-watch-series-11-coming-soon/a-plus/display_large.png"
    alt="iPhone lineup showing multiple models"
    className="w-full"
  />
</div>

    </section>
  );
}