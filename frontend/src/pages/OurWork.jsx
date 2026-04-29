import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import WorkCard from '../components/WorkCard';
import API_BASE_URL from '../utils/api.js';
import { workActivities as fallbackProjectsData } from '../data/placeholderData';
import { CardSkeleton } from '../components/Skeleton';
import Loader from '../components/Loader';

export default function OurWork() {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/projects`).then(res => res.json()).catch((err) => { console.error('Error fetching projects:', err); return fallbackProjectsData; }),
      fetch(`${API_BASE_URL}/categories`).then(res => res.json()).catch((err) => { console.error('Error fetching categories:', err); return []; })
    ])
      .then(([projectsData, categoriesData]) => {
        setProjects(Array.isArray(projectsData) && projectsData.length > 0 ? projectsData : fallbackProjectsData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching work data:', err);
        setProjects(fallbackProjectsData);
        setLoading(false);
      });
  }, []);


  const dynamicFilters = ['All', ...categories.map(cat => cat.name)];
  const filteredWork = activeFilter === 'All'
    ? projects
    : projects.filter(work => (work.category) === activeFilter);



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
          {loading ? (
            Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredWork.map((work) => (
                <motion.div key={work._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                  <WorkCard work={work} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {filteredWork.length === 0 && <div className="text-center py-20 text-gray-500 font-medium">{t('ourWork.noResults')}</div>}

      </div>

    </div>
  );
}
