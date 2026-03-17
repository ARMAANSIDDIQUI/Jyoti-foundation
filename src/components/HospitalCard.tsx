import { motion } from 'motion/react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HospitalCardProps {
  hospital: {
    id: number;
    name: string;
    location: string;
    address: string;
    description: string;
    services: string[];
    image: string;
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 flex flex-col h-full"
    >
      <div className="h-64 overflow-hidden relative">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {hospital.location}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-heading text-2xl font-bold text-text mb-2">
          {hospital.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex items-start gap-2">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          {hospital.address}
        </p>
        <p className="text-gray-600 mb-6 line-clamp-3">
          {hospital.description}
        </p>
        
        <div className="mb-8 flex-grow">
          <h4 className="font-semibold text-text mb-3">Key Services:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hospital.services.slice(0, 4).map((service, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span className="line-clamp-1">{service}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link
          to="/contact"
          className="inline-flex justify-center items-center w-full bg-background text-primary hover:bg-primary hover:text-white font-medium py-3 rounded-xl transition-colors"
        >
          Contact Hospital
        </Link>
      </div>
    </motion.div>
  );
}
