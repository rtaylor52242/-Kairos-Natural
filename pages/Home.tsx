import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

const Home: React.FC = () => {
  const { content } = useContent();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src={content.hero.backgroundImage}
            alt="Wellness Background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 drop-shadow-lg">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-stone-200">
            {content.hero.subtitle}
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-green bg-white hover:bg-stone-50 transition shadow-lg"
            >
              {content.hero.ctaText}
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-stone-900 transition"
            >
              Explore Blends
            </Link>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-brand-beige py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-base text-brand-blue font-semibold tracking-wide uppercase">Welcome to Kairos Natural</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Holistic Healing from Nature
          </p>
          <p className="mt-4 max-w-2xl text-xl text-stone-500 mx-auto">
            We bridge the gap between modern lifestyle challenges and natural solutions. Our nutrient-rich blends and expert guidance help you fight chronic lifestyle diseases and achieve optimal gut health.
          </p>
        </div>
      </div>

      {/* Key Offerings */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.services.slice(0, 4).map((service) => (
              <div key={service.id} className="pt-6">
                <div className="flow-root bg-stone-50 rounded-lg px-6 pb-8 h-full hover:shadow-md transition duration-300 border border-stone-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-brand-green rounded-md shadow-lg">
                        {/* In a real app, dynamically map iconName to actual Icon component */}
                        <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-stone-900 tracking-tight">{service.title}</h3>
                    <p className="mt-5 text-base text-stone-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <Link to="/services" className="text-brand-blue hover:text-cyan-800 font-medium inline-flex items-center gap-1">
                View all services <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </div>

      {/* Social Proof Carousel (Simple Grid for this demo) */}
      <div className="bg-brand-lightGreen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-stone-900 mb-12">Stories of Transformation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-stone-600 italic mb-4">"{t.text}"</p>
                <div className="font-bold text-stone-900">{t.author}</div>
                <div className="text-sm text-brand-green">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-brand-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">Ready to reset your health?</h2>
            <p className="text-cyan-100">Join our Detox Program today and feel the difference.</p>
          </div>
          <Link to="/contact" className="bg-white text-brand-blue px-8 py-3 rounded-md font-bold shadow-md hover:bg-stone-100 transition">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
