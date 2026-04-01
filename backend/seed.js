const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const Member = require('./src/models/Member');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jyoti-foundation';

const Project = require('./src/models/Project');
const Stat = require('./src/models/Stat');

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
        name: 'Free Cataract Eye Camp',
        nameHindi: 'नि:शुल्क मोतियाबिंद नेत्र शिविर',
        location: 'Hasanpur, UP',
        locationHindi: 'हसनपुर, यूपी',
        description: 'A major eye screening and surgery camp providing free treatment to underserved rural communities.',
        descriptionHindi: 'कम सेवा प्राप्त ग्रामीण समुदायों को मुफ्त उपचार प्रदान करने वाला एक प्रमुख नेत्र जांच और सर्जरी शिविर।',
        details: 'Each year we organize a free cataract surgery camp where we operate on over 200 patients in a single week.',
        detailsHindi: 'हर साल हम एक मुफ्त मोतियाबिंद सर्जरी शिविर आयोजित करते हैं जहां हम एक ही सप्ताह में 200 से अधिक मरीजों का ऑपरेशन करते हैं।',
        category: 'Medical Camp',
        images: ['/images/eye_camp.png']
      },
      {
        name: 'Rural Healthcare Outreach',
        nameHindi: 'ग्रामीण स्वास्थ्य आउटरीच',
        location: 'Moradabad Villages',
        locationHindi: 'मुरादाबाद के गांव',
        description: 'Bringing basic medical facilities and health awareness to remote villages in the Moradabad district.',
        descriptionHindi: 'मुरादाबाद जिले के दूरदराज के गांवों में बुनियादी चिकित्सा सुविधाएं और स्वास्थ्य जागरूकता लाना।',
        details: 'Our mobile medical units travel to deep rural locations to conduct checkups and distribute medicines.',
        detailsHindi: 'हमारी मोबाइल मेडिकल यूनिटें चेकअप करने और दवाएं बांटने के लिए गहरे ग्रामीण स्थानों की यात्रा करती हैं।',
        category: 'Outreach',
        images: ['/images/hero_banner.png']
      }
    ];
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('2 projects seeded successfully.');

    // 4. Seed Stats
    const statsData = [
      { _id: new mongoose.Types.ObjectId(), value: 25000, label: 'Eye Surgeries', labelHindi: 'नेत्र सर्जरी', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 150000, label: 'Patients Treated', labelHindi: 'उपचारित मरीज', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 500, label: 'Medical Camps', labelHindi: 'मेडिकल कैंप', suffix: '+' },
      { _id: new mongoose.Types.ObjectId(), value: 25, label: 'Years of Trust', labelHindi: 'भरोसे के वर्ष', suffix: '+' }
    ];
    await Stat.deleteMany({});
    await Stat.insertMany(statsData);
    console.log('Statistics seeded successfully.');


    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

