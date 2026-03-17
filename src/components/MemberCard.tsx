import { motion } from 'motion/react';

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    description: string;
    photo: string;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 text-center"
    >
      <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-background">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <h3 className="font-heading text-xl font-bold text-text mb-1">
        {member.name}
      </h3>
      <p className="text-primary font-medium text-sm mb-4">
        {member.role}
      </p>
      <p className="text-gray-600 text-sm leading-relaxed">
        {member.description}
      </p>
    </motion.div>
  );
}
