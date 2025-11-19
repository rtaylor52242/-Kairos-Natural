import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { content } = useContent();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      alert("Message sent! We will contact you shortly.");
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
       <div className="bg-brand-green py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-extrabold">Contact Us</h1>
          <p className="mt-4 text-xl text-brand-lightGreen">
            Start your journey to better health today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Get in Touch</h2>
            <p className="text-stone-600 mb-8">
              Whether you have questions about our blends, want to book a consultation, or are looking for corporate wellness solutions, we are here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="text-brand-green mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-stone-900">Phone</h3>
                  <p className="text-stone-600">{content.companyInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-brand-green mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-stone-900">Email</h3>
                  <p className="text-stone-600">{content.companyInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-brand-green mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-stone-900">Service Area</h3>
                  <p className="text-stone-600">{content.companyInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 h-64 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400">
                [Interactive Map of Nigeria Placeholder]
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-stone-50 p-8 rounded-xl border border-stone-100 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                <input type="text" id="name" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-3 border" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                <input type="email" id="email" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-3 border" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700">Subject</label>
                <select id="subject" className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-3 border">
                  <option>General Inquiry</option>
                  <option>Consultation Booking</option>
                  <option>Order Support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                <textarea id="message" rows={4} required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-brand-green focus:ring-brand-green p-3 border" placeholder="How can we help you?"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:opacity-50"
              >
                 {formStatus === 'submitting' ? 'Sending...' : <span className="flex items-center gap-2">Send Message <Send size={16}/></span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
