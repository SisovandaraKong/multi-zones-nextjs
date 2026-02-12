"use client";

import { Button } from "@repo/ui/button";
import { useAppSelector, useAppDispatch, removeFromCart, updateQuantity } from "@repo/store";
import { ShoppingBag, X } from "lucide-react";

export default function CardPage() {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemove = (item: any) => {
    dispatch(removeFromCart({ 
      id: item.id, 
      color: item.color, 
      storage: item.storage 
    }));
  };

  const handleUpdateQuantity = (item: any, newQuantity: number) => {
    dispatch(updateQuantity({ 
      id: item.id, 
      color: item.color, 
      storage: item.storage, 
      quantity: newQuantity 
    }));
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-6xl font-bold mb-4">Your Bag is empty</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sign in to see if you have any saved items. Or continue shopping.
        </p>
        <a href="/store">
          <Button>Start Shopping</Button>
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
            Review your bag.
          </h1>
          <p className="text-lg text-gray-600">
            Free delivery and free returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${item.color}-${item.storage}-${index}`}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full md:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        {item.color && (
                          <p className="text-sm text-gray-600 mb-1">
                            Color: <span className="font-medium">{item.color}</span>
                          </p>
                        )}
                        {item.storage && (
                          <p className="text-sm text-gray-600 mb-1">
                            Storage: <span className="font-medium">{item.storage}</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Category: <span className="font-medium capitalize">{item.category}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-base font-medium min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-2xl font-semibold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-gray-900">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Estimated tax</span>
                  <span className="font-semibold text-gray-900">$0</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-full text-base font-semibold hover:bg-blue-700 transition-colors mb-3">
                Check Out
              </button>

              <a 
                href="/store"
                className="block w-full text-center py-4 border border-gray-300 text-gray-900 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}