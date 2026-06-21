'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 z-[200] shadow-2xl">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-600 max-w-3xl">
          <p>
            Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern und unseren Service zu analysieren. 
            Durch Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Cookies gemäß unserer 
            <a href="/datenschutz" className="text-blue-700 underline ml-1">Datenschutzerklärung</a> zu.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={accept}
            className="bg-blue-700 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            Alle akzeptieren
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-500 text-sm font-medium hover:text-gray-700"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}
