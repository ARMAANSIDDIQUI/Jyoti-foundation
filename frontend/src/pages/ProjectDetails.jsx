import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Play, Info, ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { generateSlug } from '../utils/slugify';
import API_BASE_URL from '../utils/api.js';
import Loader from '../components/Loader';

// Animation variants
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

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure page starts at top
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(p => generateSlug(p.name) === slug);
          setProject(found || null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching project:', err);
        setLoading(false);
      });
  }, [slug]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader fullScreen />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-4xl font-heading font-black text-text mb-6">{t('ourWork.noResults')}</h2>
        <button
          onClick={() => navigate('/our-work')}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.nav.ourWork')}
        </button>
      </div>
    );
  }

  const projectImages = project.images && project.images.length > 0 ? project.images : ['/images/hero_banner.png'];
  const name = isHindi ? (project.nameHindi || project.name) : project.name;
  const description = isHindi ? (project.descriptionHindi || project.description) : project.description;
  const details = isHindi ? (project.detailsHindi || project.details) : project.details;
  const location = isHindi ? (project.locationHindi || project.location) : project.location;
  const category = isHindi ? (project.categoryHindi || project.category) : project.category;

  const createdDate = project.createdAt ? new Date(project.createdAt).toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">

      {/* Full-bleed Hero Section */}
      <section className="relative h-[95vh] min-h-[600px] w-full flex items-end">
        <div className="absolute inset-0">
          <img
            src={projectImages[0]}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20">
          <button
            onClick={() => navigate('/our-work')}
            className="group flex items-center gap-2 text-white/80 hover:text-white font-medium mb-8 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Our Work
          </button>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-primary/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                {category}
              </span>
              <div className="flex items-center gap-2 text-gray-200 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-primary" /> {location}
              </div>
              {createdDate && (
                <div className="flex items-center gap-2 text-gray-200 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-primary" /> {createdDate}
                </div>
              )}
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-heading text-5xl lg:text-7xl font-black text-white leading-[1.1] drop-shadow-lg">
              {name}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Main article body */}
          <div className="lg:col-span-8 space-y-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-3xl font-heading font-bold text-text mb-6">{t('about.visionTitle') || 'Overview'}</h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                {description}
              </p>
            </motion.div>

            {details && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Info className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-text">Project Details</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-loose">
                    {details}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Video Coverage - if exists */}
            {(project.youtubeUrl || project.videoUrl) && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="flex items-center gap-3 mb-8">
                  <Play className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-heading font-bold text-text">Video Coverage</h2>
                </div>

                {project.youtubeUrl ? (
                  <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
                    <iframe width="100%" height="100%" src={getYoutubeEmbedUrl(project.youtubeUrl)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                ) : project.videoUrl && (
                  <video controls className="w-full rounded-[2rem] shadow-2xl border-8 border-white bg-gray-100 overflow-hidden outline-none aspect-video object-cover">
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                )}
              </motion.div>
            )}

            {/* Gallery Section */}
            {projectImages.length > 1 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="flex items-center gap-3 mb-8">
                  <ImageIcon className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-heading font-bold text-text">Gallery</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectImages.slice(1).map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`relative rounded-3xl overflow-hidden shadow-lg aspect-square ${idx === 2 && projectImages.length % 2 === 0 ? 'md:col-span-2 aspect-video' : ''}`}
                    >
                      <img src={img} alt={`${name} - Gallery image ${idx + 2}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 sticky top-32"
            >
              <div className="mb-8">
                <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Category</h3>
                <div className="text-xl font-bold text-text">{category}</div>
              </div>

              <hr className="border-gray-100 my-6" />

              <div className="mb-8">
                <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Location</h3>
                <div className="flex items-center gap-2 text-xl font-bold text-text">
                  <MapPin className="w-5 h-5 text-primary" />
                  {location}
                </div>
              </div>

              {createdDate && (
                <>
                  <hr className="border-gray-100 my-6" />
                  <div>
                    <h3 className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">Date Added</h3>
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-700">
                      <Calendar className="w-5 h-5 text-primary" />
                      {createdDate}
                    </div>
                  </div>
                </>
              )}

              <div className="mt-12 bg-primary/5 rounded-3xl p-6 text-center border border-primary/10">
                <h4 className="font-heading font-bold text-text mb-3">Support this cause</h4>
                <p className="text-sm text-gray-600 mb-6">Your contribution helps us expand our reach and deliver care to those who need it most.</p>
                <button onClick={() => navigate('/donate')} className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-colors">
                  Donate Now
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
