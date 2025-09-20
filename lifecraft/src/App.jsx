import { useEffect } from "react";
import "./App.css";
import LiquidEther from "./components/liquidEther";
import "./components/liquidEther.css";

function App() {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="App">
      {/* Full-page LiquidEther background */}
      <LiquidEther
        className="liquid-ether-background"
        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      {/* Header */}
      <header className="header">
        <a href="#" className="logo">
          <i className="fa-solid fa-cube"></i>LIFECRAFT
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#">About Us</a>
          <a href="#" className="cta-button">Sign Up</a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero container">
          <h1 className="animate-on-scroll">Map Your Career Constellation.</h1>
          <p className="animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
            LIFECRAFT uses real-time job data and AI to build your personalized path from learning to earning.
          </p>
          <a href="#problem" className="cta-button animate-on-scroll" style={{ transitionDelay: "0.4s" }}>
            Begin Your Ascent
          </a>
        </section>

               {/* Problem Section */}
        <section className="problem container" id="problem">
          <h2 className="animate-on-scroll">Lost in the Content Nebula?</h2>
          <p className="animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
            Stop collecting random skills. Start building a career. We bring the right opportunities and a clear path into focus.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="container">
          <h2 className="animate-on-scroll">Your Personal Observatory</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll" style={{ transitionDelay: "0s" }}>
              <div className="icon cyan"><i className="fa-solid fa-satellite-dish"></i></div>
              <h3>The Signal: Job Radar</h3>
              <p>See which skills are burning brightest in your target city and role.</p>
            </div>
            <div className="feature-card animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <div className="icon magenta"><i className="fa-solid fa-network-wired"></i></div>
              <h3>The Constellation: Skill Tree</h3>
              <p>Watch your career map grow in real-time with every skill you master.</p>
            </div>
            <div className="feature-card animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <div className="icon gold"><i className="fa-solid fa-brain"></i></div>
              <h3>The Oracle: AI Mentor</h3>
              <p>Get guidance from an AI trained on your unique professional goals.</p>
            </div>
            <div className="feature-card animate-on-scroll" style={{ transitionDelay: "0.3s" }}>
              <div className="icon cyan"><i className="fa-solid fa-rocket"></i></div>
              <h3>The Launchpad: Resume Generator</h3>
              <p>Instantly convert your progress into a resume that's ready for launch.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta container">
          <h2 className="animate-on-scroll">Your Future is Waiting.</h2>
          <a href="#" className="cta-button animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
            Create My Free Roadmap
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;