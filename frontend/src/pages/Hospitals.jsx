import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Clock, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../utils/api.js';

export default function Hospitals() {
  const { t } = useTranslation();
  const [hospitalImages, setHospitalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/hospital-images`)
      .then(r => r.json())
      .then(data => {
        setHospitalImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching hospital images:', err);
        setLoading(false);
      });
  }, []);

  const hospitals = [
    {
      id: 'apollo',
      name: 'Apollo Laser Eye Hospital',
      phone: '+91 94122 36889',
      location: 'Moradabad, UP',
      address: 'Apollo Laser Eye Hospital, Moradabad, Uttar Pradesh, India',
      timing: 'Monday - Saturday: 10:00 AM - 6:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.7211898002624!2d78.7604002755087!3d28.847159675548237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afbe46c3994fb%3A0x85185eae8b4b93e4!2sApollo%20Laser%20Eye%20Hospital%20-%20Eye%20Hospital%20%2F%20Doctor%2F%20Dr.Pallav%20Agarwal%20%2F%20Specialist%20in%20Moradabad!5e0!3m2!1sen!2sin!4v1773754075712!5m2!1sen!2sin',
      insta: 'https://www.instagram.com/apolloeyecare?igsh=MWdkcmFwdjQ4MzNzZQ==',
      facebook: 'https://facebook.com/share/18RGM3WPeu/',
      website: 'https://drpallaveye.com/'
    },
    {
      id: 'dr-vinod',
      name: 'Dr Vinod Hospital',
      phone: '+91 94106 77222',
      location: 'Hasanpur, UP',
      address: 'Mohalla Kayasthan, Hasanpur (Amroha), UP',
      timing: '24/7 Emergency Services Available',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8245046487064!2d78.27934337550421!3d28.72479027561453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b72a89e5286d5%3A0xa0c8cc344952f611!2sDr%20Vinod%20Hospital!5e0!3m2!1sen!2sin!4v1773754047641!5m2!1sen!2sin',
      insta: 'https://www.instagram.com/drvinod_hospital_6889?igsh=MW1taHIxeW1iZnlmNg=='
    }
  ];

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">Our Hospitals</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            World-class medical facilities providing comprehensive care and serving as operational bases for the Jyoti Foundation.
          </p>
        </motion.div>

        <div className="space-y-24">
          {hospitals.map((hospital, idx) => (
            <motion.div 
              key={hospital.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Details Column */}
              <div className="flex-1 space-y-8">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-full text-sm mb-4">
                    {hospital.location}
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">{hospital.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    {hospital.address}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Phone className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-bold text-text mb-1">Phone</h4>
                    <a href={`tel:${hospital.phone.replace(/\\s+/g, '')}`} className="text-gray-600 hover:text-primary transition-colors">{hospital.phone}</a>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <Clock className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-bold text-text mb-1">Timing</h4>
                    <p className="text-gray-600">{hospital.timing}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                  {hospital.website && (
                    <a href={hospital.website} target="_blank" rel="noreferrer" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
                      Visit Website
                    </a>
                  )}
                  {hospital.facebook && (
                    <a href={hospital.facebook} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#1877F2]/10 text-[#1877F2] font-bold rounded-xl hover:bg-[#1877F2] hover:text-white transition-colors flex items-center gap-2">
                      <Facebook className="w-5 h-5" /> Facebook
                    </a>
                  )}
                  {hospital.insta && (
                    <a href={hospital.insta} target="_blank" rel="noreferrer" className="px-6 py-3 bg-pink-50 text-pink-600 font-bold rounded-xl hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all flex items-center gap-2">
                      <Instagram className="w-5 h-5" /> Instagram
                    </a>
                  )}
                </div>
              </div>

              {/* Map & Images Column */}
              <div className="flex-1 space-y-6">
                <div className="bg-gray-100 rounded-3xl h-80 overflow-hidden shadow-lg border border-gray-200">
                  <iframe 
                    title={hospital.name}
                    src={hospital.mapUrl}
                    className="w-full h-full border-0" 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>

                {/* Hospital Images Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 rounded-2xl aspect-square"></div>
                    ))
                  ) : hospitalImages.filter(img => img.hospitalId === hospital.id).map(img => (
                    <div key={img._id} className="relative group rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-100">
                      <img src={img.imageUrl} alt={hospital.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
