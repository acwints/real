export default function Project() {
  return (
    <section id="project" className="py-40 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-28">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">The Project</p>
          <h2 className="text-5xl md:text-7xl font-light text-foreground leading-tight">
            A New Chapter for<br />the Adeline Corridor
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-24 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-light text-foreground mb-8 tracking-wide">Residential</h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                The residential component will deliver between 750 and 1,200 housing units, with at least 50% designated as affordable 
                in alignment with Assembly Bill 2923 and local agreements.
              </p>
              <p>
                Housing will serve UC Berkeley students seeking off-campus accommodations, faculty and staff, young professionals 
                commuting to San Francisco and Oakland, and families attracted to Berkeley's renowned schools and cultural amenities.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-3xl font-light text-foreground mb-8 tracking-wide">Commercial</h3>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Street-level retail will activate all building edges, creating opportunities for cafés, restaurants, and small shops 
                that appeal to commuters, residents, and neighbors.
              </p>
              <p>
                Concepts include a grocery or market hall, grab-and-go food outlets catering to BART passengers, and flexible retail 
                bays supporting local entrepreneurs and small businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
