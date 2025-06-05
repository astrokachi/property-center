import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { ResidentsSection } from "../components/ResidentsSection";
import { ServicesSection } from "../components/ServicesSection";
import { Reviews } from "../components/Reviews";
import { Footer } from "../components/Footer";
import { Explore } from "../components/Explore";

const HomePage = () => {
  return (
    <div className="bg-background">
      <>
        <Navbar />
        <Hero />
        <Features />
        <Explore />
        <ResidentsSection />
        <ServicesSection />
        <Reviews />
        <Footer />
      </>
    </div>
  );
};

export default HomePage;
