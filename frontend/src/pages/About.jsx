import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, HeartHandshake } from 'lucide-react';
import MemberCard from '../components/MemberCard';
import Counter from '../components/Counter';
import API_BASE_URL from '../utils/api.js';
import { members as fallbackMembersData, stats as fallbackStatsData } from '../data/placeholderData';


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();

  const [memberList, setMemberList] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    Promise.all([
      fetch(`${API_BASE_URL}/members`).then(r => r.json()).catch(() => fallbackMembersData),
      fetch(`${API_BASE_URL}/stats`).then(r => r.json()).catch(() => fallbackStatsData)
    ]).then(([membersData, statsData]) => {
      setMemberList(Array.isArray(membersData) && membersData.length > 0 ? membersData : fallbackMembersData);
      setStats(Array.isArray(statsData) && statsData.length > 0 ? statsData : fallbackStatsData);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching about data:', err);
      setMemberList(fallbackMembersData);
      setStats(fallbackStatsData);
      setLoading(false);
    });
  }, []);



  const displayMembers = memberList;

  return (
    <div className="pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('common.address')} - {t('common.listYear')}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.missionTitle')}</h3>
            <p className="text-gray-600">
              {t('about.missionDesc')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.visionTitle')}</h3>
            <p className="text-gray-600">
              {t('about.visionDesc')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center"
          >
            <div className="w-16 h-16 bg-accent/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">{t('about.valuesTitle')}</h3>
            <p className="text-gray-600">
              {t('about.valuesDesc')}
            </p>
          </motion.div>
        </div>

        {/* Dynamic Stats Section */}
        {stats.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-24 py-16 bg-white rounded-[3rem] shadow-sm border border-gray-50"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
              {stats.map((stat, index) => (
                <Counter 
                  key={stat._id || stat.id || index} 
                  value={stat.value} 
                  label={i18n.language === 'en' ? stat.label : (stat.labelHindi || stat.label)} 
                  suffix={stat.suffix} 
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img
              src="/images/eye_camp.png"
              alt="Medical camp in action"
              className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-heading text-3xl font-bold text-text mb-6">{t('about.journeyTitle')}</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>{t('about.journeyP1')}</p>
              <p>{t('about.journeyP2')}</p>
              <p>{t('about.journeyP3')}</p>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-text mb-4">{t('about.committeeTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('about.committeeSub')}
          </p>
        </motion.div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member._id || member.id || index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
              }}
            >
              <MemberCard member={member} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
