"use client";

import { X, ShoppingBag } from "lucide-react";
import { useAppSelector, useAppDispatch, removeFromCart, updateQuantity, type CartItem } from "@repo/store";
import { useEffect, useState } from "react";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleRemove = (item: CartItem) => {
    dispatch(removeFromCart({ 
      id: item.id, 
      color: item.color, 
      storage: item.storage 
    }));
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    dispatch(updateQuantity({ 
      id: item.id, 
      color: item.color, 
      storage: item.storage, 
      quantity: newQuantity 
    }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 text-black bg-black/30 z-[60]"
          onClick={onClose}
        />
      )}

      {/* Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-xl font-semibold text-black">Bag</h2>
              {totalItems > 0 && (
                <span className="text-sm text-gray-500">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 text-black rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your bag is empty</h3>
                <p className="text-gray-500 mb-6">Start adding products to your bag</p>
                <a
                  href="/store"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  onClick={onClose}
                >
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.color}-${item.storage}-${index}`} className="flex space-x-4">
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.name}</h3>
                      {item.color && (
                        <p className="text-xs text-gray-500">Color: {item.color}</p>
                      )}
                      {item.storage && (
                        <p className="text-xs text-gray-500">Storage: {item.storage}</p>
                      )}
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-3 mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            className="px-3 py-1 text-black hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-3 text-black py-1 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            className="px-3 py-1 text-black hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-black">Subtotal</span>
                <span className="text-black">${totalPrice.toLocaleString()}</span>
              </div>
              <a
                href="/card"
                className="block w-full py-3  bg-blue-600 text-white text-center rounded-full hover:bg-blue-700 transition-colors font-medium"
                onClick={onClose}
              >
                Review Bag
              </a>
              <button
                onClick={onClose}
                className="block w-full py-3 border border-gray-300 text-gray-900 text-center rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
