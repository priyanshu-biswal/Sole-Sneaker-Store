import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function StoreView({ onNavigateToPayment }) {
  const { cart, addToCart, decreaseQuantity, removeFromCart, cartTotal, totalItems } = useCart();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Shoes Catalog */}
      <section className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-neutral-900">Featured Shoes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden bg-neutral-50 relative">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-3 left-3 bg-black/75 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                  {shoe.brand}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between bg-amber-100/60">
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900 leading-snug">
                    {shoe.name}
                  </h3>
                  <p className="text-neutral-700 font-medium mt-1">
                    ${shoe.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(shoe)}
                  className="mt-4 w-full bg-amber-200 border border-amber-300 hover:bg-amber-300 text-neutral-900 font-medium py-2 px-4 rounded-xl transition-colors duration-150 active:scale-[0.98]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      <aside className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm lg:sticky lg:top-24">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart
          </h2>
          <span className="text-sm text-neutral-500 font-medium">
            {totalItems} items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="py-12 text-center text-neutral-500">
            <p>Your cart is empty.</p>
            <p className="text-xs text-neutral-400 mt-1">Add items from the store to view them here.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 max-h-[380px] overflow-y-auto my-2 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-neutral-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-1 hover:bg-neutral-200 text-neutral-600 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 hover:bg-neutral-200 text-neutral-600 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-neutral-200 mt-2">
          <div className="flex justify-between items-center text-lg font-bold text-neutral-900">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onNavigateToPayment}
            disabled={cart.length === 0}
            className="mt-4 w-full bg-black text-white font-medium py-3 px-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </aside>
    </div>
  );
}