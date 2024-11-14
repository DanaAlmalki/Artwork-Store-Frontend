import React from "react";

import "./Hero.css";
import heroImg from "../../assets/hero-modified.jpg";
import { useNavigate } from "react-router-dom";

export default function hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <img className="hero-image" src={heroImg} alt="hero section" />
      <div className="hero-content">
        <h3>Curate your own art collection all from one place</h3>
        <button onClick={() => navigate("/products")}>Explore Artworks</button>
      </div>
    </div>
  );
}
