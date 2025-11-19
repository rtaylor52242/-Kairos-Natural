import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import { Leaf, Activity, Heart, Users, Calendar, Utensils } from 'lucide-react';

const Services: React.FC = () => {
  const { content } = useContent();

  // Helper to get icon (for demo purposes)
  const getIcon = (index: number) => {
    const icons = [<Activity />, <Heart />, <Leaf />, <Users />, <Calendar />, <Utensils />];
    return icons[index % icons.length];
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-stone-900">Our Services</h1>
          <p className="mt-4 text-xl text-stone-600 max-w-2xl mx-auto">
            Comprehensive wellness solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, idx) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="w-12 h-12 bg-brand-lightGreen rounded-lg flex items-center justify-center text-brand-green mb-6">
                  {getIcon(idx)}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="bg-stone-50 px-8 py-4 border-t border-stone-100">
                <Link to="/contact" className="text-brand-blue font-medium hover:text-brand-green transition flex items-center gap-2">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Model Highlight */}
        <div className="mt-20 bg-brand-green rounded-2xl overflow-hidden shadow-xl text-white">
            <div className="md:flex">
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Join Our Monthly Detox Subscription</h2>
                    <p className="mb-8 text-brand-lightGreen">
                        Consistency is key to long-term health. Get your detox blends and meal plans delivered to your doorstep every month at a discounted rate.
                    </p>
                    <div>
                         <Link to="/contact" className="bg-white text-brand-green px-6 py-3 rounded-md font-bold hover:bg-stone-100 transition">
                            Subscribe & Save
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 relative h-64 md:h-auto">
                    <img src="https://picsum.photos/seed/veggies/800/600" alt="Subscription Box" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
