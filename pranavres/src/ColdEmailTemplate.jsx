import React from 'react';
import './ColdEmailTemplate.css';

function ColdEmailTemplate() {
  return (
    <div className="cold-email-page">
      <div className="cold-email-content">
        <iframe
          src="/cold-email.pdf"
          title="Cold Email Template"
        />
      </div>
    </div>
  );
}

export default ColdEmailTemplate; 