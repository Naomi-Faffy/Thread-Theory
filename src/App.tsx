import React, { useState, useEffect } from 'react';
import './App.css';
import CreatorCard from './components/CreatorCard';
import CreatorModal from './components/CreatorModal';

// Define the Creator interface
interface Creator {
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

// Fallback creator data
const fallbackCreators: Creator[] = [
  {
    id: "1",
    name: "Isabella Rose Martinez",
    role: "Master Crochet Designer",
    bio: "With threads of passion and decades of expertise, I transform simple yarn into extraordinary fashion statements that celebrate femininity and elegance.",
    profile_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    specializations: ["Dresses", "Tops", "Customization", "Two-piece"],
    years_experience: 15,
    signature_style: "Romantic vintage-inspired pieces with modern silhouettes",
    featured_works: [
      {
        title: "Bohemian Dream Dress",
        image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop",
        description: "Flowing maxi dress with intricate lacework details"
      },
      {
        title: "Garden Party Top",
        image_url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop", 
        description: "Delicate off-shoulder blouse perfect for summer occasions"
      }
    ],
    contact_preference: "whatsapp",
    is_available: true
  },
  {
    id: "2",
    name: "Amara Thompson",
    role: "Contemporary Crochet Artist",
    bio: "I blend traditional techniques with bold modern aesthetics to create statement pieces that empower women to express their unique style.",
    profile_image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=150&h=150&fit=crop&crop=face",
    specializations: ["Tops", "Shorts", "Accessories", "Jewellery"],
    years_experience: 8,
    signature_style: "Bold geometric patterns with contemporary cuts",
    featured_works: [
      {
        title: "Urban Chic Crop Top", 
        image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
        description: "Structured crop top with architectural details"
      }
    ],
    contact_preference: "whatsapp",
    is_available: true
  },
  {
    id: "3",
    name: "Luna Hartwell",
    role: "Bohemian Crochet Specialist",
    bio: "My creations are inspired by nature's beauty and free-spirited adventures, crafting pieces that flow with life's rhythm and embrace natural elegance.",
    profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", 
    specializations: ["Skirts", "Hats", "Bags", "Hair"],
    years_experience: 12,
    signature_style: "Flowing bohemian pieces with natural textures and earthy tones",
    featured_works: [
      {
        title: "Wildflower Midi Skirt",
        image_url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop",
        description: "A-line skirt with floral motifs and flowing movement"
      }
    ],
    contact_preference: "whatsapp", 
    is_available: true
  },
  {
    id: "4",
    name: "Marcus Sterling",
    role: "Men's Crochet Designer",
    bio: "Breaking boundaries in men's fashion, I create sophisticated crochet pieces that redefine masculine style with comfort and contemporary elegance.",
    profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specializations: ["Men", "Jerseys", "Accessories", "Hats"],
    years_experience: 10,
    signature_style: "Refined masculine designs with subtle textures and clean lines",
    featured_works: [
      {
        title: "Executive Polo Shirt",
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
        description: "Sophisticated polo with subtle crochet detailing"
      }
    ],
    contact_preference: "whatsapp",
    is_available: true
  },
  {
    id: "5",
    name: "Sage Williams",
    role: "Home & Lifestyle Designer",
    bio: "I believe your living space should reflect your soul. My handcrafted home pieces bring warmth, comfort, and artisanal beauty to every corner of your sanctuary.",
    profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specializations: ["Home", "Bottoms", "Shrugs", "Customization"],
    years_experience: 14,
    signature_style: "Cozy textural pieces that blend comfort with sophisticated design",
    featured_works: [
      {
        title: "Chunky Throw Blanket",
        image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
        description: "Luxurious oversized throw in natural wool tones"
      }
    ],
    contact_preference: "whatsapp",
    is_available: true
  },
  {
    id: "6",
    name: "Phoenix Chen",
    role: "Avant-Garde Crochet Artist",
    bio: "Fashion is art, and every stitch tells a story. I create boundary-pushing pieces that challenge conventions and celebrate individual expression through innovative crochet techniques.",
    profile_image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
    specializations: ["Jumpsuits", "Shoes", "Customization", "Accessories"],
    years_experience: 9,
    signature_style: "Experimental structural designs with unexpected silhouettes",
    featured_works: [
      {
        title: "Architectural Jumpsuit",
        image_url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=200&fit=crop",
        description: "Statement one-piece with sculptural elements"
      }
    ],
    contact_preference: "whatsapp",
    is_available: false
  }
];

function App() {
  const [creators, setCreators] = useState<Creator[]>(fallbackCreators);
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>(fallbackCreators);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading creators from a database
    const loadCreators = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch from an API
        // const data = await Creator.list();
        // setCreators(data);
        console.log("Loaded creators from database");
      } catch (err) {
        console.error("Error loading creators:", err);
      }
      setIsLoading(false);
    };

    loadCreators();
  }, []);

  useEffect(() => {
    filterCreators();
  }, [creators, activeFilter]);

  const filterCreators = () => {
    if (activeFilter === "All") {
      setFilteredCreators(creators);
    } else {
      setFilteredCreators(
        creators.filter(creator => 
          creator.specializations?.includes(activeFilter)
        )
      );
    }
  };

  const handleViewProfile = (creator: Creator) => {
    setSelectedCreator(creator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCreator(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Thread Theory Creators</h1>
      </header>
      <main>
        {isLoading ? (
          <div className="loading">Loading creators...</div>
        ) : (
          <>
            <div className="filter-bar">
              <select 
                className="filter-select" 
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="All">All Creators</option>
                {Array.from(new Set(creators.flatMap(creator => creator.specializations))).map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <div className="creators-grid">
              {filteredCreators.map(creator => (
                <CreatorCard 
                  key={creator.id} 
                  creator={creator} 
                  onViewProfile={handleViewProfile} 
                />
              ))}
            </div>
          </>
        )}
      </main>
      <CreatorModal 
        creator={selectedCreator} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;