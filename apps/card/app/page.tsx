import { Button } from "@repo/ui/button";

export default function CardPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-6xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your cart is empty
        </p>
        <a href="/store">
          <Button>Start Shopping</Button>
        </a>
      </main>
    </>
  );
}