import React from 'react';
import './IntuitionPage.css';

function IntuitionPage() {
  return (
    <div className="intuition-page">
      <div className="intuition-content">
        <iframe
          src="/intuition.pdf"
          title="Intuition"
        />
      </div>
    </div>
  );
}

export default IntuitionPage; 