export default function Specs() {
  return (
    <section className="py-40 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-28">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">Property Details</p>
          <h2 className="text-5xl font-light text-foreground">Site Specifications</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Address</div>
            <div className="text-foreground leading-relaxed">
              3101 Martin Luther King Jr Way<br />
              Berkeley, CA 94703
            </div>
            <div className="text-muted-foreground mt-3 leading-relaxed">
              3100 Adeline St<br />
              Berkeley, CA 94703
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Parcel Number</div>
            <div className="text-foreground text-xl">53-1597-39-4</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Site Size</div>
            <div className="text-foreground text-3xl font-light">4.4 acres</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Zoning</div>
            <div className="text-foreground mb-3">R-BMU</div>
            <a 
              href="https://berkeley.municipal.codes/BMC/23.202.150(F)" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition underline"
            >
              View Municipal Code
            </a>
          </div>
          
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Topography</div>
            <div className="text-foreground">Low to no gradient</div>
            <div className="text-sm text-muted-foreground mt-2">Currently surface parking</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Configuration</div>
            <div className="text-foreground leading-relaxed text-sm">
              Irregular triangular parcel bordered by residential west, mixed-use east
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
