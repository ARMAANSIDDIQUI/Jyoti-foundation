import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Eye, HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react';
import MemberCard from '../components/MemberCard';
import Counter from '../components/Counter';
import API_BASE_URL from '../utils/api.js';
import { members as fallbackMembersData, stats as fallbackStatsData } from '../data/placeholderData';
import { StatSkeleton, MemberSkeleton, CardSkeleton } from '../components/Skeleton';
import NewsCard from '../components/NewsCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();

  const [memberList, setMemberList] = useState([]);
  const [stats, setStats] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    Promise.all([
      fetch(`${API_BASE_URL}/members`).then(r => r.json()).catch(() => fallbackMembersData),
      fetch(`${API_BASE_URL}/stats`).then(r => r.json()).catch(() => fallbackStatsData),
      fetch(`${API_BASE_URL}/news-coverage`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE_URL}/videos`).then(r => r.json()).catch(() => []),
      fetch(`${API_BASE_URL}/gallery-images`).then(r => r.json()).catch(() => [])
    ]).then(([membersData, statsData, newsData, videosData, imagesData]) => {
      setMemberList(Array.isArray(membersData) && membersData.length > 0 ? membersData : fallbackMembersData);
      setStats(Array.isArray(statsData) && statsData.length > 0 ? statsData : fallbackStatsData);
      setNewsList(Array.isArray(newsData) ? newsData : []);
      setVideoList(Array.isArray(videosData) ? videosData : []);
      setImageList(Array.isArray(imagesData) ? imagesData : []);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching about data:', err);
      setMemberList([]);
      setStats([]);
      setNewsList([]);
      setVideoList([]);
      setImageList([]);
      setLoading(false);
    });
  }, []);

  const displayMembers = memberList;

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {t('about.title')}
          </h1>
          <div className="text-base text-gray-600 leading-relaxed space-y-1">
            <div className="font-bold text-lg">Registered Office: {t('common.address')} - {t('common.listYear')}</div>
            <div>Moradabad Correspondence: Apollo Laser Eye Hospital</div>
            <div>Hasanpur Correspondence: Dr Vinod Hospital</div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.missionTitle')}</h3>
            <p className="text-gray-600">
              {t('about.missionDesc')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.visionTitle')}</h3>
            <p className="text-gray-600">
              {t('about.visionDesc')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-accent/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.valuesTitle')}</h3>
            <p className="text-gray-600">
              {t('about.valuesDesc')}
            </p>
          </motion.div>
        </div>

        {/* Dynamic Stats Section */}
        {((loading && stats.length === 0) || stats.length > 0) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 py-16 bg-white rounded-[3rem] shadow-sm border border-gray-50"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
              {loading ? (
                Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
              ) : stats.map((stat, index) => (
                <Counter 
                  key={stat._id || stat.id || index} 
                  value={stat.value} 
                  label={i18n.language === 'en' ? stat.label : (stat.labelHindi || stat.label)} 
                  suffix={stat.suffix} 
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img
              src="/images/eye_camp.png"
              alt="Medical camp in action"
              className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-heading text-3xl font-bold text-text mb-6">{t('about.journeyTitle')}</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>{t('about.journeyP1')}</p>
              <p>{t('about.journeyP2')}</p>
              <p>{t('about.journeyP3')}</p>
            </div>
          </motion.div>
        </div>

        {/* Video Gallery Section */}
        {videoList.length > 0 && (
          <div className="mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold text-text mb-4">
                {i18n.language === 'en' ? 'Video Gallery' : 'वीडियो गैलरी'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'en' 
                  ? "Watch moments from our initiatives and the impact we create together."
                  : "हमारी पहलों के क्षण और हमारे द्वारा बनाए गए प्रभाव को देखें।"}
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl shadow-xl aspect-video bg-gray-900 relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={currentVideoIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <video 
                        src={videoList[currentVideoIndex]?.videoUrl} 
                        className="w-full h-full object-contain" 
                        controls 
                        preload="none"
                        poster={videoList[currentVideoIndex]?.videoUrl.replace('.mp4', '.jpg').replace('.mov', '.jpg')}
                      />
                    </motion.div>
                 </AnimatePresence>
              </div>

              {videoList.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentVideoIndex((prev) => (prev === 0 ? videoList.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentVideoIndex((prev) => (prev === videoList.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {videoList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentVideoIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentVideoIndex ? 'w-8 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <div className="text-center mt-6">
                 <h3 className="text-xl font-bold text-text mb-2">
                   {i18n.language === 'en' ? videoList[currentVideoIndex]?.title : (videoList[currentVideoIndex]?.titleHindi || videoList[currentVideoIndex]?.title)}
                 </h3>
                 <p className="text-gray-600">
                   {i18n.language === 'en' ? videoList[currentVideoIndex]?.description : (videoList[currentVideoIndex]?.descriptionHindi || videoList[currentVideoIndex]?.description)}
                 </p>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery Section */}
        {imageList.length > 0 && (
          <div className="mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold text-text mb-4">
                {i18n.language === 'en' ? 'Image Gallery' : 'छवि गैलरी'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'en' 
                  ? "A visual journey of our work and community impact."
                  : "हमारे काम और सामुदायिक प्रभाव की एक दृश्य यात्रा।"}
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl shadow-xl aspect-video bg-gray-900 relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={imageList[currentImageIndex]?.imageUrl} 
                        alt={imageList[currentImageIndex]?.title || 'Gallery Image'}
                        className="w-full h-full object-contain" 
                      />
                    </motion.div>
                 </AnimatePresence>
              </div>

              {imageList.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {imageList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'w-8 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <div className="text-center mt-6">
                 <h3 className="text-xl font-bold text-text mb-2">
                   {i18n.language === 'en' ? imageList[currentImageIndex]?.title : (imageList[currentImageIndex]?.titleHindi || imageList[currentImageIndex]?.title)}
                 </h3>
                 <p className="text-gray-600">
                   {i18n.language === 'en' ? imageList[currentImageIndex]?.description : (imageList[currentImageIndex]?.descriptionHindi || imageList[currentImageIndex]?.description)}
                 </p>
              </div>
            </div>
          </div>
        )}

        {/* News Coverage Section */}
        {(loading || newsList.length > 0) && (
          <div className="mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl font-bold text-text mb-4">
                {i18n.language === 'en' ? 'News Coverage' : 'समाचार कवरेज'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {i18n.language === 'en' 
                  ? "Highlighting our impact through the lens of media. Read about our journey and major medical camps."
                  : "मीडिया के लेंस के माध्यम से हमारे प्रभाव को उजागर करना। हमारी यात्रा और प्रमुख चिकित्सा शिविरों के बारे में पढ़ें।"}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />)
              ) : newsList.map((news, index) => (
                <motion.div
                  key={news._id || news.id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: index * 0.1 } }
                  }}
                >
                  <NewsCard news={news} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-text mb-4">{t('about.committeeTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('about.committeeSub')}
          </p>
        </motion.div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => <MemberSkeleton key={i} />)
          ) : displayMembers.map((member, index) => (
            <motion.div
              key={member._id || member.id || index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
              }}
            >
              <MemberCard member={member} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
