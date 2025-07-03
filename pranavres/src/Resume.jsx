import React from 'react';
import './Resume.css';

export default function Resume() {
  return (
    <div className="resume-page">
      
      <div className="resume-content">
        <iframe 
          src="/resume2.pdf"
          width="100%"
          height="800px"
          title="Resume"
          className="resume-iframe"
        />
      </div>
    </div>
  );
} 