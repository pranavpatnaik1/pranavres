import React from 'react';
import './Roadmap.css';

function Roadmap() {
  return (
    <div className="roadmap-page">
      <div className="roadmap-content">
        <iframe
          src="/roadmap.pdf"
          title="Roadmap"
        />
      </div>
    </div>
  );
}

export default Roadmap; 