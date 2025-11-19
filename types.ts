
export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface AboutSection {
  mission: string;
  vision: string;
  values: string;
  story: string;
  image: string;
  team: Expert[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CompanyInfo {
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface AppContent {
  hero: HeroSection;
  about: AboutSection;
  services: Service[];
  products: Product[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  companyInfo: CompanyInfo;
  faq: FAQItem[];
}

export interface ContentContextType {
  content: AppContent;
  updateContent: (section: keyof AppContent, data: any) => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}
