import React from 'react';
import { Creator } from './CreatorCard';

interface CreatorModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
}

const CreatorModal: React.FC<CreatorModalProps> = ({ creator, isOpen, onClose }) => {
  if (!isOpen || !creator) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Creator Profile</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="creator-detail-header">
            <img src={creator.profile_image} alt={creator.name} className="creator-detail-image" />
            <div className="creator-detail-info">
              <h2>{creator.name}</h2>
              <p>{creator.role}</p>
              <p className="creator-detail-bio">{creator.bio}</p>
              <div className="detail-stats">
                <div className="stat-item">
                  <div className="stat-value">{creator.years_experience}</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{creator.specializations.length}</div>
                  <div className="stat-label">Specializations</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{creator.featured_works.length}</div>
                  <div className="stat-label">Featured Works</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="featured-works">
            <h3>Featured Works</h3>
            <div className="works-grid">
              {creator.featured_works.map((work, index) => (
                <div className="work-item" key={index}>
                  <img src={work.image_url} alt={work.title} className="work-image" />
                  <div className="work-info">
                    <h4 className="work-title">{work.title}</h4>
                    <p className="work-description">{work.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorModal;