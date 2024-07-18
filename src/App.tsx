import React, { useRef, RefObject, useState } from 'react';
import Navbar from './assets/component/Navbar';
import Home from './section/Home';
import About from './section/About';
import Portofolio from './section/Portofolio';
import Contact from './section/Contact';
import '@fontsource/josefin-sans';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portofolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <div>
      <Navbar 
        scrollToSection={scrollToSection} 
        refs={{homeRef, aboutRef, portofolioRef, contactRef}} 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
      />
      <div ref={homeRef}><Home scrollToAbout={() => scrollToSection(aboutRef)} /></div>
      <div ref={aboutRef}><About/></div>
      <div ref={portofolioRef}><Portofolio isLoggedIn={isLoggedIn} onLogin={handleLogin}/></div>
      <div ref={contactRef}><Contact/></div>
    </div>
  );
}

export default App;