import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.css';

export default function Resources() {
  const resources = [
    {
      title: "research must-knows",
      description: "essential concepts and knowledge for getting started",
      path: "/resources/must-knows",
      thumbnail: "https://i.postimg.cc/Pr4ktP7y/image.png" 
    },
    {
      title: "machine learning roadmap",
      description: "a comprehensive guide to machine learning fundamentals",
      path: "/resources/ml-roadmap",
      thumbnail: "https://i.postimg.cc/VN3NjJmM/image.png" // Replace with your image URL
    }
  ];

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>resources</h1>
        <p className="resources-subtitle">resources for the curious mind</p>
      </div>
      
      <div className="resources-grid">
        {resources.map((resource, index) => (
          <Link to={resource.path} key={index} className="resource-card">
            <img src={resource.thumbnail} alt={resource.title} className="resource-thumbnail" />
            <div className="resource-divider"></div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 