
import { AppContent } from './types';

export const INITIAL_CONTENT: AppContent = {
  hero: {
    title: "Heal Naturally, Live Vibrantly",
    subtitle: "Your Journey to Holistic Wellness Begins Here. Expert guidance and nutrient-rich blends.",
    ctaText: "Schedule Your Consultation",
    backgroundImage: "https://picsum.photos/seed/wellnesshero/1920/1080",
  },
  about: {
    story: "Kairos Natural was founded on the belief that the earth provides everything we need to heal. We are a holistic wellness brand dedicated to helping people regain their health through nature's best offerings.",
    mission: "Dedicated to helping people heal their bodies naturally through nutrient-rich blends of fruits, nuts, and seeds, coupled with professional nutritional guidance.",
    vision: "To become a trusted household brand in Nigeria's rapidly growing holistic health and wellness market, empowering individuals to achieve optimal health naturally.",
    values: "Natural Wellness, Personalized Care, Education, Empowerment, Integrity.",
    image: "https://picsum.photos/seed/aboutnature/800/600",
    team: [
      {
        id: 'e1',
        name: "Dr. Nkechi Adebayo",
        role: "Lead Nutritionist",
        image: "https://picsum.photos/seed/person1/300/300"
      },
      {
        id: 'e2',
        name: "Samuel Okon",
        role: "Wellness Consultant",
        image: "https://picsum.photos/seed/person2/300/300"
      },
      {
        id: 'e3',
        name: "Grace Okafor",
        role: "Dietary Specialist",
        image: "https://picsum.photos/seed/person3/300/300"
      }
    ]
  },
  services: [
    {
      id: '1',
      title: "Personalized Nutrition Plans",
      description: "Tailored meal plans designed for your specific body type, health goals, and medical history.",
      iconName: "ClipboardList",
    },
    {
      id: '2',
      title: "Disease Management",
      description: "Strategic dietary support for ulcers, diabetes, HBP, and kidney/liver health.",
      iconName: "HeartPulse",
    },
    {
      id: '3',
      title: "Detox Programs",
      description: "Guided cleanses using our signature organic juice blends to reset your gut health.",
      iconName: "Leaf",
    },
    {
      id: '4',
      title: "Corporate Wellness",
      description: "Packages to boost employee productivity and health through nutrition workshops.",
      iconName: "Building",
    }
  ],
  products: [
    {
      id: 'p1',
      name: "Green Vitality Detox",
      price: 5500,
      category: "Juice Blend",
      description: "A potent blend of kale, cucumber, celery, and apple for deep cleansing.",
      image: "https://picsum.photos/seed/greenjuice/400/400",
    },
    {
      id: 'p2',
      name: "Gut Healer Kit",
      price: 15000,
      category: "Wellness Kit",
      description: "7-day supply of probiotics, fiber-rich seeds, and healing teas.",
      image: "https://picsum.photos/seed/nuts/400/400",
    },
    {
      id: 'p3',
      name: "Berry Antioxidant Boost",
      price: 6000,
      category: "Juice Blend",
      description: "Rich in antioxidants to fight inflammation and boost immunity.",
      image: "https://picsum.photos/seed/berries/400/400",
    },
    {
      id: 'p4',
      name: "Pregnancy Wellness Pack",
      price: 20000,
      category: "Wellness Kit",
      description: "Nutrient-dense snacks and supplements specifically for expectant mothers.",
      image: "https://picsum.photos/seed/pregnancy/400/400",
    }
  ],
  testimonials: [
    {
      id: 't1',
      author: "Chidinma O.",
      role: "Business Owner",
      text: "Kairos Natural's blends transformed my gut health – I feel more energetic and balanced than ever!",
    },
    {
      id: 't2',
      author: "Emmanuel K.",
      role: "Diabetes Patient",
      text: "The personalized nutrition plan helped me manage my diabetes naturally and effectively. Highly recommended.",
    },
    {
      id: 't3',
      author: "Amina Y.",
      role: "New Mom",
      text: "Incredible guidance for my pregnancy nutrition; I felt supported and healthy throughout my journey.",
    }
  ],
  blogPosts: [
    {
      id: 'b1',
      title: "Understanding Gut Health: Tips for a Healthy Microbiome",
      excerpt: "Your gut is your second brain. Learn how to nurture it with simple dietary changes.",
      content: "Full content would go here...",
      date: "Oct 12, 2023",
      author: "Dr. Nkechi",
      image: "https://picsum.photos/seed/guthealth/800/400",
    },
    {
      id: 'b2',
      title: "Natural Remedies for Common Ailments",
      excerpt: "From ginger for nausea to turmeric for inflammation, discover nature's pharmacy.",
      content: "Full content would go here...",
      date: "Nov 05, 2023",
      author: "Wellness Team",
      image: "https://picsum.photos/seed/spices/800/400",
    },
    {
      id: 'b3',
      title: "Healthy Eating on a Budget in Nigeria",
      excerpt: "Eating well doesn't have to break the bank. Local superfoods you should know.",
      content: "Full content would go here...",
      date: "Dec 01, 2023",
      author: "Kairos Kitchen",
      image: "https://picsum.photos/seed/market/800/400",
    }
  ],
  companyInfo: {
    email: "hello@kairosnatural.com",
    phone: "+234 800 123 4567",
    address: "Serving clients across Nigeria",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    }
  },
  faq: [
    {
      id: 'f1',
      question: "What makes Kairos Natural blends unique?",
      answer: "Our blends are made from 100% organic, locally sourced ingredients with no added preservatives. We prioritize nutrient density and flavor.",
    },
    {
      id: 'f2',
      question: "How do I schedule a consultation?",
      answer: "You can book directly through our Contact page, call our office line, or send us a WhatsApp message.",
    },
    {
      id: 'f3',
      question: "Are your programs suitable for children?",
      answer: "Yes! We offer specialized nutrition plans for children, ensuring they get the right nutrients for growth and development.",
    }
  ]
};
