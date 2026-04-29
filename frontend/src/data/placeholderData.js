export const hospitals = [
  {
    id: 1,
    name: "Apollo Laser Eye Hospital",
    nameHindi: "अपोलो लेजर आई हॉस्पिटल",
    type: "Specialized Eye Care",
    typeHindi: "विशिष्ट नेत्र देखभाल",
    description: "Our flagship hospital specializing in advanced cataract surgeries and laser treatments with state-of-the-art diagnostic facilities.",
    descriptionHindi: "अत्याधुनिक नैदानिक सुविधाओं के साथ उन्नत मोतियाबिंद सर्जरी और लेजर उपचार में विशेषज्ञता वाला हमारा प्रमुख अस्पताल।",
    location: "Moradabad, Uttar Pradesh",
    locationHindi: "मुरादाबाद, उत्तर प्रदेश",
    phone: "+91 94122 36889",
    services: "Laser Surgery, Cataract, Glaucoma",
    servicesHindi: "लेजर सर्जरी, मोतियाबिंद, कालापानी",
    image: "/apollo1rec.heic"
  },
  {
    id: 2,
    name: "Dr Vinod Hospital",
    nameHindi: "डॉ० विनोद हॉस्पिटल",
    type: "General & Emergency",
    typeHindi: "सामान्य और आपातकालीन",
    description: "A comprehensive medical center providing 24/7 emergency services, general medicine, and maternal care to the Hasanpur community.",
    descriptionHindi: "हसनपुर समुदाय को 24/7 आपातकालीन सेवाएं, सामान्य चिकित्सा और मातृ देखभाल प्रदान करने वाला एक व्यापक चिकित्सा केंद्र।",
    location: "Hasanpur, Uttar Pradesh",
    locationHindi: "हसनपुर, उत्तर प्रदेश",
    phone: "+91 98711 22334",
    services: "General Medicine, Emergency, Maternity",
    servicesHindi: "सामान्य चिकित्सा, आपातकालीन, मातृत्व",
    image: "/dr_vinod_hospital.jpeg"
  }
];

export const stats = [
  { _id: 's1', value: 25000, label: 'Eye Surgeries', labelHindi: 'नेत्र सर्जरी', suffix: '+' },
  { _id: 's2', value: 150000, label: 'Patients Treated', labelHindi: 'उपचारित मरीज', suffix: '+' },
  { _id: 's3', value: 500, label: 'Medical Camps', labelHindi: 'मेडिकल कैंप', suffix: '+' },
  { _id: 's4', value: 25, label: 'Years of Trust', labelHindi: 'भरोसे के वर्ष', suffix: '+' }
];

export const members = [
  { id: '1', name: 'Anshul Sharma', nameHindi: 'अंशुल शर्मा', post: 'President', postHindi: 'अध्यक्ष', occupation: 'Social Service', occupationHindi: 'समाजसेविका' },
  { id: '2', name: 'Sakshi Agrawal', nameHindi: 'साक्षी अग्रवाल', post: 'Vice President', postHindi: 'उपाध्यक्ष', occupation: 'Social Service', occupationHindi: 'समाजसेविका' },
  { id: '3', name: 'Dr. Pranjal Agrawal', nameHindi: 'डॉ० प्रांजल अग्रवाल', post: 'Manager', postHindi: 'प्रबन्धक', occupation: 'Doctor', occupationHindi: 'चिकित्सक' },
  { id: '4', name: 'Mugank Pandey', nameHindi: 'मृगांक पाण्डेय', post: 'Dy. Manager', postHindi: 'उपप्रबन्धक', occupation: 'Journalist', occupationHindi: 'पत्रकार' }
];

export const workActivities = [
  {
    _id: 'w1',
    name: 'Free Cataract Eye Camp',
    nameHindi: 'नि:शुल्क मोतियाबिंद नेत्र शिविर',
    category: 'Free Health Check Up',
    categoryHindi: 'नि:शुल्क स्वास्थ्य जांच',
    location: 'Hasanpur, UP',
    locationHindi: 'हसनपुर, यूपी',
    description: 'A major eye screening and surgery camp providing free treatment to underserved rural communities.',
    descriptionHindi: 'कम सेवा प्राप्त ग्रामीण समुदायों को मुफ्त उपचार प्रदान करने वाला एक प्रमुख नेत्र जांच और सर्जरी शिविर।',
    images: ['/images/eye_camp.png']
  },
  {
    _id: 'w2',
    name: 'Rural Healthcare Outreach',
    nameHindi: 'ग्रामीण स्वास्थ्य आउटरीच',
    category: 'Health Awareness',
    categoryHindi: 'स्वास्थ्य जागरूकता',
    location: 'Moradabad Villages',
    locationHindi: 'मुरादाबाद के गांव',
    description: 'Bringing basic medical facilities and health awareness to remote villages in the Moradabad district.',
    descriptionHindi: 'मुरादाबाद जिले के दूरदराज के गांवों में बुनियादी चिकित्सा सुविधाएं और स्वास्थ्य जागरूकता लाना।',
    images: ['/images/hero_banner.png']
  }
];
