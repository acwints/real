'use client';

import { useEffect, useState } from 'react';
import ModelChat from '../components/ModelChat';
import ProFormaContent from '../components/ProFormaContent';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ModelPage() {
  const [activeView, setActiveView] = useState<'spreadsheet' | 'formatted'>('spreadsheet');
  const [isLoading, setIsLoading] = useState(true);
  const spreadsheetId = '194zQSVqMnUEA9futs2MNPKg2r0g1CLoWdhkDhePOKvI';
  // Use pubhtml endpoint with headers=true to show row/column headers
  // Note: Sheet must be published (File > Share > Publish to web)
  const embedUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/pubhtml?widget=true&headers=true&chrome=false`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-6 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] mb-2 text-neutral-400">Financial Model</p>
          <h1 className="text-4xl md:text-5xl font-light mb-3 leading-tight">
            Interactive Financial Model
          </h1>
          <div className="w-24 h-px bg-white/40 mb-4"></div>
          <p className="text-base text-neutral-300 max-w-3xl mb-6 leading-relaxed">
            Complete financial model with spreadsheet and detailed pro forma analysis
          </p>
          
          {/* Chat Interface */}
          <div className="mt-6">
            <ModelChat />
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="bg-white border-b border-neutral-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveView('spreadsheet')}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeView === 'spreadsheet'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Spreadsheet
            </button>
            <button
              onClick={() => setActiveView('formatted')}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeView === 'formatted'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Formatted View
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 bg-neutral-50 min-h-[calc(100vh-400px)]">
        <div className="max-w-7xl mx-auto px-6">
          {activeView === 'spreadsheet' && (
            <>
              {/* Spreadsheet Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-light text-neutral-900">
                  <a 
                    href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-600 transition underline decoration-neutral-300 hover:decoration-neutral-600"
                  >
                    Pro Forma Ashby BART
                  </a>
                </h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-neutral-200">
              <div className="p-2 bg-neutral-50">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200">
                  {isLoading && (
                    <div className="h-[800px] flex items-center justify-center bg-neutral-50">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mb-4"></div>
                        <p className="text-neutral-600">Loading spreadsheet...</p>
                      </div>
                    </div>
                  )}
                  <div className={`w-full ${isLoading ? 'hidden' : 'block'}`}>
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="800"
                      frameBorder="0"
                      className="w-full border-0"
                      style={{ minHeight: '800px', display: 'block' }}
                      allowFullScreen
                      title="Ashby BART Financial Model"
                      onLoad={() => setIsLoading(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            </>
          )}

          {activeView === 'formatted' && (
            <>
              {/* Formatted View Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-light text-neutral-900">Pro Forma Ashby BART</h2>
              </div>
              <ProFormaContent />
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
