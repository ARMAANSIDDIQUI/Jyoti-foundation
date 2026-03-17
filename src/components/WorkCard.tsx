import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

interface WorkCardProps {
  work: {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    location: string;
    image: string;
  };
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 flex flex-col h-full group"
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-800">
          {work.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
          {work.title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
          {work.description}
        </p>
        
        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-primary" />
            {work.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-primary" />
            {work.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
