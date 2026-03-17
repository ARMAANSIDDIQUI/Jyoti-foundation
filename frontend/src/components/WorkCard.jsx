import { Calendar, MapPin } from 'lucide-react';

export default function WorkCard({ work }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={work.image || (work.images && work.images[0]) || '/images/eye_camp.png'} 
          alt={work.title || work.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {work.category || 'Initiative'}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-text mb-3 line-clamp-2">{work.title || work.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
          {work.description}
        </p>
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{work.date || 'Recent'}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-primary">
            <MapPin className="w-3.5 h-3.5" />
            <span>{work.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
