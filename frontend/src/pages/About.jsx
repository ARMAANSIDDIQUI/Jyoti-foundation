import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, HeartHandshake } from 'lucide-react';
import MemberCard from '../components/MemberCard';
import Counter from '../components/Counter';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function About() {
  const [memberList, setMemberList] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_BASE_URL}/members`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_BASE_URL}/stats`).then(r => r.json())
    ]).then(([membersData, statsData]) => {
      setMemberList(Array.isArray(membersData) ? membersData : []);
      setStats(Array.isArray(statsData) ? statsData : []);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching about data:', err);
      setLoading(false);
    });
  }, []);

  const displayMembers = memberList;

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">About Jyoti Foundation</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Dedicated to illuminating lives through accessible, high-quality healthcare and compassionate community service.
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
            <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To eradicate preventable blindness and provide comprehensive, affordable healthcare to underserved communities.
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
            <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              A world where quality eye care and basic medical services are a right, not a privilege, accessible to everyone regardless of their socio-economic status.
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
            <h3 className="font-heading text-2xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-600">
              Compassion, Excellence, Integrity, and Community-first approach in every aspect of our medical and humanitarian work.
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
              {stats.map((stat) => (
                <Counter key={stat._id} value={stat.value} label={stat.label} suffix={stat.suffix} />
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
            <h2 className="font-heading text-3xl font-bold text-text mb-6">Our Journey</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Jyoti Foundation began its journey with a simple yet profound goal: to bring light into the lives of those suffering from curable eye diseases. What started as a small initiative has grown into a comprehensive healthcare network.
              </p>
              <p>
                Through the establishment of Apollo Laser Eye Hospital in Moradabad and Dr Vinod Hospital in Hasanpur, we have created permanent centers of excellence that serve thousands of patients annually.
              </p>
              <p>
                Beyond our hospital walls, our outreach programs and free medical camps venture deep into rural areas, ensuring that geographical distance and financial constraints do not prevent anyone from receiving necessary medical care.
              </p>
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
          <h2 className="font-heading text-3xl font-bold text-text mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who guide Jyoti Foundation's mission and operations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member, index) => (
            <motion.div
              key={member.id}
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
