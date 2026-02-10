// import { Button } from "@repo/ui/button";
// import { Header } from "@repo/ui/header";

// const zones = [
//   { name: 'Home', href: '/' },
//   { name: 'Store', href: '/store' },
//   { name: 'Mac', href: '/mac' },
//   { name: 'Profile', href: '/profile' },
// ];

// export default function Home() {
//   return (
//     <>
//       <Header zones={zones} />
//       <main className="min-h-screen flex flex-col items-center justify-center bg-white">
//         <h1 className="text-6xl font-bold mb-4">Welcome to Apple</h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Innovation at its finest
//         </p>
//         <div className="flex gap-4">
//           <a href="/store">
//             <Button>Visit Store</Button>
//           </a>
//           <a href="/mac">
//             <Button>Explore Mac</Button>
//           </a>
//         </div>
//       </main>
//     </>
//   );
// }



import { IPhoneHero } from "@repo/ui/home/iphone-hero";
import { IWatchHero } from "@repo/ui/home/iwatch-section";
import { ValentineHero } from "@repo/ui/home/valentine-hero";

export default function Home() {
  return (
    <>
      <ValentineHero />
    <div className="w-full h-[14px] bg-white"></div>
      <IPhoneHero />
    <div className="w-full h-[14px] bg-white"></div>
      <IWatchHero />
    </>
  );
}