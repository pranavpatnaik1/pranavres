import React, { useEffect } from "react";
import "./Home.css";

export default function Home() {
  // Add a class to the body when this component mounts
  // and remove it when it unmounts
  useEffect(() => {
    document.body.classList.add('home-page');
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <main className="home-container">
      <div className="home-content">
        <div className="home-text">
          <p className="home-greeting">
            hi, i'm pranav 👋
          </p>
          <p>
            founder @ vanakian, currently building mathema ($80k in funding)
          </p>
          <p>
            i make things. my current routine is <a href="/research" rel="noopener noreferrer" style={{ color: "#A20000", textDecoration: "none" }}>reading research papers</a>, building <a href="/projects" rel="noopener noreferrer" style={{ color: "#A20000", textDecoration: "none" }}>projects</a>, then <a href="https://www.instagram.com/pranavpatnaik_/" target="_blank" rel="noopener noreferrer" style={{ color: "#A20000", textDecoration: "none" }}>posting all about it.</a>
          </p>
          <p>
            i also love a good pizza.
          </p>
        </div>
        <img 
          src={null}
          alt="" 
          className="home-image"
        />
      </div>
    </main>
  );
} 