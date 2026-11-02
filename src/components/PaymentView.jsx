import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function PaymentView({ onReturnToShop }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-neutral-200 text-center shadow-sm my-12">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Payment Successful!</h2>
        <p className="text-neutral-600 mb-6 text-sm">
          Thanks for trying Sole. This demo checkout did not process a real payment or place a real order.
        </p>
        <button
          onClick={onReturnToShop}
          className="w-full bg-black text-white font-medium py-2.5 px-4 rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onReturnToShop}
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Shopping
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Cart Context Summary */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-3">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p className="text-neutral-500 text-sm py-4">No items in your cart to checkout.</p>
          ) : (
            <>
              <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto mb-4 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-neutral-100"
                      />
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900">{item.name}</h4>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-neutral-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                  <span>Total Amount</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Credit Card Form */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <CreditCard className="w-5 h-5" />
            Credit Card Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                required
                maxLength="19"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  required
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  CVV Code
                </label>
                <input
                  type="password"
                  name="cvv"
                  required
                  maxLength="4"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full border border-neutral-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="mt-4 w-full bg-emerald-600 text-white font-medium py-3 px-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Demo checkout · ${cartTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}