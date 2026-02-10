import { Button } from "@repo/ui/button";
import { StoreHero } from "@repo/ui/store/hero-store";
import { LatestProducts } from "@repo/ui/store/latest-section";

export default function StorePage() {
  return (
    <>
    <StoreHero />
    <LatestProducts />
    </>
  );
}