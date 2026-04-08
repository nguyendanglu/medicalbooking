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
    title: "Nhịp sinh học: Cân bằng giấc ngủ để phục hồi",
    category: "Lối sống",
    date: "07/04/2026",
  },
  {
    title: "AI trong chẩn đoán: Tăng cường độ chính xác",
    category: "Công nghệ",
    date: "05/04/2026",
  },
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
