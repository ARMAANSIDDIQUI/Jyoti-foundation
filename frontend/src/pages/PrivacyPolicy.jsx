import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
        >
          <h1 className="font-heading text-3xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us through our contact form and donation processes, including your name, email address, phone number, and any other information you choose to provide.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to communicate with you, process donations, and send you updates about our programs and initiatives if you have opted in to receive them.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">3. Data Security</h2>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-text mb-4">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at jyotifoundation@gmail.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
