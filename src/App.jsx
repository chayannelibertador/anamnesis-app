import { useState, useEffect } from 'react';
import AnamnesisForm from './components/AnamnesisForm';

function App() {
  // Theme state: 'green' | 'blue' | 'magenta'
  const [theme, setTheme] = useState('green');
  
  // Apply theme class to body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Background image state for demonstration. 
  // We can change it based on the step or static.
  // Using an Unsplash placeholder for fitness/stretching that works well with dark gradients.
  const backgroundImageUrl = theme === 'green' 
    ? "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=2000" // general fitness
    : theme === 'blue'
      ? "/bg_hombre.png" // Male fitness - local generated image
      : "/bg_mujer.png"; // Female fitness - local generated image

  return (
    <div 
      className="app-container" 
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="content-wrapper">
         <AnamnesisForm theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
