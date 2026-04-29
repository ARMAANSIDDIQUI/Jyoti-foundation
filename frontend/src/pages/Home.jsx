import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse, Heart } from 'lucide-react';
import Counter from '../components/Counter';
import HospitalCard from '../components/HospitalCard';
import WorkCard from '../components/WorkCard';
import { hospitals, workActivities, stats as fallbackStats } from '../data/placeholderData';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../utils/api.js';
import { StatSkeleton, CardSkeleton } from '../components/Skeleton';
import Loader from '../components/Loader';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const { t, i18n } = useTranslation();

  const [stats, setStats] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [hospitalImages, setHospitalImages] = useState([]);

  useEffect(() => {
    // Fetch stats
    fetch(`${API_BASE_URL}/stats`)
      .then(r => r.json())
      .then(data => setStats(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching stats:', err);
        setStats([]);
      })
      .finally(() => setLoadingStats(false));

    // Fetch projects for initiatives
    fetch(`${API_BASE_URL}/projects`)
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjects([]);
      })
      .finally(() => setLoadingProjects(false));

    // Fetch hero slides
    fetch(`${API_BASE_URL}/hero`)
      .then(r => r.json())
      .then(data => setHeroSlides(Array.isArray(data) && data.length > 0 ? data : []))
      .catch(err => console.error('Error fetching hero slides:', err))
      .finally(() => setLoadingHero(false));

    // Fetch hospital images
    fetch(`${API_BASE_URL}/hospital-images`)
      .then(r => r.json())
      .then(data => setHospitalImages(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching hospital images:', err));
  }, []);



  // Auto-play carousel
  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center pt-8 pb-16 lg:py-0 overflow-hidden">
        {/* Background shapes - More distinct bluish dark */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-[#3A86FF]/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-[#8EC5FC]/40 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              {/* <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-primary font-medium text-sm mb-6">
                <HeartPulse className="w-4 h-4" />
                {t('common.nav.home')}
              </motion.div> */}
              <motion.h1 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-text leading-[1.1] mb-6 tracking-tight">
                {t('common.organizationName')} <br />
                <span className="text-primary italic animate-pulse-slow">{t('home.heroSuffix')}</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('common.address')} - {t('common.listYear')}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/donate"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl sm:rounded-full font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  {t('common.nav.donate')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/our-work"
                  className="bg-white hover:bg-gray-50 text-text border border-gray-200 px-8 py-4 rounded-2xl sm:rounded-full font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {t('home.exploreWork')}
                </Link>
              </motion.div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-[600px]"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3] bg-gray-100">
                <AnimatePresence>
                  {loadingHero ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <Loader />
                    </div>
                  ) : heroSlides.length > 0 ? (
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide]?.image}
                      alt={heroSlides[currentSlide]?.title || "Hero Image"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <motion.img
                      key="default"
                      src="/images/hero_banner.png"
                      alt="Doctor examining patient"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                
                {/* Carousel Indicators */}
                {heroSlides.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === i ? "bg-white w-6" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 hidden md:block z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
                    25+
                  </div>
                  <div>
                    <div className="font-bold text-text">{t('home.yearsService')}</div>
                    <div className="text-sm text-gray-500">{t('home.sinceYear')}</div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-12 z-30 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-[0_32px_64px_-16px_rgba(30,58,138,0.15)] overflow-hidden relative"
          >
            {/* Background pattern for stats */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {loadingStats ? (
                Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
              ) : stats.map((stat, i) => (
                <Counter 
                  key={i}
                  value={stat.value ? String(stat.value).replace(/[^0-9]/g, '') : '0'} 
                  label={stat.label}
                  suffix={stat.suffix || '+'}
                  duration={2}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospitals Section - Correctly Labeled as Medical Centers */}

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">{t('footer.hospitals')}</h2>
            <p className="text-gray-600 text-lg">
              {t('home.hospitalsDesc')}
            </p>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {hospitals.map((hospital, index) => {
              const dbImages = hospitalImages.filter(img => img.hospitalId === hospital.id).map(img => img.imageUrl);
              const hospitalWithDynamicImage = {
                ...hospital,
                images: dbImages.length > 0 ? dbImages : [hospital.image]
              };
              return (
                <motion.div
                  key={hospital.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
                  }}
                >
                  <HospitalCard hospital={hospitalWithDynamicImage} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Work Section - Swapped to fetch from projects */}
      {(loadingProjects || projects.length > 0) && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="max-w-2xl"
              >
                <h2 className="font-heading text-4xl font-bold text-text mb-4">{t('common.nav.projects')}</h2>
                <p className="text-gray-600 text-lg">
                  {t('home.projectsDesc')}
                </p>

              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Link
                  to="/our-work"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  {t('home.viewAllProjects')} <ArrowRight className="w-5 h-5" />
                </Link>

              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loadingProjects ? (
                Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)
              ) : projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                  }}
                >
                  <WorkCard work={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Premium CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Animated Background Blobs for depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px] -z-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/60 backdrop-blur-2xl border-2 border-white/80 rounded-3xl md:rounded-[4rem] p-8 sm:p-16 md:p-20 shadow-[0_40px_80px_-15px_rgba(30,58,138,0.25)] overflow-hidden text-center"
          >
            {/* Subtle light streak for glass effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative z-10"
            >
              <motion.h2 variants={fadeInUp} className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] mb-6 md:mb-8 leading-[1.1] tracking-tight">
                {t('home.ctaTitle1')} <span className="text-primary italic">{t('home.ctaTitle2')}</span> <br className="hidden md:block" /> {t('home.ctaTitle3')}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#374151] text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                {t('common.organizationName')} - {t('common.address')}
              </motion.p>


              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <Link
                  to="/donate"
                  className="group w-full sm:w-auto bg-primary text-white hover:bg-primary/90 px-8 py-4 sm:px-12 sm:py-5 rounded-2xl font-black text-lg sm:text-xl transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Heart className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
                  {t('common.nav.donate')}
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-white/80 backdrop-blur-md text-[#111827] border border-gray-100 px-8 py-4 sm:px-12 sm:py-5 rounded-2xl font-black text-lg sm:text-xl hover:bg-white hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center"
                >
                  {t('home.getInvolved')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
