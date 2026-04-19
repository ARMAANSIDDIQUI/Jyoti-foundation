const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const Member = require('./src/models/Member');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jyoti-foundation';

const Project = require('./src/models/Project');
const Stat = require('./src/models/Stat');
const NewsCoverage = require('./src/models/NewsCoverage');
const Category = require('./src/models/Category');

async function seed() {

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Create Admin
    const adminEmail = 'jyotifoundation44@gmail.com';
    const adminPassword = 'Jyoti@2025';

    await Admin.deleteMany({}); // Clear old admins
    await Admin.create({ email: adminEmail, password: adminPassword });
    console.log(`Admin user ${adminEmail} created successfully.`);


    // 2. Seed Members
    const membersSeedPath = path.join(__dirname, 'members_seed.json');
    if (fs.existsSync(membersSeedPath)) {
      const membersData = JSON.parse(fs.readFileSync(membersSeedPath, 'utf-8'));
      await Member.deleteMany({});
      await Member.insertMany(membersData);
      console.log(`${membersData.length} members seeded successfully.`);
    }

    // 3. Seed Projects
    const projects = [
      {
        name: 'Mega Eye Surgery Camp',
        nameHindi: 'विशाल नेत्र शल्य चिकित्सा शिविर',
        location: 'Hasanpur, UP',
        locationHindi: 'हसनपुर, यूपी',
        description: 'Large scale eye surgery and checkup camp with hundreds of patients receiving free checks, medication, and cataract surgery advice.',
        descriptionHindi: 'बड़े पैमाने पर नेत्र शल्य चिकित्सा और जांच शिविर, जिसमें सैकड़ों रोगियों को मुफ्त जांच, दवा और मोतियाबिंद की सर्जरी की सलाह मिलती है।',
        details: 'As highlighted in massive news coverage, Dr. Vinod Hospital has examined thousands of patients. At recent camps, over 120 patients were examined, and many were advised for cataract operations under Ayushman Yojana or at concessional rates. Patients received free medicines and tests for blood sugar and blood pressure.',
        detailsHindi: 'बड़े पैमाने पर समाचारों में उजागर किए गए अनुसार, डॉ. विनोद अस्पताल ने हजारों रोगियों की जांच की है। हाल के शिविरों में, 120 से अधिक रोगियों की जांच की गई, और कई को आयुष्मान योजना के तहत या रियायती दरों पर मोतियाबिंद के ऑपरेशन की सलाह दी गई। मरीजों को मुफ्त दवाएं और ब्लड शुगर तथा ब्लड प्रेशर की जांच मिली।',
        category: 'Medical Camp',
        categoryHindi: 'चिकित्सा शिविर',
        images: ['/images/project1.png']
      },
      {
        name: 'Rural Outreach Program',
        nameHindi: 'ग्रामीण आउटरीच कार्यक्रम',
        location: 'Village Dagroli, Amroha',
        locationHindi: 'गांव डगरोली, अमरोहा',
        description: 'Bringing professional healthcare to remote villages, such as the eye camp at Chiranji Lal Degree College in Dagroli.',
        descriptionHindi: 'डगरोली के चिरंजी लाल डिग्री कॉलेज में नेत्र शिविर जैसे दूरदराज के गांवों में पेशेवर स्वास्थ्य सेवा लाना।',
        details: 'We organize mobile clinics that travel to deep rural areas. Rotary Club Hasanpur Aastha recently organized an eye examination camp in village Dagroli where Dr. Pranjul Agarwal examined dozens of patients using advanced machines entirely for free.',
        detailsHindi: 'हम मोबाइल क्लीनिक आयोजित करते हैं जो गहरे ग्रामीण क्षेत्रों की यात्रा करते हैं। रोटरी क्लब हसनपुर आस्था ने हाल ही में गांव डगरोली में एक नेत्र परीक्षण शिविर आयोजित किया जहां डॉ. प्रांजल अग्रवाल ने उन्नत मशीनों का उपयोग करके पूरी तरह से मुफ्त में दर्जनों रोगियों की जांच की।',
        category: 'Outreach',
        categoryHindi: 'आउटरीच',
        images: ['/images/project2.png']
      },
      {
        name: 'School Vision Screening',
        nameHindi: 'स्कूल दृष्टि जांच',
        location: 'Ch. Bihari Singh Tyagi Girls Inter College',
        locationHindi: 'चौधरी बिहारी सिंह त्यागी कन्या इंटर कॉलेज',
        description: 'Identifying and correcting vision problems in school children and faculty, as recently held at Ch. Bihari Singh Tyagi Girls Inter College.',
        descriptionHindi: 'स्कूली बच्चों और शिक्षकों में दृष्टि समस्याओं की पहचान करना और उन्हें ठीक करना, जैसा कि हाल ही में चौ. बिहारी सिंह त्यागी कन्या इंटर कॉलेज में आयोजित किया गया।',
        details: 'Preventive care is key. At a recent mega camp at Chaudhary Bihari Singh Tyagi Girls Inter College, in collaboration with the school directors, we screened over 107 patients, providing free medicines and advice to ensure the community and students can study and live without hindrance.',
        detailsHindi: 'निवारक देखभाल महत्वपूर्ण है। चौधरी बिहारी सिंह त्यागी कन्या इंटर कॉलेज में हाल ही में एक मेगा शिविर में, स्कूल के निदेशकों के सहयोग से, हमने 107 से अधिक रोगियों की जांच की, मुफ्त दवाएं और सलाह प्रदान की ताकि यह सुनिश्चित हो सके कि समुदाय और छात्र बिना किसी बाधा के अध्ययन और जीवन व्यतीत कर सकें।',
        category: 'Education',
        categoryHindi: 'शिक्षा',
        images: ['/images/project3.png']
      }
    ];
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log(`${projects.length} projects seeded successfully.`);


    // 4. Seed News Coverage
    const newsData = [
      {
        title: '107 Patients Undergo Eye Examination in Camp',
        titleHindi: 'शिविर में 107 मरीजों का नेत्र परीक्षण किया',
        description: 'A free eye check-up camp was organized at Chaudhary Bihari Singh Tyagi Girls Inter College in Rahra. Eye specialist Dr. Pranjal Agarwal examined 107 patients.',
        descriptionHindi: 'रहड़ा कस्बे के चौधरी बिहारी सिंह त्यागी कन्या इंटर कालेज में निशुल्क नेत्र जांच शिविर आयोजित किया गया। नेत्र रोग विशेषज्ञ डा. प्रांजल अग्रवाल ने 107 मरीजों का नेत्र परीक्षण किया।',
        imageUrl: '/images/news1.png',
        date: new Date('2024-01-15'),
        source: 'Hindustan'
      },
      {
        title: 'Free Eye Check-up for 120 Patients in Camp',
        titleHindi: 'शिविर में 120 मरीजों का निशुल्क नेत्र परीक्षण',
        description: 'A free eye test camp was conducted in coordination with Rotary Club Hasanpur Aastha. Ophthalmologist Dr. Pranjal Agarwal examined the eyes of over 120 patients.',
        descriptionHindi: 'हसनपुर। रोटरी क्लब हसनपुर आस्था के संयोजन में निशुल्क नेत्र परीक्षण शिविर हुआ। नेत्र रोग विशेषज्ञ डा. प्रांजल अग्रवाल ने 120 से ज्यादा मरीजों की आंखों की जांच की।',
        imageUrl: '/images/news2.png',
        date: new Date('2024-02-10'),
        source: 'Hindustan'
      },
      {
        title: 'Eyes of 70 Patients Examined in Camp',
        titleHindi: 'शिविर में 70 मरीजों की आंखों की जांच की गई',
        description: 'Rotary Club Hasanpur Aastha organized an eye examination camp at Chiranji Lal Degree College in village Dagroli. Trained physician Dr. Pranjal Agarwal from Dr. Vinod Hospital examined 70 patients.',
        descriptionHindi: 'हसनपुर। रोटरी क्लब हसनपुर आस्था ने गांव डगरोली स्थित चिरंजी लाल डिग्री कॉलेज में नेत्र परीक्षण शिविर आयोजित किया। डॉ. विनोद चिकित्सालय के डॉ. प्रांजल अग्रवाल ने मशीनों से 70 मरीजों की जांच की।',
        imageUrl: '/images/news3.png',
        date: new Date('2023-12-05'),
        source: 'News Diary'
      },
      {
        title: 'Free Eye Check-up Camp Organized',
        titleHindi: 'निशुल्क नेत्र जांच शिविर का हुआ आयोजन',
        description: 'A free eye check-up camp was organized at a city hospital by Rotary Club Hasanpur Aastha. Ophthalmologist Dr. Pranjal Agarwal examined the eyes of over 120 patients.',
        descriptionHindi: 'हसनपुर। रोटरी क्लब हसनपुर आस्था की ओर से नगर के एक अस्पताल में निशुल्क नेत्र जांच शिविर का आयोजन किया गया। नेत्र रोग विशेषज्ञ डॉ. प्रांजल अग्रवाल ने 120 से ज्यादा मरीजों की आंखों की जांच की।',
        imageUrl: '/images/news4.png',
        date: new Date('2024-03-20'),
        source: 'Samvad'
      },
      {
        title: 'Free Eye Camp Organized by Dr. Vinod Hospital',
        titleHindi: 'डॉ विनोद हॉस्पिटल के द्वारा निशुल्क नेत्र शिविर आयोजित',
        description: 'A massive free eye check-up camp was organized by Dr. Vinod Agarwal Hospital at Chaudhary Bihari Singh Tyagi Girls Inter College.',
        descriptionHindi: 'चौधरी बिहारी सिंह त्यागी कन्या इंटर कॉलेज में प्रतिष्ठित डॉक्टर विनोद अग्रवाल अस्पताल के द्वारा विशाल निशुल्क नेत्र जांच शिविर आयोजित किया गया।',
        imageUrl: '/images/news5.png',
        date: new Date('2024-04-12'),
        source: 'Moradabad Ujala'
      }
    ];
    await NewsCoverage.deleteMany({});
    await NewsCoverage.insertMany(newsData);
    console.log(`${newsData.length} news coverage items seeded successfully.`);

    // 5. Seed Stats
    const statsData = [
      { _id: new mongoose.Types.ObjectId(), value: 25000, label: 'Eye Surgeries', labelHindi: 'नेत्र सर्जरी', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 150000, label: 'Patients Treated', labelHindi: 'उपचारित मरीज', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 500, label: 'Medical Camps', labelHindi: 'मेडिकल कैंप', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 25, label: 'Years of Trust', labelHindi: 'भरोसे के वर्ष', suffix: '+' }
    ];
    await Stat.deleteMany({});
    await Stat.insertMany(statsData);
    console.log('Statistics seeded successfully.');

    // 6. Seed Categories
    const categoriesData = [
      { name: 'Medical Camp', index: 1 },
      { name: 'Eye Checkup', index: 2 },
      { name: 'Rural Outreach', index: 3 },
      { name: 'Education', index: 4 }
    ];
    await Category.deleteMany({});
    await Category.insertMany(categoriesData);
    console.log('Categories seeded successfully.');


    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

