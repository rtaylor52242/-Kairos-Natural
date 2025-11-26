import React, { useState, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ZoomIn, X, Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const { content } = useContent();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = content.products.map(p => p.category);
    return ['All', ...Array.from(new Set(cats))];
  }, [content.products]);

  // Filter products based on selection
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return content.products;
    return content.products.filter(p => p.category === selectedCategory);
  }, [content.products, selectedCategory]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      {/* Lightbox Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged Product" 
            className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-stone-200 pb-6">
            <div>
                <h1 className="text-3xl font-extrabold text-stone-900">Wellness Shop</h1>
                <p className="mt-2 text-stone-500">Nutrient-rich blends and kits.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <span className="text-sm text-stone-400">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </span>
            </div>
        </div>

        {/* Category Filter */}
        <div className="mb-10 overflow-x-auto pb-2">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 mr-4 text-stone-400 text-sm font-bold uppercase tracking-wider">
                    <Filter size={16} /> Filter:
                </div>
                <div className="flex gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                                selectedCategory === cat
                                    ? 'bg-brand-green text-white shadow-md transform scale-105'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-lg border border-dashed border-stone-300">
                <p className="text-stone-500 text-lg">No products found in this category.</p>
                <button 
                    onClick={() => setSelectedCategory('All')}
                    className="mt-4 text-brand-green font-medium hover:underline"
                >
                    View all products
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col">
                <div 
                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-stone-200 relative cursor-zoom-in"
                    onClick={() => setSelectedImage(product.image)}
                >
                    <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 text-stone-900 p-3 rounded-full shadow-lg">
                            <ZoomIn size={24} />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                    <h3 className="text-lg font-bold text-stone-900">
                        <span className="cursor-pointer hover:text-brand-green transition-colors" onClick={() => setSelectedImage(product.image)}>
                        {product.name}
                        </span>
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">{product.category}</p>
                    </div>
                    <p className="text-lg font-medium text-brand-green">{formatCurrency(product.price)}</p>
                </div>
                <p className="mt-2 text-sm text-stone-600 line-clamp-2 mb-4 flex-1">{product.description}</p>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="mt-auto w-full bg-stone-900 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-brand-green transition z-10 relative shadow-sm active:scale-95 transform"
                >
                    <ShoppingBag size={18} /> Add to Cart
                </button>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Shop;