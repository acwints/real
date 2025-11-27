'use client';

import { useEffect, useState } from 'react';
import ModelChat from '../components/ModelChat';
import ProFormaContent from '../components/ProFormaContent';
import Header from '../components/Header';
import Footer from '../components/Footer';

type SheetTab = 'proforma' | 'groundlease' | 'data' | 'commercialcomp' | 'housingcomp';

const SHEET_TABS: { id: SheetTab; name: string; gid?: string }[] = [
  { id: 'proforma', name: 'Pro Forma', gid: '1321959354' },
  { id: 'groundlease', name: 'Ground Lease' },
  { id: 'data', name: 'Data' },
  { id: 'commercialcomp', name: 'Commercial Comp' },
  { id: 'housingcomp', name: 'Housing Comp' },
];

export default function ModelPage() {
  const [activeTab, setActiveTab] = useState<'spreadsheet' | 'proforma'>('spreadsheet');
  const [activeSheetTab, setActiveSheetTab] = useState<SheetTab>('proforma');
  const [isLoading, setIsLoading] = useState(true);
  const spreadsheetId = '194zQSVqMnUEA9futs2MNPKg2r0g1CLoWdhkDhePOKvI';
  
  const currentSheetTab = SHEET_TABS.find(t => t.id === activeSheetTab);
  // Use gid parameter to switch tabs in Google Sheets
  const embedUrl = currentSheetTab?.gid 
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/preview?gid=${currentSheetTab.gid}`
    : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/preview`;

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

      {/* Tabs - Top */}
      <section className="bg-white border-b border-neutral-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('spreadsheet')}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === 'spreadsheet'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Spreadsheet
            </button>
            <button
              onClick={() => setActiveTab('proforma')}
              className={`px-6 py-3 text-sm font-medium transition ${
                activeTab === 'proforma'
                  ? 'text-neutral-900 border-b-2 border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Pro Forma
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8 bg-neutral-50 min-h-[calc(100vh-400px)]">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === 'spreadsheet' && (
            <>
              {/* Google Sheets Tabs - Top */}
              <div className="mb-0 bg-white rounded-t-xl border border-neutral-200 border-b-0 shadow-sm">
                <div className="px-6 py-3">
                  <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                    {SHEET_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveSheetTab(tab.id);
                          setIsLoading(true);
                        }}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition rounded-t-lg ${
                          activeSheetTab === tab.id
                            ? 'text-neutral-900 bg-neutral-50 border-b-2 border-neutral-900'
                            : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50/50'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spreadsheet Container */}
              <div className="bg-white rounded-b-xl shadow-xl overflow-hidden border border-neutral-200 border-t-0">
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
                        key={activeSheetTab} // Force reload when tab changes
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

          {activeTab === 'proforma' && <ProFormaContent />}
        </div>
      </section>

      <Footer />
    </div>
  );
}
