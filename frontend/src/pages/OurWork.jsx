import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Play, Youtube, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WorkCard from '../components/WorkCard';

export default function OurWork() {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fallbackProjects = [
      { _id: '1', name: 'Free Eye Camp - Moradabad', nameHindi: 'नि:शुल्क नेत्र शिविर - मुरादाबाद', category: 'Medical Camp', location: 'Moradabad', description: 'Annual free eye screening and cataract surgery camp.', images: [] },
      { _id: '2', name: 'Rural Outreach Program', nameHindi: 'ग्रामीण आउटरीच कार्यक्रम', category: 'Outreach', location: 'Hasanpur', description: 'Healthcare services delivered to remote rural areas.', images: [] }
    ];

    Promise.all([
      fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`).then(res => res.json()).catch((err) => { console.error('Error fetching projects:', err); return fallbackProjects; }),
      fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`).then(res => res.json()).catch((err) => { console.error('Error fetching categories:', err); return [{ name: 'Medical Camp' }, { name: 'Outreach' }]; })
    ])
      .then(([projectsData, categoriesData]) => {
        setProjects(Array.isArray(projectsData) && projectsData.length > 0 ? projectsData : fallbackProjects);
        setCategories(Array.isArray(categoriesData) ? categoriesData : [{ name: 'Medical Camp' }, { name: 'Outreach' }]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching work data:', err);
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);


  const dynamicFilters = ['All', ...categories.map(cat => cat.name)];
  const filteredWork = activeFilter === 'All'
    ? projects
    : projects.filter(work => (work.category) === activeFilter);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const projectImages = selectedProject?.images && selectedProject.images.length > 0 ? selectedProject.images : ['/images/eye_camp.png'];

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {t('ourWork.title')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('ourWork.subtitle')}
          </p>
        </motion.div>


        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {dynamicFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${activeFilter === filter ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {filter === 'All' ? t('ourWork.all') : filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWork.map((work) => (
              <motion.div key={work._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <WorkCard work={work} onOpen={() => setSelectedProject(work)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWork.length === 0 && <div className="text-center py-20 text-gray-500 font-medium">{t('ourWork.noResults')}</div>}

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] p-3">
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all z-20"><X className="w-6 h-6" /></button>
              <div className="flex flex-col lg:flex-row overflow-y-auto overflow-x-hidden custom-scrollbar bg-gray-50 rounded-[2rem] overflow-hidden grow">


                {/* Visual Section (Carousel/Video) */}
                <div className="lg:w-3/5 bg-gray-900 aspect-video lg:aspect-auto relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSlideIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                      <img src={projectImages[currentSlideIndex]} className="w-full h-full object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  
                  {projectImages.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                      <button onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex((currentSlideIndex - 1 + projectImages.length) % projectImages.length); }} className="p-3 bg-black/30 rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all"><ChevronLeft className="w-6 h-6" /></button>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex((currentSlideIndex + 1) % projectImages.length); }} className="p-3 bg-black/30 rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all"><ChevronRight className="w-6 h-6" /></button>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {projectImages.map((_, i) => (
                      <button key={i} onClick={() => setCurrentSlideIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlideIndex ? 'bg-primary w-8' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col h-full overflow-y-auto custom-scrollbar">

                  <div className="mb-6 flex items-center gap-3">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{selectedProject.category}</span>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium"><MapPin className="w-4 h-4" /> {isHindi ? (selectedProject.locationHindi || selectedProject.location) : selectedProject.location}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-text mb-6">
                    {isHindi ? (selectedProject.nameHindi || selectedProject.name) : selectedProject.name}
                  </h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                    <p>{isHindi ? (selectedProject.descriptionHindi || selectedProject.description) : selectedProject.description}</p>
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 italic flex gap-4">
                      <Info className="w-6 h-6 text-primary shrink-0" />
                      <p className="text-base">{isHindi ? (selectedProject.detailsHindi || selectedProject.details) : selectedProject.details}</p>
                    </div>
                    
                    {/* Dynamic Video Section */}
                    {(selectedProject.videoUrl || selectedProject.youtubeUrl) && (
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-text mb-4 flex items-center gap-2"><Play className="w-5 h-5 text-primary" /> {t('ourWork.videoTitle')}</h4>

                        {selectedProject.youtubeUrl ? (
                          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-4">
                            <iframe width="100%" height="100%" src={getYoutubeEmbedUrl(selectedProject.youtubeUrl)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                        ) : selectedProject.videoUrl && (
                          <video controls className="w-full rounded-2xl shadow-lg mb-4 overflow-hidden"><source src={selectedProject.videoUrl} type="video/mp4" /></video>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
