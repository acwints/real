const impactData = [
  {
    title: 'Housing',
    description: "Delivering 750-1,200 new homes to address Berkeley's acute housing shortage and support diverse communities.",
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'At least 50% affordable housing ensures economic diversity and expands opportunities for all Berkeley residents.',
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Transit',
    description: 'Direct BART station access reduces car dependency and connects residents to the entire Bay Area.',
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Commerce',
    description: 'Street-level retail, cafés, and market hall create vibrant pedestrian life and support local entrepreneurs.',
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Workspace',
    description: '2-3 floors of office and co-working space for startups, nonprofits, and hybrid workers.',
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    description: "Transit-oriented design, bicycle facilities, and reduced parking align with Berkeley's climate goals.",
    icon: (
      <svg className="w-12 h-12 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Strategy() {
  return (
    <>
      <section id="impact" className="py-40 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">Our Impact</p>
            <h2 className="text-5xl font-light text-foreground">Development Pillars</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20">
            {impactData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 bg-background rounded-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-6 tracking-wide">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="strategy" className="py-40 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-28">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-primary-foreground/70">Investment Thesis</p>
            <h2 className="text-5xl md:text-7xl font-light mb-16 leading-tight">
              Strategic Opportunity
            </h2>
            <div className="w-24 h-px bg-primary-foreground/30 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-24 max-w-5xl mx-auto mb-24">
            <div className="text-center">
              <h3 className="text-3xl font-light mb-8 tracking-wide">Market Timing</h3>
              <div className="space-y-6 text-primary-foreground/80 leading-relaxed text-lg">
                <p>
                  The Bay Area's housing crisis and UC Berkeley's persistent shortage of student and faculty housing ensure 
                  strong demand for well-located units.
                </p>
                <p>
                  Young professionals seeking more affordable alternatives to San Francisco and Oakland will find the project attractive, 
                  given its combination of transit access and modern amenities.
                </p>
                <p>
                  The integration of retail, office, and community space strengthens the project's resilience by diversifying revenue 
                  streams and establishing a vibrant neighborhood hub.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-3xl font-light mb-8 tracking-wide">Policy Support</h3>
              <div className="space-y-6 text-primary-foreground/80 leading-relaxed text-lg">
                <p>
                  In 2022, both Ashby and North Berkeley BART sites were rezoned under the R-BMU designation to allow mid- to high-rise 
                  mixed-use development.
                </p>
                <p>
                  Assembly Bill 2923 mandates transit-oriented development on BART-owned sites, creating a favorable regulatory framework 
                  for this project.
                </p>
                <p>
                  Berkeley has prioritized higher-density construction near transit hubs, aligning with regional housing goals and 
                  statewide mandates.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-16 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/80 mb-8 text-lg">Detailed financial analysis and development timeline available</p>
            <button className="px-12 py-4 bg-primary-foreground text-primary text-sm uppercase tracking-widest hover:bg-primary-foreground/90 transition">
              Download Investment Memo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
