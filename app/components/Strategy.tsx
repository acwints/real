export default function Strategy() {
  return (
    <section id="strategy" className="py-40 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-28">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">Investment Thesis</p>
          <h2 className="text-5xl md:text-7xl font-light mb-16 leading-tight">
            Strategic Opportunity
          </h2>
          <div className="w-24 h-px bg-border mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-24 max-w-5xl mx-auto mb-24">
          <div className="text-center">
            <h3 className="text-3xl font-light mb-8 tracking-wide">Market Timing</h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
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
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
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

        <div className="text-center pt-16 border-t border-border">
          <p className="text-muted-foreground mb-8 text-lg">Detailed financial analysis and development timeline available</p>
          <button className="px-12 py-4 bg-primary-foreground text-primary text-sm uppercase tracking-widest hover:bg-secondary transition">
            Download Investment Memo
          </button>
        </div>
      </div>
    </section>
  );
}
