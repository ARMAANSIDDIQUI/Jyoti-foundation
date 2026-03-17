import { MapPin, Phone, MessageSquare } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={hospital.image} 
          alt={hospital.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {hospital.type}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-heading text-2xl font-bold text-text mb-4">{hospital.name}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {hospital.description}
        </p>
        <div className="space-y-4 pt-6 border-t border-gray-50">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span>{hospital.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone className="w-5 h-5 text-primary shrink-0" />
            <span>{hospital.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MessageSquare className="w-5 h-5 text-primary shrink-0" />
            <span>{hospital.services}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
