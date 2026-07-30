import { useState } from 'react';
import './FloorTiles.css';

const collections = [
  { id: 1, title: 'Statuario Pure', category: 'Marble Collection', image: '/images/marble_slab.jpg' },
  { id: 2, title: 'Onyx Noir', category: 'Dark Elegance', image: '/images/hero_exterior.jpg' },
  { id: 3, title: 'Travertino Navona', category: 'Natural Stone', image: '/images/bathroom_tiles.jpg' },
  { id: 4, title: 'Calacatta Gold', category: 'Signature Series', image: '/images/kitchen_tiles.jpg' }
];

const FloorTiles = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section className="accordion-gallery-section" id="collections">
      <div className="ag-header">
        <h2>Floor Surfaces</h2>
        <p>The foundation of luxury spaces</p>
      </div>
      
      <div className="ag-container">
        {collections.map((item, index) => (
          <div 
            key={item.id} 
            className={`ag-card ${hoveredIndex === index ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            data-cursor-text="EXPLORE"
          >
            <img src={item.image} alt={item.title} className="ag-image" />
            <div className="ag-overlay"></div>
            
            <div className="ag-title-vertical">
              {item.title}
            </div>
            
            <div className="ag-content">
              <div className="ag-content-inner">
                <span className="ag-category">{item.category}</span>
                <h3 className="ag-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FloorTiles;
