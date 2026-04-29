import { MapPin, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function HospitalCard({ hospital }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [currentImg, setCurrentImg] = useState(0);

  const displayName = isHindi && hospital.nameHindi ? hospital.nameHindi : hospital.name;
  const displayDesc = isHindi && hospital.descriptionHindi ? hospital.descriptionHindi : hospital.description;
  const displayLoc = isHindi && hospital.locationHindi ? hospital.locationHindi : hospital.location;

  const images = hospital.images && hospital.images.length > 0 ? hospital.images : [hospital.image];

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100 group/slider">
        <img 
          src={images[currentImg]} 
          alt={displayName} 
          className="w-full h-full object-cover transition-all duration-500"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.preventDefault(); setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setCurrentImg(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImg === i ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {isHindi && hospital.typeHindi ? hospital.typeHindi : hospital.type}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-heading text-2xl font-bold text-text mb-4">{displayName}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {displayDesc}
        </p>
        <div className="space-y-4 pt-6 border-t border-gray-50">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span>{displayLoc}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <span>{hospital.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone className="w-5 h-5 text-primary shrink-0 rotate-90" />
            <span>{isHindi && hospital.servicesHindi ? hospital.servicesHindi : hospital.services}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

