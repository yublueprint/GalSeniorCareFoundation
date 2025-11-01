import Image from "next/image";
import "../styles/landing.css";

export default function Home() {
  return (
    <>
      <header>
        <div className="logo-gal-placeholder"/> {/*TODO: replace placeholder with logo from firebase once schema/storage path confirmed*/}
      </header>
      <main className="welcome-main">
        <div className="title-text">
          <h2>Welcome to the</h2>
          <h1>Gal Senior Care Scam Simulator</h1>
        </div>
        
        <div className="video-container">
          {/*TODO: replace placeholder with embedded video once content is finalized*/}
          Video Placeholder
        </div>
        

        <button
          className="module-enter"
        >
          Go to Modules 
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="15" 
          height="15" 
          viewBox="0 0 15 15" 
          fill="none"
          className="arrow-icon"
          >
            <path d="M1 6.36395C0.447715 6.36395 0 6.81167 0 7.36395C0 7.91624 0.447715 8.36395 1 8.36395V7.36395V6.36395ZM14.7071 8.07106C15.0976 7.68054 15.0976 7.04737 14.7071 6.65685L8.34315 0.292885C7.95262 -0.0976395 7.31946 -0.0976395 6.92893 0.292885C6.53841 0.683409 6.53841 1.31657 6.92893 1.7071L12.5858 7.36395L6.92893 13.0208C6.53841 13.4113 6.53841 14.0445 6.92893 14.435C7.31946 14.8255 7.95262 14.8255 8.34315 14.435L14.7071 8.07106ZM1 7.36395V8.36395H14V7.36395V6.36395H1V7.36395Z" 
            fill="currentColor"/>
            </svg>
        </button>
      </main>
      <footer>
        {/*TODO: replace placeholder with logo from firebase once schema/storage path confirmed*/}
        Created By
        <div className="logo-blueprint-placeholder"/>
      </footer>
    </>
  );
}
