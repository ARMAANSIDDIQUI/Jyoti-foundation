import React, { useState } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

export default function WorkCard({ work, onOpen }) {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const displayName = isHindi && work.nameHindi ? work.nameHindi : (work.title || work.name);
  const displayDesc = isHindi && work.descriptionHindi ? work.descriptionHindi : (work.description || work.details);
  const displayLoc = isHindi && work.locationHindi ? work.locationHindi : work.location;

  const images = work.images && work.images.length > 0 ? work.images : ['/images/eye_camp.png'];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      onClick={() => onOpen(work)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={displayName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full text-text opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full text-text opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentImageIndex ? 'bg-primary' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}

        {(work.videoUrl || work.youtubeUrl) && (
          <div className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg">
            <Play className="w-4 h-4 fill-current" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {work.category || t('ourWork.initiative')}
          </span>
        </div>

      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-text mb-3 line-clamp-2 text-lg">{displayName}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
          {displayDesc}
        </p>
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5 font-medium text-primary">
            <MapPin className="w-3.5 h-3.5" />
            <span>{displayLoc}</span>
          </div>
          <button className="text-primary font-bold hover:underline">{t('ourWork.viewDetails')}</button>
        </div>

      </div>
    </div>
  );
}
