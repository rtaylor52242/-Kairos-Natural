
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Navigate } from 'react-router-dom';
import { AppContent } from '../types';
import { Save, Layout, FileText, ShoppingCart, Users, HelpCircle, MessageSquare, Plus, Trash2, Globe, Upload } from 'lucide-react';

// --- Helper Components ---

// Component: Image Input (URL or Upload)
const ImageInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
  const [mode, setMode] = useState<'url' | 'file'>('url');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex gap-4 mb-2">
        <label className="flex items-center text-sm cursor-pointer select-none">
          <input 
            type="radio" 
            checked={mode === 'url'} 
            onChange={() => setMode('url')} 
            className="mr-2 accent-brand-green" 
          />
          <Globe size={14} className="mr-1"/> Use Image URL
        </label>
        <label className="flex items-center text-sm cursor-pointer select-none">
          <input 
            type="radio" 
            checked={mode === 'file'} 
            onChange={() => setMode('file')} 
            className="mr-2 accent-brand-green" 
          />
          <Upload size={14} className="mr-1"/> Upload File
        </label>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all text-sm bg-white text-black"
          placeholder="https://example.com/image.jpg"
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all text-sm bg-white text-black"
        />
      )}
      {value && (
        <div className="mt-2 h-20 w-20 border border-stone-200 rounded overflow-hidden bg-stone-100">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

// Component: Standard Input Group
const InputGroup = ({ label, value, onChange, type = "text", rows = 1 }: { label: string, value: any, onChange: (val: any) => void, type?: string, rows?: number }) => (
    <div className="mb-4 relative">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">{label}</label>
        {rows > 1 ? (
            <textarea 
              value={value} 
              onChange={e => onChange(e.target.value)} 
              rows={rows}
              className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all text-sm bg-white text-black"
            />
        ) : (
            <input 
              type={type} 
              value={value} 
              onChange={e => onChange(e.target.value)} 
              className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all text-sm bg-white text-black"
            />
        )}
    </div>
);

// Component: Delete Button with Confirmation
const DeleteButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        type="button"
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Delete button clicked'); // Debug log
            if (window.confirm('Are you sure you want to delete this item? This action cannot be undone until you save.')) {
                onClick();
            }
        }} 
        className="absolute top-2 right-2 text-stone-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-full p-2 shadow-sm border border-stone-200 z-50 transition-all cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Delete Item"
    >
        <Trash2 size={18}/>
    </button>
);

// Component: Nav Button
const AdminNavButton = ({ tab, activeTab, icon: Icon, label, onClick }: { tab: string, activeTab: string, icon: any, label: string, onClick: (t: any) => void }) => (
    <button 
        onClick={() => onClick(tab)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-brand-lightGreen text-brand-green' : 'text-stone-600 hover:bg-stone-50'}`}
    >
        <Icon size={18} /> <span>{label}</span>
    </button>
);

// --- Main Component ---

const Admin: React.FC = () => {
  const { content, setFullContent, isAdminMode } = useContent();
  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'services' | 'products' | 'blog' | 'testimonials' | 'faq'>('general');
  const [localContent, setLocalContent] = useState<AppContent>(content);
  
  // Sync local state when content changes
  useEffect(() => {
    setLocalContent(content);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!isAdminMode) {
    return <div className="p-12 text-center">
      <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
      <p className="mt-2">Please enable Admin Mode from the footer to access this page.</p>
      <Navigate to="/" replace /> 
    </div>;
  }

  const handleSave = () => {
    setFullContent(localContent);
    alert('All changes saved successfully!');
  };

  // Generic handler for simple object fields
  const handleObjectChange = (section: keyof AppContent, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [key]: value
      }
    }));
  };

   // Specific handler for deep nested Company Info
  const handleCompanyInfoChange = (key: string, value: string, isSocial = false) => {
      setLocalContent(prev => {
          if (isSocial) {
              return {
                  ...prev,
                  companyInfo: {
                      ...prev.companyInfo,
                      socials: {
                          ...prev.companyInfo.socials,
                          [key]: value
                      }
                  }
              }
          }
          return {
              ...prev,
              companyInfo: {
                  ...prev.companyInfo,
                  [key]: value
              }
          }
      })
  };


  // Generic handler for updating an item in an array
  const handleArrayChange = (section: keyof AppContent | 'team', index: number, key: string, value: any) => {
    if (section === 'team') {
        setLocalContent(prev => {
            const list = [...prev.about.team];
            list[index] = { ...list[index], [key]: value };
            return {
                ...prev,
                about: {
                    ...prev.about,
                    team: list
                }
            };
        });
        return;
    }
    
    setLocalContent(prev => {
        const list = [...(prev[section] as any[])];
        list[index] = { ...list[index], [key]: value };
        return { ...prev, [section]: list };
    });
  };

  // Add Item to Array
  const handleAdd = (section: keyof AppContent | 'team') => {
    const timestamp = Date.now().toString() + Math.floor(Math.random() * 1000); // Ensure unique ID
    let newItem: any = { id: timestamp };

    if (section === 'team') {
        newItem = { ...newItem, name: 'New Expert', role: 'Specialist', image: 'https://picsum.photos/300/300' };
        setLocalContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                team: [...prev.about.team, newItem]
            }
        }));
        return;
    }

    switch (section) {
        case 'services':
            newItem = { ...newItem, title: 'New Service', description: 'Service description...', iconName: 'Activity' };
            break;
        case 'products':
            newItem = { ...newItem, name: 'New Product', price: 0, description: 'Description...', category: 'Wellness', image: 'https://picsum.photos/200' };
            break;
        case 'blogPosts':
             newItem = { ...newItem, title: 'New Blog Post', excerpt: 'Short summary...', content: 'Full content...', author: 'Admin', date: new Date().toLocaleDateString(), image: 'https://picsum.photos/800/400' };
             break;
        case 'testimonials':
            newItem = { ...newItem, author: 'Happy Client', text: 'Great service!', role: 'Customer' };
            break;
        case 'faq':
            newItem = { ...newItem, question: 'New Question?', answer: 'Answer here.' };
            break;
    }

    setLocalContent(prev => ({
        ...prev,
        [section]: [...(prev[section] as any[]), newItem]
    }));
  };

  // Remove Item from Array using UNIQUE ID
  const handleDelete = (section: keyof AppContent | 'team', id: string) => {
      console.log(`Attempting to delete item ${id} from ${section}`);
      
      setLocalContent(prev => {
          if (section === 'team') {
              return {
                  ...prev,
                  about: {
                      ...prev.about,
                      team: prev.about.team.filter(t => t.id !== id)
                  }
              };
          }

          // For generic array sections
          const currentList = prev[section];
          if (Array.isArray(currentList)) {
              return { 
                  ...prev, 
                  [section]: currentList.filter((item: any) => item.id !== id) 
              };
          }
          
          return prev;
      });
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-stone-200 flex-shrink-0">
        <div className="p-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
             <Layout className="text-brand-green"/> CMS Admin
          </h2>
        </div>
        <nav className="p-4 space-y-2 overflow-x-auto md:overflow-visible flex md:flex-col">
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="general" icon={Globe} label="General & Info" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="about" icon={Users} label="About & Team" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="services" icon={Layout} label="Services" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="products" icon={ShoppingCart} label="Products" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="blog" icon={FileText} label="Blog Posts" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="testimonials" icon={MessageSquare} label="Testimonials" />
          <AdminNavButton activeTab={activeTab} onClick={setActiveTab} tab="faq" icon={HelpCircle} label="FAQ" />
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen pb-24">
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-stone-100 pt-4 pb-4 z-40 backdrop-blur-sm bg-opacity-90">
          <h1 className="text-2xl font-bold text-stone-800 capitalize">{activeTab === 'about' ? 'About & Team' : activeTab} Management</h1>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-brand-blue text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition shadow-md font-bold"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-stone-200">
          
          {activeTab === 'general' && (
            <div className="space-y-10">
              <section>
                <h3 className="text-lg font-bold text-stone-900 border-b pb-2 mb-6 flex items-center gap-2"><Layout size={20}/> Hero Section</h3>
                <div className="grid gap-6">
                  <InputGroup label="Headline" value={localContent.hero.title} onChange={v => handleObjectChange('hero', 'title', v)} />
                  <InputGroup label="Subtitle" value={localContent.hero.subtitle} onChange={v => handleObjectChange('hero', 'subtitle', v)} rows={2} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="CTA Button Text" value={localContent.hero.ctaText} onChange={v => handleObjectChange('hero', 'ctaText', v)} />
                    <ImageInput label="Hero Background Image" value={localContent.hero.backgroundImage} onChange={v => handleObjectChange('hero', 'backgroundImage', v)} />
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-bold text-stone-900 border-b pb-2 mb-6 flex items-center gap-2"><Globe size={20}/> Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Email Address" value={localContent.companyInfo.email} onChange={v => handleCompanyInfoChange('email', v)} />
                    <InputGroup label="Phone Number" value={localContent.companyInfo.phone} onChange={v => handleCompanyInfoChange('phone', v)} />
                    <div className="md:col-span-2">
                        <InputGroup label="Physical Address / Service Area" value={localContent.companyInfo.address} onChange={v => handleCompanyInfoChange('address', v)} />
                    </div>
                </div>
                <h4 className="font-bold text-stone-600 mt-6 mb-4 text-sm uppercase">Social Media Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputGroup label="Facebook URL" value={localContent.companyInfo.socials.facebook} onChange={v => handleCompanyInfoChange('facebook', v, true)} />
                    <InputGroup label="Instagram URL" value={localContent.companyInfo.socials.instagram} onChange={v => handleCompanyInfoChange('instagram', v, true)} />
                    <InputGroup label="LinkedIn URL" value={localContent.companyInfo.socials.linkedin} onChange={v => handleCompanyInfoChange('linkedin', v, true)} />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
                 <ImageInput label="Main About Image" value={localContent.about.image} onChange={v => handleObjectChange('about', 'image', v)} />
                 <InputGroup label="Our Story" value={localContent.about.story} onChange={v => handleObjectChange('about', 'story', v)} rows={6} />
                 <InputGroup label="Mission Statement" value={localContent.about.mission} onChange={v => handleObjectChange('about', 'mission', v)} rows={3} />
                 <InputGroup label="Vision Statement" value={localContent.about.vision} onChange={v => handleObjectChange('about', 'vision', v)} rows={3} />
                 <InputGroup label="Core Values" value={localContent.about.values} onChange={v => handleObjectChange('about', 'values', v)} rows={3} />

                 <div className="pt-8 border-t border-stone-200">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-stone-900">Meet The Experts (Team)</h3>
                        <button onClick={() => handleAdd('team')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                            <Plus size={16}/> Add Team Member
                        </button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {localContent.about.team?.map((expert, idx) => (
                            <div key={expert.id} className="p-4 pt-8 border border-stone-200 rounded-lg bg-stone-50 relative">
                                <DeleteButton onClick={() => handleDelete('team', expert.id)} />
                                <div className="mb-4">
                                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md mb-2">
                                        <img src={expert.image} alt="" className="w-full h-full object-cover"/>
                                    </div>
                                    <ImageInput label="Profile Image" value={expert.image} onChange={v => handleArrayChange('team', idx, 'image', v)} />
                                </div>
                                <InputGroup label="Name" value={expert.name} onChange={v => handleArrayChange('team', idx, 'name', v)} />
                                <InputGroup label="Role" value={expert.role} onChange={v => handleArrayChange('team', idx, 'role', v)} />
                            </div>
                        ))}
                        {(!localContent.about.team || localContent.about.team.length === 0) && (
                             <p className="text-stone-500 italic text-sm col-span-full">No team members added yet.</p>
                        )}
                     </div>
                 </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                  <button onClick={() => handleAdd('services')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                      <Plus size={16}/> Add New Service
                  </button>
              </div>
              {localContent.services.map((service, idx) => (
                <div key={service.id} className="p-6 border border-stone-200 rounded-lg bg-stone-50 relative group hover:border-stone-300 transition">
                  <DeleteButton onClick={() => handleDelete('services', service.id)} />
                  <h4 className="font-bold text-sm mb-4 text-stone-500 uppercase">Service #{idx + 1}</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                       <div className="md:col-span-2">
                         <InputGroup label="Service Title" value={service.title} onChange={v => handleArrayChange('services', idx, 'title', v)} />
                       </div>
                       <div className="md:col-span-2">
                         <InputGroup label="Description" value={service.description} onChange={v => handleArrayChange('services', idx, 'description', v)} rows={2} />
                       </div>
                       <InputGroup label="Icon Name (Lucide React)" value={service.iconName} onChange={v => handleArrayChange('services', idx, 'iconName', v)} />
                  </div>
                </div>
              ))}
            </div>
          )}

           {activeTab === 'products' && (
             <div className="space-y-6">
               <div className="flex justify-end">
                   <button onClick={() => handleAdd('products')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                       <Plus size={16}/> Add New Product
                   </button>
               </div>
               <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                 {localContent.products.map((product, idx) => (
                   <div key={product.id} className="p-6 border border-stone-200 rounded-lg bg-stone-50 relative group hover:border-stone-300 transition">
                     <DeleteButton onClick={() => handleDelete('products', product.id)} />
                     <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded border border-stone-200 overflow-hidden">
                            <img src={product.image} alt="" className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-grow">
                             <h4 className="font-bold text-sm text-stone-500 uppercase mb-1">Product #{idx + 1}</h4>
                             <h3 className="font-bold text-stone-900">{product.name || 'Untitled'}</h3>
                        </div>
                     </div>
                     
                     <div className="grid gap-4">
                          <InputGroup label="Product Name" value={product.name} onChange={v => handleArrayChange('products', idx, 'name', v)} />
                          <div className="grid grid-cols-2 gap-4">
                             <InputGroup label="Price (NGN)" type="number" value={product.price} onChange={v => handleArrayChange('products', idx, 'price', Number(v))} />
                             <InputGroup label="Category" value={product.category} onChange={v => handleArrayChange('products', idx, 'category', v)} />
                          </div>
                          <ImageInput label="Product Image" value={product.image} onChange={v => handleArrayChange('products', idx, 'image', v)} />
                          <InputGroup label="Description" value={product.description} onChange={v => handleArrayChange('products', idx, 'description', v)} rows={3} />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'blog' && (
             <div className="space-y-6">
               <div className="flex justify-end">
                   <button onClick={() => handleAdd('blogPosts')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                       <Plus size={16}/> Add New Post
                   </button>
               </div>
               {localContent.blogPosts.map((post, idx) => (
                 <div key={post.id} className="p-6 border border-stone-200 rounded-lg bg-stone-50 relative group hover:border-stone-300 transition">
                   <DeleteButton onClick={() => handleDelete('blogPosts', post.id)} />
                   <h4 className="font-bold text-sm mb-4 text-stone-500 uppercase">Blog Post #{idx + 1}</h4>
                   <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <InputGroup label="Post Title" value={post.title} onChange={v => handleArrayChange('blogPosts', idx, 'title', v)} />
                        </div>
                        <InputGroup label="Author" value={post.author} onChange={v => handleArrayChange('blogPosts', idx, 'author', v)} />
                        <InputGroup label="Date" value={post.date} onChange={v => handleArrayChange('blogPosts', idx, 'date', v)} />
                        
                        <div className="md:col-span-2">
                             <ImageInput label="Cover Image" value={post.image} onChange={v => handleArrayChange('blogPosts', idx, 'image', v)} />
                        </div>
                        <div className="md:col-span-2">
                            <InputGroup label="Short Excerpt" value={post.excerpt} onChange={v => handleArrayChange('blogPosts', idx, 'excerpt', v)} rows={2} />
                        </div>
                        <div className="md:col-span-2">
                            <InputGroup label="Full Content" value={post.content} onChange={v => handleArrayChange('blogPosts', idx, 'content', v)} rows={5} />
                        </div>
                   </div>
                 </div>
               ))}
             </div>
           )}

           {activeTab === 'testimonials' && (
             <div className="space-y-6">
               <div className="flex justify-end">
                   <button onClick={() => handleAdd('testimonials')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                       <Plus size={16}/> Add Testimonial
                   </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {localContent.testimonials.map((t, idx) => (
                   <div key={t.id} className="p-6 border border-stone-200 rounded-lg bg-stone-50 relative">
                     <DeleteButton onClick={() => handleDelete('testimonials', t.id)} />
                     <h4 className="font-bold text-sm mb-4 text-stone-500 uppercase">Review #{idx + 1}</h4>
                     <div className="space-y-4">
                        <InputGroup label="Client Name" value={t.author} onChange={v => handleArrayChange('testimonials', idx, 'author', v)} />
                        <InputGroup label="Role / Condition" value={t.role || ''} onChange={v => handleArrayChange('testimonials', idx, 'role', v)} />
                        <InputGroup label="Testimonial Text" value={t.text} onChange={v => handleArrayChange('testimonials', idx, 'text', v)} rows={3} />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {activeTab === 'faq' && (
             <div className="space-y-6">
               <div className="flex justify-end">
                   <button onClick={() => handleAdd('faq')} className="flex items-center gap-2 text-sm font-bold text-brand-green hover:bg-brand-lightGreen px-3 py-2 rounded">
                       <Plus size={16}/> Add Question
                   </button>
               </div>
               {localContent.faq.map((item, idx) => (
                 <div key={item.id} className="p-6 border border-stone-200 rounded-lg bg-stone-50 relative">
                   <DeleteButton onClick={() => handleDelete('faq', item.id)} />
                   <h4 className="font-bold text-sm mb-4 text-stone-500 uppercase">Question #{idx + 1}</h4>
                   <div className="space-y-4">
                        <InputGroup label="Question" value={item.question} onChange={v => handleArrayChange('faq', idx, 'question', v)} />
                        <InputGroup label="Answer" value={item.answer} onChange={v => handleArrayChange('faq', idx, 'answer', v)} rows={3} />
                   </div>
                 </div>
               ))}
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

export default Admin;
