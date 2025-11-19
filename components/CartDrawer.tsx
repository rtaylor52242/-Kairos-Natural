import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (!isCartOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  const handleCheckout = () => {
      alert(`Order Placed Successfully!\n\nTotal Amount: ${formatCurrency(cartTotal)}\n\nThank you for choosing Kairos Natural!`);
      clearCart();
      toggleCart();
  };

  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity" onClick={toggleCart}></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-stone-900" id="slide-over-title">Shopping Cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-stone-400 hover:text-stone-500"
                        onClick={toggleCart}
                      >
                        <span className="sr-only">Close panel</span>
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <ShoppingBag className="mx-auto h-12 w-12 text-stone-300" />
                                <h3 className="mt-2 text-sm font-medium text-stone-900">No items</h3>
                                <p className="mt-1 text-sm text-stone-500">Your cart is currently empty.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={toggleCart}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        ) : (
                          <ul role="list" className="-my-6 divide-y divide-stone-200">
                            {items.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-stone-900">
                                      <h3>
                                        <Link to="/shop" onClick={toggleCart}>{item.name}</Link>
                                      </h3>
                                      <p className="ml-4">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-stone-500">{item.category}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center border border-stone-300 rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-2 hover:bg-stone-100 disabled:opacity-50 text-stone-600"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="px-3 font-medium text-stone-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-2 hover:bg-stone-100 text-stone-600"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <button
                                      type="button"
                                      className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Trash2 size={16} />
                                      <span className="hidden sm:inline">Remove</span>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>

                {items.length > 0 && (
                    <div className="border-t border-stone-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-stone-900">
                        <p>Subtotal</p>
                        <p>{formatCurrency(cartTotal)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-stone-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-green px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-green/90"
                        >
                        Checkout
                        </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-stone-500">
                        <p>
                        or{' '}
                        <button
                            type="button"
                            className="font-medium text-brand-green hover:text-brand-green/80"
                            onClick={toggleCart}
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                        </p>
                    </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;