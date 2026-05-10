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
import { formatDate } from '../utils/date';

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
  const [selectedNews, setSelectedNews] = useState(null);

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
                  <NewsCard news={news} onClick={() => setSelectedNews(news)} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* News Modal */}
        <AnimatePresence>
          {selectedNews && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedNews(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="relative h-64 sm:h-80 w-full shrink-0">
                  <img
                    src={selectedNews.imageUrl}
                    alt={i18n.language === 'en' ? selectedNews.title : (selectedNews.titleHindi || selectedNews.title)}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedNews.source || 'Media Coverage'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedNews.date)}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-4 leading-tight">
                    {i18n.language === 'en' ? selectedNews.title : (selectedNews.titleHindi || selectedNews.title)}
                  </h3>
                  <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap">
                    {i18n.language === 'en' ? selectedNews.description : (selectedNews.descriptionHindi || selectedNews.description)}
                  </div>
                  {selectedNews.link && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <a 
                        href={selectedNews.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                      >
                        Read Full Article
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
