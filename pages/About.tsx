
import React from 'react';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-stone-900">About Kairos Natural</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Rooted in nature, driven by science, and dedicated to your holistic well-being.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={content.about.image}
              alt="Natural Ingredients" 
              className="rounded-2xl shadow-xl w-full object-cover h-96"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-3">Our Story</h3>
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {content.about.story}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-stone-50 p-6 rounded-lg border-l-4 border-brand-blue">
                <h4 className="font-bold text-stone-900 mb-2">Our Mission</h4>
                <p className="text-sm text-stone-600">{content.about.mission}</p>
              </div>
              <div className="bg-stone-50 p-6 rounded-lg border-l-4 border-brand-accent">
                <h4 className="font-bold text-stone-900 mb-2">Our Vision</h4>
                <p className="text-sm text-stone-600">{content.about.vision}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Core Values</h3>
              <p className="text-stone-600">{content.about.values}</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900">Meet The Experts</h2>
                <p className="text-stone-500 mt-2">Led by passionate nutrition experts committed to your well-being.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.about.team && content.about.team.length > 0 ? (
                    content.about.team.map((member) => (
                        <div key={member.id} className="text-center group">
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </div>
                            <h3 className="text-lg font-bold">{member.name}</h3>
                            <p className="text-brand-green text-sm">{member.role}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-stone-400">
                        No team members added yet.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
