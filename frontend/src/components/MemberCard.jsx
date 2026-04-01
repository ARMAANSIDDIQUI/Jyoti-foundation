import { useTranslation } from 'react-i18next';

export default function MemberCard({ member }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const displayName = isHindi && member.nameHindi ? member.nameHindi : member.name;
  const displayPost = isHindi && member.postHindi ? member.postHindi : (member.post || member.role);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 text-center group hover:shadow-md transition-all duration-300">
      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100 ring-4 ring-gray-50 group-hover:ring-primary/10 transition-all">
        <img 
          src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
          alt={displayName} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-heading font-bold text-text mb-1">{displayName}</h3>
      <p className="text-primary text-sm font-medium">{displayPost}</p>
    </div>
  );
}

