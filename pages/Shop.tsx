import React from 'react';
import { useContent } from '../context/ContentContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Shop: React.FC = () => {
  const { content } = useContent();
  const { addToCart } = useCart();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-200 pb-6">
            <div>
                <h1 className="text-3xl font-extrabold text-stone-900">Wellness Shop</h1>
                <p className="mt-2 text-stone-500">Nutrient-rich blends and kits.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <span className="text-sm text-stone-400">Showing all {content.products.length} products</span>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-stone-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    <span className="cursor-pointer">
                      {product.name}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-brand-green">{formatCurrency(product.price)}</p>
              </div>
              <p className="mt-2 text-sm text-stone-600 line-clamp-2 mb-4 flex-1">{product.description}</p>
              <button 
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full bg-stone-900 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-brand-green transition z-10 relative shadow-sm active:scale-95 transform"
              >
                  <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;