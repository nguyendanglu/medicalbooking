export const serviceTypes = [
  {
    id: 'clinic',
    title: 'Clinic Visit',
    description: 'Visit our modern sanctuary',
    icon: 'Hospital',
    price: 85,
  },
  {
    id: 'home',
    title: 'Home Visit',
    description: 'Care at your doorstep',
    icon: 'Home',
    price: 120,
  },
];

export const timeSlots = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00',
];

export const doctors = [
  {
    id: 'dr-mitchell',
    name: "Dr. Sarah Mitchell",
    specialty: "Senior Generalist",
    experience: "12 yrs Exp.",
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
  },
  {
    id: 'dr-nguyen',
    name: "TS. BS. Nguyễn Văn A",
    specialty: "Tim mạch",
    experience: "Hơn 20 năm kinh nghiệm tại BV TW Quân Đội",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    rating: 5.0,
  },
  {
    id: 'dr-le',
    name: "ThS. BS. Lê Thị B",
    specialty: "Nhi khoa",
    experience: "Tu nghiệp tại ĐH Y Harvard, Hoa Kỳ",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
  },
];

export const news = [
  {
    id: 'future-personalized-longevity',
    title: "The Future of Personalized Longevity: Beyond the Lab",
    subtitle: "How multi-omic profiling and AI are redefining human healthspan in 2026.",
    category: "Precision Medicine",
    date: "08/04/2026",
    image: "https://images.unsplash.com/photo-1579154236594-e17976451965?auto=format&fit=crop&q=80&w=1200",
    author: "Dr. Sarah Mitchell",
    readTime: "8 min read",
    featured: true,
    summary: "Multi-omic data integration is no longer a research luxury. It is becoming the cornerstone of proactive medical intervention.",
  },
  {
    id: 'cognitive-resilience',
    title: "Building Cognitive Resilience through Nutritional Auditing",
    category: "Wellness",
    date: "07/04/2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    author: "ThS. BS. Lê Thị B",
    readTime: "5 min read",
    summary: "Discover the specific micronutrients that play a critical role in neuro-protection and synaptic plasticity.",
  },
  {
    id: 'smart-clinic-expansion',
    title: "Smart Clinic Expansion: North District Health Sanctuary",
    category: "Clinic News",
    date: "06/04/2026",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    author: "Admin Team",
    readTime: "3 min read",
    summary: "We are proud to announce the opening of our newest integrated care center, featuring advanced genomic imaging.",
  },
  {
    id: 'circadian-recalibration',
    title: "Circadian Recalibration: Science of the 20-Minute Reset",
    category: "Health Tips",
    date: "05/04/2026",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    author: "TS. BS. Nguyễn Văn A",
    readTime: "4 min read",
    summary: "Short, evidence-based interventions to synchronize your biological clock for better cellular recovery.",
  },
];

export const weeklyTip = {
  title: "Weekly Bio-Hack: The 20-20-20 Rule",
  description: "For every 20 minutes spent looking at a screen, look at something 20 feet away for 20 seconds. This reduces ocular strain and resets autonomic focus.",
  cta: "Learn more about Eye Health",
};

export const newsCategories = [
  "All",
  "Precision Medicine",
  "Wellness",
  "Clinic News",
  "Health Tips",
];

export const services = [
  {
    title: "Khám bệnh tại gia",
    description: "Bác sĩ đến tận nơi chăm sóc chuyên nghiệp và tận tâm.",
    icon: "Home",
  },
  {
    title: "Smart Clinic",
    description: "Kết nối thông minh, tư vấn trực tuyến nhanh chóng.",
    icon: "Smartphone",
  },
  {
    title: "Nhà thuốc Online",
    description: "Giao thuốc nhanh trong 2h, cam kết chất lượng.",
    icon: "ShoppingBag",
  },
];

export const healthPackages = [
  {
    id: 'premium-sanctuary',
    title: 'Premium Year-round Sanctuary',
    description: 'Our most comprehensive longitudinal care package, designed for those who view health as their ultimate asset.',
    featured: true,
    features: [
      'Personalized Health Roadmap',
      '24/7 Dedicated Care Coordinator',
      'Advanced Genomic Profiling',
      'Priority Specialist Access'
    ],
    price: 'Liên hệ',
  },
  {
    id: 'pediatric-flourish',
    title: 'Pediatric Flourish',
    description: 'Essential developmental tracking and immunity auditing for your growing children.',
    features: [
      'Cognitive Milestone Review',
      'Nutritional Balance Labs',
      'Vision & Hearing Diagnostics'
    ],
    price: '2.500.000đ',
  },
  {
    id: 'core-vital-audit',
    title: 'Core Vital Audit',
    description: 'A comprehensive baseline evaluation of metabolic, cardiac, and respiratory health.',
    features: [
      'Full Metabolic Panel',
      'Resting ECG & Cardiac Markers',
      'Physician Analysis Session'
    ],
    price: '4.800.000đ',
  },
  {
    id: 'early-detection',
    title: 'Early Detection Shield',
    description: 'Advanced imaging and fluid biopsy screening for early-stage oncological markers.',
    features: [
      'Liquid Biopsy (Pan-cancer)',
      'Targeted Ultrasound Imaging',
      'Specialist Consultation'
    ],
    price: '8.200.000đ',
  },
];
