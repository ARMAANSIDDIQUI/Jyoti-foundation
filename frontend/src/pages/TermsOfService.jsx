import React from 'react';
import { motion } from 'motion/react';

import { formatDate } from '../utils/date';

export default function TermsOfService() {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
        >
          <h1 className="font-heading text-3xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>Last updated: {formatDate(new Date())}</p>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the Jyoti Foundation website, you agree to be bound by these Terms of Service.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">2. Use of the Site</h2>
              <p>You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the site.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">3. Donations</h2>
              <p>All donations made through our site are voluntary and non-refundable. We use secure third-party payment processors for all financial transactions.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">4. Intellectual Property</h2>
              <p>The content on this site is owned by Jyoti Foundation and is protected by copyright and other intellectual property laws.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
