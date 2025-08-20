import React from 'react';

export interface Creator {
  id: string;
  name: string;
  role: string;
  bio: string;
  profile_image: string;
  specializations: string[];
  years_experience: number;
  signature_style: string;
  featured_works: Array<{
    title: string;
    image_url: string;
    description: string;
  }>;
  contact_preference: string;
  is_available: boolean;
}

interface CreatorCardProps {
  creator: Creator;
  onViewProfile: (creator: Creator) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onViewProfile }) => {
  return (
    <div className="creator-card" onClick={() => onViewProfile(creator)}>
      <img src={creator.profile_image} alt={creator.name} className="creator-image" />
      <div className="creator-info">
        <h3 className="creator-name">{creator.name}</h3>
        <p className="creator-role">{creator.role}</p>
        <p className="creator-bio">{creator.bio.substring(0, 100)}...</p>
        <div className="specializations">
          {creator.specializations.slice(0, 3).map((spec, index) => (
            <span key={index} className="specialization-tag">
              {spec}
            </span>
          ))}
          {creator.specializations.length > 3 && (
            <span className="specialization-tag">
              +{creator.specializations.length - 3}
            </span>
          )}
        </div>
        <div className="creator-stats">
          <span>{creator.years_experience} years</span>
          <span>{creator.is_available ? 'Available' : 'Unavailable'}</span>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;