import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Placeholder components for routes not fully fleshed out in snippet but required by architecture
const Testimonials = () => {
    const { content } = useContent();
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Client Testimonials</h1>
            <div className="grid gap-8 md:grid-cols-2">
                {content.testimonials.map((t: any) => (
                    <div key={t.id} className="bg-stone-50 p-6 rounded-lg border">
                        <p className="italic text-lg mb-4">"{t.text}"</p>
                        <div className="font-bold">{t.author}</div>
                        <div className="text-sm text-stone-500">{t.role}</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const FAQ = () => {
    const { content } = useContent();
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {content.faq.map((item) => (
                    <details key={item.id} className="bg-stone-50 p-4 rounded-lg cursor-pointer group">
                        <summary className="font-bold text-lg flex justify-between items-center list-none">
                            {item.question}
                            <span className="transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-stone-600 leading-relaxed border-t border-stone-200 pt-4">{item.answer}</p>
                    </details>
                ))}
            </div>
        </div>
    );
};

function App() {
  return (
    <ContentProvider>
      <CartProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </HashRouter>
      </CartProvider>
    </ContentProvider>
  );
}

export default App;
