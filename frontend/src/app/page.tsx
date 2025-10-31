import Image from "next/image";
import "../styles/landing.css";

export default function Home() {
  return (
    <>
      <header>
        logo
      </header>
      <main className="welcome-main">
        <div className="title-text">
          <h2>Welcome to the</h2>
          <h1>Gal Senior Care Scam Simulator</h1>
        </div>
        
        <div className="video-container">
          {/* Placeholder for video */}
          Video Placeholder
        </div>

        <button
          className="module-enter"
        >
          Go to Modules 
        </button>
      </main>
      <footer>Created by</footer>
    </>
  );
}
