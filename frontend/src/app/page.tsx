import Image from "next/image";
import "../styles/landing.css";

export default function Home() {
  return (
    <>
      <header>
        <h2>Welcome to the</h2>
        <h1>Gal Senior Care Scam Simulator</h1>
      </header>
      <main>
        <Image 
          className="landing-img"
          src="/images/landing_page_img.png"
          alt="Landing Page Image"
          width={800}
          height={600}
        />
        <button>Go to Modules</button>
      </main>
      <footer>Created by</footer>
    </>
  );
}
