import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse } from 'lucide-react';
import Counter from '../components/Counter';
import HospitalCard from '../components/HospitalCard';
import WorkCard from '../components/WorkCard';
import { hospitals, workActivities } from '../data/placeholderData';
import { useState, useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/stats`)
      .then(r => r.json())
      .then(data => setStats(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 pb-32 lg:pt-12 lg:pb-40 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-primary font-medium text-sm mb-6">
                <HeartPulse className="w-4 h-4" />
                Non-Profit Healthcare Foundation
              </motion.div>
              <motion.h1 variants={fadeInUp} className="font-heading text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
                Bringing Light Through <span className="text-primary">Compassionate</span> Healthcare
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8 leading-relaxed">
                Jyoti Foundation works to provide accessible eye care and community healthcare through hospitals, medical camps, and humanitarian outreach programs.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  to="/donate"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  Donate Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/our-work"
                  className="bg-white hover:bg-gray-50 text-text border border-gray-200 px-8 py-4 rounded-full font-medium transition-all shadow-sm flex items-center gap-2"
                >
                  Explore Our Work
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative lg:ml-auto"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/images/hero_banner.png"
                  alt="Doctor examining patient"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
                    25+
                  </div>
                  <div>
                    <div className="font-bold text-text">Years of Service</div>
                    <div className="text-sm text-gray-500">Since 1997</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <Counter key={stat._id} value={stat.value} label={stat.label} suffix={stat.suffix} />
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Our Hospitals</h2>
            <p className="text-gray-600 text-lg">
              Providing world-class healthcare facilities to communities in need through our dedicated medical centers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 } }
                }}
              >
                <HospitalCard hospital={hospital} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-2xl"
            >
              <h2 className="font-heading text-4xl font-bold text-text mb-4">Recent Initiatives</h2>
              <p className="text-gray-600 text-lg">
                Discover how we're making a difference in communities through our various healthcare programs and camps.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Link
                to="/our-work"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                View All Work <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workActivities.slice(0, 4).map((work, index) => (
              <motion.div
                key={work.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
                }}
              >
                <WorkCard work={work} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-20" />
        <div className="absolute inset-0 bg-[url('/images/volunteers.png')] bg-cover bg-center opacity-10 mix-blend-overlay -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Your Support Can Restore Vision and Transform Lives
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-100 text-lg md:text-xl mb-10 text-white/90">
              Every contribution helps us reach more people in need of critical eye care and medical attention. Join our mission today.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/donate"
                className="inline-block bg-white text-primary hover:bg-gray-50 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Donate Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
