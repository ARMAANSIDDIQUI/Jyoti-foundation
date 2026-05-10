import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Calendar, Newspaper } from 'lucide-react';

const NewsCard = ({ news, onClick }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const title = currentLang === 'en' ? news.title : (news.titleHindi || news.title);
  const description = currentLang === 'en' ? news.description : (news.descriptionHindi || news.description);
  const date = news.date ? new Date(news.date).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="relative h-64 overflow-hidden group">
        <img
          src={news.imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{news.source || 'Media Coverage'}</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        
        <h3 className="font-heading text-xl font-bold text-text mb-3 leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-6">
            {description}
          </p>
        )}
        
        {news.link && (
          <div className="mt-auto">
            <a 
              href={news.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
            >
              Read Full Article →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NewsCard;
