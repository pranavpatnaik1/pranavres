import React from 'react';
import './MustKnow.css';

function MustKnow() {
  return (
    <div className="must-know-page">
      <div className="must-know-content">
        <iframe
          src="/must-knows.pdf"
          title="Must Know"
        />
      </div>
    </div>
  );
}

export default MustKnow; 