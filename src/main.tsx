import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { MotionProvider } from './hooks/useMotionMode';
import { initAnalytics } from './lib/analytics';
import './styles/index.css';

initAnalytics();

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root — check index.html');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <MotionProvider>
        <App />
      </MotionProvider>
    </BrowserRouter>
  </StrictMode>,
);