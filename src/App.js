import React, { useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Features from './components/Features';
import AdvancedFeatures from './components/AdvancedFeatures';
// import Platform from './components/Platform';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'scroll') {
        const { section } = event.data;
        
        if (section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.querySelector(section);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="App bg-black">
      <BackgroundCanvas />
      <iframe 
        src="/try.html" 
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'transparent',
          pointerEvents: 'auto'
        }}
        title="SourceSmart AI"
      />
      <Features />
      <AdvancedFeatures />
      {/* <Platform /> */}
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

