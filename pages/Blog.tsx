import React from 'react';
import { useContent } from '../context/ContentContext';

const Blog: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-stone-900">Health & Wellness Hub</h1>
          <p className="mt-4 text-lg text-stone-600">Latest tips, recipes, and insights from Kairos Natural.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-48 w-full overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold text-brand-blue mb-2">{post.date} • {post.author}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 hover:text-brand-green cursor-pointer">{post.title}</h3>
                <p className="text-stone-600 mb-4 flex-1">{post.excerpt}</p>
                <a href="#" className="text-brand-green font-semibold hover:underline mt-auto inline-block">Read Article &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
