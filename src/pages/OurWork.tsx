import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WorkCard from '../components/WorkCard';
import { workActivities } from '../data/placeholderData';

const filters = ['All', 'Eye Camps', 'Surgeries', 'Awareness', 'Community Health Programs'];

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredWork = activeFilter === 'All' 
    ? workActivities 
    : workActivities.filter(work => work.category === activeFilter);

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">Our Impact in Action</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our recent initiatives, medical camps, and community outreach programs that are making a tangible difference.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWork.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <WorkCard work={work} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredWork.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No activities found for this category.
          </div>
        )}

      </div>
    </div>
  );
}
