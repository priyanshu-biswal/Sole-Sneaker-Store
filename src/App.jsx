import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import PaymentView from './components/PaymentView';
import StoreView from './components/StoreView';
import { useCart } from './context/CartContext';

export default function App() {
  const [view, setView] = useState('store');
  const { totalItems } = useCart();

  const showStore = () => setView('store');

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-neutral-900">
      <div className="bg-neutral-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        Free shipping on every order. Find your next everyday favorite.
      </div>

      <header className="sticky top-0 z-20 border-b border-neutral-200/80 bg-[#f8f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={showStore}
            className="text-2xl font-black tracking-[-0.08em]"
            aria-label="Sole home"
          >
            sole<span className="text-amber-500">.</span>
          </button>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-neutral-600 sm:flex">
            <button type="button" onClick={showStore} className="hover:text-black">Shop</button>
            <a href="#our-story" className="hover:text-black">Our story</a>
          </nav>
          <button
            type="button"
            onClick={view === 'checkout' ? showStore : () => setView('checkout')}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-neutral-900"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{view === 'checkout' ? 'Continue shopping' : 'Your bag'}</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] text-white">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        {view === 'store' ? (
          <>
            <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#e8dfd1] px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="relative z-10 max-w-xl">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-700">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  Made for your every day
                </span>
                <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl">
                  Good shoes.
                  <br />
                  Good days.
                </h1>
                <p className="mt-5 max-w-md text-base leading-7 text-neutral-600 sm:text-lg">
                  A considered collection of sneakers that feel as good as they look. Find the pair that feels like you.
                </p>
                <a
                  href="#shop"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
                >
                  Find your pair <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div aria-hidden="true" className="hero-shape absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-amber-200/70 sm:right-8 sm:h-96 sm:w-96" />
              <div aria-hidden="true" className="hero-shoe absolute bottom-3 right-2 hidden text-[10rem] sm:block lg:right-16 lg:text-[13rem]">👟</div>
            </section>

            <div id="shop" className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">The collection</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">Everyday icons</h2>
              </div>
              <p className="text-sm text-neutral-500">Thoughtful picks. No wrong turns.</p>
            </div>
            <StoreView onNavigateToPayment={() => setView('checkout')} />
          </>
        ) : (
          <PaymentView onReturnToShop={showStore} />
        )}
      </main>

      <footer id="our-story" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xl font-black tracking-[-0.08em]">sole<span className="text-amber-500">.</span></p>
            <p className="mt-1 text-sm text-neutral-500">A little more comfort in every step.</p>
          </div>
          <p className="text-xs text-neutral-400">© {new Date().getFullYear()} Sole Store. Demo storefront.</p>
        </div>
      </footer>
    </div>
  );
}
